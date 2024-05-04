const db = require('../config/db_config');
const sequelize = require('sequelize');


// var bcrypt = require("bcrypt");

// User Model
module.exports = db.define(
    'user', // model name
    {
        id: { type: sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        username: { type: sequelize.STRING, allowNull: false },
        email: { type: sequelize.STRING, unique: true },
        password: { type: sequelize.STRING, allowNull: false }
    },
    {
        'freezeTableName': true
    }
);
