const express = require("express");
const route = express.Router();

const {
  allQuestions,
  singleQuestion,
  postQuestion,
} = require("../controller/questionController");

route.get("/question", allQuestions);
route.get("/question/:question_id", singleQuestion);
route.post("/question", postQuestion);

module.exports = route;