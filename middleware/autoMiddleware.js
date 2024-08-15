const { StatusCodes } = require("http-status-codes");
var jwt = require("jsonwebtoken");

function autoMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Aythentication invalid" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const { username, userid } = jwt.verify(token, "secret");
    req.user = { userid, username };
    next();
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ msg: "Aythentication invalid" });
  }
}
module.exports = autoMiddleware;
