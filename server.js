// BASE SETUP
// =============================================================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongoose   = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/chain');

var Promise     = require('./server/model/promise');


// API
// =============================================================================
var router = express.Router();

// app.all('/', function(req, res, next) {
//
//   next();
// });

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Key");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  // logging
  console.log(req);
  next();
});



router.route('/promises')
    .post(function(req, res) {

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

    })
    .get(function(req, res) {
      Promise.find(function(err, promises) {
          if (err) {
              res.send(err);
          }
          res.json(promises);
        });
    });

router.route('/promises/:promise_id')
    .get(function(req, res) {
        Promise.findById(req.params.promise_id, function(err, promise) {
            if (err) {
              res.send(err);
            }
            res.json(promise);
        });
    })
    .put(function(req, res) {

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

            promise.save(function(err) {
                if (err) {
                  res.send(err);
                }
                res.json({ message: 'Promise has been adjusted!' });
            });

        });
    });

    router.route('/promise/current')
        .get(function(req, res) {
          var start = new Date();
          start.setHours(0,0,0,1);
          console.log(start);
          var end = new Date();
          end.setHours(23,59,59,999);
          end.setDate(end.getDate()+2);
          console.log(end);
          //$gte: start,
          // Promise.find( {'history' : { $elemMatch : {'atTime':  {$gt: start, $lt: end}}}}, function(err, promises) {
          //     if (err) {
          //         res.send(err);
          //     }
          //
          //     res.json(promises);
          //   });

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




            // AccountModel.aggregate([
            //     { $match: {
            //         _id: accountId
            //     }},
            //     { $unwind: "$records" },
            //     { $group: {
            //         _id: "$_id",
            //         balance: { $sum: "$records.amount"  }
            //     }}
            // ], function (err, result) {
            //     if (err) {
            //         console.log(err);
            //         return;
            //     }
            //     console.log(result);
            // });


        });

router.get('/', function(req, res) {
    res.json({ message: 'Hello world' });
});

// REGISTER ROUTES
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port ' + port);
