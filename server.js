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
const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log('Listening on ' + PORT))

// ************************************************************ SOCKET IO
let rateLimit = 1
const io = require('socket.io')(server)
io.sockets.on('connection', socket => {
  // console.log('client connected')

  initialize(socket)

  socket.on('clientAddStock', code => {
    addStock(socket, code)
  })

  socket.on('clientRemoveStock', code => {
    removeStock(socket, code)
  })
})

function throttleCheck (setRateLimit = 0) {
  rateLimit = setRateLimit || rateLimit
  const buffer = rateLimit + 1000 * 60 * 30 // 30 minutes
  if (buffer > Date.now()) {
    const cooldown = buffer - Date.now()
    const reset = new Date(cooldown)
    const message = 'Quandl API throttled, wait ' + reset.getUTCMinutes() + ' minutes before trying to add stocks'
    console.error(Date() + ': Quandle API rate limited exceeded, waiting ' + reset.getUTCMinutes() + ' minutes before allowing requests again')
    return new CustomError(message, 403)
  } else {
    rateLimit = 1
  }
}

function getData (code) {
  const error = throttleCheck()
  if (error) {
    return Promise.reject(error)
  }
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

function pruneData (data) {
  return {
    name: data.name.split(' Prices,')[0],
    data: data.data.map(point => { return [ Date.parse(point[0]), point[1] ] }).reverse()
  }
}

function initialize (socket) {
  const error = throttleCheck()
  if (error) {
    socket.emit('stockError', error.message)
    return
  }
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
      if (err.message.indexOf('You have exceeded the API speed limit') > -1) {
        rateLimit = Date.now()
        err = throttleCheck(Date.now()) || err
      }
      socket.emit('stockError', err.message)
    })
}

function addStock (socket, code) {
  let pruned = {}
  const error = throttleCheck()
  if (error) {
    socket.emit('stockError', error.message)
    return
  }
  Stock.find({}).exec()
    .then(stocks => {
      if (stocks.length < 9) {
        const exist = stocks.some(stock => stock.code === code)
        console.log('code: ' + code + ' | ' + exist)
        if (exist) {
          throw new CustomError(code + 'Already added', 403)
        }
        return getData(code)
      } else {
        // NOTE: maybe handle this client side only?
        throw new CustomError('Max of 10 Stocks at a time', 403)
      }
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
      if (err.message.indexOf('You have exceeded the API speed limit') > -1) {
        err = throttleCheck(Date.now()) || err
      }
      socket.emit('stockError', err.message)
    })
}

function removeStock (socket, code) {
  Stock.find({}).exec()
    .then(stocks => {
      if (stocks.length > 1) {
        io.emit('removeStock', code)
      } else {
        // NOTE: maybe let this be handled client side only?
        throw new CustomError('Must have at least one stock at all times', 403)
      }
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
