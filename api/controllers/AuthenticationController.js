module.exports = {
  login: function (req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (!username || !password) {
      let responseData = {
        message: 'Username or password missing'
      }
      return res.status(401).json(responseData);
    }

    User.findOne({ username: username }).exec(function (err, user) {
      if (err) {
        return res.json(err);
      }
      else if (!user) {
        let responseData = {
          message: 'User not found'
        }
        return res.status(404).json(responseData);
      }
      return signIn(req, res, password, user)
    })
  }
};

function signIn(req, res, password, user) {
  User.comparePassword(password, user).then(
    function (valid) {
      if (!valid) {
        let responseData = {
          message: 'Invalid credentials'
        }
        return res.status(400).json(responseData);
      } else {
        let responseData = {
          user: user,
          token: generateToken(user.id)
        }
        return res.status(200).json(responseData);
      }
    }
  )
};

function generateToken(userId) {
  return JwtService.issue({ id: userId })
};