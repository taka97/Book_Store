var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var exphbs = require('express-handlebars')

var indexRouter = require('./routes/index')
var loginRouter = require('./routes/login')
var adminRouter = require('./routes/admin')
var usersRouter = require('./routes/users')
var bookRouter = require('./routes/book')
var genreRouter = require('./routes/genre')
var authorRouter = require('./routes/author')
var publisherRouter = require('./routes/publisher')

var app = express()

// Set up mongoose connection
var mongoose = require('mongoose')
var devDBurl = 'mongodb://admin:123456@ds231740.mlab.com:31740/book-store'
var mongoDB = process.env.MONGODB_URI || devDBurl
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
var db = mongoose.connection
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

app.use('/', indexRouter)
app.use('/login', loginRouter)
app.use('/admin', adminRouter)
app.use('/users', usersRouter)
app.use('/book', bookRouter)
app.use('/genre', genreRouter)
app.use('/author', authorRouter)
app.use('/publisher', publisherRouter)

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
  res.status(err.status || 500)
  res.render('error', {layout: 'layoutError'})
})

module.exports = app
