const Note = require('../models/Note');
const mongoose=require('mongoose')

const createNote = async (noteData) => {
    try {
        console.log("noteData",noteData)
        const note = new Note(noteData);
        await note.save();
        return { success: true, data: note };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};

const deleteNote = async (id) => {
    try {
        await Note.findByIdAndDelete(id);
        return { success: true, message: "Note deleted successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};

const updateNote = async (id, updateData) => {
    try {
        const note = await Note.findByIdAndUpdate(id, updateData, { new: true });
        return { success: true, data: note };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};

const getNote = async (id) => {
    try {
        const note = await Note.findById(id);
        return { success: true, data: note };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};

const getAllNotes = async () => {
    try {
        const fetched_data = await mongoose.connection.db.collection("notes").find({}).toArray();
        console.log("notes", fetched_data);
        return { success: true, data: fetched_data };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};


const getNotesByFolder = async (email, folder) => {
    try {
        const notes = await Note.find({ email: email, folder: folder });
        return { success: true, data: notes };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};

module.exports = {
    createNote,
    deleteNote,
    updateNote,
    getNote,
    getAllNotes,
    getNotesByFolder,
};
