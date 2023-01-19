const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    username: String,
    mail: String,
    password: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

app.use(cors());
app.use(bodyParser.json());

app.get("/users", (req, res) => {
  User.find({}, (err, users) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(users);
    }
  });
});

// app.post("/users", (req, res) => {
//   const user = req.body;
//   User.create(user, (err, data) => {
//     if (err) {
//       res.status(500).send(err);
//     } else {
//       res.status(201).send(data);
//     }
//   });
// });

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  User.findByIdAndDelete(id, (err, data) => {
    if (err) {
      res.status(500).send;
    } else {
      res.status(200).send(data);
    }
  });
});
const PORT = process.env.PORT || 3000;
const DB = process.env.DB_URL.replace("<password>", process.env.PASSWORD);

mongoose.connect(DB, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  }
});
