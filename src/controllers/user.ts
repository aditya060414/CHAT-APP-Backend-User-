import { generateToken } from "../config/generateToken.js";
import { publishToQueue } from "../config/rabbitmq.js";
import TryCatch from "../config/TryCatchBlock.js";
import { redisClient } from "../index.js";
import User from "../models/user.js";
import type { AuthenticatedRequest } from "../middlewares/Auth.js";
import mongoose from "mongoose";

export const LoginUser = TryCatch(async (req, res) => {
  const { email } = req.body;

  const rateLimitKey = `otp:ratelimit:${email}`;
  const rateLimit = await redisClient.get(rateLimitKey);
  if (rateLimit) {
    return res.status(429).json({
      message: "Too many requests, please try again later",
      success: false,
    });
  }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  const otpKey = `otp:${email}`;
  await redisClient.set(otpKey, otp, {
    EX: 300,
  });
  await redisClient.set(rateLimitKey, "true", {
    EX: 60,
  });

  const message = {
    to: email,
    subject: "Your OTP Code",
    body: `Your OTP Code is ${otp}. This OTP will expire in 5 minutes.`,
  };
  await publishToQueue("send-otp", message);
  return res.status(200).json({
    message: "OTP sent successfully",
    success: true,
  });
});

export const verifyUser = TryCatch(async (req, res) => {
  const { email, otp: enteredOtp } = req.body;

  if (!email || !enteredOtp) {
    return res.status(400).json({
      message: "Invalid email or OTP",
    });
  }

  const otpkey = `otp:${email}`;
  const storedOtp = await redisClient.get(otpkey);

  if (!storedOtp || storedOtp !== enteredOtp) {
    return res.status(400).json({
      message: "Invalid OTP",
    });
  }

  await redisClient.del(otpkey);
  let user = await User.findOne({ email });

  if (!user) {
    const rawName = email.split("@")[0];

    const name = rawName
      .replace(/[0-9]/g, "")
      .replace(/[._]/g, " ")
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    user = await User.create({ name, email });
  }

  const token = generateToken(user);

  res.json({
    message: "User Verified",
    user,
    token,
  });
});

export const userProfile = TryCatch(async (req: AuthenticatedRequest, res) => {
  const user = req.user;

  res.json(user);
});

export const updateName = TryCatch(async (req: AuthenticatedRequest, res) => {
  const user = await User.findById(req.user?._id);
  console.log(req.user);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  user.name = req.body.name;
  await user.save();

  const token = generateToken(user);
  res.json({
    message: "User Updated",
    user,
    token,
  });
});

export const getUsers = TryCatch(async (req: AuthenticatedRequest, res) => {
  const users = await User.find();

  res.json({
    users,
  });
});

export const getAUser = TryCatch(async (req: AuthenticatedRequest, res) => {
  const id = req.user?._id;

  if (!id) {
    return res.status(401).json({ message: "User not verified" });
  }

  if (!mongoose.Types.ObjectId.isValid(id.toString())) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ user });
});
