require('dotenv').config();
var express  = require('express');
var app      = express();
var path     = require('path');
var http     = require('http');
// var server   = http.Server(app);
var io       = require('socket.io')(app);
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
  	stockData : [[String, Number]]  
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

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.listen(port, function() {
	console.log('Listening on port', port);
});

// SOCKET.IO STUFF
io.on('connection', function(socket){
  
	console.log(timestamp() + 'connected');
	//console.log(socket.request.headers)

	// Intializing new connection
	initialize(socket);

	socket.on('clientAddStock', function(data) {
		addStock(data, socket);
	});

	socket.on('clientRemoveStock', function(data) {
		removeStock(data, socket);
	});

	socket.on('disconnect', function() {
		console.log(timestamp() + 'disconnected');
	});
});

var timestamp = function() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' | ';
};

var getData = function(code) {
	var options = {
	    url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + code + '.json',
	    method: 'GET',
	    qs: {
	        column_index : '4',
	        api_key      : process.env.QUANDL_API_KEY,
	        start_date   : '2014-01-01'
	    },
	    json: true
	};
	return request(options);
};

var getDefault = function() {
	getData('GOOG')
		.then(function(res) {
			var data = res.dataset.data.map(function(point) { return [ Date.parse(point[0]), point[1] ]; });
			return data;
		});
};

var initialize = function(socket) {
	Stock.find({}, 'code company -_id').exec().then(function(docs) {
		var promises = docs.map(function(doc) {
			return getData(doc.code);
		});
		Promise.all(promises)
			.then(function(data) {
				var stocks = [];
				var stockData = [];
				if (data.length) {
					data.forEach(function(res) {
						var id = Math.floor(Math.random()*10000); // TODO: Make this client side
						// Converting from YYYY-MM-DD to Unix Time
						var data = res.dataset.data.map(function(point) { return [ Date.parse(point[0]), point[1] ]; }).reverse();
						// Separating code+company from data since only the chart needs the data
						stocks.push({ id: id,  code: res.dataset.dataset_code, company: res.dataset.name.split(' (')[0] });
						stockData.push(data);
					});
					console.log(timestamp() + 'Initializing');
					socket.emit('initialize', { stocks: stocks, stockData: stockData });
				} else {
					getData('GOOG')
						.then(function(res) {
							var data = res.dataset.data.map(function(point) { return [ Date.parse(point[0]), point[1] ]; }).reverse();
							stockData.push(data);
							stocks.push({ id: Math.floor(Math.random()*10000), code: 'GOOG', company: 'Alphabet Inc.'});
							console.log(timestamp() + 'Initializing');
							socket.emit('initialize', { stocks: stocks, stockData: stockData });
						})
						.catch(function(res) {
							var message = 'Error getting data from Quandl API';
							console.error(timestamp() + message);
							socket.emit('cantInitialize', { msg: message });	
						});
				}			
			})
			.catch(function(res) {
				var message = 'Error getting data from Quandl API';
				console.error(timestamp() + message);
				socket.emit('cantInitialize', { msg: message });
			});
	})
	.catch(function(err) {
		console.error(timestamp() + err);
		socket.emit('cantInitialize', { msg: err });
	});
};

var addStock = function(stock, socket) {
	getData(stock.code)
		.then(function(res) {
			var newStock = new Stock(stock);
			newStock.save()
				.then(function(doc) {
					var data = res.dataset.data.map(function(point) { return [ Date.parse(point[0]), point[1] ]; }).reverse();
					console.log(timestamp() + 'Added ' + stock.code );
					io.emit('addStock', { id: Math.floor(Math.random()*10000), code: stock.code, company: stock.company, stockData: data });
				})
				.catch(function(err) {
					console.error(timestamp() + err);
					socket.emit('errorMsg', { msg: err });
				});
		})
		.catch(function(res) {
			console.error(timestamp() + 'Error getting data from Quandl API');
			socket.emit('errorMsg', { msg: err });
		});
};

var removeStock = function(stock, socket) {
	Stock.remove({ code: stock.code })
		.then(function() {
			console.log(timestamp() + 'Removed ' + stock.code);
			io.emit('removeStock', { code: stock.code });
		})
		.catch(function(err){
			console.error(timestamp() + err);
			socket.emit('errorMsg', { msg: err });
		});
};
