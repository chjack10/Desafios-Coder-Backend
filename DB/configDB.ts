export const mariaDBOptions = {
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    port: 3306,
    user: 'chjack',
    password: 'password1234',
    database: 'test',
  },
  pool: {
    min: 0,
    max: 7,
  },
};

export const sqliteOptions = {
  client: 'sqlite3',
  connection: {
    filename: __dirname + '/ecommerce.sqlite',
  },
  useNullAsDefault: true,
};
