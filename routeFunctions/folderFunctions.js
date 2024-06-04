const FolderCollection = require('../routeCollection/folderCollection');

const createFolder = async (req, res) => {
    const response = await FolderCollection.createFolder(req.body);
    res.status(201).json(response);
};

const deleteFolder = async (req, res) => {
    const response = await FolderCollection.deleteFolder(req.params.email, req.params.folderName);
    res.status(200).json(response);
};

const updateFolder = async (req, res) => {
    const response = await FolderCollection.updateFolder(req.params.id,req.body);
    res.status(200).json(response);
};

const getFolders = async (req, res) => {
    const response = await FolderCollection.getFolders(req.params.email);
    res.status(200).json(response);
};

module.exports = {
    createFolder,
    deleteFolder,
    updateFolder,
    getFolders,
};
