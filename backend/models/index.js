const { Sequelize } = require("sequelize");
const config = require("../config/config");

const sequelize = new Sequelize(
  config.development.database,
  config.development.username,
  config.development.password,
  {
    host: config.development.host,
    dialect: config.development.dialect,
    logging: false,
  }
);

const User = require("./User")(sequelize);

const db = {
  sequelize,
  Sequelize,
  User,
};

module.exports = db;
