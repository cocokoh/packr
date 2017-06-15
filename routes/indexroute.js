var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var db = mongoose.connection
var User = require('../models/usermodel')
var passport = require('passport')
var config = require('../config/ppConfig')
var isLoggedIn = require('../middleware/isLoggedIn')
var Item = require('../models/itemmodel')
var Category = require('../models/categorymodel')
var bundleCart = require('../models/bundlecartmodel')

router.get('/', function(req, res) {
  Item.findOne({}, function(err, data) {
    res.render('homepage', {product: data})
  })
})

router.get('/products/', function(req, res) {
  Item.find({
    category: req.params.category
  }, function(err, data) {
    var currentIndex = data.length,
      temporaryValue,
      randomIndex

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex -= 1

      // And swap it with the current element.
      temporaryValue = data[currentIndex]
      data[currentIndex] = data[randomIndex]
      data[randomIndex] = temporaryValue
    }
    res.render('pictures', {picture: data})
  })
})

router.get('/viewcart', isLoggedIn, function(req, res) {
  bundleCart.find({
    user: req.user.id,
    bundle: true
  }, function(err, data) {
    Item.find({}, function(err, data1) {
      data.forEach(function(data2, index){
        if(data.length-1 == index){
      res.render('cart', {
        cart: data,
        item: data1,
        price: data2.price
      })
      }
    })
  })
})
})


router.get('/register', function(req, res) {
  res.render('signup')
})

router.post('/register', function(req, res) {
  var first_name = req.body.first_name
  var email = req.body.email
  var password = req.body.password
  var contact = req.body.contact
  var admin = true
  var address = req.body.address

  var newUser = new User({
    first_name: first_name,
    password: password,
    contact: contact,
    email: email,
    admin: admin,
    address: address
  })

  if (newUser.first_name === '' || newUser.email === '' || newUser.password === '') {
    res.send('error')
  } else {
    newUser.save(function(err, data) {
      if (err) {
        throw err
      }
      res.redirect('/')
    })
  }
})

router.get('/logout', function(req, res) {
  req.logout()
  // FLASH
  req.flash('success', 'You have logged out')
  res.redirect('/')
})

router.get('/login', function(req, res) {
  res.send('hi')
})
router.post('/login', passport.authenticate('local', {
  failureFlash: 'Unsuccessful',
  failureRedirect: 'back',
  successRedirect: 'back'
}), (req, res) => {
  User.findOne({
    _id: req.user.id
  }, function(err, data) {
    if (err) {
      throw err
    }
  })
})

module.exports = router
