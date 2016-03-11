// BASE SETUP
// =============================================================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var passport	 = require('passport');
var config     = require('./server/config/database');
var promise    = require('./server/dam/promise.dao');
var user       = require('./server/dam/user.dao');
var port       = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(config.database);
app.use(passport.initialize());

// API
// =============================================================================
var router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Key");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  // logging
  // console.log(req);
  next();
});

router.route('/signup')
  .post(user.signUp);

router.route('/promises')
    .post(promise.createPromise)
    .get(promise.getPromises);

router.route('/promises/:promise_id')
    .get(promise.getPromiseById)
    .put(promise.updatePromise)
    .delete(promise.deletePromise);

router.route('/promise/current')
    .get(promise.getCurrentPromises);

router.get('/', function(req, res) {
    res.json({ message: 'Hello world' });
});

// REGISTER ROUTES
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port ' + port);
