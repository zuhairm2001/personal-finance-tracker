const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { createTokens } = require("../config/JWT");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update),
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.loginUser = async (req, res) => {
  console.log("Login attempt received:", req.body.email);
  const { email, password } = req.body;

  if (!email || !password) {
    console.log("Login failed: Missing email or password");
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    console.log("Finding user in database...");
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("Login failed: User not found");
      return res.status(400).json({ error: "User doesn't exist" });
    }

    console.log("User found, comparing passwords...");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Login failed: Invalid credentials");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("Password match, creating token...");
    const accessToken = createTokens(user);

    console.log("Setting cookie and sending response...");
    res.cookie("access-token", accessToken, {
      maxAge: 2592000000, // 30 days
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  res.json("profile");
};
