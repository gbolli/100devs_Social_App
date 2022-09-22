const express = require('express')
const app = express()
const connectDB = require('./config/database')
const logger = require('morgan')
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const flash = require('express-flash')
const methodOverride = require('method-override')
const mainRoutes = require('./routes/main')
const postRoutes = require('./routes/posts')

//setup .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
require("./config/passport")(passport)

// Connect to Database
connectDB()

// EJS view engine
app.set('view engine', 'ejs')

// Static folders
app.use(express.static('public'))

// Body parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Logging
app.use(logger('dev'))

// MethodOverride for PUT, DELETE
app.use(methodOverride('_method'))

// Set up sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_STRING })
    })
)

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Setup flash messages
app.use(flash())

// Routes
app.use('/', mainRoutes)
app.use('/post', postRoutes)

// Run server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.   It's on FIRE!`)
})

// TODO: Add comments section for posts