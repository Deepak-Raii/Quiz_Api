const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/QuizDatabase").then((data,err)=>{
    if(data){
        console.log("Database connected");
    }
    else if(err)
    {
        console.log(err)   
    }
})