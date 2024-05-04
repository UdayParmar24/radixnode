const db = require('../config/db_config');
const sequelize = require('sequelize');

// Product Model
module.exports = db.define(
    'product', // Tab;e name
    {
        id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: sequelize.STRING, allowNull: false },
        price: { type: sequelize.DOUBLE, allowNull: false },
        description: { type: sequelize.STRING, allowNull: true },
        type: { type: sequelize.ENUM, values: ['print', 'promotional'] },
        image: { type: sequelize.STRING, allowNull: true }
    },
    {
        'freezeTableName': true
    }
);