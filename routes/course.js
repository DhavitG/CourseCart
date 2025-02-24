const { Router } = require("express");
const courseRouter = Router();

const { userMiddleware } = require("../middlewares/user");
const { purchaseModel, courseModel } = require("../db");

courseRouter.post("/purchase", userMiddleware, async function (req, res) {
  const userId = req.userId;
  const courseId = req.body.courseId;

  await purchaseModel.create({
    userId,
    courseId,
  });
  res.json({
    message: "You have bought the course successfully",
  });
});

courseRouter.get("/preview", async function (req, res) {
  const courses = await courseModel.find({}); // gets you everything
  res.json({
    message: "All courses",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
