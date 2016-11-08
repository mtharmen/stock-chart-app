require('dotenv').config();
var express  = require('express');
var app      = express();
var path     = require('path');
var http     = require('http');
var server   = http.Server(app);
var io       = require('socket.io')(server);
var request  = require('request');
var mongoose = require('mongoose');
var stocks   = require('./lib/stockCodes.js')(false)

// Configs
var ip   = process.env.IP   || '127.0.0.1';
var port = process.env.PORT || 8080;

var startDate = '2016-01-01'
var d = new Date()
var month = d.getMonth()+1
var day = d.getDate()-1
var month = month < 10 ? '0' + month : month
var day = day < 10 ? '0' + day : day

var endDate = d.getFullYear() + '-' + month + '-' + day
mongoose.Promise = global.Promise;

var stockSchema = new mongoose.Schema({ 
	id        : Number,
  	code      : String,
  	company   : String,
  	stockData : [[String, Number]]  
});

var Stock = mongoose.model('Stock', stockSchema);

mongoose.connect('mongodb://' + ip + '/stockAppDB');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 	console.log('Connected to stockAppDB');
});

// Expess Set Up
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, '/views/index.html'));
});

server.listen(port, function() {
	console.log('Listening on port', port);
});

// socket.io Stuff
io.on('connection', function(socket){
  
	console.log(new Date().toISOString() + ': connected')
	//console.log(socket.request.headers)

	// Intializing new connection
	initialize(socket);

	socket.on('clientAddStock', function(data) {
		if (stockCheck('add')) {
			console.log(new Date().toISOString() + ': Recieved Add - ' + data.code)

			// TODO: Force uppercase? Clean up
			if (data.code in stocks) {
				var company = stocks[data.code]
				var ID = Math.floor(Math.random()*100)
			    var stockInfo = {id: ID, code: data.code, company: company }
			    
			   	var url = 'https://www.quandl.com/api/v3/datasets/WIKI/' + data.code + '.json?column_index=4&collapse=daily'
				url += '&start_date=' + startDate + '&end_date=' + endDate
				url += '&api_key=' + process.env.API_KEY

			    request(url, function(err, res, body) {
			    	if (err) {
			    		console.error(err)
			    	}
			    	var info = JSON.parse(body)

					if (info.quandl_error) {
						console.log('Invalid Code')
					} else {
						// Checking incase available data is out of range
						if (info.dataset.newest_available_date < startDate) {
							socket.emit('errorMsg', { msg: 'Data Not In Range' })
						} else {
							var data = info.dataset.data.reverse();
							for (var i=0; i < data.length; i++) {
								data[i][0] = Date.parse(data[i][0])
								data[i][1] = parseInt(data[i][1])
							}
							// console.log(typeof data[0][0])
							// console.log(typeof data[0][1])
							stockInfo.stockData = data
							/// Saving Stock to database and emitting add command to all clients
							saveStock(stockInfo, socket)
						}
					}
				})   
			} else {
				socket.emit('errorMsg', { msg: 'Invalid code' })
			}
		} else {
			sock.emit('errorMsg', { msg: 'Cannot have more than 6 stocks at once'})
		}
	})

	socket.on('clientRemoveStock', function(data) {
		if (stockCheck('remove')) {
			console.log(new Date().toISOString() + ': Recieved Remove - ' + data.code)
			// Deleting Stock from database and emitting remove command to all clients
			deleteStock(data.code, socket)
		} else {
			socket.emit('errorMsg', { msg: 'Must have at least one stock at all times' })
		}
	})

	socket.on('disconnect', function() {
		console.log(new Date().toISOString() + ': disconnected')
	})
})

var convertDate = function(dates) {
	for (var i=0; i < dates.length; i++) {
		dates[i][0] = parseInt(dates[i][0])
		dates[i][1] = parseInt(dates[i][1])
	}
	// console.log(typeof dates[0][0])
	// console.log(typeof dates[0][1])
	return dates
}

var initialize = function(socket) {
	Stock.find({}, 'id code company stockData', function(err, docs) {
		if (err) { 
			console.error(err);
			socket.emit('errorMsg', { msg: 'Problem searching database' })
		} else {
			if (docs) {
				var base = { stocks: [], stockData: [] }
				for (var i=0; i < docs.length; i++) {
					//console.log(docs[i])
					base.stocks.push({ id: docs[i].id, code: docs[i].code, company: docs[i].company })
					var data = convertDate(docs[i].stockData)
					base.stockData.push(data)
				}
			} else {
				// TODO: Setup a Default if there is nothing in database
				base = { stocks: [], stockData: [] }
			}
			//console.log(base)
			socket.emit('initialize', base);
		}
  	});
}

// TODO: Does nothing, need callback
var stockCheck = function(type) {
	Stock.find({}, 'code', function(err, docs) {
		if (err) { 
			console.error(err);
			socket.emit('errorMsg', { msg: 'Problem searching database' })
		} else if (docs.length < 2 && type === 'remove') {

		} else if (docs.length > 5 && type === 'add') {

		} 
	})
	return true
}

var saveStock = function(stockInfo, socket) {
	console.log(new Date().toISOString() + ': Saving ' + stockInfo.code)
	var newStock = new Stock(stockInfo);
	newStock.save(function(err, newEntry) {
		if (err) {
			console.error(err);
			socket.emit('errorMsg', { msg: 'Error saving to database' })
		} else {
			console.log(new Date().toISOString() + ': Stock ' + newStock.code + ' saved');
			// emitting to all clients
			io.emit('addStock', stockInfo)
		}
	});
}

var deleteStock = function(code, socket) {
	console.log(new Date().toISOString() + ': Deleting ' + code)
	Stock.remove({ code: code }, function(err) {
		if (err) {
			console.error(err);
			socket.emit('errorMsg', { msg: 'Problem deleting from database' })
		} else {
			console.log(new Date().toISOString() + ': Stock ' + code + ' deleted');
			// emitting to all clients
			io.emit('removeStock', { code: code})
		}
	});
}