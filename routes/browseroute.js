var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var User = require('../models/usermodel')
var isLoggedIn = require('../middleware/isLoggedIn')
var Item = require('../models/itemmodel')
var Category = require('../models/categorymodel')
var bundleCart = require('../models/bundlecartmodel')

router.get('/products/women', function(req, res) {
  Item.find({
    gender: "female"
  }, function(err, data) {
    Item.find({gender: "female"}).distinct("category").exec(function(err, data1) {
      res.render('women', {
        female: data,
        category: data1
      })
    })
  })
})

router.get('/products/men', function(req, res) {
  Item.find({
    gender: "male"
  }, function(err, data) {
    Item.find({gender: "male"}).distinct("category").exec(function(err, data1) {
      res.render('men', {
        male: data,
        category: data1
      })
    })
  })
})

router.get('/bundle/women', function(req, res) {
  Item.find({
    gender: "female"
  }, function(err, data) {
    Item.find({gender: "female"}).distinct("category").exec(function(err, data1) {
      res.render('bundlewomen', {
        category: data1,
        female: data
      })
    })
  })
})

router.get('/bundle/men', function(req, res) {
  Item.find({
    gender: "male"
  }, function(err, data) {
    Item.find({gender: "male"}).distinct("category").exec(function(err, data1) {
      res.render('bundlemen', {
        category: data1,
        male: data
      })
    })
  })
})

router.post('/bundle/women', function(req, res) {
  Item.find({
    picture: req.body.picture,
    gender: "female"
  }, function(err, data) {
    var item = []
    var user = req.user.id
    var bundle = true
    var price = 69
    var gender = "female"
    data.forEach(function(each, index) {
      item.push(each.id)
      var newBundle = new bundleCart({items: item, user: user, bundle: bundle, price: price, gender: gender})
      if (index === data.length - 1) {
        newBundle.save(function(err, data1) {
          res.redirect('/viewcart')
        })
      }
    })
  })
})

router.post('/bundle/men', function(req, res) {
  Item.find({
    picture: req.body.picture,
    gender: "male"
  }, function(err, data) {
    var item = []
    var user = req.user.id
    var bundle = true
    var price = 69
    var gender = "male"
    data.forEach(function(each, index) {
      item.push(each.id)
      var newBundle = new bundleCart({items: item, user: user, bundle: bundle, price: price, gender: gender})
      newBundle.save(function(err, data1) {
        if (data.length - 1 === index) {
          res.redirect('/viewcart')
        }
      })
    })
  })
})

router.post('/products/women', function(req, res) {
  Item.find({
    picture: req.body.picture,
    gender: "female"
  }, function(err, data) {
    var user = req.user.id
    var bundle = false
    var gender = "female"
    var item = []
    var quantity = req.body.quantity

    data.forEach(function(each, index) {
      item.push(each.id)
      var newBundle = new bundleCart({items: item, user: user, bundle: bundle, gender: gender, quantity: quantity})
      newBundle.save()
    })
    res.send('success')
  })
})

router.delete('/products/women', function(req, res) {
  Item.find({
    picture: req.body.picture,
    gender: "female"
  }, function(err, data) {
    bundleCart.findOne({
      item: data.id,
      user: req.user.id
    }, function(err,data1){
    data1.remove()
  })
})
})

router.post('/products/men', function(req, res) {
  Item.find({
    picture: req.body.picture,
    gender: "male"
  }, function(err, data) {
    var user = req.user.id
    var bundle = false
    var gender = "male"
    var item = []
    data.forEach(function(each, index) {
      item.push(each.id)
      var newBundle = new bundleCart({items: item, user: user, bundle: bundle, gender: gender, quantity: quantity})
      newBundle.save(function(err, data1) {
        if (data.length - 1 === index) {
          res.redirect('/viewcart')
        }
      })
    })
  })
})

module.exports = router
