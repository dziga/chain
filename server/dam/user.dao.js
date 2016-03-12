var User   = require('../model/user.model');
var jwt    = require('jwt-simple');
var config = require('../config/database');



exports.signUp = function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please provide username and password.'});
  } else {
    var newUser = new User({
      name: req.body.name,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
}

exports.authenticate = function(req, res) {
  if (!req.body.name || !req.body.password) {
    res.json({success: false, msg: 'Please provide username and password.'});
  }
  else {
    User.findOne({
      name: req.body.name
    }, function(err, user) {
      if (err) throw err;

      if (!user) {
        res.send({success: false, msg: 'Authentication failed.'});
      } else {
        user.comparePassword(req.body.password, function (err, isMatch) {
          if (isMatch && !err) {
            var token = jwt.encode(user, config.secret);
            res.json({success: true, token: 'JWT ' + token, user: user});
          } else {
            res.send({success: false, msg: 'Authentication failed.'});
          }
        });
      }
    });
  }
}

exports.getInfo = function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }).select("-password").exec(function(err, user) {
        if (err) throw err;

        if (!user) {
          return res.status(403).send({success: false, msg: 'Authentication failed. User not found.'});
        } else {
          res.json({success: true, user: user});
        }
    });
  } else {
    return res.status(403).send({success: false, msg: 'No token provided.'});
  }
}

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
}
