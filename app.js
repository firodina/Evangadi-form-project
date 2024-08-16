const express = require("express");
const app = express();

//importing the userRoute middleware
const userRoute = require("./routes/userRoute");
const AnswerquestionRoute = require("./routes/answerRoute");
// Imports routes for question
const questionRoutes = require("./routes/qestionRoute");

// Imports routes for answer
const answerRoutes = require("./routes/answerRoute");
//middleware importing
const authMiddleware = require("./middleware/autoMiddleware");

const cors = require("cors");

const port = 5050;
app.use(cors());
//db connection
const dbconnection = require("./db/dbConfig");

//json middleware file
app.use(express.json());

//use the middleware route
app.use("/api/user", userRoute);

///  using authMiddleware for authentication before questionRoutes handles the request.
app.use("/api", authMiddleware, questionRoutes);

//  using authMiddleware for authentication before answerRoutes handles the request.
app.use("/api", authMiddleware, answerRoutes);

async function start() {
  
 app.listen(port);
  console.log(`listening to ${port}`);
  console.log("database connected");
}
start();

app.get("/", (req, res) => {
  res.send("wellcome");
});
