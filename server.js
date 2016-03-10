// BASE SETUP
// =============================================================================

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var mongo       = require('./server/dam/mongo')

// API
// =============================================================================
var router = express.Router();

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept, Key");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  // logging
  console.log(req);
  next();
});

router.route('/promises')
    .post(mongo.createPromise)
    .get(mongo.getPromises);

router.route('/promises/:promise_id')
    .get(mongo.getPromiseById)
    .put(mongo.updatePromise);

router.route('/promise/current')
    .get(mongo.getCurrentPromises);

router.get('/', function(req, res) {
    res.json({ message: 'Hello world' });
});

// REGISTER ROUTES
app.use('/', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server is running on port ' + port);
