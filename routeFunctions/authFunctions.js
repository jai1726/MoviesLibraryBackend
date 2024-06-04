const { validationResult } = require('express-validator');
const UserCollection = require('../routeCollection/authCollection');

const createUser = async (req, res) => {
    const response = await UserCollection.createUser(req.body);
    res.status(201).json(response);
};

const loginUser = async (req, res) => {
    let email=req.params.email,password=req.params.password;
    const response = await UserCollection.loginUser(email,password);
    res.status(201).json(response);
};

const verifyUser = async (req, res) => {
    const response = await UserCollection.verifyUser(req.body.email);
    res.status(201).json(response);
};

const updateUser = async (req, res) => {
    const response = await UserCollection.updateUser(req.body);
    res.status(201).json(response);
    
};

const forgotPassword = async (req, res) => {
    let email=req.params.email;
    const response = await UserCollection.forgotPassword(email);
    res.status(201).json(response);
};

const updatePassword = async (req, res) => {
    const response = await UserCollection.updatePassword(req.body);
    res.status(201).json(response);
};

const checkToken = async (req, res) => {
    let authToken=req.params.authToken
    const response = await UserCollection.checkToken(authToken);
    res.status(201).json(response);
};

const getUserDetails = async (req, res) => {
    let authToken=req.params.authToken
    const response = await UserCollection.getUserDetails(authToken);
    res.status(201).json(response);
};

module.exports = {
  createUser,
  loginUser,
  verifyUser,
  updateUser,
  forgotPassword,
  updatePassword,
  checkToken,
  getUserDetails,
};
