const User = require("../models/user.model");

const asyncHandler = require("../utils/asyncHandler");

const ApiResponse = require("../utils/ApiResponse");


// GET USERS
const getUsers = asyncHandler(
  async (req, res) => {

    const users =
      await User.find(
        {
          role: "user",
        }
      ).select(
        "name email role"
      );

    return res.status(200).json(

      new ApiResponse(
        200,
        "Users fetched successfully",
        {
          users,
        }
      )
    );
  }
);

module.exports = {
  getUsers,
};