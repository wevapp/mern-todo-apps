const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    todo : {
        type: String,
        required: [true, 'Add your task']
    }
}, { timestamps: true })

module.exports = mongoose.model('todo', todoSchema)