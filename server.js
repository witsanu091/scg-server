const express = require("express");
const app = express();
const cors = require("cors");
app.use(
  cors({
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
const { validationResult } = require("express-validator");
const mongoose = require("mongoose");
const UserModel = require("./model/user-model");
const setText = require("./components/line-notify");
const { json } = require("express/lib/response");

mongoose.connect(
  "mongodb+srv://witsanu091:witsanuii091@scg-database.jiij1dx.mongodb.net/scg-database?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.once("open", function () {
  console.log("Connected to MongoDB successfully!");
});
db.on("error", function () {
  console.log(err);
});

app.get("/user/getUser", async (req, res) => {
  try {
    const errors = validationResult(req);
    const user = await UserModel.find({});
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "false no data",
        errors: errors.array(),
      });
    }
    res.status(200).json({ message: "success", data: user });
  } catch (error) {
    res.status(400).json({
      message: "false",
    });
  }
});

app.get("/user/getUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "false no data",
        errors: errors.array(),
      });
    }
    const result = await UserModel.findById(id);
    res.status(200).json({ message: "success", data: result });
  } catch (error) {
    res.status(400).json({
      message: "false",
      errors: error.array(),
    });
  }
});

app.post("/user/saveUser", async (req, res) => {
  try {
    const payload = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "request failed ",
        errors: errors.array(),
      });
    }
    const user = new UserModel(payload);
    await user.save();
    res.json({ message: "success", data: user });
    setText(user);
    res.status(201).end();
  } catch (error) {
    throw error;
  }
});

app.put("/user/saveUser/:id", async (req, res) => {
  try {
    const payload = req.body;
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "request failed ",
        errors: errors.array(),
      });
    }
    const user = await UserModel.findByIdAndUpdate(id, { $set: payload });
    res.status(200).json({ message: "success", data: user });
  } catch (error) {
    res.status(400).json({
      message: "network request failed ",
      errors: error.array(),
    });
  }
});

app.delete("/user/deleteUser/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "request failed ",
        errors: errors.array(),
      });
    }
    await UserModel.findByIdAndDelete(id);
    res.status(204).end();
  } catch (error) {
    res.status(400).json({
      message: "network request failed ",
      errors: error.array(),
    });
  }
});

app.listen(9000, () => {
  console.log("Application is running on port 9000");
});
