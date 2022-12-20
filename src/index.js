const express = require("express");
const route = require("./router");
const mongoose = require("mongoose");
 const app = express();
 app.use(express.json());

 mongoose
  .connect(
    "mongodb+srv://Gyaneshwer694:gYaN0694Mdb@cluster1.i15rwas.mongodb.net/?retryWrites=true&w=majority",
    { UseNewUrlParser: true }
  )
  .then(() => console.log("Mongo-Db is connected"))
  .catch((err) => console.log(err.message))

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("listening at " + (process.env.PORT || 3000));
});