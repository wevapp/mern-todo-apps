const express = require('express')
const router = express.Router()

const {
    getTodos,
    getSingleTodo,
    setTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController')

router.route('/').get(getTodos).post(setTodo)
router.route('/:id').get(getSingleTodo).put(updateTodo).delete(deleteTodo)

module.exports = router