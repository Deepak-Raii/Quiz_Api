const mongoose = require('mongoose');

const quizModel = mongoose.Schema({
    question:{
        type:String,
        required:true
    },
    options:{
        type:Array,
        required:true
    },
    rightAnswer:{
        type:Number,
        required:true
    },
    startDate:{
        type:Date,
        required:true
    },
    endDate:{
        type:Date,
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model("quizSchema",quizModel)