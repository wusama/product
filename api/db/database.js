const db = require("knex")(require("../knexfile").development);

module.exports = db;
