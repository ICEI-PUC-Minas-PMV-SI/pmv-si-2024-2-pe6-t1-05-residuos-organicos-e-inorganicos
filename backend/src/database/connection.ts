import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    port: 5432,
  },
  pool: { min: 2, max: 10 },
  useNullAsDefault: true,
});

export default connection;
