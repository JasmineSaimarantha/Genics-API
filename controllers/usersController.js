const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(201).json({
      message: "get user success",
      data: users,
    });
  } catch (e) {
    res.status(500).json({
      message: "get user fail",
      data: e,
    });
  }
};

const saveUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      age: req.body.age,
    });
    const result = await newUser.save();
    res.status(201).json({
      message: "save user success",
      data: result,
    });    
  } catch (error) {
    res.status(500).json({
      message: "save user fail",
      data: error,
    });
    console.log(error);
  }
};

const updateUser = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "must have ID parameter" });
    }
    const searchUser = await User.findById(req.params.id);
    if (!searchUser) {
      return res
        .status(204)
        .json({ message: "no product matches ID ${req.params.id}" });
    }
    if (req.body?.name) {
      searchUser.name = req.body.name;
    }
    if (req.body?.price) {
      searchUser.price = req.body.price;
    }
    const result = await searchUser.save();
    res.status(201).json({
      message: "update user success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "update user fail",
      data: error,
    });
    console.log(error);
  }
}

const deleteUser = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "must have ID parameter" });
    }
    const searchUser = await User.findById(req.params.id);
    if (!searchUser) {
      return res
        .status(204)
        .json({ message: "no product matches ID ${req.params.id}" });
    }
    const deletes = await searchUser.deleteOne({_id: req.params.id})
    res.status(201).json({
      message: "delete user success",
    });
  } catch (error) {
    res.status(500).json({
      message: "delete user fail",
      data: error,
    });
    console.log(error);
  }
}

module.exports = {
  getUsers,
  saveUser,
  updateUser,
  deleteUser
};
