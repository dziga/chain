var Promise     = require('../model/promise.model');

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
  Promise.find().select("-history").exec(function(err, promises) {
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
          promise.frequency = req.body.frequency;
          promise.frequencyType = req.body.frequencyType;
          promise.duration = req.body.duration;
          promise.durationType = req.body.durationType;
          promise.details = req.body.details;

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
          });

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

    Promise.aggregate([
        {$unwind: '$history'},
        {$match: {'history.atTime': {$gte: start.getTime(), $lte: end.getTime()}}}

       ],

       function(err, promises) {
        if (err) {
            res.send(err);
        }

        res.json(promises);
      });
  }
