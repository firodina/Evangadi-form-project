//db connection 
const dbconnection = require('../db/dbConfig')

async function login(req, res) {
  res.send("login done")
}


async function register(req, res) {
  res.send("registeration done")
}



async function checkuser(req, res) {
  res.send("your in")
}

module.exports = {login, register, checkuser}
