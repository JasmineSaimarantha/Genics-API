const {
  Schema,
  model
} = require("mongoose");

// Create schema
// - name: String
// - price: Number
const Product = Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = model('Products', Product);