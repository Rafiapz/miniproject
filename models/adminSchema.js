const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/users")

  .then(() => {
    console.log("mongoDB admin connected");
  })
  .catch(() => {
    console.log("mongoDb admin connection failled");
  });

const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const adminCol = new mongoose.model("adminCollection", adminSchema);

module.exports = adminCol;
