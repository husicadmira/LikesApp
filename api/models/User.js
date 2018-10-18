var bcrypt = require('bcryptjs');

module.exports = {
  primaryKey: 'id',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    username: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      minLength: 8,
      required: true,
    },
    likedByUsers: {
      collection: 'like',
      via: 'likedUser',
    },
    likedUsers: {
      collection: 'like',
      via: 'likedByUser',
    },
  },
  customToJSON: function () {
    var obj = this
    delete obj.password
    return obj;
  },
  beforeCreate: function (values, cb) {
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  },
  beforeUpdate: function (values, cb) {
    bcrypt.hash(values.password, 10, function (err, hash) {
      if (err) return cb(err);
      values.password = hash;
      cb();
    });
  },
  comparePassword: function (password, user) {
    return new Promise(function (resolve, reject) {
      bcrypt.compare(password, user.password, function (err, match) {
        resolve(match)
      })
    });
  }
};
