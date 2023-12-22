const express = require("express");
const quizModel = require("../models/quiz-model.js");


// endPoint : http://localhost:3001/quizzes
// method : Post

const createQuiz = async (req, res) => {
    try {
        const { question, options, rightAnswer, startDate, endDate } = req.body;

        // Check if the question already exists
        const exist = await quizModel.findOne({ question });
        if (exist) {
            return res.status(409).send("Question already exists");
        }

        // Save quiz if question does not exist in the database 
        const newQuiz = new quizModel({ question, options, rightAnswer, startDate, endDate });
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// endPoint : http://localhost:3001/quizzes/active
// method : Get

const activeQuiz = async (req, res) => {
    try {

        // Getting current date, which will help to find the active quiz 
        const now = new Date();
        const activeQuiz = await quizModel.find({ startDate: { $lt: now }, endDate: { $gt: now } });
        res.json(activeQuiz);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// endPoint : http://localhost:3001/quizzes/all
// method : Get

const allQuizzes = async (req, res) => {
    try {
        // Finding all quiz from database
        const allQuizzes = await quizModel.find({});
        res.status(200).json(allQuizzes);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// endPoint : http://localhost:3001/quizzes/:id/result
// method : Get

const findQuiz = async (req, res) => {
    try {

        // Finding quiz with quiz unique Id
        const quiz = await quizModel.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: "Quiz not found" });
        }
        res.json({ correctAnswer: quiz.rightAnswer, additionalInformation: 'Some information' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createQuiz, activeQuiz, allQuizzes, findQuiz };
