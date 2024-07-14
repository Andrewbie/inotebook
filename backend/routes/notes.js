const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchuser');
const Notes = require('../models/Notes')
const { query, validationResult, body } = require('express-validator');

// Route 1: Fetch all notes of the user
router.get('/fetchallnotes',fetchUser, async(req,res)=>{
    try {
    const notes = await Notes.find({user:req.user.id});
    res.json(notes)
} catch (error) {
    console.error(error.message)
    res.status(500).send("Some Error Occurred")
}
})

// Route 2: Add note of user
router.post('/addnote',fetchUser,[
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Enter a valid Description').isLength({min:5})
], async(req,res)=>{
    try {
    const {title,description,tag} = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const note = new Notes({
        title,description,tag,user:req.user.id
    })
    const savedNote = await note.save()
    
    
    res.json(savedNote)
    
} catch (error) {
    console.error(error.message)
     res.status(500).send("Some Error Occurred")   
}
})

// Route 3: Update an existing note of user
router.put('/updatenote/:id',fetchUser,[
    body('title','Enter a valid Title').isLength({ min: 3 }),
    body('description','Enter a valid Description').isLength({min:5})
], async(req,res)=>{
    try {
        
    const {title,description,tags} = req.body;

    const newNote = {}
    if(title){
        newNote.title = title;
    }
    if(description){
        newNote.description = description;
    }
    if(tags){
        newNote.tags = tags;
    }

    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        res.status(401).send("Unauthorized")
    }

    note = await Notes.findByIdAndUpdate(req.params.id,{$set: newNote}, {new: true})
    res.json({note})

} catch (error) {
    console.error(error.message)
    res.status(500).send("Some Error Occurred")   
}
})

// Route 4: Delete an existing note of user
router.delete('/deletenote/:id',fetchUser, async(req,res)=>{
    try {
        
    const {title,description,tag} = req.body;

    
    let note = await Notes.findById(req.params.id);
    if(!note){
        res.status(404).send("Not Found")
    }
    if(note.user.toString() !== req.user.id){
        res.status(401).send("Unauthorized")
    }

    note = await Notes.findByIdAndDelete(req.params.id)
    res.json({success:"Note Has been deleted",Note:note})
    
} catch (error) {
    console.error(error.message)
    res.status(500).send("Some Error Occurred")   
}

})

module.exports = router;