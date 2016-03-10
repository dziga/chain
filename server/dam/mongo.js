var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chain');

var Promise     = require('../model/promise');


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
      promise.startTime = req.body.since;
      promise.history.push(req.body.history);

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

  exports.getCurrentPromises = function(req, res) {
    var start = new Date();
    start.setHours(0,0,0,1);
    console.log(start);
    var end = new Date();
    end.setHours(23,59,59,999);
    end.setDate(end.getDate()+2);
    console.log(end);

    Promise.aggregate([
        {$unwind: '$history'},
        {$match: {'history.atTime': {$gte: start, $lte: end}}}

       ],

       function(err, promises) {
        if (err) {
            res.send(err);
        }

        res.json(promises);
      });
  }
