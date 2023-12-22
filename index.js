const express = require('express');
const app = express();
require('dotenv').config()
const PORT = process.env.PORT || 3001;
require("./connection/connection.js");
const routes = require("./routes/routes.js");
app.use(express.json());


// User
app.use("/",routes.createUser);
app.use("/",routes.login);

// Question
app.use("/",routes.createQuiz);
app.use("/",routes.activeQuiz);
app.use("/",routes.allQuiz);
app.use("/",routes.findQuiz);



app.listen(PORT,()=>{
    console.log(`You are using port ${PORT}`);
})