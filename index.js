const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRouter.js");
const contactRouter = require("./routes/contactRouter.js");
const { notFound, errorHandler } = require("./controllers/errorController.js");

//configurattion of env. variables
dotenv.config({path:"./.env"});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

//api
app.use("/user",userRouter);
app.use("/contact",contactRouter);

//for page not found error
app.use(notFound);
//for error in any controller of route
app.use(errorHandler);

//create Server
app.listen(PORT,()=>{
    console.log(`Server is listening at port: ${PORT}`);
});