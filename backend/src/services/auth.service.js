const bcrypt = require("bcryptjs");

const ApiError = require("../utils/ApiError");
const generateToken = require("../utils/generateToken");

const {
  createUser,
  findUserByEmail,
  findUserById,
} = require("../repositories/user.repository");



const registerUser = async ({ name, email, password, role }) => {

  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new ApiError(400, "User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  
  const user = await createUser({
    name,
    email,
    password: hashedPassword,
    role,
  });


 
  const token = generateToken(user._id);


  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};



const loginUser = async ({ email, password }) => {

 
  const user = await findUserByEmail(email);

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }


  
  const isPasswordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!isPasswordMatched) {
    throw new ApiError(401, "Invalid email or password");
  }


  
  const token = generateToken(user._id);


  return {
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  };
};



const getCurrentUser = async (userId) => {

  const user = await findUserById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return user;
};


module.exports = {
  registerUser,
  loginUser,
  getCurrentUser,
};