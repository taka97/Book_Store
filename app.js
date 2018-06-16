const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const exphbs = require('express-handlebars')
const favicon = require('express-favicon')

const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login')
const bookRouter = require('./routes/book')
const genreRouter = require('./routes/genre')
const authorRouter = require('./routes/author')
const publisherRouter = require('./routes/publisher')
// for develop
const adminRouter = require('./routes/admin')
const userRouter = require('./routes/user')

const app = express()

// Set up mongoose connection
const mongoose = require('mongoose')
const devDBurl = 'mongodb://admin:123456@ds231740.mlab.com:31740/book-store'
const mongoDB = process.env.MONGODB_URI || devDBurl
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

// view engine setup
app.engine('.hbs', exphbs({defaultLayout: 'layoutUser', extname: '.hbs'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, '/public/icons/favicon.png')))

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/book', bookRouter)
app.use('/genre', genreRouter)
app.use('/author', authorRouter)
app.use('/publisher', publisherRouter)
// for developer
app.use('/admin', adminRouter)
app.use('/user', userRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status = err.status || 500)
  res.render('error', {layout: 'layoutError', status: err.status, message: err.message})
})

module.exports = app
