const mongoose = require('mongoose');
const { Schema } = mongoose;

const NoteSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  folder:{
    type:String,
    required:true
  },
  imageUrl:{
    type:String,
    required:true
  },
  name: {
    type: String,
    required:true
  },
  genere: {
    type: String,
  },
  creator: {
    type: String,
  },
  stars: {
    type: String,
  },
  private:{
    type:Boolean,
    default:false
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('Note', NoteSchema);
