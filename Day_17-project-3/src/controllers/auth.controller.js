const usersModel = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')


//* Register Controller
async function registerController(req, res) { 
    const { username, password } = req.body;

    // Check if user already exists
    const isUserAlreadyExist = await usersModel.findOne({ username });

    if (isUserAlreadyExist) {
        return res.status(409).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = await usersModel.create({ 
        username, 
        password :await bcrypt.hash(password,10)
    });

    // Create JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    // Send token as cookie
    res.cookie("token", token);

    return res.status(201).json({
        message: "User registered successfully",
        user: newUser
    });
}

// * Login Controller
async function loginController(req, res) {
    const { username, password } = req.body;

    // Check user
    const user = await usersModel.findOne({ username });

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }


    // if (user.password !== password) {
    //     return res.status(401).json({ message: "Incorrect password" });
    // }

//*const isMatch = await bcrypt.compare(enteredPassword, hashedPasswordFromDB); ✅

const isMatchPassword = await bcrypt.compare(password,user.password) 

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    // Send token as cookie
    res.cookie("token", token);

    return res.status(200).json({
        message: "Login successful",
        user: user
    });
}

module.exports = {
    registerController,
    loginController
};
