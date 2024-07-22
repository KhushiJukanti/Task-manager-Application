const express = require('express')
const Task = require('../models/task');
const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        const tasks = await Task.find();
        res.status(200).send(tasks);
    }catch(error){
        res.status(500).send(error.message);    
    }
});

router.post('/', async(req, res)=>{
    const {title, description, status, user} = req.body;
    const createdAt = new Date();
    try{
        const task = new Task({title, description, status, createdAt, user});
        await task.save();
        res.status(201).send(task);
    }catch (error){
        res.status(500).send(error.message);
    }
});


router.put('/:id', async (req, res)=>{
    try{
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true})
        res.status(200).send({message: "Data updated successfully", task});
    }catch (error){
        res.status(500).send(error.message);
    }
});


router.delete('/:id', async(req, res)=>{
    try{
        console.log(req.params)
        const { id } = req.params;
        console.log(typeof (id))
        const deleteData = await Task.findByIdAndDelete(id);
        res.send("data deleted successfully")
    }catch(error){
        res.status(500).send(error.message)
    }
})

module.exports = router;