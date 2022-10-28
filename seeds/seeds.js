/* eslint-disable no-unused-vars */
const sequelize = require('../config/connection');
const {
  User,
  Product,
  Order,
  Cart,
  ProductCart,
  ProductOrder,
} = require('../models');

const userData = require('./userData.json');
const cartData = require('./cartData.json');
const orderData = require('./orderData.json');
const productData = require('./productData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const cart = await Cart.bulkCreate(cartData, {
    individualHooks: true,
    returning: true,
  });

  const order = await Order.bulkCreate(orderData, {
    individualHooks: true,
    returning: true,
  });

  const product = await Product.bulkCreate(productData, {
    individualHooks: true,
    returning: true,
  });

  for (let i = 0; i < 10; i++) {
    await ProductOrder.create({
      order_id: order[Math.floor(Math.random() * order.length)].id,
      product_id: product[Math.floor(Math.random() * product.length)].id,
    });
  }

  for (let i = 0; i < 10; i++) {
    await ProductCart.create({
      cart_id: cart[Math.floor(Math.random() * cart.length)].id,
      product_id: product[Math.floor(Math.random() * product.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
