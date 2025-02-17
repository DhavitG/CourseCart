const { Router } = require("express");

const userRouter = Router();
const { userModel } = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

userRouter.post("/signup", async function (req, res) {
  const requiredBody = z.object({
    email: z.string().min(3).max(50).email(),
    password: z
      .string()
      .min(3, "Password must be at least 3 characters long")
      .max(30, "Password cannot exceed 30 characters")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/\d/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character (@$!%*?&)"
      ),
    firstName: z.string().min(3).max(50),
    lastName: z.string().min(3).max(50),
  });

  const parsedDataWithSuccess = requiredBody.safeParse(req.body);

  if (!parsedDataWithSuccess.success) {
    res.json({
      message: "Incorrect Format",
      error: parsedDataWithSuccess.error,
    });
    return;
  }

  const { email, password, firstName, lastName } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 5);

    await userModel.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
    });
  } catch (e) {
    if (e.code === 11000) {
      res.status(409).json({ message: "User already exists" });
      return;
    } else {
      res.status(500).json({ message: "An error occurred during sign-up" });
      return;
    }
  }

  res.json({
    message: "You have signed up",
  });
});

userRouter.post("/signin", function (req, res) {
  res.json({
    message: "You have signed in",
  });
});

userRouter.get("/purchases", function (req, res) {});

module.exports = {
  userRouter: userRouter,
};
