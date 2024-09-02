const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");
const bcrypt = require("bcrypt");

// Schema for user signup validation
const signupSchema = zod.object({
  username: zod.string().nonempty("Username is required"),
  firstName: zod.string().nonempty("First name is required"),
  lastName: zod.string().nonempty("Last name is required"),
  password: zod.string().nonempty("Password is required"),
  email: zod.string().email("Invalid email address"),
});

// User signup route
router.post("/signup", async (req, res) => {
  console.log('SIGNUP');
  const validation = signupSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid inputs",
      errors: validation.error.errors,
    });
  }

  console.log(validation.data);

  const { username, email, password, firstName, lastName } = validation.data;

  try {
    // Check if username or email is already taken
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already taken",
      });
    }

    // Create a new user
    const newUser = await User.create({
      username,
      email,
      password, // Password stored as plain string
      firstName,
      lastName,
    });

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, username },
      JWT_SECRET
    );

    res.status(201).json({
      message: "User created successfully",
      token,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
    });
  }
});


// Schema for user signin validation
// Schema for user signin validation
const signinSchema = zod.object({
  username: zod.string().nonempty("Username is required"),
  password: zod.string().nonempty("Password is required"),
});

// User signin route
router.post("/signin", async (req, res) => {
  const validation = signinSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: "Invalid inputs",
    });
  }

  const { username, password } = validation.data;

  try {
    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      JWT_SECRET
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({
      message: "Error signing in",
      error: err.message,
    });
  }
});

// Get users with a filter option
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  try {
    const users = await User.find({
      $or: [
        { firstName: { $regex: filter, $options: "i" } },
        { lastName: { $regex: filter, $options: "i" } },
      ],
    });

    res.json({
      users: users.map((user) => ({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
      error: err.message,
    });
  }
});

module.exports = router;
