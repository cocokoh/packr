var mongoose = require('mongoose')
var Category = require('../models/categorymodel')

var itemSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  picture: {
    type: String
  },
  category: {
    type: String,
    ref: 'Category'
  },
  inventory: {
    type: Number
  },
  availability: {
    type: Boolean,
    required: true
  },
  description: {
    type: String
  },
  gender:{
    type: String
  }
})

var Item = mongoose.model('Item', itemSchema)

module.exports = Item
