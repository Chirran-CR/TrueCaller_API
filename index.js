const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/userRouter.js");
const contactRouter = require("./routes/contactRouter.js");
const spamRouter = require("./routes/spamRouter.js");
const globalRouter = require("./routes/globalRouter.js");
const { notFound, errorHandler } = require("./controllers/errorController.js");

//configurattion of env. variables
dotenv.config({path:"./.env"});

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

//api
app.use("/",(req,res)=>{
    res.send({
        message:"Welcome to the API of phone's contact manager",
        listOfAPIs:{
            get1: "user/user =>`to get all the user`",
            post2: "user/register =>`to register a new user`",
            post3: "user/login =>`to login a user`",
            put4: "user/addemail =>`to update a email address`",
            post5: "contact/addconcat =>`to add a contact in the your contact list`",
            get6: "contact/:phoneno =>`to get all the user who have this num in their phone-book`",
            get7: "user/getallcontact =>`to get all contacts of this number`",
            post8: "spam/markspam =>`to mark a number as spam`",
            search9: "search =>`to search a number or name`",
        }
    })
})
app.use("/user",userRouter);
app.use("/contact",contactRouter);
app.use("/spam",spamRouter);
app.use("/search",globalRouter);
//for page not found error
app.use(notFound);
//for error in any controller of route
app.use(errorHandler);

//create Server
app.listen(PORT,()=>{
    console.log(`Server is listening at port: ${PORT}`);
});