var _ = require('lodash');
//IMPORTANT: for create/update functions async-await syntax is used. Because of the bug with the newest version of sails for functions find/findOne 
//syntax find().exec(function etc.) is used. 
module.exports = {
  create: async function (req, res) {
    var parameters = [
      'username', 'password'
    ]
    var data = _.pick(req.body, parameters);
    let user = await User.create(data).fetch();
    if (user) {
      let responseData = {
        data: user,
        message: 'User successfully created.'
      }
      return res.status(200).json(responseData);
    }
    let responseData = {
      message: 'An issue occured during creation'
    }
    return res.status(400).json(responseData);
  },

  updatePassword: async function (req, res) {
    var parameters = [
      'password'
    ]
    var data = _.pick(req.body, parameters);
    let user = await User.update({ id: req.current_user.id }).set({ password: data.password }).fetch();
    if (user) {
      let responseData = {
        data: user,
        message: 'Password is successfully updated.'
      }
      return res.status(200).json(responseData);
    }
    let responseData = {
      message: 'An error occured during update'
    }
    return res.status(400).json(responseData);
  },

  getLoggedUser: function (req, res) {
    User.findOne({ id: req.current_user.id }).exec(function (err, user) {
      if (err) {
        return res.json(err);
      }
      if (!user) {
        let responseData = {
          message: 'User not found'
        }
        return res.status(404).json(responseData);
      }
      let responseData = {
        data: user,
      }
      return res.status(200).json(responseData);
    })
  },

  getUsersOrderdByLikes: function (req, res) {
    User.find().populate('likedByUsers').exec(function (err, users) {
      if (err) {
        return res.json(err);
      }
      if (!users) {
        let responseData = {
          message: 'User not found'
        }
        return res.status(404).json(responseData);
      }
      users.map(user => {
        user.likedByUsers = user.likedByUsers.length
      })
      users.sort((a, b) => {
        return parseInt(b.likedByUsers, 10) - parseInt(a.likedByUsers, 10);
      })
      let responseData = {
        users: users,
      }
      return res.status(200).json(responseData);
    });
  },

  getUserWithLikes: function (req, res) {
    User.findOne({ id: req.params.id }).populate('likedByUsers').exec(function (err, user) {
      if (err) {
        return res.json(err);
      }
      if (!user) {
        let responseData = {
          message: 'User not found'
        }
        return res.status(404).json(responseData);
      }
      let responseData = {
        username: user.username,
        numberOfLIkes: user.likedByUsers.length
      }
      return res.status(200).json(responseData);
    });
  }
}