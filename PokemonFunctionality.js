// functions to be used in pokemon game

var data = require('./data.js')



function goodAgainstMove(moveType, moveArr,defenseMove){
  var good = [];
  var bad = [];
  var even = [];
  for(var i = 0; i < moveArr.length; i++){
    if(moveArr[i].type === moveType){
      good = moveArr[i].good;
      bad = moveArr[i].bad;
      even = moveArr[i].even;
      break;
    }
  }
  if(good.includes(defenseMove)){
    return 2;
  }
  if(even.includes(defenseMove)){
    return 1;
  }
  if(bad.includes(defenseMove)){
    return .5;
  }
}
console.log(goodAgainstMove("fire",data.arr,"ice"))

function goodAgainstPokemon(moveType, typeArr, typeOne, typeTwo){
  var good = [];
  var bad = [];
  var even = [];
  var mult = 1;

  for(var i = 0; i < typeArr.length; i++){
    if(typeArr[i].type === moveType){
      good = typeArr[i].good;
      bad = typeArr[i].bad;
      even = typeArr[i].even;
      break;
    }
  }
  if(good.includes(typeOne)){
    mult *= 2;
  }
  if(bad.includes(typeOne)){
    mult *= .5;
  }
  if(typeTwo != null){
    if(good.includes(typeTwo)){
      mult *= 2;
    }
    if(bad.includes(typeTwo)){
      mult *= .5;
    }
  }
  return mult;
}

console.log('GOOD AGAINST',goodAgainstPokemon("fire",data.arr,"fire") )

function ivGen(){
  // var num = 0;
  var arr = [0,0,0,0,0,0];
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
    for(var i = 0; i < 6; i++){
      var iv = Math.floor(Math.random() * 32);
      arr[i] = iv;
    }
    return arr;
  //}
}
console.log(ivGen())

function levelGen(hi, low){
  var level = Math.floor(Math.random()*(hi-low+1))+low;
  return level;
}
console.log(levelGen(30,25));

function natureGen(){
  var place = Math.floor(Math.random() * data.natures.length);
  return data.natures[place];
}
console.log('NATURE',natureGen())

function moveGen(moves, level){
  var movArr = [];
  var current = 0;
  var i = 0;
  while(current < level){
    if(moves[i].level <= level){
      movArr.unshift(moves[i].name)
    }
    current = moves[i+1].level;
    i++
  }
  if(movArr.length > 4){
    movArr.splice(4)
  }
  return movArr;
}

function genderGen(female,male){
  var gender = "";
  var fem = female * 10;
  var random = Math.floor(Math.random() * 1000);
  if(random <= fem){
    gender = "female";
  }
  else{
    gender = "male";
  }
  return gender;
}
console.log(genderGen(87.5,12.5))


function natureMod(nature,moveType){
  let mult = 1;
  for(var i = 0; i < data.natures.length; i++){
    if(data.natures[i][0] === nature){
      if(data.natures[i][1] === moveType){
        mult *= 1.1;
        if(data.natures[i][2] === moveType){
          mult *= .9;
        }
      }
      if(data.natures[i][1] !== moveType){
        if(data.natures[i][2] === moveType){
          mult *= .9;
        }
      }
      break;
    }
  }
  return mult
}
console.log(natureMod('Timid','Speed'))
function statsGen(hp,att,def,spd,spAtt,spDef,lvl,nature){
  //[0] = BASE STAT
  //[1] = IV
  //[2] = EV
  var statArr = []
  var attack = Math.floor(Math.floor(((2*att[0]) + att[1] + att[2])*lvl /100 + 5) * natureMod(nature,"Attack"))
  var health = Math.floor((2*hp[0] + hp[1] + hp[2])*lvl /100 + lvl + 10)
  var defense = Math.floor(Math.floor((2*def[0] + def[1] + def[2])*lvl /100 + 5) * natureMod(nature,"Defense"))
  var speed = Math.floor(Math.floor((2*spd[0] + spd[1] + spd[2])*lvl /100 + 5) * natureMod(nature,"Speed"))
  var specialAtt = Math.floor(Math.floor((2*spAtt[0] + spAtt[1] + spAtt[2])*lvl /100 + 5) * natureMod(nature,"Sp. Att"))
  var specialDef = Math.floor(Math.floor((2*spDef[0] + spDef[1] + spDef[2])*lvl /100 + 5) * natureMod(nature,"Sp. Def"))
  statArr.push({attack,health,defense,speed,specialAtt,specialDef})
  return statArr;
}
console.log(statsGen([30,25,0],[45,4,0],[90,255,31],[40,30,20],[100,30,20],[40,12,50],53,"Modest"))

// var readline = require('readline-sync');
// //var stdin = process.openStdin();
//
// //stdin.addListener("data", function(d) {
//     // note:  d is an object, and when converted to a string it will
//     // end with a linefeed.  so we (rather crudely) account for that
//     // with toString() and then trim()
//     var start = readline.question("Would you like to play? ");
//     //
//     if(start == "yes"){
//       startGame();
//     }
// //  });
// startGame()
// function startGame(){
//   var index = pokemonGen(2,6,[])
//   let pokeEnc = []
//   let party = []
//   var encounter = readline.question("Press R for random encounter ");
//   while(encounter != "R"){
//     encounter = readline.question("Press R for random encounter ");
//   }
//   if(encounter == "R"){
//     pokeEnc.push(poke[index][0].name)
//   }
//   var option = readline.question("Would you like to attack or run "+ pokeEnc[0]+"? ");
//   if(option == "attack"){
//     var iv = ivGen();
//     var lvl = levelGen(36,50)
//
//     pokeEnc.push({health,attack,defense,spDef,spAtt,speed,iv,lvl})
//     console.log(poke[index][0].healthStat)
//   }
// }

// EXP LEVEL UP
function addXP(value){

}

function pokemonGen(hi,low,exclusions){
  var rand = Math.floor(Math.random()*(hi-low+1))+low;
  while(true){
    if(!exclusions.includes(rand)){
      return rand;
    }
    else{
      rand = Math.floor(Math.random()*(hi-low+1))+low;
    }
  }
}


//console.log(blast[2][0].healthStat)
