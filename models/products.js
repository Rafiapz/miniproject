const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/users")

  .then(() => {
    console.log("mongoDB products connected");
  })
  .catch(() => {
    console.log("mongoDb products connection failled");
  });

const productsSchema = new mongoose.Schema({
  no: {
    type: Number,
  },
  product: {
    type: String,
  },
  price: {
    type: String,
  },
  available: {
    type: String,
  },
});

const productsCol = new mongoose.model("products", productsSchema);

module.exports = productsCol;
