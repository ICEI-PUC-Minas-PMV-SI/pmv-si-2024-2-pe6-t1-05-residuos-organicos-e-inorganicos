import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'ecoponto',
    port: 5432,
  },
  pool: { min: 2, max: 10 },
  useNullAsDefault: true,
});

export default connection;
