const mongoose = require('mongoose');
const { Schema } = mongoose;


const NotesSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true,
    },
    tags:{
        type: String,
        default: "general"
    },
    date:{
        type: String,
        default: Date.now
    }
  });
//   const Notes = 
  module.exports = mongoose.model("note",NotesSchema);