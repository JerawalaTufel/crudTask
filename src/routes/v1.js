const { createTask , getTask , updateTask , deleteTask} = require('../controller/taskController');

const apiRoute = require('express').Router();

apiRoute.post('/create-task' , createTask)
apiRoute.get('/get-task/:id?' , getTask)
apiRoute.put('/update-task/:id' , updateTask)
apiRoute.delete('/delete-task/:id' , deleteTask)

module.exports = apiRoute