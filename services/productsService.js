const productDataLayer = require('../data/productsData')



async function getAllProducts(){
    return await productDataLayer.getAllProducts();
}

async function getProductsById(id){
    return await productDataLayer.getProductsById(id);
}

module.exports = {
    getAllProducts,
    getProductsById
}