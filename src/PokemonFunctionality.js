// functions to be used in pokemon game

var data = require("./data.js");
var types = require("./typeMove.js");

var multiplierDef = [
  { type: "normal", good: [], bad: ["rock", "steel"], none: ["ghost"] },
  {
    type: "fire",
    good: ["grass", "ice", "bug", "steel"],
    bad: ["fire", "water", "rock", "dragon"],
    none: []
  },
  {
    type: "water",
    good: ["fire", "ground", "rock"],
    bad: ["water", "grass", "dragon"],
    none: []
  },
  {
    type: "electric",
    good: ["water", "flying"],
    bad: ["electric", "grass", "dragon"],
    none: ["ground"]
  },
  {
    type: "grass",
    good: ["water", "ground", "rock"],
    bad: ["fire", "grass", "poison", "flying", "bug", "dragon", "steel"],
    none: []
  },
  {
    type: "ice",
    good: ["grass", "ground", "flying", "dragon"],
    bad: ["fire", "water", "ice", "steel"],
    none: []
  },
  {
    type: "fighting",
    good: ["normal", "ice", "rock", "dark", "steel"],
    bad: ["poison", "flying", "psychic", "bug", "fairy"],
    none: ["ghost"]
  },
  {
    type: "poison",
    good: ["grass", "fairy"],
    bad: ["poison", "ground", "rock", "ghost"],
    none: ["steel"]
  },
  {
    type: "ground",
    good: ["fire", "electric", "poison", "rock", "steel"],
    bad: ["grass", "bug"],
    none: ["flying"]
  },
  {
    type: "flying",
    good: ["grass", "fighting", "bug"],
    bad: ["electric", "rock", "steel"],
    none: []
  },
  {
    type: "psychic",
    good: ["fighting", "poison"],
    bad: ["psychic", "steel"],
    none: ["dark"]
  },
  {
    type: "bug",
    good: ["grass", "psychic", "dark"],
    bad: ["fire", "fighting", "poison", "flying", "ghost", "steel", "fairy"],
    none: []
  },
  {
    type: "rock",
    good: ["fire", "ice", "flying", "bug"],
    bad: ["fighting", "ground", "steel"],
    none: []
  },
  {
    type: "ghost",
    good: ["psychic", "ghost"],
    bad: ["dark"],
    none: ["normal"]
  },
  { type: "dragon", good: ["dragon"], bad: ["steel"], none: ["fairy"] },
  {
    type: "dark",
    good: ["psychic", "ghost"],
    bad: ["fighting", "dark", "fairy"],
    none: []
  },
  {
    type: "steel",
    good: ["ice", "rock", "fairy"],
    bad: ["fire", "water", "electric", "steel"],
    none: []
  },
  {
    type: "fairy",
    good: ["fighting", "dragon", "dark"],
    bad: ["fire", "poison", "steel"],
    none: []
  }
];

function getMoveType(moveName) {
  for (var ele in types.types[0][0]) {
    var tmp = ele
      .split(" ")
      .join("")
      .toLowerCase();
    if (
      tmp ===
      moveName
        .split(" ")
        .join("")
        .toLowerCase()
    ) {
      return types.types[0][0][ele];
    }
  }
  //return types.types[0][0][moveName]
}
//console.log(getMoveType('Accelerock'))

function stab(moveType, pokType) {
  for (var i = 0; i < pokType.length; i++) {
    if (moveType === pokType[i]) {
      return 1.5;
    }
  }
  return 1;
}
function catchRate(ball, currhp, maxhp) {
  var rand = Math.floor(Math.random() * 1000);
  var modify = currhp / maxhp;
  //console.log(modify)
  console.log(modify, rand, rand * modify, "datatatat");
  var upper = ball.toUpperCase();
  if (upper === "ULTRA BALL") {
    if (rand * modify < 600) {
      return true;
    } else {
      return false;
    }
  }
  if (upper === "GREAT BALL") {
    if (rand * modify < 500) {
      return true;
    } else {
      return false;
    }
  }
  if (upper === "MASTER BALL") {
    return true;
  } else {
    //console.log(rand*modify < 400)
    if (rand * modify < 400) {
      return true;
    } else {
      return false;
    }
  }
}
//console.log(catchRate('poke ball',500,500))

