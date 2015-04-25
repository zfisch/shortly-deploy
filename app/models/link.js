var mongoose = require('mongoose');
var crypto = require('crypto');


var linkSchema = mongoose.Schema({
  url: { type: String, required: true },
  base_url: { type: String, require: true },
  code: { type: String },
  title: { type: String },
  visits: { type: Number }
});

var Link = mongoose.model('Link', linkSchema);

var createSha = function(url){
  var shasum = crypto.createHack('sha1');
  shasum.update(url);
  return shasum.digest('hex').slice(0, 5);
};

linkSchema.pre('save', function(next){
  var code = createSha(this.url);
  this.code = code;
  next();
});

module.exports = Link;
