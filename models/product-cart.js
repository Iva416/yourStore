const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class ProductCart extends Model {}

ProductCart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'product',
        key: 'id',
      },
    },
    cart: {
      type: DataTypes.INTEGER,
      references: {
        model: 'cart',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product-cart',
  }
);

module.exports = ProductCart;
