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
  onDelete: 'CASCADE',
  through: {
    model: ProductCart,
    unique: false,
  },
});
Product.belongsToMany(Cart, {
  onDelete: 'CASCADE',
  through: {
    model: ProductCart,
    unique: false,
  },
});
Cart.hasMany(ProductCart, {
  foreignKey: 'cart_id',
  onDelete: 'CASCADE',
});
ProductCart.belongsTo(Cart, {
  foreignKey: 'cart_id',
});
Product.hasMany(ProductCart, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});
ProductCart.belongsTo(Product, {
  foreignKey: 'product_id',
});

// order and production relationship (many to many)
Order.belongsToMany(Product, {
  onDelete: 'CASCADE',
  through: {
    model: ProductOrder,
    unique: false,
  },
});
Product.belongsToMany(Order, {
  onDelete: 'CASCADE',
  through: {
    model: ProductOrder,
    unique: false,
  },
});
Order.hasMany(ProductOrder, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE',
});
ProductOrder.belongsTo(Order, {
  foreignKey: 'order_id',
});
Product.hasMany(ProductOrder, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});
ProductOrder.belongsTo(Product, {
  foreignKey: 'product_id',
});

module.exports = { Cart, Product, Order, User, ProductCart, ProductOrder };
