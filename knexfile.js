module.exports = {
  development: {
    client: "mysql",
    connection: process.env.MYSQL_URI,
    migrations: {
      directory: __dirname + "/mysql/migrations"
    },
    seeds: {
      directory: __dirname + "/mysql/seeds"
    }
  },

  staging: {
    client: "mysql",
    connection: process.env.MYSQL_URI,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/mysql/migrations"
    },
    seeds: {
      directory: __dirname + "/mysql/seeds"
    }
  },

  production: {
    client: "mysql",
    connection: process.env.MYSQL_URI,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + "/mysql/migrations"
    }
  }
};
