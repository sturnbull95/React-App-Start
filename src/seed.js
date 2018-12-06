const pokemon = require("./data.js");
const newPok = require("./newData.js");
const Pokemon = require("../database/index.js");
var photo = require("../photo.js");
//console.log(photo.photo[0][0].img.substring(1,photo.photo[0][0].img.length-2))
//var bulk = Pokemon.Pokemon.initializeUnorderedBulkOp();
var makeData = function() {
  photo.photo.forEach(function(item, i) {
    Pokemon.Pokemon.find({ name: item[0].name }).update(
      { $set: { img: item[0].img.substring(1, item[0].img.length - 2) } },
      function(err, res) {
        if (err) {
          console.log(err);
        } else {
          console.log(item.name);
        }
      }
    );
  });
};

makeData();
//
// const insertSampleBlogs = function() {
//   Pokemon.Pokemon.create(data)
//     .then(() => Pokemon.close());
// };
// insertSampleBlogs()
