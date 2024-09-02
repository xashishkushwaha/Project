const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { string, number } = require("zod");

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://xashishkushwaha:xashish@cluster0.hp7a3.mongodb.net/CleanSweep",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Define User Schema with validations
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    // Never store passwords in plain text in production!
  },
});

// Pre-save hook to hash passwords before saving to the database
userSchema.pre("save", async function (next) {
  if (this.isModified("password") || this.isNew) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      return next(err);
    }
  }
  next();
});

// Define Location Schema with a default count value
const locationSchema = new mongoose.Schema({
  locationName: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  count: {
    type: Number,
    default: 0,
  },
});

// Create Mongoose models for User and Location
const User = mongoose.model("User", userSchema);
const Location = mongoose.model("Location", locationSchema);

module.exports = { User, Location };
