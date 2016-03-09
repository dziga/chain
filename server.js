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
  console.log(req.params);
  console.log(req.param.id);
  console.log(req.query);
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

router.get('/', function(req, res) {
    res.json({ message: 'Hello world' });
});

// REGISTER ROUTES
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port ' + port);
