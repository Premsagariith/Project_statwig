const express = require("express");

const {
  register,
  login,
  logout,
  getMe,
} = require("../controllers/auth.controller");

const { protect } = require("../middlewares/auth.middleware");

const validate = require("../middlewares/validate.middleware");

const {
  registerSchema,
  loginSchema,
} = require("../validations/auth.validation");


const router = express.Router();


// Register
router.post(
  "/register",
  validate(registerSchema),
  register
);


// Login
router.post(
  "/login",
  validate(loginSchema),
  login
);



router.post(
  "/logout",
  logout
);



router.get(
  "/me",
  protect,
  getMe
);


module.exports = router;