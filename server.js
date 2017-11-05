const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const path = require('path')
const request = require('request-promise-native')
const mongoose = require('mongoose')
require('dotenv').config()

const cutoff = Date.parse('2016-01-01')

// ************************************************************************************ MONGOOSE SETUP
const stockSchema = new mongoose.Schema({
  code: String
})

const Stock = mongoose.model('Stock', stockSchema)

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017'

mongoose.Promise = global.Promise
const dbName = 'mtharmen-stock-chart-app'
mongoose.connect(MONGODB_URL + `/${dbName}`, { useMongoClient: true })
const db = mongoose.connection
db.on('error', err => { console.error(err) })
db.once('open', () => {
  console.log('Connected to ' + dbName)
})

// Close MongoDB connection
process.on('SIGINT', () => {
  db.close(() => {
    console.log(`Closing connection to ${dbName}`)
    process.exit(0)
  })
})

if (process.env.NODE_ENV !== 'dev') {
  app.use('/', express.static(path.join(__dirname, './dist')))
}

if (process.env.NODE_ENV !== 'dev') {
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  })
}

server.listen(8080, () => console.log('Listening on ' + 8080))

// ************************************************************ SOCKET IO
const io = require('socket.io')(server)
io.sockets.on('connection', socket => {
  console.log('client connected')

  initialize(socket)

  socket.on('clientAddStock', code => {
    addStock(socket, code)
  })

  socket.on('clientRemoveStock', code => {
    removeStock(socket, code)
  })
})

function initialize (socket) {
  Stock.find({}).exec()
    .then(stocks => {
      if (!stocks.length) {
        const newStock = new Stock({ code: 'GOOG' })
        newStock.save()
        return Promise.all([getData('GOOG')])
      }
      return Promise.all(stocks.map(stock => getData(stock.code)))
    })
    .then(data => {
      data.forEach(data => {
        const pruned = pruneData(data.dataset)
        io.emit('addStock', pruned)
      })
    })
    .catch(err => {
      console.error(err.message)
      socket.emit('stockError', err.message)
    })
}

function pruneData (data) {
  return {
    name: data.name.split(' Prices,')[0],
    data: data.data.map(point => { return [ Date.parse(point[0]), point[1] ] }).reverse()
  }
}

function getData (code) {
  const options = {
    url: 'https://www.quandl.com/api/v3/datasets/WIKI/' + code + '.json',
    method: 'GET',
    qs: {
      column_index: '4',
      api_key: process.env.QUANDL_API_KEY,
      start_date: '2016-01-01'
    },
    json: true
  }
  return request(options)
}

function addStock (socket, code) {
  let pruned = {}
  Stock.findOne({ code }).exec()
    .then(stock => {
      if (stock) {
        throw new CustomError(code + 'Already added', 403)
      }
      return getData(code)
    })
    .then(data => {
      const newest = Date.parse(data.dataset.newest_available_date)
      if (newest < cutoff) {
        throw new CustomError('No Data Found For ' + code, 500)
      }
      pruned = pruneData(data.dataset)
      const newStock = new Stock()
      newStock.code = code
      return newStock.save()
    })
    .then(saved => {
      io.emit('addStock', pruned)
    })
    .catch(err => {
      console.error(err.message)
      socket.emit('stockError', err.message)
    })
}

function removeStock (socket, code) {
  Stock.findOneAndRemove({ code }).exec()
    .then(stock => {
      // if (!stock) {
      //   throw new CustomError(code + ' is Invalid', 403)
      // }
      io.emit('removeStock', code)
    })
    .catch(err => {
      console.error(err.message)
      socket.emit('stockError', err.message)
    })
}

function CustomError (message, code, name = this.constructor.name) {
  Error.captureStackTrace(this, this.constructor)
  this.name = name
  this.message = message
  this.statusCode = code
};
