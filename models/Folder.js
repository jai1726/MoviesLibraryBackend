const mongoose = require('mongoose');
const { Schema } = mongoose;

const FolderSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  folder:{
    type:String,
    required:true
  },
  date:{
    type:Date,
    default:Date.now
  }
});

module.exports = mongoose.model('Folder', FolderSchema);
