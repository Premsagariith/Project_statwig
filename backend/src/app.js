const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");

const cookieParser = require("cookie-parser");

const compression = require("compression");

const rateLimit = require("express-rate-limit");

const errorHandler = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");

const projectRoutes = require("./routes/project.routes");

const taskRoutes = require("./routes/task.routes");

const userRoutes = require("./routes/user.routes");

const app = express();


// ==============================
// SECURITY
// ==============================
app.use(helmet());


// ==============================
// CORS
// ==============================
app.use(

  cors({

    origin: process.env.CLIENT_URL,

    credentials: true,
  })
);


// ==============================
// RATE LIMITER
// ==============================

// Disable in development
if (
  process.env.NODE_ENV ===
  "production"
) {

  const limiter = rateLimit({

    windowMs:
      15 * 60 * 1000,

    max: 100,

    message:
      "Too many requests, please try again later.",
  });

  app.use(limiter);
}


// ==============================
// BODY PARSER
// ==============================
app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);


// ==============================
// COOKIES
// ==============================
app.use(cookieParser());


// ==============================
// COMPRESSION
// ==============================
app.use(compression());


// ==============================
// LOGGER
// ==============================
app.use(morgan("dev"));


// ==============================
// ROUTES
// ==============================
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/tasks",
  taskRoutes
);

app.use(
  "/api/users",
  userRoutes
);


// ==============================
// HOME ROUTE
// ==============================
app.get("/", (req, res) => {

  res.status(200).json({

    success: true,

    message:
      "Task Management API is running...",
  });
});


app.use(errorHandler);


module.exports = app;