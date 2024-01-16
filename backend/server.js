require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const colors = require('colors')
const express = require('express')
const app = express()

// import error handler
const {errorHandler} = require('./middleware/errorMiddleware')

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleDateString()} ${req.method}:${req.url}`); // Just Reminder
    next(); // use Next method
});

// Put routes here
app.use('/api/todos', require('./routes/todoRoute'))

// error handler
app.use(errorHandler)

// connect to database
mongoose.connect(process.env.MONGO_URI, { dbName: 'tododatabase'})
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Connected to database and running Server on port ${process.env.PORT}`.cyan.underline);
    })
})