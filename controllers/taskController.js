import Task from '../models/Task.js';

// Read all tasks
export const fetchTasks = async (req,res)=>{
    try{
   const tasks = await Task.find();
   
   res.status(200).json({"message":tasks});
    }catch(err){
        console.error(err);
        res.status(500).json({"message":"Internal Server Error"})
    }
}

// Getting create task page
export const getAddTask = (req,res)=>{ // For testing in browser
    res.render('createTask')
}

// Creating a new task
export const postAddTask = async(req,res)=>{
    try{
        let {title,description,due,status} = req.body;
        let taskExist = await Task.findOne({title});
        if(taskExist){
            return res.status(404).json({"message":"Task Already Exist"})
        }
        const newTask = await Task.create({
            title,
            description,
            due,
            status
        })
        let savedTask = await newTask.save();
        res.status(200).json({"message": savedTask});
    }catch(err){
        console.error(err);
        res.status(500).json({"message": "Internal Server Error"})
    }
}

export const getUpdateTask = (req,res)=>{ // For testing in browser
    res.render('updateTask');
}

export const patchUpdateTask = async(req,res)=>{
    try{
        const taskId = req.params.id; // Assuming taskId is provided in the request parameters

        // Extract fields to update from request body
        const { title, description, due, status } = req.body;

        // Check if taskId exists
        const existingTask = await Task.findById(taskId);

        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Update fields if they are provided
        if (title) {
            existingTask.title = title;
        }
        if (description) {
            existingTask.description = description;
        }
        if (due) {
            existingTask.due = due;
        }
        if (status) {
            existingTask.status = status;
        }

        // Save updated task
        const updatedTask = await existingTask.save();

        // Respond with updated task
        res.status(200).json({"message":"Task updated succesfully"});

    }catch(err){
        console.error(err);
        res.status(500).json({"message": "Internal Server Error"})
    }
}

export const deleteTask = async(req,res)=>{
    try {
        const taskId = req.params.id;

        // Check if taskId exists
        const existingTask = await Task.findById(taskId);

        if (!existingTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        // Delete the task
        await Task.findByIdAndDelete(taskId);

        // Respond with success message
        res.json({ message: "Task deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
}