var mongoose = require('mongoose')
var User = require('../models/usermodel')
var Item = require('../models/itemmodel')



var bundleCartSchema = new mongoose.Schema({
  items: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Item'
  }],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  bundle: {
    type: Boolean
  },
  price: {
    type: Number
  },
  gender: {
    type: String
  },
  quantity: {
    type: Number
  }
})

var bundleCart = mongoose.model('bundleCart', bundleCartSchema)

module.exports = bundleCart
