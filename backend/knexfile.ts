import { resolve } from 'path';

module.exports = {
  client: 'pg',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'ecoponto',
    port: 5432,
  },
  migrations: {
    directory: resolve(__dirname, 'src', 'database', 'migrations'),
  },
  seeds: {
    directory: resolve(__dirname, 'src', 'database', 'seeds'),
  },
  useNullAsDefault: true,
}