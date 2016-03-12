var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var PromiseSchema   = new Schema({
    id: Schema.ObjectId,
    name: String,
    madeBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    frequency: Number,
    frequencyType: String,
    duration: Number,
    durationType: String,
    details: String,
    startTime: Number,
    history : [{
      atTime : Number,
      done : {type:Boolean, default: false},
      nextCreated: {type: Boolean, default: false}
    }]
});

module.exports = mongoose.model('Promise', PromiseSchema);
