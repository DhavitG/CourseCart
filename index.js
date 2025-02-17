const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const JWT_SECRET = "hahahahahuhuhuhu";

const app = express();

app.use("/api/v1/user", userRouter); // if a request comes to /user it gets routed to userRouter
app.use("/api/v1/course", courseRouter); // if a request comes to /user it gets routed to courseRouter
app.use("/api/v1/admin", adminRouter); // if a request comes to /user it gets routed to adminRouter

async function main() {
  await mongoose.connect(
    "mongodb+srv://dhavitg:ZRFpS2dtZt%21GSDV@cluster0.rhpde.mongodb.net/CourseCart"
  );
  app.listen(3000);
}
