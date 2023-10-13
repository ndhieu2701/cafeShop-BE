import bcrypt from "bcrypt";
import User from "../models/user.js";
import generateToken from "../config/generateToken.js";

//POST /user/register
const register = async (req, res) => {
  try {
    const { email, password, username, address, phoneNumber } = req.body;
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
    const user = await User.create({
      email,
      password: passwordHash,
      username,
      address,
      phoneNumber,
    });
    user.password = undefined;
    res.status(201).json({ status: 201, user });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};

//POST /user/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "User does not exist!" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ status: 400, message: "Invalid password!" });
    user.password = undefined;
    res.status(200).json({ status: 200, token: generateToken(user._id), user });
  } catch (error) {
    res.status(500).json({ status: 500, error: error.message });
  }
};
export { register, login};
