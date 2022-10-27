const Cart = require('./Cart');
const Order = require('./Order');
const Product = require('./Product');
const User = require('./User');
const ProductCart = require('./product-cart');
const ProductOrder = require('./product-order');

// user and cart relationship (one to one)
User.hasOne(Cart, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Cart.belongsTo(User, {
  foreignKey: 'user_id',
});

// user and order relationship (one to many)
User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'SET NULL',
});
Order.belongsTo(User, {
  foreignKey: 'user_id',
});

// cart and production relationship (many to many)
Cart.belongsToMany(Product, {
  through: {
    model: ProductCart,
    unique: false,
  },
});
Product.belongsToMany(Cart, {
  through: {
    model: ProductCart,
    unique: false,
  },
});

// order and production relationship (many to many)
Order.belongsToMany(Product, {
  through: {
    model: ProductOrder,
    unique: false,
  },
});
Product.belongsToMany(Order, {
  through: {
    model: ProductOrder,
    unique: false,
  },
});

module.exports = { Cart, Product, Order, User, ProductCart, ProductOrder };
