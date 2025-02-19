import { User } from "../models/user.model.js";
import bcrypt from "bcrypt";

const signUpUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res
        .status(400)
        .json({ msg: "User with this email already exists" });
    }

    const saltRound = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltRound);
    const user = await User.create({ name, email, password: hashPassword });

    res.status(201).json({
      msg: "OK",
      id: user._id,
      name,
      email,
      token: await user.generateToken(),
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userExists = await User.findOne({ email });
    if (!userExists) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const passwordValid = bcrypt.compare(password, userExists.password);
    if (!passwordValid) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    res.status(200).json({
      msg: "OK",
      id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      token: await userExists.generateToken(),
    });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
};

const testToken = (req, res) => {
  res.status(200).json(req.user);
};

export { signUpUser, signInUser, testToken };
