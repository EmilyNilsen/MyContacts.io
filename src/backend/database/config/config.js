require('dotenv').config();

module.exports = {
  development: {
    secret: process.env.JWT_SECRET,
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'contact_list',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  test: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'contact_list',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
  production: {
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'contact_list',
    host: process.env.HOSTNAME,
    dialect: 'mysql',
  },
};
