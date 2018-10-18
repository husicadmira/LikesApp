module.exports = function (req, res, next) {
  if (req.headers && req.headers.token) {
    const token = req.headers.token;
    JwtService.verify(token, function (err, decoded) {
      if (err) return res.status(400).json({ message: 'Token not valid' });
      req.token = token;
      User.findOne({ id: decoded.id }).then(function (user) {
        req.current_user = user;
        next();
      })
    });
  }
}