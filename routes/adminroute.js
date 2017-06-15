var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var passport = require('passport')
var config = require('../config/ppConfig')
var isLoggedIn = require('../middleware/isLoggedIn')
var Item = require('../models/itemmodel')
var Category = require('../models/categorymodel')
var cloudinary = require('cloudinary')
var multer = require('multer')
var upload = multer({dest: 'uploads'})
var fs = require('fs');

router.get('/products', function(req, res) {
    Item.find({}).distinct('gender').exec(function(err, data1){
    Item.find({}).distinct('category').exec(function(err, data){
    Item.find({}, function(err,data2){
      res.render('products', {
      category: data,
      gender: data1,
      item: data2
    })
  })
})
})
})

router.post('/products/add', upload.single('cityPicture'), function(req, res) {
  cloudinary.uploader.upload(req.file.path, function(result) {
    if (result)
    var item = req.body.item
    var price = req.body.price
    var picture = result.secure_url
    var category = req.body.category
    var inventory = req.body.inventory
    var availability = req.body.availability
    var description = req.body.description
    var gender = req.body.gender

    var newItem = new Item({item: item, price: price, picture: picture, category: category, inventory: inventory, availability: availability, description: description, gender:gender})

    newItem.save(function(err, data) {
      if (err)
        throw err
      res.redirect('/admin/products')
    })
  })
})
module.exports = router
