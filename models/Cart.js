const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    unique: true,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  items: {
    type: DataTypes.JSONB,
    defaultValue: []
  },
  totalPrice: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  totalItems: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
}, {
  timestamps: true,
  hooks: {
    beforeSave: (cart) => {
      // Calculate totals
      if (cart.items && Array.isArray(cart.items)) {
        cart.totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
        cart.totalPrice = cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      }
    }
  }
});

module.exports = Cart;
