const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");

const {
  registerUser,
  loginUser,
  getCurrentUser,
} = require("../services/auth.service");



const cookieOptions = {
  httpOnly: true,

  secure:
    process.env.NODE_ENV ===
    "production",

  sameSite:
    process.env.NODE_ENV ===
    "production"
      ? "none"
      : "lax",

  maxAge:
    7 * 24 * 60 * 60 * 1000,
}


// Register Controller
const register = asyncHandler(async (req, res) => {

  const { name, email, password, role } = req.body;

  const data = await registerUser({
    name,
    email,
    password,
    role,
  });


  res
    .status(201)
    .cookie("token", data.token, cookieOptions)
    .json(
      new ApiResponse(
        201,
        "User registered successfully",
        data.user
      )
    );
});


const login = asyncHandler(
  async (req, res) => {

    const {
      email,
      password,
    } = req.body;

    const data =
      await loginUser({
        email,
        password,
      });

    // ==========================
    // COOKIE OPTIONS
    // ==========================
    const cookieOptions = {

      httpOnly: true,

      secure:
        process.env.NODE_ENV ===
        "production",

      sameSite:
        process.env.NODE_ENV ===
        "production"
          ? "none"
          : "lax",

      maxAge:
        7 * 24 * 60 * 60 * 1000,
    };


    res
      .status(200)

      .cookie(
        "token",
        data.token,
        cookieOptions
      )

      .json(
        new ApiResponse(
          200,
          "Login successful",
          data.user
        )
      );
  }
);

// Logout Controller
const logout = asyncHandler(async (req, res) => {

  res
    .status(200)
    .clearCookie("token")
    .json(
      new ApiResponse(
        200,
        "Logout successful"
      )
    );
});


                                                                                                                                  
const getMe = asyncHandler(async (req, res) => {

  const user = await getCurrentUser(req.user.id);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Current user fetched successfully",
        user
      )
    );
});


module.exports = {
  register,
  login,
  logout,
  getMe,
};