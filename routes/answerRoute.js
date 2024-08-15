const express = require("express");
const routes = express.Router();
const { getAnswers, postAnswers } = require("../controller/Answer");

routes.get("/:question_id", getAnswers);

routes.post("/answer", postAnswers);

//exporting the route
module.exports = routes;
