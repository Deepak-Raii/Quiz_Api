const express = require("express");
const route = express.Router();
const quizController = require("../controllers/quiz-controller.js");
const userController = require("../controllers/user-controller.js");


// User Routes

const createUser = route.post("/createUser", userController.createUser);
const login = route.post("/login", userController.login);


// Question Routes 
const createQuiz = route.post("/quizzes", quizController.createQuiz);
const activeQuiz = route.get("/quizzes/active", quizController.activeQuiz);
const allQuiz = route.get("/quizzes/all", quizController.allQuizzes);
const findQuiz = route.get("/quizzes/:id/result", quizController.findQuiz);

module.exports = {createUser,login, createQuiz,activeQuiz,allQuiz,findQuiz};