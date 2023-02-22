const auth = require("../middleware/auth.cjs");
const express = require("express");
const axios = require("axios");
const redis = require("redis");
const redisClient = redis.createClient();
const router = express.Router();

router.get("/products", async (req, res) => {
  redisClient.get("products", async (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      const products = await axios.get("https://dummyjson.com/products");
      redisClient.setex("products", 3600, JSON.stringify(products.data));
      res.send(products.data);
    }
  });
});

router.get("/products/:id", async (req, res) => {
  const _id = req.params.id;
  redisClient.get(_id, async (err, data) => {
    if (err) throw err;
    if (data !== null) {
      res.send(JSON.parse(data));
    } else {
      const product = await axios.get(`https://dummyjson.com/products/${_id}`);
      redisClient.setex(_id, 3600, JSON.stringify(product.data));
      res.send(product.data);
    }
  });
});

module.exports = router;
