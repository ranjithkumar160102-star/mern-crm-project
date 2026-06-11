const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://kumar:kumar123@cluster0.izpywsj.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Connected!");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
  });