function dmgCalc(moveType, pokType, lvl, movepwr, att, def, typeArr) {
  var rand = Math.random() * (1.01 - 0.85) + 0.85;
  var first = (((2 * lvl) / 5 + 2) * movepwr * att) / def / 50 + 2;
  var crit = isCritical();
  if (crit) {
    crit = 1.5;
    //console.log('crit')
  } else {
    crit = 1;
  }
  var stabMult = stab(moveType, pokType);
  //console.log('hola',moveType,pokType,lvl,movepwr,att,def,typeArr)
  var effective = goodAgainstMove(
    moveType,
    multiplierDef,
    typeArr[0],
    typeArr[1]
  );
  var modifier = crit * stabMult * effective * rand;
  var final = first * modifier;
  if (final % 1 < 0.5) {
    return Math.floor(final);
  } else {
    return Math.ceil(final);
  }
}
//console.log('DMG',dmgCalc('electric',['electric',null],100,110,136,206,['grass','ice']))

function goodAgainstMove(moveType, moveArr, defenseType1, defenseType2) {
  var good = [];
  var bad = [];
  var even = [];
  var none = [];
  var multiplier = 1;
  for (var i = 0; i < moveArr.length; i++) {
    if (moveArr[i].type === moveType) {
      good = moveArr[i].good;
      bad = moveArr[i].bad;
      even = moveArr[i].even;
      none = moveArr[i].none;
      break;
    }
  }
  if (defenseType2) {
    if (good.includes(defenseType1)) {
      multiplier *= 2;
    }
    if (none.includes(defenseType1)) {
      multiplier *= 0;
    }
    if (bad.includes(defenseType1)) {
      multiplier *= 0.5;
    }
    if (good.includes(defenseType2)) {
      multiplier *= 2;
    }
    if (bad.includes(defenseType2)) {
      multiplier *= 0.5;
    }
    if (none.includes(defenseType2)) {
      multiplier *= 0;
    }
  } else {
    if (good.includes(defenseType1)) {
      multiplier *= 2;
    }
    if (bad.includes(defenseType1)) {
      multiplier *= 0.5;
    }
    if (none.includes(defenseType1)) {
      multiplier *= 0;
    }
  }
  return multiplier;
}
//console.log(goodAgainstMove("psychic",multiplierDef,"dark",'steel'))

function ivGen() {
  // var num = 0;
  var arr = [0, 0, 0, 0, 0, 0];
  // if(starter){
  //   num = 3;
  // }
  // if(legendary){
  //   num = 4;
  // }
  // if(special){
  //   num = variable;
  // }
  // else{
  for (var i = 0; i < 6; i++) {
    var iv = Math.floor(Math.random() * 32);
    arr[i] = iv;
  }
  return arr;
  //}
}
//console.log(ivGen())

function levelGen(hi, low) {
  var level = Math.floor(Math.random() * (hi - low + 1)) + low;
  return level;
}
//console.log(levelGen(30,25));

function natureGen() {
  var place = Math.floor(Math.random() * data.natures.length);
  return data.natures[place];
}
//console.log('NATURE',natureGen())

function moveGen(moves, level) {
  var movArr = [];
  var current = 0;
  var i = 0;
  while (current < level) {
    if (moves[i].moveLvl <= level) {
      movArr.push(moves[i].moveName);
    }
    current = moves[i + 1].moveLvl;
    i++;
    if (movArr.length > 4) {
      movArr = movArr.slice(1);
    }
  }
  return movArr;
}

function genderGen(female, male) {
  var gender = "";
  var fem = female * 10;
  var random = Math.floor(Math.random() * 1000);
  if (random <= fem) {
    gender = "female";
  } else {
    gender = "male";
  }
  return gender;
}
//console.log(genderGen(87.5,12.5))

