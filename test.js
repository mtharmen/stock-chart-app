var fs = require('fs');
var request  = require('request-promise-native');
var mongoose = require('mongoose');

var ip   = process.env.IP   || '127.0.0.1';
var port = process.env.PORT || 8080;
mongoose.Promise = global.Promise;

var stockSchema = new mongoose.Schema({
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

var getData = function(code) {
	var options = {
	    url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + code + '.json',
	    qs: {
	        column_index : '4',
	        api_key      : 'x4zV3Y57xvyWpQDm9wLe'
	    },
	    // headers: {
	    //     'User-Agent': 'Request-Promise'
	    // },
	    json: true
	};
	return request(options)
}

var timestamp = function() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' | '
}

// Initialize
var initialize = function() {
	Stock.find({}, 'code company -_id').exec().then(function(docs) {
		var promises = docs.map(function(doc) {
			return getData(doc.code)
		})
		Promise.all(promises)
			.then(function(data) {
				var stocks = []
				var stockData = []
				var id = 0
				data.forEach(function(res, i) {
					var id = Math.floor(Math.random()*10000) // TODO: Make this client side
					// Converting from YYYY-MM-DD to Unix Time
					var data = res.dataset.data.map(function(point) { return [ Date.parse(point[0]), point[1] ] })
					// Separating code+company from data since only the chart needs the data
					console.log(docs[i].company)
					stocks.push({ id: id,  code: res.dataset.dataset_code, company: res.dataset.name.split(' (')[0] })
					stockData.push(data)
				})
				console.log(timestamp() + 'Initializing')
				// socket.emit('initialize', { stocks: stocks, stockData: stockData })
			})
			.catch(function(res) {
				console.error(timestamp() + 'Error getting data from Quandl API')	
			})
	})
	.catch(function(err) {
		console.error(timestamp() + err)
	})
}

// Add Stock
var addStock = function(stock) {
	var newStock = new Stock(stock)

	getData(stock.code)
		.then(function(res) {
			newStock.save()
				.then(function(doc) {
					var data = res.dataset.data.map(function(point) { return [ Date.parse(point[0]), point[1] ] })
					console.log(timestamp() + 'Added ' + stock.code )
					//io.emit('addStock', { id: Math.floor(Math.random()*10000), code: stock.code, company: stock.company, stockData: data})
				})
				.catch(function(err) {
					console.error(timestamp() + err)
				})
		})
		.catch(function(res) {
			console.error(timestamp() + 'Error getting data from Quandl API')		
		})
}

// Remove Stock
var removeStock = function(stock) {
	Stock.remove({ code: stock.code })
		.then(function() {
			console.log(timestamp() + 'Removed ' + stock.code)
			//io.emit('removeStock', { code: stock.code })
		})
		.catch(function(err){
			console.error(timestamp() + err)
		})
}

var stock = { code: 'FURX', company: 'FURXName' }