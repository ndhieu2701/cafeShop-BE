import bcrypt from "bcrypt";
import User from "../models/user.js";
import generateToken from "../config/generateToken.js";
import VerifyCode from "../models/verificationCode.js";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  host: config.host,
  port: config.mailPort,
  secure: false,
  auth: {
    user: config.mailAccount,
    pass: config.mailPass,
  },
});

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

//POST /user/emailReset
const emailReset = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ status: 400, message: "Email not found in our database!" });
    const code = Math.floor(1000 + Math.random() * 9000).toString();

    const newVerifyCode = await VerifyCode.create({
      email,
      code,
    });

    const mailOptions = {
      from: config.mailAccount,
      to: email,
      subject: "Reset password code",
      text: `Your reset password code is: ${code}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res
          .status(500)
          .json({ status: 500, message: "Error sending email." });
      } else {
        return res.status(201).json({
          status: 201,
          message: "Verification code has been sent to your email.",
        });
      }
    });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

//POST /user/resetCode
const resetCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const verifyModel = await VerifyCode.findOne({ email }).sort("-createdAt");
    const user = await User.findOne({ email });
    if (verifyModel.code === code) {
      return res.status(200).json({
        status: 200,
        message: "Verify code success!",
        token: generateToken(user._id),
      });
    } else
      return res
        .status(400)
        .json({ status: 400, message: "Verify code not match!" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

// POST /user/resetPass
const resetPass = async (req, res) => {
  try {
    const { password, token } = req.body;
    const userID = jwt.verify(token, config.jwtSecret);
    if (!userID)
      return res.status(400).json({ status: 400, message: "Token is wrong!" });
    else {
      const salt = await bcrypt.genSalt();
      const newPassword = await bcrypt.hash(password, salt);
      const updatedUser = await User.findByIdAndUpdate(userID.id, {
        password: newPassword,
      });
      return res
        .status(200)
        .json({ status: 200, message: "Update password success!" });
    }
  } catch (error) {
    res.status(500).json({ status: 500, message: error.message });
  }
};

export { register, login, emailReset, resetCode, resetPass };
