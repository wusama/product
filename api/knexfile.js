module.exports = {
  development: {
    client: "pg",
    connection: {
      user: "postgres",
      host: "127.0.0.1",
      port: 5432,
      password: "sasa",
      database: "product",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};
