const express = require("express")
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser")
const userRouter = require("./api/routes/user")
const mongoose = require("mongoose")


mongoose.connect(
  process.env.DB_CONNECTION_STRING ,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
app.use(morgan("dev"))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())

app.use("/user", userRouter)

// Error Handling for not found 
  app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  })
// For any other type of error
app.use((error, req, res, next) => {
  res.status(error.status||5000).json({
    error:{
      message:error.message
    }
  })
 
})
module.exports = app