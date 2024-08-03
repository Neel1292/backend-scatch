const express = require("express");
const isLoggedIn = require("../middleware/isLoggedIn");
const router = express.Router();
const productModel = require("../models/product-model");


router.get("/", function (req, res) {
  let error = req.flash("error");
  res.render("index", { error });
});

// router.get("/shop", isLoggedIn, function (req, res) {
router.get("/shop", async function (req, res) {
  let products = await productModel.find();
  res.render("shop", { products }); 
});

module.exports = router;