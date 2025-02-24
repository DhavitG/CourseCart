const { adminModel, courseModel } = require("../db");
const { JWT_ADMIN_PASSWORD } = require("../config");
const { adminMiddleware } = require("../middlewares/admin");

const { Router } = require("express");
const adminRouter = Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { z } = require("zod");

adminRouter.post("/signup", async function (req, res) {
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

    await adminModel.create({
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

adminRouter.post("/signin", async function (req, res) {
  const { email, password } = req.body;

  const admin = await adminModel.findOne({
    email: email,
  });

  const passwordMatch = await bcrypt.compare(password, admin.password);

  if (passwordMatch) {
    const token = jwt.sign(
      {
        id: admin._id,
      },
      JWT_ADMIN_PASSWORD
    );

    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect credentials",
    });
  }
});

adminRouter.post("/course", adminMiddleware, async function (req, res) {
  const adminId = req.userId;

  const { title, description, price, imageUrl, creator } = req.body;

  const course = await courseModel.create({
    title,
    description,
    price,
    imageUrl,
    creator: adminId,
  });

  res.json({
    message: "Course created",
    courseId: course._id,
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
