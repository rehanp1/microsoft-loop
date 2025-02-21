import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, msg: "User with this email already exists" });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltRound);
    const user = await User.create({ name, email, password: hashPassword });

    const token = await user.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set true in production (HTTPS)
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(201).json({
      success: true,
      msg: "OK",
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const passwordValid = await bcrypt.compare(password, userExists.password);
    if (!passwordValid) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const token = await userExists.generateToken();
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set true in production (HTTPS)
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      success: true,
      msg: "OK",
      name: userExists.name,
      email: userExists.email,
    });
  } catch (error) {
    res.status(500).json({ success: false, msg: "Internal server error" });
  }
};

const signOutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
    sameSite: "Strict",
  });
  res.json({ success: false, msg: "OK" });
};

const testToken = (req, res) => {
  res.status(200).json(req.user);
};

export { signUpUser, signInUser, testToken, signOutUser };
