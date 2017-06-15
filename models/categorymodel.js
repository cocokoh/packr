var mongoose = require('mongoose')

var categorySchema = new mongoose.Schema({
  category: {
    type: String,
    required: true
  },
  gender: {
    type: String,
  }
})

var Category = mongoose.model('Category', categorySchema)

module.exports = Category
