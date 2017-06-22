require('dotenv').config();
var express  = require('express');
var app      = express();
var path     = require('path');
var http     = require('http');
var server   = http.createServer(app);
var io       = require('socket.io')(server);
var request  = require('request-promise-native');
var mongoose = require('mongoose');
//var schedule = require('node-schedule');
var stocks   = require('./lib/stockCodes.js')(false);


// Configs
var ip   = process.env.IP   || '127.0.0.1';
var port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;

var stockSchema = new mongoose.Schema({
	id        : Number,
  	code      : String,
  	company   : String,
  	stockData : [[Number, Number]],
  	lastUpdate: Date
});

var Stock = mongoose.model('Stock', stockSchema);

var mongodbUrl = process.env.MONGODB_URL || 'mongodb://' + ip;
	
mongoose.connect(mongodbUrl + '/mtharmen-stock-chart-app');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 	console.log('Connected to mtharmen-stock-chart-app');
});

var convertDate = function(date) {
	date = parseInt(date);
	var d = new Date(date);
	var day = d.getUTCDate() < 10 ? '0' + day : day;
	var month = d.getUTCMonth()+1 < 10 ? '0' + month : month;

	var endDate = d.getUTCFullYear() + '-' + month + '-' + day; // Formatted

	return endDate;
};

// Expess Set Up
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

server.listen(port, () => {
	console.log('Listening on port', port);
});

// SOCKET.IO STUFF
io.on('connection', socket => {
  
	console.log(timestamp() + 'connected');
	//console.log(socket.request.headers)

	// Intializing new connection
	initialize(socket);

	socket.on('clientAddStock', data => {
		addStock(data, socket);
	});

	socket.on('clientRemoveStock', data => {
		removeStock(data, socket);
	});

	socket.on('disconnect', () => {
		console.log(timestamp() + 'disconnected');
	});
});

var timestamp = function() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' | ';
};

var getData = function(code, start) {
	start_date = start || '2014-01-01'
	var options = {
	    url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + code + '.json',
	    method: 'GET',
	    qs: {
	        column_index : '4',
	        api_key      : process.env.QUANDL_API_KEY,
	        start_date   : start_date
	    },
	    json: true
	};
	return request(options);
};

var getDefault = function() {
	getData('GOOG')
		.then(res => {
			var data = res.dataset.data.map(point => { return [ Date.parse(point[0]), point[1] ]; });
			return data;
		});
};

var shouldUpdate = function(lastUpdate) {
	let d = new Date();
	let tz = d.getTimezoneOffset()/60;
	d.setHours(-tz,0,0,0);
	if (lastUpdate < d) {
		// Checking if weekday
		// NOTE: Since there is no consistent update time, it might be tricky with timezones on Fridays and Mondays
		if (d.getUTCDay() > 0 && d.getUTCDay() < 6) {
			return true
		}
	}
	return false
}

var initialize = function(socket) {
	// Searching through database
	Stock.find({}, '-_id').exec().then(docs => {
		stocks = [];
		stockData = [];
		// In case there is somehow nothing in the database
		if (docs.length < 1) {
			console.log('database empty, getting default')
			getData('GOOG')
				.then(res => {
					stockData = res.dataset.data.map(point => { return [ Date.parse(point[0]), point[1] ]; }).reverse();
					stock = { id: res.dataset.id, code: 'GOOG', company: 'Alphabet Inc.', lastUpdate: Date.parse(res.dataset.newest_available_date)};
					console.log(timestamp() + 'Initializing');
					socket.emit('initialize', { stocks: [stock], stockData: [stockData] });

					// Saving to database so there is something in there for later
					stock.stockData = stockData;
					newStock = new Stock(stock);
					newStock.save();
				})
				.catch(res => {
					var message = 'Error getting data from Quandl API';
					console.error(timestamp() + message);
					socket.emit('cantInitialize', { msg: message });	
				});
		}
		else {
			console.log('checking database for updates')
			let promises = docs.map(doc => {
				// Check if the stock needs to be updated
				if (shouldUpdate(doc.lastUpdate)) {
					console.log('updating ' + doc.code)
					return updateStock(doc);
				}
				else {
					return new Promise((resolve, reject) => {
						console.log('passing along ' + doc.code)
						resolve(doc);
					});
				};
			});

			Promise.all(promises)
				.then(data => {
					console.log('going through docs')
					if (data.length) {
						data.forEach(doc => {
							stocks.push({id: doc.id, code: doc.code, company: doc.company});
							stockData.push(doc.stockData);
						})
						console.log(timestamp() + 'Initializing');
						socket.emit('initialize', { stocks: stocks, stockData: stockData });
					};
				})
				.catch(err => {
					console.error(err)
				})
			
		};
	});
}

var addStock = function(stock, socket) {
	getData(stock.code)
		.then(res => {
			stock.stockData = res.dataset.data.map(function(point) { return [ Date.parse(point[0]), point[1] ]; }).reverse();
			stock.id = res.dataset.id;

			// Checking if the stock data has stopped updating
			stock.lastUpdate = Date.parse(res.dataset.newest_available_date);
			let d = new Date();
			d.setDate(d.getDate() - 7);
			if (d > stock.lastUpdate) {
				stock.lastUpdate = d.setFullYear(3000);
			}

			let newStock = new Stock(stock);
			newStock.save()
				.then(doc => {
					console.log(timestamp() + 'Added ' + stock.code );
					io.emit('addStock', stock);
				})
				.catch(err => {
					console.error(timestamp() + err);
					socket.emit('errorMsg', { msg: err });
				});
		})
		.catch(res => {
			console.log(res)
			console.error(timestamp() + 'Error getting data from Quandl API');
			socket.emit('errorMsg', { msg: err });
		});
};

var updateStock = function(stock) {
	getData(stock.code, stock.lastUpdate)
		.then(res => {
			newStockData = res.dataset.data.pop(); // to remove included start date
			if (newStockData.length) {
				newStockData = newStockData.map(point => {
					return [Date.parse(point[0]), point[1]];
				}).reverse();
				stock.stockData = stock.stockData.concat(newStockData);
				stock.lastUpdate = Date.parse(res.dataset.newest_available_date);
			}
			newStock = new Stock(stock)
			return newStock.save()
		})
		.catch(res => {
			var message = 'Error getting data from Quandl API';
			console.error(timestamp() + message);
		});
}

var removeStock = function(stock, socket) {
	Stock.remove({ code: stock.code })
		.then(() => {
			console.log(timestamp() + 'Removed ' + stock.code);
			io.emit('removeStock', { code: stock.code });
		})
		.catch(err => {
			console.error(timestamp() + err);
			socket.emit('errorMsg', { msg: err });
		});
};
