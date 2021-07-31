const express = require('express');
const { getAllToDos,
    updateToDo
} = require('../controllers/todo.controller');

const router = express.Router();

router.get('/todos', getAllToDos);
router.put('/todo/:id', updateToDo);


module.exports = {
    routes: router
}