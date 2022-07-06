const express = require("express")
const router = express.Router()

const Store = require("../models/store")

router.get("/", async (req, res, next) => {
  try {
    //take user email and password and authenticate
    const products = await Store.listProducts();
    return res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
});
module.exports = router