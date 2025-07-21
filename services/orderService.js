const orderData = require('../data/orderData');

async function getOrderByUserId(userId){
    return await orderData.getOrderByUserId(userId)
}

async function createOrder(userId, orderItems){
    return await orderData.createOrder(userId, orderItems);
}

async function updateOrderSessionId(orderId, sessionId){
    return await orderData.updateOrderSessionId(orderId,sessionId);
}

async function getOrderDetails(orderId){
    return await orderData.getOrderDetails(orderId);
}

async function updateOrderStatus(orderId, status){
    return await orderData.updateOrderStatus(orderId, status);
}

module.exports = {
    getOrderByUserId,
    createOrder,
    getOrderDetails,
    updateOrderStatus,
    updateOrderSessionId
};