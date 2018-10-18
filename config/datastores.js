
module.exports.datastores = {

  default: {
    adapter: 'sails-mysql',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'datadb'

  },
  test: {
    adapter: 'sails-mysql',
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'testdb'
  }

};
