const Task = require('../models/Task');


exports.getTasks = async (req, res) => {
    try{
        const tasks = await Task.find();

        res.status(200).json({
            sucess: true,
            count: tasks.length,
            data: tasks
        });
    }
    catch(error){
        res.status(500).json({
            sucess: false, 
            error: 'Server Error'
        });
    }
};

exports.getTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({
                success: false,
                error: 'Task not found'
            })
        }


        res.status(200).json({
        success: true, 
        data: task
});
        
    }
    catch(error){
        res.status(500).json({
            success: false, 
            error: 'Server Error'
        });
    }  
}

exports.createTask = async (req, res) => {
    try{
        const task = await Task.create(req.body);

        res.status(201).json({
            success: true,
            data: task
        })
    }
    catch(error){
        if(error.name == 'ValidationError'){
            const messages = Object.values(error.errors).map(val => val.message)

            return res.status(400).json({
                success: false, 
                error: messages
            })
        }
        else{
            res.status(500).json({
                success: false, 
                error: 'Server Error'
            })
        }
    }   
}

exports.updateTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true

            }
        )

        if(!task){
            return res.status(404).json({
                success: false, 
                error: "Task not found"
            })
        }
    }catch(error){
        res.status(500).json({
            success: false, 
            error: "Server Error"
        })
    }
}

exports.deleteTask = async (req, res) => {
    try{
        const task = await Task.findById(req.params.id);

        if(!task){
            return res.status(404).json({
                success: false,
                error: "Task not found"
            })
        }

        await task.deleteOne();

        res.status(200).json({
        success: true, 
        data: {}
    }); 
    }catch(error){
        res.status(500).json({
            success: false, 
            error: "Server Error"
        })
    }
    
}