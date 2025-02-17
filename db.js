const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastName: String,
});

const courseSchema = new Schema({
  title: String,
  description: String,
  price: Number,
  imageUrl: String,
  creator: ObjectId,
});

const adminSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  firstname: String,
  lastName: String,
});

const purchaseSchema = new Schema({
  courseId: ObjectId,
  userId: ObjectId,
});

const userModel = mongoose.model("user", userSchema);
const courseModel = mongoose.model("course", courseSchema);
const adminModel = mongoose.model("admin", adminSchema);
const purchaseModel = mongoose.model("purchases", purchaseSchema);

module.exports = {
  userModel,
  courseModel,
  adminModel,
  purchaseModel,
};
