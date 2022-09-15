const express = require('express')
const app = express()
const connectDB = require('./config/database')
const logger = require('morgan')
const mainRoutes = require('./routes/main')

//setup .env file in config folder
require("dotenv").config({ path: "./config/.env" });

// Passport config
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
// Set up sessions
// Passport middleware
// Setup flash messages

// Routes
app.use('/', mainRoutes)

// Run server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}.   It's on FIRE!`)
})