require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/course");
const { adminRouter } = require("./routes/admin");

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter); // if a request comes to /user it gets routed to userRouter
app.use("/api/v1/course", courseRouter); // if a request comes to /user it gets routed to courseRouter
app.use("/api/v1/admin", adminRouter); // if a request comes to /user it gets routed to adminRouter

async function main() {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(3000);
}

main();
