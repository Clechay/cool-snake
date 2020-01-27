const process = require('process');
const env = process.env;

// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'cs_postgresdb',
      user: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB
    },
    pool: { min: 0, max: 7 }
  },

  staging: {
    client: 'pg',
    connection: {
      host: 'cs_postgresdb',
      user: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB
    },
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: 'cs_postgresdb',
      user: env.POSTGRES_USER,
      password: env.POSTGRES_PASSWORD,
      database: env.POSTGRES_DB
    },
    pool: { min: 0, max: 7 },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
