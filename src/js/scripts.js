var React = require('react')
var ReactDOM = require('react-dom')
var Highcharts = require('highcharts/highstock')
require('./theme.js')()
var io = require('socket.io-client')
var socket = io.connect('127.0.0.1:8080'); //hide this

var StockList = React.createClass({
	removeStock(stock) {
		this.props.onRemoveStock(stock);
	},
	render() {
		var listStocks = this.props.stocks.map(function(StockDetails) {
			return <StockInfoPanel key ={ StockDetails.id } deleteStock={this.removeStock}>{ StockDetails }</StockInfoPanel>; 
		}, this);
		return <div id="stock-list" className="col-md-4" >
			   		<div className="row">{ listStocks }</div>
			   </div>;
	}
});

var StockInfoPanel = React.createClass({
	remove() {
    	socket.emit('clientRemoveStock', { code: this.props.children.code } )
		//this.props.deleteStock(this.props.children.code);
	},
	render() {
		return (
			<div id="stock-panel" className="col-xs-5">
				<h3>{ this.props.children.code } </h3>
				<h4> {this.props.children.company} </h4>
				<span id="remove" onClick={ this.remove } className="glyphicon glyphicon-remove" aria-hidden="true"></span>
			</div>
		)
	}
});

var StockChart = React.createClass({
	render() {
		var ChartList = this.props.stocks.map(function(StockDetails, i) {
			return <h1 key={ StockDetails.id }>{ StockDetails.code } | {StockDetails.company } </h1>
		}, this);
		return (
			<div className="col-md-8">
				{ ChartList }
			</div>
		)
	}
})

var StockSearch = React.createClass({
	getInitialState: function() {
		return { code: '' };
	},
	handleSubmit(e){
		e.preventDefault();
    	socket.emit('clientAddStock', { code: this.state.code.toUpperCase()})
		//this.props.onFormSubmit(this.state.code);
		this.setState({code: ''});
		//React.findDOMNode(this.refs.code).focus();
		return;
	},
	onChange(e){
		this.setState({
			code: e.target.value
		});
	},
	render(){
		return (
			<form id="add-stock" onSubmit={ this.handleSubmit } className="col-md-3 col-md-offset-9 col-xs-4 col-xs-offset-4">
				<input type='text' ref='code' onChange={ this.onChange } value={ this.state.code } />
				<input type='submit' value="Add" />
			</form>
		);
	}
});		

var StockApp = React.createClass({
	getInitialState(props){
		props = props || this.props;

		var base = props.initialData
		//console.log(base)

		return { stocks: base.stocks, stockData: base.stockData }
	},
	// componentWillReceiveProps(newProps, oldProps) {
	// 	this.setState(this.getInitialState(newProps))
	// },
	addStock(newStock) {
		var i = this.state.stocks.findIndex(function(elm) { return elm.code === newStock.code });

		if (i > -1) {
			alert('duplicate')
		} else {
			console.log(new Date().toISOString() + ': Adding ' + newStock.code)
			var StockInfo = {id: newStock.id, code: newStock.code, company: newStock.company}
			var allStocks = this.state.stocks.concat([StockInfo]);
			var allStockData = this.state.stockData.concat([newStock.stockData])
			this.setState({
				stocks: allStocks,
				stockData: allStockData
			});
		}
		//console.log(new Date().toISOString() + ':')
		//console.log(this.state)	
	},
	removeStock(stock) {
		console.log(new Date().toISOString() + ': Deleting ' + stock.code)
		var i = this.state.stocks.findIndex(function(elm) { 
			return elm.code === stock.code 
		});
		var allStocks = this.state.stocks.filter(function(elm, index) {
			return index !== i
		});
		var allStockData = this.state.stockData.filter(function(elm, index) {
			return index !== i
		});

		this.setState({
			stocks: allStocks,
			stockData: allStockData
		});
		//console.log(new Date().toISOString() + ':');
		//console.log(this.state)
	},
	errorMsg(res) {
		alert(res.msg)
	},
	componentDidMount() {
		socket.on('initalize', this._initialize)
		socket.on('addStock', this.addStock)
		socket.on('removeStock', this.removeStock)   
		socket.on('errorMsg', this.errorMsg) 
	},
	render() {
		return (
			<div className="container">
			    <h1>Stock Chart App</h1>
			    <div className="row">
			    	<ChartStock container='stockChart' stocks={ this.state.stocks } stockData={ this.state.stockData } />
			        <StockList stocks={ this.state.stocks } onRemoveStock={ this.removeStock } />		        
			        <StockSearch onFormSubmit={ this.addStock } />
			    </div>
			</div>
		);
	}
});

socket.on('initialize', function(data){
	ReactDOM.render(<StockApp initialData={data}/>, document.getElementById('root'));
})


var ChartStock = React.createClass({
    getInitialState: function(props) {
		props = props || this.props;
		//console.log(props.stockData)
		//console.log(props.stockData[0][0])
		var series = props.stocks.map(function(stockDetails, i) {
			return { name: stockDetails.code, company: stockDetails.company, data: props.stockData[i] }
		})
		//console.log(series)
		return {
			container: 'stock-chart',
			options: {
			// title: {
			//   text: 'Change Me Later'
			// },
				series: series
			}
		}
    },
    // getDefaultProps: function() {
    //   return {
    //     container: this.state.container,
    //     type: this.state.type,
    //     options: this.state.options
    //   }
    // },

    addStock: function(data) {
		console.log('Adding Stock')
		//console.log(data)
		var newStock = { name: data.code, company: data.company, data: data.stockData }
		this.chart.addSeries(newStock)
		// TODO: Figure out how to make a deep copy
		// this.state.options.series.push(newStock)
		// this.setState({
		// 	options: {
		// 		series: this.state.options.series
		// 	}
		// })
    },

    removeStock: function(data) {
		console.log('Removing Stock')
		console.log(this.props)
		var chart = this.chart
		var filtered = this.props.stocks.filter(function(elm, index) {
			if (elm.code === data.code) {
				console.log(chart)
				chart.series[index].remove(true)
				return true
			} else {
				return false
			}
		})
		// this.setState({
		// 	options: {
		// 		series: filtered
		// 	}
		// })
    },
    // When the DOM is ready, create the chart.
    componentDidMount: function() {
    	// Extend Highcharts with modules
    	//console.log(this.state)
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

		socket.on('addStock', this.addStock)
		socket.on('removeStock', this.removeStock)

		//setTimeout(this.addStock, 5000)
		//setTimeout(this.removeStock, 8000)
    },
    //Destroy chart before unmount.
    componentWillUnmount: function() {
      this.chart.destroy();
    },
    //Create the div which the chart will be rendered to.
    render: function() {
      return <div id="stock-chart" className="col-md-8"> </div>
    }
  })

// var element = React.createElement(Chart, {
//   container: 'stockChart',
//   type: 'stockChart',
//   options: {
//     // title: {
//     //   text: 'Change Me Later'
//     // },
//     series: [{  name: 'AAPL', data: data }, { name: 'GOOG', data: data2 }]
//   }
// });

// var options =  {
//   series: [{  name: 'AAPL', data: data }]
// }

// ReactDOM.render(<Chart container='stockChart' options={options} />, document.getElementById('test'));
//ReactDOM.render(<Chart />, document.getElementById('test'));