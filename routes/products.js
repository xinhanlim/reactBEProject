const express = require('express');
const router = express.Router();
const productsService = require('../services/productsService')


router.get('/', async (req,res) =>{
    const products = await productsService.getAllProducts();
    res.json(
        products
    )
})

router.get('/:id', async (req,res) => {
    const products = await productsService.getProductsById();
    res.json(
        products
    )
})

module.exports = router;