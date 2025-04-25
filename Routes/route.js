const express = require('express');
const Books = require('../Models/Books')

const routes = express();
routes.use(express.json());

routes.post('/add', async(req, res) => {
    try{
        const {title,director,genre,releaseYear,availableCopies} = req.body;

        if (!title || !director || !genre || !releaseYear || !availableCopies){
            res.status(400).json({message: `Validation failed: fields cannot be empty`})
        }

        const newBooks = await new Books({title,director,genre,releaseYear,availableCopies});
        await newBooks.save();

        res.status(200).json({message: `Created`, res: newBooks});

    }catch(err){
        res.status(500).json({error: `Something went wrong ${err}`})
    }
})

routes.get('/info', async(req, res) => {
    try{
        const findRes = await Books.find();

        if (!findRes){
            res.status(404).json({message: `Books not found`})
        }
        
        res.status(201).json({res: findRes});
        
    }catch(err){
        res.status(500).json({error: `Internal server error ${err}`})
    }
})

routes.get('/infoid/:id', async(req, res) => {
    try{      
          
        if (!req.params.id){
            res.status(404).json({message: `Books not found`});
        }

        const findResid = await Books.findById(req.params.id);
        
        res.status(200).json({res: findResid});

    }catch(err){
        res.status(404).json({error: `Books not found`})
    }
})
 
routes.put('/edit/:id', async(req, res) => {
    try{

        const {title,director,genre,releaseYear,availableCopies} = req.body;
        
        if (!title || !director || !genre || !releaseYear || !availableCopies){
            res.status(400).json({message: `Validation failed: fields cannot be empty`})
        }
        
        const editBooks = await Books.findByIdAndUpdate(req.params.id,{title,director,genre,releaseYear,availableCopies})
        
        res.status(201).json({edit: editBooks})
    }
    catch(err){
        res.status(500).json({error: `Something went wrong ${err}`})
    }

})

routes.delete('/delete/:id', async(req, res) => {
    try{
        const deletedBooks=await Books.findByIdAndDelete(req.params.id)
        
        res.status(201).json({message: "deleted",  edit: deletedBooks})
    }
    catch(err){
        res.status(500).json({error: `Something went wrong ${err}`})
    }
})


module.exports = routes;
