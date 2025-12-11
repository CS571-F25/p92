import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';
import User from './User.js';

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true, // Allow guest checkout
    references: {
      model: User,
      key: 'id'
    }
  },
  items: {
    type: DataTypes.JSON, // Store items as JSON
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  subtotal: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  deliveryFee: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 10.00
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
    validate: {
      isIn: [['pending', 'processing', 'completed', 'cancelled']]
    }
  },
  customerInfo: {
    type: DataTypes.JSON, // Store customer info as JSON
    allowNull: true
  },
  paymentInfo: {
    type: DataTypes.JSON, // Store payment info as JSON (paymentMethodId, last4, brand, etc.)
    allowNull: true
  }
}, {
  timestamps: true
});

// Set up association
Order.belongsTo(User, { foreignKey: 'userId', as: 'user' });
User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });

export default Order;
