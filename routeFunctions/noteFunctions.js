const NoteCollection = require('../routeCollection/noteCollection');

const createNote = async (req, res) => {
    const response = await NoteCollection.createNote(req.body);
    res.status(201).json(response);
};

const deleteNote = async (req, res) => {
    const response = await NoteCollection.deleteNote(req.params.id);
    res.status(200).json(response);
};

const updateNote = async (req, res) => {
    const response = await NoteCollection.updateNote(req.params.id, req.body);
    res.status(200).json(response);
};

const getNote = async (req, res) => {
    const response = await NoteCollection.getNote(req.params.id);
    res.status(200).json(response);
};

const getAllNotes = async (req, res) => {
    const response = await NoteCollection.getAllNotes();
    res.status(200).json(response);
};

const getNotesByFolder = async (req, res) => {
    const response = await NoteCollection.getNotesByFolder(req.params.email, req.params.folder);
    res.status(200).json(response);
};

module.exports = {
    createNote,
    deleteNote,
    updateNote,
    getNote,
    getAllNotes,
    getNotesByFolder,
};

