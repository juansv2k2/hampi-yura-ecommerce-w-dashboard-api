module.exports = {
  development: {
    dialect: "mysql",
    host: "127.0.0.1",
    username: "root",
    password: null,
    database: "hampi_db",
    define: {
      underscored: true,
      paranoid: true,
    },
  },
  test: {
    dialect: "mysql",
    host: "127.0.0.1",
    username: "root",
    password: null,
    database: "hampi_test",
    define: {
      underscored: true,
      paranoid: true,
    },
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect: "postgres",
    define: {
      underscored: true,
      paranoid: true,
    },
  },
};
