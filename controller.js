import { add_task, list_task, del_task } from "./db"


export const addTask = (req, res) => {
    try{
        const task = req.body.task
        console.log(task)
        if (!task) {
            return res.status(400).json({ error: "Task is required" });
        }
        
        const status = req.body.status
        add_task(task, status);
        res.status(201).json({ message: "Task added successfully" });
    }catch(error){
        console.error("Error adding task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const listTask = (req, res) => {
    try{
        list_task((err, rows) => {
            if (err){
                console.error('Error listing tasks:', err);
                return res.status(500).json({ error: "Internal server error" });
            }else{
                res.status(200).json({ tasks: rows });
            }
        })
    }catch(error){
        console.error("Error Listing tasks:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const delTask = (req, res) => {
    try{
        const taskId = req.body.taskId
        console.log(taskId)
        if (!taskId) {
            return res.status(400).json({ error: "Task ID is required" });
        }
        del_task(taskId);
        res.status(200).json({ message: `Task with ID ${taskId} deleted successfully` });
    }catch(error){
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};