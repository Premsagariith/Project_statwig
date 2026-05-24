const jwt = require("jsonwebtoken");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");

const { findUserById } = require("../repositories/user.repository");


const protect = asyncHandler(async (req, res, next) => {

  let token;

  
  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }


  
  if (!token) {
    throw new ApiError(401, "Unauthorized access");
  }


  
  const decoded = jwt.verify(
    token,
    process.env.JWT_SECRET
  );


  
  const user = await findUserById(decoded.id);

  if (!user) {
    throw new ApiError(401, "User not found");
  }



  req.user = user;

  next();
});

module.exports = {
  protect,
};