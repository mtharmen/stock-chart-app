const fs = require('fs');

module.exports = function(parse) {
	if (parse) {
		var stocks = {};
		var raw = fs.readFileSync('./lib/quandl-WIKI-stock-codes.csv');
		var lines = raw.toString().split('\n');

		for (var i=0; i < lines.length-1; i++) {
			var stockInfo = lines[i].split(',');
			stocks[stockInfo[0]] = stockInfo[1].replace('"', '').replace('\r', '').trim();
		}

		var json = JSON.stringify(stocks);
		fs.writeFile('./lib/stockJSON.json', json);
		return stocks
	} else {
		return JSON.parse(fs.readFileSync('./lib/stockJSON.json'));
	}
}
