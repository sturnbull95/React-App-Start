const pokemon = require("./data.js");
const newPok = require("./newData.js");
const Pokemon = require("../database/index.js");
var photo = require("../photo.js");
//console.log(photo.photo[0][0].img.substring(1,photo.photo[0][0].img.length-2))
//var bulk = Pokemon.Pokemon.initializeUnorderedBulkOp();
var makeData = function() {
  console.log("final");
  photo.photo.forEach(function(item, i) {
    //console.log(item[0].name);
    Pokemon.Pokemon.find({ name: item[0].name }).update(
      { $set: { img: item[0].img.substring(1, item[0].img.length - 2) } },
      function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(item[0].name);
        }
      }
    );
  });
};
var seedData = function(callback) {
  console.log("first");
  // console.log(newPok.data[0]);
  //console.log(pokemon.poke.length);
  pokemon.poke.forEach(function(item, i) {
    var seedObj = {
      name: item[0].name,
      img: null,
      type1: item[0].type1,
      type2: item[0].type2,
      healthStat: item[0].healthStat,
      attStat: item[0].attStat,
      defStat: item[0].defStat,
      spAttStat: item[0].spAttStat,
      spDefStat: item[0].spDefStat,
      speedStat: item[0].speedStat,
      gender: item[0].gender,
      moves: item[0].newObj
    };
    //console.log(seedObj, "OBJECT");
    Pokemon.Pokemon.create(seedObj);
  });
  callback();
  //pokemon.poke.asyncForEach(function(item, i) {});
  //pokemon;
};
//Adding first dataset of 9 pokemon
//seedData();

var seedNewData = function(callback) {
  console.log("im here");
  // console.log(newPok.data[0]);
  newPok.data.forEach(function(item, i) {
    var seedObj = {
      name: item[0].name,
      img: null,
      type1: item[0].type1,
      type2: item[0].type2,
      healthStat: item[0].healthStat,
      attStat: item[0].attStat,
      defStat: item[0].defStat,
      spAttStat: item[0].spAttStat,
      spDefStat: item[0].spDefStat,
      speedStat: item[0].speedStat,
      gender: item[0].gender,
      moves: item[0].newObj
    };
    Pokemon.Pokemon.create(seedObj);
  });
  //callback();
  //pokemon.poke.asyncForEach(function(item, i) {});
  //pokemon;
};
//Adds rest of pokemon
//seedNewData();

//modifies img to have correct tag
var allFunction = function(first, second, third) {
  first();
};
makeData();
// seedData(function() {
//   seedNewData();
// });
//
// const insertSampleBlogs = function() {
//   Pokemon.Pokemon.create(data)
//     .then(() => Pokemon.close());
// };
// insertSampleBlogs()
