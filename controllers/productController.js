const Product = require("../models/Product");

// Get all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json({
      message: "get product success",
      data: products,
    });
  } catch (e) {
    res.status(500).json({
      message: "get product fail",
      data: e,
    });
  }
};

// Save a product
const saveProduct = async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
    });
    const result = await newProduct.save();
    res.status(201).json({
      message: "save product success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "save product fail",
      data: error,
    });
    console.log(error);
  }
};

// Update a product
const updateProduct = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "must have ID parameter" });
    }
    const searchProduct = await Product.findById(req.params.id);
    if (!searchProduct) {
      return res
        .status(204)
        .json({ message: "no product matches ID ${req.params.id}" });
    }
    if (req.body?.name) {
      searchProduct.name = req.body.name;
    }
    if (req.body?.price) {
      searchProduct.price = req.body.price;
    }
    const result = await searchProduct.save();
    res.status(201).json({
      message: "update product success",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      message: "update product fail",
      data: error,
    });
    console.log(error);
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  try {
    if (!req?.params?.id) {
      return res.status(400).json({ message: "must have ID parameter" });
    }
    const searchProduct = await Product.findById(req.params.id);
    if (!searchProduct) {
      return res
        .status(204)
        .json({ message: "no product matches ID ${req.params.id}" });
    }
    const deletes = await searchProduct.deleteOne({_id: req.params.id})
    res.status(201).json({
      message: "delete product success",
    });
  } catch (error) {
    res.status(500).json({
      message: "delete product fail",
      data: error,
    });
    console.log(error);
  }
};

module.exports = {
  getProducts,
  saveProduct,
  updateProduct,
  deleteProduct,
};
