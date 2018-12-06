var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/pokemon');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  name: String,
  img: String,
  type1: String,
  type2: String,
  healthStat: Number,
  attStat: Number,
  defStat: Number,
  spAttStat: Number,
  spDefStat: Number,
  speedStat: Number,
  gender: Number,
  moves: Array
});

var userSchema = mongoose.Schema({
  username: String,
  party: Array,
  box: Array,
  caught:Number,
  bag:Object
});


var Pokemon = mongoose.model('Pokemon', itemSchema);
var User = mongoose.model('User', userSchema);

module.exports.Pokemon = Pokemon;
module.exports.User = User;
