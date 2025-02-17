const { Router } = require("express");
const courseRouter = Router();

courseRouter.post("/purchase", function (req, res) {
  res.json({
    message: "All courses",
  });
});

courseRouter.get("/preview", function (req, res) {
  res.json({
    message: "All courses",
  });
});

module.exports = {
  courseRouter: courseRouter,
};
