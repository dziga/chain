var Promise     = require('../model/promise.model');
var User        = require('../model/user.model');
var jwt         = require('jwt-simple');
var config      = require('../config/database');

var START_FREQUENCY = 0;

function countNextTime(date, frequency, frequencyType) {
  var nextDate = new Date(date);
  switch (frequencyType) {
    case 'month'  :  nextDate.setMonth(date.getMonth() + frequency);  return nextDate.getTime();
    case 'week'   :  nextDate.setDate(date.getDate() + 7*frequency);  return nextDate.getTime();
    case 'day'    :  nextDate.setDate(date.getDate() + frequency);  return nextDate.getTime();
    case 'hour'   :  nextDate.setDate(date.getDate() + (frequency == 0 ? 0 : 1));  return nextDate.getTime();
  }
}

exports.getPromises = function (req, res) {
  var token = getToken(req.headers);
  var made;

  if (token) {
    var decoded = jwt.decode(token, config.secret);
    User.findOne({
      name: decoded.name
    }, function (err, user) {
        Promise.find({madeBy: user}).select("-history").exec(function(err, promises) {
          if (err) {
              res.send(err);
          }
          res.json(promises);
        });
    });
  }
}

exports.getAllPromises = function (req, res) {

  Promise.find({public: true}).populate('madeBy').select("-history").sort('-startTime').exec(function(err, promises) {
    if (err) {
        res.send(err);
    }
    res.json(promises);
  });

}

exports.createPromise =  function(req, res) {

      var promise = new Promise();

      promise.name = req.body.name;
      promise.frequency = req.body.frequency;
      promise.frequencyType = req.body.frequencyType;
      promise.duration = req.body.duration;
      promise.durationType = req.body.durationType;
      promise.details = req.body.details;
      promise.startTime = new Date().getTime();
      promise.madeBy = req.body.user;
      promise.public = req.body.public;

      var history = {};
      history.atTime = countNextTime(new Date(), START_FREQUENCY, promise.frequencyType);
      history.done = false;
      promise.history.push(history);

      promise.save(function(err) {
          if (err) {
            res.send(err);
          }
          res.json(promise);
      });
  }

  exports.getPromiseById = function(req, res) {
      Promise.findById(req.params.promise_id, function(err, promise) {
          if (err) {
            res.send(err);
          }
          res.json(promise);
      });
  }

  exports.updatePromise = function(req, res) {

      Promise.findById(req.params.promise_id, function(err, promise) {
          if (err) {
            res.send(err);
          }

          promise.name = req.body.name;
          promise.duration = req.body.duration;
          promise.durationType = req.body.durationType;
          promise.details = req.body.details;
          promise.public = req.body.public;

          promise.history.filter(function(item) {
              if (req.body.history && item._id == req.body.history._id) {
                item.done = req.body.history.done;
                if (!item.nextCreated) {
                  var history = {};
                  history.atTime = countNextTime(new Date(item.atTime), promise.frequency, promise.frequencyType);
                  history.done = false;
                  promise.history.push(history);
                  item.nextCreated = true;
                }
              }

              if (promise.frequency != req.body.frequency || promise.frequencyType != req.body.frequencyType) {
                  //remove next planned one in case frequency is changed
                  //so that new can be planned
                  if (item.nextCreated == false) {
                    promise.history.pop(item);
                    var newTime = new Date(promise.history.length ? promise.history[promise.history.length - 1].atTime : promise.startTime);
                    var history = {};
                    history.atTime = countNextTime(newTime, req.body.frequency, req.body.frequencyType);
                    history.done = false;
                    promise.history.push(history);
                  }

              }

          });


          promise.frequency = req.body.frequency;
          promise.frequencyType = req.body.frequencyType;

          promise.save(function(err) {
              if (err) {
                res.send(err);
              }
              res.json({ message: 'Promise has been adjusted!' });
          });

      });
  }

  exports.deletePromise = function(req, res) {

      Promise.findById(req.params.promise_id, function(err, promise) {
          if (err) {
            res.send(err);
          }

          promise.remove(function(err) {
              if (err) {
                res.send(err);
              }
              res.json({ message: 'Promise has been deleted!' });
          });

      });
  }

  exports.getCurrentPromises = function(req, res) {
    var start = new Date();
    start.setHours(0,0,0,1);
    var end = new Date();
    end.setHours(23,59,59,999);
    // end.setDate(end.getDate()+40);

    var token = getToken(req.headers);
    var made;

    if (token) {
      var decoded = jwt.decode(token, config.secret);
      User.findOne({
        name: decoded.name
      }, function (err, user) {

          Promise.aggregate([
            {$match: {madeBy : user._id}},
            {$unwind: '$history'},
            {$match: {'history.atTime': {$gte: start.getTime(), $lte: end.getTime()}}}

           ],

           function(err, promises) {
            if (err) {
                res.send(err);
            }

            res.json(promises);
          });
      });
    }
  }
