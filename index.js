const express = require("express");
const dotenv = require("dotenv");
const userRouter = require("./routes/userRouter.js");
const { notFound, errorHandler } = require("./controllers/errorController.js");

//configurattion of env. variables
dotenv.config({path:"./.env"});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));

const PORT = process.env.PORT || 8080;

//api
app.use("/user",userRouter);

//for page not found error
app.use(notFound);
//for error in any controller of route
app.use(errorHandler);

//create Server
app.listen(PORT,()=>{
    console.log(`Server is listening at port: ${PORT}`);
});