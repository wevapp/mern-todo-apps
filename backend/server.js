require('dotenv').config()
const cors = require('cors')
const mongoose = require('mongoose')
const colors = require('colors')
const express = require('express')
const app = express()
const PORT = 3000

// import error handler
const { errorHandler } = require('./middleware/errorMiddleware')

// Middleware
app.use(cors({
    origin: [""],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleDateString()} ${req.method}:${req.url}`); // Just Reminder
    next(); // use Next method
});

// Put routes here
app.get('/', (req, res) => {
    res.json('hello')
})
app.use('/api/todos', require('./routes/todoRoute'))

// error handler
app.use(errorHandler)

// connect to database
mongoose.connect('mongodb+srv://test:alltesting@alltest.cnt2gif.mongodb.net/?retryWrites=true&w=majority', { dbName: 'tododatabase' })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Connected to database and running Server on port ${PORT}`.cyan.underline);
        })
    })