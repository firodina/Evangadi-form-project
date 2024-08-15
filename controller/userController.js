//db connection
const dbconnection = require("../db/dbConfig");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
var jwt = require("jsonwebtoken");

async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "please procide the the following information",
    });
  }

  try {
    const [user] = await dbconnection.query(
      "select username, userid from usersTable where username = ? or email = ?",
      [username, email]
    );
    if (user.length > 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ mesg: "user already exist" });
    }

    if (password.length < 8) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "password must be at least 8 charater" });
    }

    // password encryting

    const salt = await bcrypt.genSalt(10);
    const hashpassword = await bcrypt.hash(password, salt);

    await dbconnection.query(
      "INSERT INTO usersTable (username, first_name, last_name, email, password) VALUES (?,?,?,?,?)",
      [username, firstname, lastname, email, hashpassword]
    );
    return res.status(StatusCodes.CREATED).json({ mesg: "user register" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong" });
  }
}
//login function
async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "please enter your email & password" });
  }
  try {
    const [user] = await dbconnection.query(
      "select username, userid, password from usersTable where email = ?",
      [email]
    );
    if (user.length == 0) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid cerdential" });
    }
    //comparing password
    const ismatch = await bcrypt.compare(password, user[0].password);
    if (!ismatch) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "invalid cerdential" });
    }

    const userid = user[0].userid;
    const username = user[0].username;
    const token = jwt.sign({ userid, username }, "secret", { expiresIn: "1d" });
    return res
      .status(StatusCodes.OK)
      .json({ msg: "user succsefull login", token, username });
  } catch (error) {
    console.log(error.message);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "something went wrong" });
  }
}
//checkuser function
async function checkuser(req, res) {
  const userid = req.user.userid;
  const username = req.user.username;
  res.status(StatusCodes.OK).json({ msg: "valid user", userid, username });
  res.send("your in");
}

module.exports = { login, register, checkuser };
