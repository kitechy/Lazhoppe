const express = require('express');
const router = express.Router();

const Product = require("../models/Product");

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (e) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findOne({
            id: Number(req.params.id),
        });

        if(!product) {
            return res.status(404).json({
                message: "Product not found",
            });
        }

        res.json(product);
    } catch (e) {
        res.status(500).json({
            message: error.message,
        });
    }
});

router.get("/category/:category", async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.category,
        });
    } catch(e) {
        res.status(500).json({
            message: e.message,
        });
    }
});

module.exports = router;