var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PromiseSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('Promise', PromiseSchema);
