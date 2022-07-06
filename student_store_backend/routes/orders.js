const db = require("../db");
const Order = require("../models/order")

const express = require("express");
const router = express.Router();
const security = require("../middleware/security")

router.get("/", async (req, res, next) => {
  try {
    const {user} = res.locals
    const orders = await Order.listOrdersForUser({user});
    return res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
});

router.post("/",security.requireAuthenticatedUser,  async (req, res, next) => {
  try {
      const {user} = res.locals
        const order = await Order.createOrder({user, order:req.body});
        return res.status(200).json({order})
    }
    catch (err)
    {
        next(err)
    }
})

module.exports = router