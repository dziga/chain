var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PromiseSchema   = new Schema({
    id: Schema.ObjectId,
    name: String,
    frequency: Number,
    frequencyType: String,
    duration: Number,
    durationType: String,
    details: String,
    startTime: Date
});

module.exports = mongoose.model('Promise', PromiseSchema);