function natureMod(nature, moveType) {
  let mult = 1;
  for (var i = 0; i < data.natures.length; i++) {
    if (data.natures[i][0] === nature) {
      if (data.natures[i][1] === moveType && data.natures[i][2] === moveType) {
        return 1;
      }
      if (data.natures[i][1] === moveType) {
        return 1.1;
      }
      if (data.natures[i][1] !== moveType && data.natures[i][2] !== moveType) {
        return 1;
      } else {
        return 0.9;
      }
    }
  }
}
//console.log(natureMod('Timid','Speed'))
function statsGen(hp, att, def, spd, spAtt, spDef, lvl, nature) {
  //[0] = BASE STAT
  //[1] = IV
  //[2] = EV
  var statArr = [];
  //floor(floor((2 * B + I + E) * L / 100 + 5) * N)
  // console.log(natureMod(nature,"Attack"))
  // console.log(natureMod(nature,"Defense"))
  // console.log(natureMod(nature,"Speed"))
  // console.log(natureMod(nature,"Sp. Att"))
  // console.log(natureMod(nature,"Sp. Def"))
  var attack = Math.floor(
    Math.floor(((2 * att[0] + att[1] + att[2]) * lvl) / 100 + 5) *
      natureMod(nature, "Attack")
  );
  var health =
    Math.floor(((2 * hp[0] + hp[1] + hp[2]) * lvl) / 100) + (lvl + 10);
  var defense = Math.floor(
    Math.floor(((2 * def[0] + def[1] + def[2]) * lvl) / 100 + 5) *
      natureMod(nature, "Defense")
  );
  var speed = Math.floor(
    Math.floor(((2 * spd[0] + spd[1] + spd[2]) * lvl) / 100 + 5) *
      natureMod(nature, "Speed")
  );
  var specialAtt = Math.floor(
    Math.floor(((2 * spAtt[0] + spAtt[1] + spAtt[2]) * lvl) / 100 + 5) *
      natureMod(nature, "Sp. Atk")
  );
  var specialDef = Math.floor(
    Math.floor(((2 * spDef[0] + spDef[1] + spDef[2]) * lvl) / 100 + 5) *
      natureMod(nature, "Sp. Def")
  );
  statArr.push({ attack, health, defense, speed, specialAtt, specialDef });
  return statArr;
}
function isCritical() {
  var rand = Math.floor(Math.random() * 10000);
  //console.log(rand)
  if (rand < 625) {
    return true;
  }
  return false;
}
//console.log(isCritical())

function getExp(enemyXP, enemyLvl, myLvl) {
  var a = Math.pow(enemyLvl * 2 + 10, 2.5);
  var b = (enemyLvl * enemyXP) / 5;
  var c = Math.pow(enemyLvl + myLvl + 10, 2.5);
  var a2 = a / c;

  var first = a2 * b + 1;
  return Math.floor(first);
}
//console.log(getExp(173,100,10))
//functions.addXP(context.state.pokeOut[0].level,context.state.pokeOut[0].toNextLvl)
function changemodifier(adjustedCategory, statsArr) {
  var newStats = statsArr;
  for (var i = 0; i < adjustedCategory.length; i++) {
    newStats[i] *= adjustedCategory[i];
  }
}
function addXP(myLvl, xpGain, tonext) {
  var obj = {};
  var nextLvl = tonext;
  //}
  //add value to pokemon object xp
  //check if pokemon hit threshold and levels up
  //if so level up
  while (xpGain > 0) {
    if (xpGain - nextLvl >= 0) {
      var dif = xpGain - nextLvl;
      xpGain -= tonext;
      myLvl++;
      nextLvl = 10;
      //for(var i = 0; i < 100;i++){
      nextLvl *= myLvl;
      nextLvl *= 10;
      nextLvl -= dif;
    } else {
      nextLvl -= xpGain;
      xpGain -= xpGain;
    }
  }
  obj.lvl = myLvl;
  obj.toNext = nextLvl;
  return obj;
}

function pokemonGen(hi, low, exclusions) {
  var rand = Math.floor(Math.random() * (hi - low + 1)) + low;
  while (true) {
    if (!exclusions.includes(rand)) {
      return rand;
    } else {
      rand = Math.floor(Math.random() * (hi - low + 1)) + low;
    }
  }
}

// export {
//   ivGen,
//
// }
module.exports = {
  moveGen: moveGen,
  statsGen: statsGen,
  natureGen: natureGen,
  ivGen: ivGen,
  levelGen: levelGen,
  getMoveType: getMoveType,
  dmgCalc: dmgCalc,
  genderGen: genderGen,
  catchRate: catchRate,
  getExp: getExp,
  addXP: addXP
};
//console.log(blast[2][0].healthStat)
