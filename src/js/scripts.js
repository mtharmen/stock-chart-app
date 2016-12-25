import React from 'react';
import ReactDOM from 'react-dom';
import Highcharts from 'highcharts/highstock';
import FlipMove from 'react-flip-move';
import io from 'socket.io-client';
import Select from 'react-select';

require('./theme.js')();
var socket = io.connect('127.0.0.1:8080'); //hide this


var StockList = React.createClass({
	addStock(stock) {
		this.props.onAddStock(stock);
	},
	removeStock(code) {
		if (this.props.stocks.length > 1) {
			socket.emit('clientRemoveStock', { code: code } );
		} else {
			alert('Must have a minimum of one stock at all times');
		}
		
	},
	render() {
		var listStocks = this.props.stocks.map(function(StockDetails, i) {
			return <StockInfoPanel key={i} deleteStock={ this.removeStock }>{ StockDetails }</StockInfoPanel>; 
		}, this);
		return (
			<div id="stock-list" className="col-xs-12 col-md-4 col-md-offset-0" >
				<FlipMove enterAnimation="fade" leaveAnimation="fade">
	   				{ listStocks }
	   			</FlipMove>
		   </div>
		);
	}
});

var StockInfoPanel = React.createClass({
	remove() {
		this.props.deleteStock(this.props.children.code);
	},
	render() {
		return (
			<div id="stock-panel" className="col-xs-6">
				<div className="panel panel-info">
					<h3> { this.props.children.code } </h3>
					<h5> { this.props.children.company } </h5>
					<span id="remove" onClick={ this.remove } className="glyphicon glyphicon-remove" aria-hidden="true"></span>
				</div>
			</div>
		);
	}
});

var StockSearch = React.createClass({
	handleSubmit(val){
		var code = val.value.toUpperCase();
		var company = val.label.split(' | ')[0];
    	this.props.onSubmit({code: code, company: company});
	},
	render(){
		return (
			<div id="search" className="col-xs-12 col-md-8 col-md-offset-2">
				<Select name="form-field-name" options={this.props.validStocks} onChange={this.handleSubmit} />
			</div>
		);
	}
});

var ChartStock = React.createClass({
	getInitialState(props) {
		props = props || this.props;
		var series = props.stocks.map(function(stockDetails, i) {
			return { name: stockDetails.code, company: stockDetails.company, data: props.stockData[i] };
		});
		return {
			container: 'stock-chart',
			options: {
				series: series
			}
		};
	},

	addStock(data) {
		var newStock = { name: data.code, company: data.company, data: data.stockData };
		this.chart.addSeries(newStock);
	},

	findSeries(series, code) {
		for (var i=0; i < series.length; i++) {
			if (series[i].name == code) {
				return i;
			}
		}
	},

	removeStock(data) {
		var i = this.findSeries(this.chart.series, data.code);
		this.chart.series[i].remove(true);
	},

	componentDidMount() {
		// Extend Highcharts with modules
		if (this.props.modules) {
			this.props.modules.forEach(function(module) {
				module(Highcharts);
			});
		}
		// Set container which the chart should render to.
		this.chart = new Highcharts["StockChart"](
			this.state.container,
			this.state.options
		);

		socket.on('addStock', this.addStock);
		socket.on('removeStock', this.removeStock);
	},
	//Destroy chart before unmount.
	componentWillUnmount() {
		this.chart.destroy();
	},
	render: function() {
		return <div id="stock-chart" className="col-xs-12 col-md-8 col-md-offset-0"> </div>;
	}
});

var Footer = React.createClass ({
	render() {
		return (
			<footer className="footer">
				<div className="container">
					<p><small>
						<a href="https://www.freecodecamp.com/challenges/chart-the-stock-market" target="_blank">FCC Stock Chart App</a> | 
						<a href="https://github.com/mtharmen/stock-chart-app" target="_blank"> GitHub Repo <i className="fa fa-github" aria-hidden="true"></i></a> | 
						<a href="http://fontawesome.io/" target="_blank"> Icons from Font Awesome <i className="fa fa-font-awesome" aria-hidden="true"></i></a> | 
						<a href="http://www.highcharts.com/" target="_blank"> Chart from HighCharts</a>
					</small></p>
				</div>
			</footer>
		);
	}
});

var StockApp = React.createClass({
	getInitialState(props){
		props = props || this.props;
		var base = props.initialData;

		// Filtering Out current stocks from search
		var companies = allBusinesses.filter(function(stock) {
			return base.stocks.filter(function(check) {
				return check.code == stock.value;
			}).length < 1;
		});

		return { stocks: base.stocks, stockData: base.stockData, companies: companies };
	},

	getData(stockInfo) {
		if (this.state.stocks.length < 6) {
			socket.emit('clientAddStock', { code: stockInfo.code, company: stockInfo.company });
		} else {
			alert('Maximum of six stocks at a time');
		}
	},

	addStock(newStock) {
		// console.log(timestamp() + 'Adding ' + newStock.code);
		var StockInfo = { id: newStock.id, code: newStock.code, company: newStock.company };
		var allStocks = this.state.stocks.concat([StockInfo]);
		var allStockData = this.state.stockData.concat([newStock.stockData]);

		// Filtering Out current stocks from search
		var companies = this.state.companies.filter(function(stock) {
			return stock.value !== newStock.code;
		});

		this.setState({
			stocks: allStocks,
			stockData: allStockData,
			companies: companies
		});
	},

	removeStock(stock) {
		// console.log(timestamp() + 'Deleting ' + stock.code);
		var i = this.state.stocks.findIndex(function(elm) { 
			return elm.code === stock.code ;
		});
		var allStocks = this.state.stocks.filter(function(elm, index) {
			return index !== i;
		});
		var allStockData = this.state.stockData.filter(function(elm, index) {
			return index !== i;
		});

		var companies = allBusinesses.filter(function(stock) {
			return allStocks.filter(function(check) {
				return check.code == stock.value;
			}).length < 1;
		});

		this.setState({
			stocks: allStocks,
			stockData: allStockData,
			companies: companies
		});
	},

	errorMsg(res) {
		alert(res.msg);
	},
	componentDidMount() {
		socket.on('initalize', this._initialize);
		socket.on('addStock', this.addStock);
		socket.on('removeStock', this.removeStock);
		socket.on('errorMsg', this.errorMsg);
	},
	render() {
		return (
			<div>
				<div className="container">
				    <h1 className="text-center">Stock Chart App</h1>
			    	<ChartStock container='stockChart' stocks={ this.state.stocks } stockData={ this.state.stockData } />
			        <StockList stocks={ this.state.stocks } onRemoveStock={ this.removeStock } onAddStock={ this.addStock }/>
			        <StockSearch onSubmit={ this.getData } validStocks={ this.state.companies }/>
				</div>
				<Footer />
			</div>
		);
	}
});

socket.on('initialize', function(data){
	ReactDOM.render(<StockApp initialData={data}/>, document.getElementById('root'));
});

var timestamp = function() {
	return new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '') + ' | ';
};