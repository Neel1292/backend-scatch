const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");


router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false});
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let products = await productModel.find();
  res.render("shop", { products }); 
});

router.get("/addtocart/:id", async function (req, res) {
  let user = await userModel.findOne({ user: req.user.email });
  res.render("shop", { products }); 
});

module.exports = router;