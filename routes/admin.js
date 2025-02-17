const { adminModel } = require("../db");

const { Router } = require("express");
const adminRouter = Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");
const JWT_SECRET = "hahahahahuhuhuhu";

adminRouter.post("/signup", async function (req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  try {
    await adminModel.create({
      email,
      password,
      firstName,
      lastName,
    });
  } catch (e) {}

  res.json({
    message: "Successfully signed up as an admin",
  });
});

adminRouter.post("/signin", function (req, res) {
  res.json({
    message: "Login successful",
  });
});

adminRouter.post("/course", function (req, res) {
  res.json({
    message: "Course added successfully",
  });
});

adminRouter.put("/course", function (req, res) {
  res.json({
    message: "Course edited successfully",
  });
});

adminRouter.get("/course/bulk", function (req, res) {
  res.json({
    message: "All courses",
  });
});

module.exports = {
  adminRouter: adminRouter,
};
