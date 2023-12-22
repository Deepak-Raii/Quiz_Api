const express = require("express");
const userModal = require("../models/user-model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "Deepak Rai";

// endPoint: http://localhost:3001/createUser
// method: POST

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // Check if the user already exists
    const exist = await userModal.findOne({ email });
    if (exist) {
      return res.status(409).send("User already exists");
    }
    // Save user if user does not exist in the database
    const encryptedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModal({
      username,
      email,
      password: encryptedPassword,
    });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// endPoint: http://localhost:3001/login
// method: POST

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if the user already exists
    const exist = await userModal.findOne({ email });
    if (!exist) {
      return res.status(409).send("User not found");
    } else {
      // using bcrypt.compare for comparing both password
      const validUser = await bcrypt.compare(password,exist.password);
      if (validUser) {
        const token = jwt.sign({ exist }, JWT_SECRET, { expiresIn: "10m" });
        res.json({ token });
      } else {
        res.status(401).send("Wrong Password");
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createUser, login };
