const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/users")

  .then(() => {
    console.log("mongodb user connected");
  })
  .catch((err) => {
    console.log("failled to connect user ", err);
  });

const loginSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  phone: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
  },
  createdAt: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
});

const collection = new mongoose.model("userslist", loginSchema);

module.exports = collection;
