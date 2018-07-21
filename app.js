const createError = require('http-errors')
const express = require('express')
const compression = require('compression')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const exphbs = require('express-handlebars')
const favicon = require('express-favicon')
const session = require('express-session')
const passport = require('passport')
const flash = require('connect-flash')
const validator = require('express-validator')
const MongoStore = require('connect-mongo')(session)
const helmet = require('helmet')
const PropertiesReader  = require('properties-reader')
const properties = PropertiesReader('./config/properties.file')

const indexRouter = require('./routes/index')

const app = express()

// Set up mongoose connection
const mongoose = require('mongoose')
const devDBurl = properties.get('database.MongoDB-URI')
const mongoDB = process.env.MONGODB_URI || devDBurl
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))
require('./config/passport')

// view engine setup
app.engine('.hbs', exphbs({ defaultLayout: false, extname: '.hbs' }))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

app.use(helmet())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(validator())
app.use(session({
  secret: 'mysupersecret',
  resave: 'false', // don't save session if unmodified
  saveUninitialized: true, // don't create session until something stored
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 3 * 60 * 60 * 1000 } // time period in milliseconds: 3 hours
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use(compression())
app.use(express.static(path.join(__dirname, 'public')))
app.use(favicon(path.join(__dirname, '/public/icons/favicon.png')))

app.use(function (req, res, next) {
  res.locals.isLogin = req.isAuthenticated()
  res.locals.session = req.session
  res.locals.isUser = req.isAuthenticated() ? (req.user.typeAccount === 'User') : false
  res.locals.user = req.user
  next()
})

app.use('/', indexRouter)

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
  res.render('error', {
    layout: 'layoutError',
    status: err.status,
    message: err.message
  })
})

module.exports = app
