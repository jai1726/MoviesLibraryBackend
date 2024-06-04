const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require('../sendEmail');
require('dotenv').config();

const saltNumber = 10;
const jwtSecret = "HaHa";

const createUser = async (userData) => {
  console.log(userData)
  const salt = await bcrypt.genSalt(saltNumber);
  const securedPassword = await bcrypt.hash(userData.password, salt);
  const email = userData.email;
  const existingUser = await User.findOne({ 'email': email });

  if (existingUser) return { success: false, message: "Email already exists" };

  try {
    const data = { email: email, name: userData.name };
    const authToken = jwt.sign(data, jwtSecret);
    
    await User.create({ name: userData.name, email: userData.email, password: securedPassword });
    
    const url = `${process.env.BASE_URL}users/verify/${authToken}`;
    await sendEmail(email, "Verify Email", url);
    
    return { success: false, message: "An email sent to your account, please verify", data: authToken };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong, try again later" };
  }
};

const loginUser = async (email,password) => {  
  try {
    const userData = await User.findOne({ 'email': email });
    if (!userData) return { success: false, message: "Enter valid Email" };

    const bcryptPassword = await bcrypt.compare(password, userData.password);
    if (!bcryptPassword) return { success: false, message: "Enter valid Password" };

    const data = { email: email, name: userData.name };
    const authToken = jwt.sign(data, jwtSecret);
    
    if (!userData.verified) {
      const url = `${process.env.BASE_URL}users/verify/${authToken}`;
      await sendEmail(userData.email, "Verify Email", url);
      return { success: false, message: "Not a Verified User, An Email sent to your account, please verify", data: authToken };
    }
    
    return { success: true, data: authToken };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong, try again later" };
  }
};

const verifyUser = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) return { success: false, message: "Invalid Link" };

    await User.updateOne({ 'email': email }, { $set: { verified: true } });
    return { success: true, message: "Email verified successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Internal Server Error" };
  }
};

const updateUser = async (updateData) => {
  try {
    const check = await currentData.findOne({ id: 1 });
    if (check != null) {
      await currentData.updateOne({ id: 1 }, {
        $set: {
          id: 1,
          incoming: updateData.Incoming,
          drain: updateData.Drain,
          pump: updateData.Pump,
          togglePressure: updateData.togglePressure,
          drainPressure: updateData.drainPressure
        }
      });
    } else {
      await currentData.create({
        id: 1,
        incoming: updateData.Incoming,
        drain: updateData.Drain,
        pump: updateData.Pump,
        togglePressure: updateData.togglePressure,
        drainPressure: updateData.drainPressure
      });
    }
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong, try again later" };
  }
};

const forgotPassword = async (email) => {
  const user = await User.findOne({ 'email': email });
  if (!user) return { success: false, message: "Email does not exist" };

  try {
    const data = { email: email };
    const authToken = jwt.sign(data, jwtSecret);
    const url = `${process.env.BASE_URL}users/reset/${authToken}`;
    await sendEmail(email, "Reset Password", url);
    
    return { success: true, message: "An email sent to your account to reset your password", data: authToken };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong, try again later" };
  }
};

const updatePassword = async (updateData) => {
  const salt = await bcrypt.genSalt(saltNumber);
  const securedPassword = await bcrypt.hash(updateData.password, salt);
  const email = updateData.email;
  try {
    await User.updateOne({ 'email': email }, { $set: { password: securedPassword } });
    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong, try again later" };
  }
};

const checkToken = async (authToken) => {
  try {
    const decoded = jwt.verify(authToken, jwtSecret);
    if (decoded) return { success: true, data: decoded };
    else return { success: false, message: "Token verification failed" };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong, try again later" };
  }
};

const getUserDetails = async (authToken) => {
  try {
    const decoded = jwt.verify(authToken, jwtSecret);
    if (!decoded) return { success: false, message: "Token verification failed" };

    const userData = await User.findOne({ 'email': decoded.email });
    if (!userData) return { success: false, message: "User not found" };

    return { success: true, data: userData };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Something went wrong, try again later" };
  }
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
