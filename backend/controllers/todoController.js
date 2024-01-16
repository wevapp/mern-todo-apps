const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const todoCollection = require('../models/todoModel')

// @desc Get todos
// @route GET /api/todos
// @access Public
const getTodos = asyncHandler(async (req, res) => {
    const allTodos = await todoCollection.find()
    res.status(200).json(allTodos)
})

// @desc Get Single todo
// @route GET /api/todos/:id
// @access Public
const getSingleTodo = asyncHandler(async (req, res) => {
    const singleTodo = await todoCollection.find({_id: req.params.id})
    res.status(200).json(singleTodo)
})

// @desc Set todo
// @route POST /api/todos
// @access Public
const setTodo = asyncHandler(async (req, res) => {
    const { todo } = req.body
    if(!todo || todo.trim() === '') {
        res.status(400)
        throw new Error('Add your task')
    }
    // Trim leading and trailing whitespaces from the Todo
    const trimmedTodo = todo.trim()

    // check if todo exist
    const existTodo = await todoCollection.findOne({todo: new RegExp(`^${trimmedTodo}$`, 'i')})
    if(existTodo) {
        res.status(400)
        throw new Error(`${existTodo.todo} already added`)
    }

    // Create new todo
    const newTodo = await todoCollection.create({todo: trimmedTodo})
    res.status(201).json({message: `Created new ${newTodo.todo}`})
})

// @desc Update todo
// @route PUT /api/todos/:id
// @access Public
const updateTodo = asyncHandler(async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        res.status(404)
        throw new Error('No record')
    }

    if(!req.body.todo){
        res.status(404).json('Please add task')
    }
    
    const updatedTodo = await todoCollection.findOneAndUpdate({_id: id}, {...req.body})
    if(!updatedTodo){
        res.status(404)
        throw new Error('No record')
    }
    res.status(200).json({message: `Updated task ${updatedTodo.todo}`})
})

// @desc Delete todo
// @route DELETE /api/todos/:id
// @access Public
const deleteTodo = asyncHandler(async (req, res) => {
    const { id } = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such workout' });
    }
    const deletedTodo = await todoCollection.findOneAndDelete({_id: id})
    res.status(200).json({message: `Deleted todo ${deletedTodo.todo}`})
})

module.exports = {
    getTodos,
    getSingleTodo,
    setTodo,
    updateTodo,
    deleteTodo
}