const User = require("../models/user");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
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
exports.loginUser = async (req, res) => {
  console.log("Login request received");

  const { email, password } = req.body;
  console.log(`Email: ${email}, Password: ${password}`);

  try {
    const user = await User.findOne({ email: email });
    console.log("User found:", user);

    if (!user) {
      console.log("User doesn't exist");
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      console.log("Invalid credentials");
      return res.status(400).json({ error: "Invalid credentials" });
    }

    console.log("Generating token...");
    const token = createTokens(user);

    res.cookie("access-token", token, {
      maxAge: 60 * 60 * 24 * 30 * 1000, // 30 days
      httpOnly: true,
    });

    res.json({
      message: "Login successful",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      token: token,
    });
    console.log("Login response sent");
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
// exports.loginUser = async (req, res) => {
//   console.log("Login request received");
//
//   const { email, password } = req.body;
//   console.log(`Email: ${email}, Password: ${password}`);
//
//   try {
//     const user = await User.findOne({ email: email });
//     console.log("User found:", user);
//
//     if (!user) {
//       console.log("User doesn't exist");
//       return res.status(400).json({ error: "User doesn't exist" });
//     }
//
//     const isMatch = await bcrypt.compare(password, user.password);
//     console.log("Password match:", isMatch);
//
//     if (!isMatch) {
//       console.log("Invalid credentials");
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//
//     console.log("Generating token...");
//     // const token = generateToken(user);
//
//     res.json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//       },
//       // token: token
//     });
//     console.log("Login response sent");
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// };
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

// exports.loginUser = async (req, res) => {
//   const { email, password } = req.body;
//
//   try {
//     const user = await User.findOne({ email: email });
//     if (!user) {
//       return res.status(400).json({ error: "User doesn't exist" });
//     }
//
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ error: "Invalid credentials" });
//     }
//
//     // TODO: Generate a token here
//     // const token = generateToken(user);
//
//     res.json({
//       message: "Login successful",
//       user: {
//         id: user._id,
//         email: user.email,
//         name: user.name,
//       },
//       // token: token
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Server error" });
//   }
// };
exports.getUserProfile = async (req, res) => {
  res.json("profile");
};
