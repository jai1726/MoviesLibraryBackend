const Folder = require('../models/Folder');
const mongoose = require('mongoose');

const createFolder = async (folderData) => {
    try {
        const folder = new Folder(folderData);
        await folder.save();
        return { success: true, data: folder };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};

const deleteFolder = async (email, folderName) => {
    try {
        await Folder.findOneAndDelete({ email, name: folderName });
        return { success: true, message: "Folder deleted successfully" };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};

const updateFolder = async (id,updateData) => {
    try {
        const folder = await Folder.findByIdAndUpdate(id, updateData, { new: true });
        
        return { success: true, data: folder };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};

const getFolders = async (email) => {
    try {
        const folders = await Folder.find({ email });
        return { success: true, data: folders };
    } catch (error) {
        console.error(error);
        return { success: false, message: "Something went wrong, try again later" };
    }
};

module.exports = {
    createFolder,
    deleteFolder,
    updateFolder,
    getFolders,
};
