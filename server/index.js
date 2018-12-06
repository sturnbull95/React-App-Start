var express = require("express");
var bodyParser = require("body-parser");
const db = require("../database/index.js");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
const morgan = require("morgan");

var app = express();
const port = 3000;
const path = require("path");

// UNCOMMENT FOR REACT
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "../public")));

app.use(bodyParser.urlencoded({ extended: true }));
app.get("/pok", function(req, res) {
  var n = db.Pokemon.count();
  var r = Math.floor(Math.random() * 650);
  db.Pokemon.find({})
    .limit(1)
    .skip(r)
    .exec(function(err, data) {
      res.send(data[0]);
    });
});
app.get("/user", function(req, res) {
  console.log(req.query);
  db.User.find({ username: req.query.username }, function(err, data) {
    res.send(data);
  });
});
app.patch("/user", function(req, res) {
  db.User.update(
    { username: req.body.username },
    { $set: { party: req.body.party } },
    function(err, data) {
      res.send(data);
    }
  );
});
app.patch("/userBox", function(req, res) {
  db.User.update(
    { username: req.body.username },
    { $set: { box: req.body.box } },
    function(err, data) {
      res.send(data);
    }
  );
});
app.patch("/bag", function(req, res) {
  console.log(req.body);
  db.User.update(
    { username: req.body.username },
    { $set: { bag: req.body.bag } },
    function(err, data) {
      res.send(data);
    }
  );
});
app.get("/choose", function(req, res) {
  db.Pokemon.find(
    {
      $or: [
        { name: "Pikachu" },
        { name: "Bulbasaur" },
        { name: "Charmander" },
        { name: "Squirtle" }
      ]
    },
    function(err, data) {
      console.log(data);
      res.send(data);
    }
  );
});
app.get("/find", function(req, res) {
  console.log(req.params, req.query);
  db.Pokemon.find({ name: req.query.which }, function(err, data) {
    res.send(data);
  });
});
app.post("/user", function(req, res) {
  console.log("user", req.body);
  db.User.create(
    {
      username: req.body.params.username,
      party: [],
      box: [],
      bag: {
        "poke ball": 15,
        "great ball": 0,
        "ultra ball": 0,
        "master ball": 0
      }
    },
    function(err, data) {
      res.send(data);
    }
  );
});

app.listen(port, function() {
  console.log("listening on port 3000!");
});
