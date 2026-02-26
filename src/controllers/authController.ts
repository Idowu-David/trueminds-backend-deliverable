import { type Request, type Response } from "express";
import { users, type User } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

export const signup = async (req: Request, res: Response) => {
  const { email, firstName, lastName, password, referralCode, phoneNumber } =
    req.body;

  console.log(req.body);

  if (!email || !firstName || !lastName || !phoneNumber) {
    return res.status(400).json({
      success: false,
      message: "Firstname, Phone Number, Lastname and Email are required",
    });
  }

  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required",
    });
  }

  const existingUser = users.find(
    (user) =>
      (email && user.email === email) ||
      (phoneNumber && user.phoneNumber === phoneNumber),
  );

  if (existingUser) {
    res.status(400).json({
      success: false,
      message: "User already exists",
    });
  }

  const validReferrals = ["CHUKS20", "WELCOME10"];
  if (referralCode && !validReferrals.includes(referralCode)) {
    return res.status(400).json({
      success: false,
      message: "Invalid referral code",
    });
  }

  const generatedOtp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiryTime = Date.now() + 10 * 60 * 1000;

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: "user_" + (users.length + 1),
    firstName: firstName,
    lastName: lastName,
    email: email,
    phoneNumber: phoneNumber,
    passwordHash: hashedPassword,
    referralCode: referralCode || undefined,
    isVerified: false,
    otp: generatedOtp,
    otpExpiry: expiryTime,
    role: password === "adminPass" ? "admin" : "user",
  };

  console.log("USER", newUser);

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "Signup successful. Verify your account using the OTP",
    data: {
      userId: newUser.id,
      otp: generatedOtp,
    },
  });
};

export const verify = async (req: Request, res: Response) => {
  const { userId, otp } = req.body;

  if (!userId || !otp) {
    return res.status(400).json({
      success: false,
      message: "Input userId and otp",
    });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res.status(400).json({
      success: false,
      message: "invalid user",
    });
  }

  if (user.isVerified) {
    return res.status(400).json({
      success: false,
      message: "This account is already verified.",
    });
  }

  if (user.otp !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP code",
    });
  }

  if (Date.now() > (user.otpExpiry || 0)) {
    return res.status(400).json({
      success: false,
      message: "OTP has expired. Please sign up again",
    });
  }

  user.isVerified = true;
  user.otp = undefined;
  user.otpExpiry = undefined;

  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    String(JWT_SECRET_KEY),
    {
      expiresIn: "1h",
    },
  );

  return res.status(200).json({
    success: true,
    message: "Account verified successfully",
    token: token,
    data: {
      userId: user.id,
      email: user.email,
    },
  });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(401).json({
      success: false,
      message: "Enter your email and password to login",
    });
  }

  const user = users.find((user) => email && user.email === email);

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid login",
    });
  }

  if (!user.isVerified) {
    return res.status(403).json({
      success: false,
      message: "User is not verified",
    });
  }

  const passwordCheck = await bcrypt.compare(password, user.passwordHash);
  if (!passwordCheck) {
    return res.status(401).json({
      success: false,
      message: "Password is not correct",
    });
  }
  const token = jwt.sign(
    { userId: user.id, email: user.email, role: user.role },
    String(JWT_SECRET_KEY),
    {
      expiresIn: "1h",
    },
  );

  return res.status(201).json({
    success: true,
    message: "Login successful",
    token: token,
    data: {
      userId: user.id,
      email: user.email,
    },
  });
};
