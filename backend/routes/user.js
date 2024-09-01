// backend/routes/user.js
const express = require("express");
const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");
const { authMiddleware } = require("../middleware");

const signupBody = zod.object({
  username: zod.string(),
  firstName: zod.string(),
  lastName: zod.string(),
  password: zod.string(),
});

router.post("/signup", async (req, res) => {
  const { success, error } = signupBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
      error: error.errors,
    });
  }

  const existingUser = await User.findOne({
    username: req.body.username,
  });


  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken",
    });
  }

  const user = await User.create({
    username: req.body.username,
    email:req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
  });

  const userId = user._id;
  const username = user.username;

  await Account.create({
    userId,
    balance: 1 + Math.random() * 10000,
  });

  const token = jwt.sign(
    {
      userId,
      username,
    },
    JWT_SECRET
  );

  res.json({
    message: "User created successfully",
    token: token,
  });
});

const signinBody = zod.object({
  username: zod.string(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  const { success } = signinBody.safeParse(req.body);
  if (!success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }

  const user = await User.findOne({
    username: req.body.username,
    password: req.body.password,
  });

  if (user) {
    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      JWT_SECRET
    );

    res.json({
      token: token,
    });
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
});

router.get("/name", authMiddleware, async (req, res)=>{
  return res.json({firstName: req.firstName, lastName: req.lastName});
})

const updateBody = zod.object({
  password: zod.string().optional(),
  firstName: zod.string().optional(),
  lastName: zod.string().optional(),
});

router.put("/update", authMiddleware, async (req, res) => {
  const { success, data, error } = updateBody.safeParse(req.body);
  
  if (!success) {
    return res.status(400).json({
      message: "Error while updating information",
      details: error.errors, // Include validation errors for debugging
    });
  }

  try {
    // Update user information
    const updateResult = await User.updateOne(
      { _id: req.userId }, // Filter to find the user
      { $set: data } // Use $set to specify fields to update
    );

    // Log the updated user info
    const updatedUser = await User.findOne({ username: req.username });
    console.log("Updated User:", updatedUser);

    if (updateResult.modifiedCount === 0) {
      return res.status(404).json({ message: "User not found or no changes made" });
    }

    res.json({
      message: "Updated successfully",
      user: updatedUser, // Optionally return the updated user info
    });
  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({
      message: "Error updating user information",
      error: err.message,
    });
  }
});


router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.json({
    user: users.map((user) => ({
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      _id: user._id,
    })),
  });
});

module.exports = router;
