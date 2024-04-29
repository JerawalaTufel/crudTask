const { Task } = require("../models/Task");
const { validateCreatTask, validateUpdateTask } = require("../services/validation");


const createTask =  (req , res) => {
    try {
        const reqParam = req.body;
        validateCreatTask(reqParam , res , async(validate) => {
            if(validate) {
                const findTask = await Task.findOne({name : reqParam.name , email : reqParam.email , number : reqParam.number})
                if(findTask) {
                    return res.status(400).send({
                        "status" : 400,
                        "message" : "task already exists."
                    });
                }
                const newTask = await Task.create(reqParam)
               
                return res.status(201).send({
                    "status" : 200,
                    "data" : newTask,
                    "message" : "task created."
                });
            }
        })
    } catch (error) {
        return res.status(400).send({
            "status" : 400,
            "message" : error.message.replace(/"/g, '')
        });
    }
}

const getTask = async (req , res) => {
    try {
        const queryParams = req.params;
        const taskId = (queryParams.id)
        if(taskId) {

            const findTask = await Task.findOne({_id : taskId})

            if(findTask){
                return res.status(200).send({
                    "status" : 200,
                    "data" : findTask,
                });                
            } else {
                return res.status(400).send({
                    "status" : 400,
                    "message" : "data is exists with this id.",
                });
            }
        } else {
            const getTaskData = await Task.find({});
            return res.status(200).send({
                "status" : 200,
                "data" : getTaskData,
            });
        }

    } catch (error) {
        return res.status(400).send({
            "status" : 400,
            "message" : error.message.replace(/"/g, '')
        });
    }
}

const updateTask =  async(req , res) => {
    try {
        const reqParam = req.body;
        const queryParams = req.params;

        const taskId = (queryParams.id)
        const findTask = await Task.findOne({_id : taskId})
        if(!findTask) {
            return res.status(400).send({
                "status" : 400,
                "message" : "task is not exist."
            });
        }
        validateUpdateTask(reqParam , res , async(validate) => {
            
            if(validate){
                
                const addDetailsToTask = await Task.findByIdAndUpdate(taskId , reqParam , { new: true });
                
                return res.status(201).send({
                    "status" : 200,
                    "data" : addDetailsToTask ?? [],
                    "message" : "task is updated!."
                }); 
            } 
        })
    } catch (error) {
        return res.status(400).send({
            "status" : 400,
            "message" : error.message.replace(/"/g, '')
        });
    }
}

const deleteTask = async (req , res) =>{
    try {
        const queryParams = req.params;
        const taskId = (queryParams.id)

        const findTask = await Task.findOne({_id : taskId})
        
        if(findTask){

            const deletedTask = await Task.findByIdAndDelete(taskId);
        
            return res.status(200).send({
                "status" : 200,
                "data" : deletedTask,
                "message" : "task deleted successfully."
            });

        } else {
            return res.status(400).send({
                "status" : 400,
                "message" : "data is exists with this id.",
            });
        }

    } catch (error) {
        return res.status(400).send({
            "status" : 400,
            "message" : error.message.replace(/"/g, '')
        });
    }
}


module.exports = {createTask , getTask , updateTask , deleteTask}