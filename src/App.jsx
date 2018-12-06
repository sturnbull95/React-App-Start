import React, { Component } from "react";
var functions = require("./PokemonFunctionality.js");
import axios from "axios";
import Random from "./Random.jsx";
import Login from "./Login.jsx";
import Choose from "./Choose.jsx";
import Bag from "./Bag.jsx";
import Mart from "./Mart.jsx";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: "",
      data: [],
      name: "",
      att: 0,
      def: 0,
      hp: 0,
      speed: 0,
      spAtt: 0,
      spDef: 0,
      curratt: 0,
      currdef: 0,
      currhp: 0,
      tmphp: 0,
      currspeed: 0,
      currspAtt: 0,
      currspDef: 0,
      currtype1: "",
      currtype2: "",
      attIv: 0,
      defIv: 0,
      hpIv: 0,
      speedIv: 0,
      spAttIv: 0,
      spDefIv: 0,
      changed: false,
      baseatt: 0,
      basedef: 0,
      basehp: 0,
      basespeed: 0,
      basespatt: 0,
      basespdef: 0,
      randomEnc: false,
      user: "",
      userBox: [],
      userParty: [],
      userBag: {},
      page: "login",
      starters: [],
      randLvl: 0,
      randMoves: [],
      currivs: [],
      myHp: 0,
      currNature: "",
      message: "WHAT WILL YOU DO?",
      pokeOut: [],
      pokeOutIndex: 0
    };
    this.style = {
      position: "relative"
    };
    this.flex = {
      display: "flex",
      justifyContent: "center"
      // marginLeft:140
    };
    this.pad = {
      padding: 10
      //textAlign:'center'
    };
    //this.submit = this.submit.bind(this);
    this.reset = this.reset.bind(this);
    this.random = this.random.bind(this);
    this.user = this.user.bind(this);
    this.change = this.change.bind(this);
    this.click = this.click.bind(this);
    this.attack = this.attack.bind(this);
    this.oppAtt = this.oppAtt.bind(this);
    this.catch = this.catch.bind(this);
    this.run = this.run.bind(this);
    this.bag = this.bag.bind(this);
    this.changeParty = this.changeParty.bind(this);
    this.mart = this.mart.bind(this);
    this.buy = this.buy.bind(this);
    this.home = this.home.bind(this);
    this.nevermind = this.nevermind.bind(this);
    //this.randomEncounter = this.randomEncounter.bind(this)
  }

  click(data) {
    console.log(data, this.state.starters[data]);
    var context = this;
    var pokeObj = this.state.starters[data];
    pokeObj.level = 5;
    var moveArr = functions.moveGen(pokeObj.moves, pokeObj.level);
    var power = 10;
    //for(var i = 0; i < 100;i++){
    power *= 5;
    power = Math.pow(power, 2);
    //}
    console.log("POWERPWEORWEROPOWERP", power);
    var ivs = [31, 31, 31, 31, 31, 31];
    var evs = [0, 0, 0, 0, 0, 0];
    var nature = functions.natureGen();
    var gender = functions.genderGen(
      this.state.starters[data].gender,
      100 - this.state.starters[data].gender
    );
    var statData = functions.statsGen(
      [this.state.starters[data].healthStat, 31, 0],
      [this.state.starters[data].attStat, 31, 0],
      [this.state.starters[data].defStat, 31, 0],
      [this.state.starters[data].speedStat, 31, 0],
      [this.state.starters[data].spAttStat, 31, 0],
      [this.state.starters[data].spDefStat, 31, 0],
      5,
      nature[0]
    );
    pokeObj.moves = moveArr;
    pokeObj.gender = gender;
    pokeObj.attStat = statData[0].attack;
    pokeObj.defStat = statData[0].defense;
    pokeObj.spAttStat = statData[0].specialAtt;
    pokeObj.speedStat = statData[0].speed;
    pokeObj.healthStat = statData[0].health;
    pokeObj.spDefStat = statData[0].specialDef;
    pokeObj.IVs = ivs;
    pokeObj.evs = evs;
    pokeObj.nature = nature[0];
    pokeObj.toNextLvl = power;
    this.setState(
      {
        userParty: [...this.state.userParty, pokeObj]
      },
      function() {
        console.log("myParty", this.state.userParty);
        axios
          .patch("/user", {
            username: context.state.user,
            party: context.state.userParty
          })
          .then(function(resp) {
            console.log("here", resp);
            var arr = [];
            arr.push(context.state.userParty[0]);
            console.log("test", context.state.userParty[0]);
            context.setState(
              {
                page: "home",
                pokeOut: arr
              },
              function() {
                context.setState({
                  myHp: context.state.pokeOut[0].healthStat
                });
              }
            );
          });
      }
    );
  }

  random() {
    // document.querySelector('.randomBtn').style.display = 'none'
    console.log("changed");
    var context = this;
    console.log(this.state.userParty);
    if (this.state.userParty.length === 0) {
      axios.get("/choose").then(function(response) {
        console.log("myRes", response.data);
        context.setState({
          page: "choose",
          starters: response.data
        });
      });
    } else {
      axios.get("/pok").then(function(resp) {
        var genderRev = functions.genderGen(
          resp.data.gender,
          100 - resp.data.gender
        );
        context.setState(
          {
            pokemon: resp.data.img,
            name: resp.data.name,
            baseatt: resp.data.attStat,
            basedef: resp.data.defStat,
            basehp: resp.data.healthStat,
            basespeed: resp.data.speedStat,
            basespatt: resp.data.spAttStat,
            basespdef: resp.data.spDefStat,
            allRandMoves: resp.data.moves,
            currtype1: resp.data.type1,
            currtype2: resp.data.type2,
            currGender: genderRev,
            message: "WHAT WILL YOU DO?"
          },
          function() {
            console.log(context.state.randMoves);
            var ivArr = functions.ivGen();
            var lvl = functions.levelGen(
              context.state.pokeOut[0].level + 5,
              context.state.pokeOut[0].level
            );
            var moveArr = functions.moveGen(context.state.allRandMoves, lvl);
            var hpArr = [context.state.basehp, ivArr[0], 0];
            var attArr = [context.state.baseatt, ivArr[1], 0];
            var defArr = [context.state.basedef, ivArr[2], 0];
            var spdefArr = [context.state.basespdef, ivArr[3], 0];
            var spattArr = [context.state.basespatt, ivArr[4], 0];
            var spdArr = [context.state.basespeed, ivArr[5], 0];
            var nature = functions.natureGen();
            var statArr = functions.statsGen(
              hpArr,
              attArr,
              defArr,
              spdArr,
              spattArr,
              spdefArr,
              lvl,
              nature[0]
            );
            console.log("hello", statArr, lvl, ivArr);
            context.setState({
              curratt: statArr[0].attack,
              currdef: statArr[0].defense,
              currhp: statArr[0].health,
              tmphp: statArr[0].health,
              currspeed: statArr[0].speed,
              currspAtt: statArr[0].specialAtt,
              currspDef: statArr[0].specialDef,
              myHp: context.state.pokeOut[0].healthStat,
              randMoves: moveArr,
              randLvl: lvl,
              currivs: ivArr,
              currNature: nature[0],
              page: "random"
            });
          }
        );
      });
    }
  }
  prettyPoke() {
    var output = {};
    //var
    var power = 10;
    //for(var i = 0; i < 100;i++){
    power *= this.state.randLvl;
    power = Math.pow(power, 2);
    //}
    console.log("POWERPWEORWEROPOWERP", power);
    output.IVs = this.state.currivs;
    output.attStat = this.state.curratt;
    output.defStat = this.state.currdef;
    output.healthStat = this.state.currhp;
    output.spAttStat = this.state.currspAtt;
    output.spDefStat = this.state.currspDef;
    output.speedStat = this.state.currspeed;
    output.level = this.state.randLvl;
    output.moves = this.state.randMoves;
    output.gender = this.state.genderRev;
    output.img = this.state.pokemon;
    output.name = this.state.name;
    output.nature = this.state.currNature;
    output.type1 = this.state.currtype1;
    output.type2 = this.state.currtype2;
    output.toNextLvl = power;
    return output;
  }
  // submit(){
  //   if(this.state.changed === false){
  //     var hp = [this.state.currhp,this.state.hpIv,this.state.hp];
  //     var att = [this.state.curratt,this.state.attIv,this.state.att];
  //     var def = [this.state.currdef,this.state.defIv,this.state.def];
  //     var speed = [this.state.currspeed,this.state.speedIv,this.state.speed];
  //     var spDef = [this.state.currspDef,this.state.spDefIv,this.state.spDef];
  //     var spAtt = [this.state.currspAtt,this.state.spAttIv,this.state.spAtt];
  //     var nature = functions.natureGen();
  //     console.log(hp,att,def,speed,spDef,spAtt,nature[0]);
  //     var myData = functions.statsGen(hp,att,def,speed,spAtt,spDef,100,nature[0]);
  //     console.log(myData);
  //     this.setState({
  //       currhp:myData[0].health,
  //       currspAtt:myData[0].specialAtt,
  //       curratt:myData[0].attack,
  //       currspDef:myData[0].specialDef,
  //       currdef:myData[0].defense,
  //       currspeed:myData[0].speed,
  //       changed:true
  //     });
  //   }
  // }
  change(e) {
    console.log(e.target.value);
    this.setState({
      user: e.target.value
    });
  }
  user(e) {
    e.preventDefault();
    var context = this;
    axios
      .get("/user", {
        params: {
          username: context.state.user
        }
      })
      .then(function(resp) {
        console.log(resp);
        context.setState(
          {
            user: resp.data[0].username,
            userBox: resp.data[0].box,
            userParty: resp.data[0].party,
            userBag: resp.data[0].bag,
            page: "home"
          },
          function() {
            console.log(this.state.userParty);
            var arr = [];
            arr.push(context.state.userParty[0]);
            context.setState({
              pokeOut: arr
            });
          }
        );
      })
      .catch(function() {
        axios
          .post("/user", {
            params: {
              username: context.state.user
            }
          })
          .then(function(resp) {
            console.log("HHEHRHERHERHEH", resp);
            context.setState({
              user: resp.data.username,
              userBox: resp.data.box,
              userParty: resp.data.party,
              userBag: resp.data.bag,
              page: "home"
            });
          });
      });
  }
  reset() {
    this.setState({
      changed: false,
      currhp: this.state.basehp,
      currspAtt: this.state.basespatt,
      curratt: this.state.baseatt,
      currspDef: this.state.basespdef,
      currdef: this.state.basedef,
      currspeed: this.state.basespeed
    });
  }
  // onSubmit(input){
  //   // this.setState({
  //   //   action:input
  //   // })
  //   input.preventDefault()
  //   let something = document.querySelector('#name').value;
  //   console.log(something)
  //   this.setState({something: something});
  //   console.log(this.state)
  //   setTimeout(() => console.log(this.state), 0);
  //   document.querySelector('#name').value = '';
  // }
  // startGame(){
  //   console.log(functions.ivGen())
  // }
  // <div style={this.flex}>
  // <div>
  // EVs
  // <form>
  //   Attack:<br/>
  //   <input type="number" name="attack" max= "252" onChange={(e)=>this.changeAtt(e)}/><br/>
  //   Defense:<br/>
  //   <input type="number" name="defense" max='252' onChange={(e)=>this.changeDef(e)}/><br/>
  //   Speed:<br/>
  //   <input type="number" name="attack" max='252' onChange={(e)=>this.changeSpeed(e)}/><br/>
  //   Health:<br/>
  //   <input type="number" name="defense" max='252' onChange={(e)=>this.changeHealth(e)}/><br/>
  //   Special Attack:<br/>
  //   <input type="number" name="attack" max='252' onChange={(e)=>this.changeSpAtt(e)}/><br/>
  //   Special Defense:<br/>
  //   <input type="number" name="defense" max='252' onChange={(e)=>this.changeSpDef(e)}/><br/>
  // </form>
  // </div>
  // <div>
  // IVs
  // <form>
  //   Attack:<br/>
  //   <input type="number" name="attack" max='31' onChange={(e)=>this.changeAttIv(e)}/><br/>
  //   Defense:<br/>
  //   <input type="number" name="defense" max='31' onChange={(e)=>this.changeDefIv(e)}/><br/>
  //   Speed:<br/>
  //   <input type="number" name="attack" max='31' onChange={(e)=>this.changeSpeedIv(e)}/><br/>
  //   Health:<br/>
  //   <input type="number" name="defense" max='31' onChange={(e)=>this.changeHealthIv(e)}/><br/>
  //   Special Attack:<br/>
  //   <input type="number" name="attack" max='31' onChange={(e)=>this.changeSpAttIv(e)}/><br/>
  //   Special Defense:<br/>
  //   <input type="number" name="defense" max='31' onChange={(e)=>this.changeSpDefIv(e)}/><br/>
  // </form>
  // </div>
  // </div>
  // <button onClick={this.submit}>Add Stats </button>
  // <button onClick={this.reset}>Reset </button>
  attack(data) {
    var context = this;
    var move;
    var tmpMov = this.state.pokeOut[0].moves[data];
    console.log("my pokemon i have out", this.state.pokeOut[0]);
    console.log(tmpMov);
    var type = functions.getMoveType(this.state.pokeOut[0].moves[data]);
    console.log(type);
    axios
      .get("/find", { params: { which: context.state.pokeOut[0].name } })
      .then(function(res) {
        console.log(res);
        for (var i = 0; i < res.data[0].moves.length; i++) {
          if (
            res.data[0].moves[i].moveName ===
            context.state.pokeOut[0].moves[data]
          ) {
            move = res.data[0].moves[i];
          }
        }
        if (/^\d+$/.test(move.power)) {
          console.log(context.state.userParty, "hey");
          if (type === "special") {
            var newHp = functions.dmgCalc(
              move.moveType,
              [context.state.pokeOut[0].type1, context.state.pokeOut[0].type2],
              context.state.pokeOut[0].level,
              move.power,
              context.state.pokeOut[0].spAttStat,
              context.state.currspDef,
              [context.state.currtype1, context.state.currtype2]
            );
            var tmpHP = context.state.tmphp - newHp;
            if (tmpHP <= 0) {
              tmpHP = 0;
              console.log("YOU WON");
              context.setState({
                tmphp: 0,
                message: "YOU CAUSED " + context.state.name + " TO FAINT"
              });
              setTimeout(function() {
                var random = Math.random() * 256 + 1;
                var xp = functions.getExp(
                  random,
                  context.state.randLvl,
                  context.state.pokeOut[0].level
                );
                var objXP = functions.addXP(
                  context.state.pokeOut[0].level,
                  xp,
                  context.state.pokeOut[0].toNextLvl
                );
                console.log(objXP);
                var newpokeout = context.state.pokeOut;
                newpokeout[0].level = objXP.lvl;
                newpokeout[0].toNextLvl = objXP.toNext;
                var partyArr = context.state.userParty;
                partyArr[context.state.pokeOutIndex] = newpokeout[0];
                console.log("sidfoadsfnalsdfk", objXP, xp);
                context.setState(
                  {
                    pokeOut: newpokeout,
                    userParty: partyArr,
                    message: "YOU GAINED " + xp + " XP"
                  },
                  function() {
                    axios
                      .patch("/user", {
                        username: context.state.user,
                        party: context.state.userParty
                      })
                      .then(function(resp) {
                        console.log(resp);
                      });
                  }
                );
              }, 2000);
              setTimeout(function() {
                context.setState({
                  tmphp: tmpHP,
                  page: "home"
                });
              }, 4000);
            } else {
              context.setState({
                tmphp: tmpHP,
                message: "YOU DEALT " + newHp + " DAMAGE"
              });
            }
          } else {
            var newHp = functions.dmgCalc(
              move.moveType,
              [context.state.pokeOut[0].type1, context.state.pokeOut[0].type2],
              context.state.randLvl,
              move.power,
              context.state.pokeOut[0].attStat,
              context.state.currdef,
              [context.state.currtype1, context.state.currtype2]
            );
            var tmpHP = context.state.tmphp - newHp;
            if (tmpHP <= 0) {
              tmpHP = 0;
              console.log("YOU WON");
              context.setState({
                tmphp: 0,
                message: "YOU CAUSED " + context.state.name + " TO FAINT"
              });
              setTimeout(function() {
                var random = Math.random() * 256 + 1;
                var xp = functions.getExp(
                  random,
                  context.state.randLvl,
                  context.state.pokeOut[0].level
                );
                var objXP = functions.addXP(context.state.pokeOut[0].level, xp);
                var newpokeout = context.state.pokeOut;
                newpokeout[0].level = objXP.lvl;
                newpokeout[0].toNextLvl = objXP.toNext;
                console.log("sidfoadsfnalsdfk", objXP, xp);
                var partyArr = context.state.userParty;
                partyArr[context.state.pokeOutIndex] = newpokeout[0];
                context.setState(
                  {
                    pokeOut: newpokeout,
                    userParty: partyArr,
                    message: "YOU GAINED " + xp + " XP"
                  },
                  function() {
                    axios
                      .patch("/user", {
                        username: context.state.user,
                        party: context.state.userParty
                      })
                      .then(function(resp) {
                        console.log(resp);
                      });
                  }
                );
              }, 2000);
              setTimeout(function() {
                context.setState({
                  tmphp: tmpHP,
                  page: "home"
                });
              }, 4000);
            } else {
              context.setState({
                tmphp: tmpHP,
                message: "YOU DEALT " + newHp + " DAMAGE"
              });
            }
          }
        } else {
          context.setState({
            message: "YOU USED " + move.moveName
          });
        }
        console.log(move, context.state.currhp, type);
      })
      .then(() => {
        var context = this;
        console.log("OPP HEALTH", context.state.tmphp);
        if (context.state.tmphp > 0) {
          setTimeout(function() {
            context.oppAtt();
          }, 2000);
        }
      });
  }
  oppAtt() {
    var context = this;
    var oppMov;
    axios
      .get("/find", { params: { which: context.state.name } })
      .then(function(res) {
        console.log(res);

        console.log(context.state.randMoves.length, context.state.randMoves);
        var randomNum = Math.floor(
          Math.random() * context.state.randMoves.length
        );
        var opptype = functions.getMoveType(context.state.randMoves[randomNum]);
        for (var i = 0; i < res.data[0].moves.length; i++) {
          if (
            res.data[0].moves[i].moveName === context.state.randMoves[randomNum]
          ) {
            oppMov = res.data[0].moves[i];
          }
        }
        console.log("OPPONENT", oppMov);
        if (/^\d+$/.test(oppMov.power)) {
          if (opptype === "special") {
            //moveType,pokType,lvl,movepwr,att,def,typeArr
            console.log(
              oppMov.moveType,
              [context.state.currtype1, context.state.currtype2],
              context.state.randLvl,
              oppMov.power,
              context.state.currspAtt,
              context.state.pokeOut[0].spDefStat,
              [context.state.pokeOut[0].type1, context.state.pokeOut[0].type2]
            );
            var newHp = functions.dmgCalc(
              oppMov.moveType,
              [context.state.currtype1, context.state.currtype2],
              context.state.randLvl,
              oppMov.power,
              context.state.currspAtt,
              context.state.pokeOut[0].spDefStat,
              [context.state.pokeOut[0].type1, context.state.pokeOut[0].type2]
            );
            var tmpHP = context.state.myHp - newHp;
            if (tmpHP <= 0) {
              tmpHP = 0;
              console.log("YOU SUCK", newHp);
              context.setState({
                message: "YOU FAINTED BY TAKING " + newHp + " DAMAGE"
              });
              setTimeout(function() {
                context.setState({
                  myHp: context.state.pokeOut[0].healthStat,
                  page: "home"
                });
              }, 2000);
            } else {
              context.setState({
                myHp: tmpHP,
                message: "THEY DEALT " + newHp + " DAMAGE"
              });
            }
          } else {
            console.log(
              "SECOND",
              oppMov.moveType,
              [context.state.currtype1, context.state.currtype2],
              context.state.randLvl,
              oppMov.power,
              context.state.curratt,
              context.state.pokeOut[0].defStat,
              [context.state.pokeOut[0].type1, context.state.pokeOut[0].type2]
            );
            var newHp = functions.dmgCalc(
              oppMov.moveType,
              [context.state.currtype1, context.state.currtype2],
              context.state.randLvl,
              oppMov.power,
              context.state.curratt,
              context.state.pokeOut[0].defStat,
              [context.state.pokeOut[0].type1, context.state.pokeOut[0].type2]
            );
            var tmpHP = context.state.myHp - newHp;
            if (tmpHP <= 0) {
              tmpHP = 0;
              console.log("YOU SUCK", newHp);
              context.setState({
                message: "YOU FAINTED BY TAKING " + newHp + " DAMAGE"
              });
              setTimeout(function() {
                context.setState({
                  myHp: context.state.pokeOut[0].healthStat,
                  page: "home"
                });
              }, 2000);
            } else {
              context.setState({
                myHp: tmpHP,
                message: "THEY DEALT " + newHp + " DAMAGE"
              });
            }
          }
        } else {
          context.setState({
            message: "THEY USED " + oppMov.moveName
          });
        }
      });
  }
  bag() {
    this.setState({
      page: "bag"
    });
  }
  catch(data) {
    //ball,curr,max
    console.log(data, this.state.userBag);
    var context = this;
    if (data === "poke ball") {
      if (this.state.userBag[data] === 0) {
        console.log("no balls");
      } else {
        var tmp = this.state.userBag;
        var tmpDec = tmp["poke ball"] - 1;
        tmp["poke ball"] = tmpDec;
        console.log(tmpDec, tmp);
        this.setState(
          {
            userBag: tmp
          },
          function() {
            axios
              .patch("/bag", {
                username: context.state.user,
                bag: context.state.userBag
              })
              .then(function(resp) {
                console.log(resp);
              });
          }
        );
        console.log(this.state.tmphp, this.state.currhp);
        if (
          functions.catchRate("poke ball", this.state.tmphp, this.state.currhp)
        ) {
          if (this.state.userParty.length < 6) {
            console.log("caught with poke");
            var pok = this.state.userParty;
            var tmppok = this.prettyPoke();
            pok.push(tmppok);
            console.log(pok);
            axios
              .patch("/user", { username: context.state.user, party: pok })
              .then(function(resp) {
                console.log("patched");
              });
            this.setState({
              page: "random",
              message: "YOU CAUGHT " + this.state.name + "!"
            });
            setTimeout(function() {
              context.setState({
                page: "home"
              });
            }, 2000);
          } else {
            console.log("caught with poke");
            var pok = this.state.userBox;
            var tmppok = this.prettyPoke();
            pok.push(tmppok);
            console.log(pok);
            axios
              .patch("/userBox", { username: context.state.user, box: pok })
              .then(function(resp) {
                console.log("patched");
              });
            this.setState({
              page: "random",
              message: "YOU CAUGHT " + this.state.name + "!"
            });
            setTimeout(function() {
              context.setState({
                page: "home"
              });
            }, 2000);
          }
        } else {
          this.setState({
            page: "random",
            message: "IT ESCAPED"
          });
        }
      }
    }
    if (data === "great ball") {
      if (this.state.userBag[data] === 0) {
        console.log("no balls");
      } else {
        var tmp = this.state.userBag;
        var tmpDec = tmp["great ball"] - 1;
        tmp["great ball"] = tmpDec;
        console.log(tmpDec, tmp);
        this.setState(
          {
            userBag: tmp
          },
          function() {
            axios
              .patch("/bag", {
                username: context.state.user,
                bag: context.state.userBag
              })
              .then(function(resp) {
                console.log(resp);
              });
          }
        );
        if (
          functions.catchRate("great ball", this.state.tmphp, this.state.currhp)
        ) {
          console.log("caught with great");
          if (this.state.userParty.length < 6) {
            var pok = this.state.userParty;
            var tmppok = this.prettyPoke();
            pok.push(tmppok);
            console.log(pok);
            axios
              .patch("/user", { username: context.state.user, party: pok })
              .then(function(resp) {
                console.log("patched");
              });
            this.setState({
              page: "random",
              message: "YOU CAUGHT " + this.state.name + "!"
            });
            setTimeout(function() {
              context.setState({
                page: "home"
              });
            }, 2000);
          } else {
            var pok = this.state.userBox;
            var tmppok = this.prettyPoke();
            pok.push(tmppok);
            console.log(pok);
            axios
              .patch("/userBox", { username: context.state.user, box: pok })
              .then(function(resp) {
                console.log("patched");
              });
            this.setState({
              page: "random",
              message: "YOU CAUGHT " + this.state.name + "!"
            });
            setTimeout(function() {
              context.setState({
                page: "home"
              });
            }, 2000);
          }
        } else {
          context.setState({
            page: "random",
            message: "IT ESCAPED"
          });
        }
      }
    }
    if (data === "ultra ball") {
      if (this.state.userBag[data] === 0) {
        console.log("no balls");
      } else {
        var tmp = this.state.userBag;
        var tmpDec = tmp["ultra ball"] - 1;
        tmp["ultra ball"] = tmpDec;
        console.log(tmpDec, tmp);
        this.setState(
          {
            userBag: tmp
          },
          function() {
            axios
              .patch("/bag", {
                username: context.state.user,
                bag: context.state.userBag
              })
              .then(function(resp) {
                console.log(resp);
              });
          }
        );
        if (
          functions.catchRate("ultra ball", this.state.tmphp, this.state.currhp)
        ) {
          console.log("caught with ultra");
          if (this.state.userParty.length < 6) {
            var pok = this.state.userParty;
            var tmppok = this.prettyPoke();
            pok.push(tmppok);
            console.log(pok);
            axios
              .patch("/user", { username: context.state.user, party: pok })
              .then(function(resp) {
                console.log("patched");
              });
            this.setState({
              page: "random",
              message: "YOU CAUGHT " + this.state.name + "!"
            });
            setTimeout(function() {
              context.setState({
                page: "home"
              });
            }, 2000);
          } else {
            var pok = this.state.userBox;
            var tmppok = this.prettyPoke();
            pok.push(tmppok);
            console.log(pok);
            axios
              .patch("/userBox", { username: context.state.user, box: pok })
              .then(function(resp) {
                console.log("patched");
              });
            this.setState({
              page: "random",
              message: "YOU CAUGHT " + this.state.name + "!"
            });
            setTimeout(function() {
              context.setState({
                page: "home"
              });
            }, 2000);
          }
        } else {
          context.setState({
            page: "random",
            message: "IT ESCAPED"
          });
        }
      }
    }
    if (data === "master ball") {
      if (this.state.userBag[data] === 0) {
        console.log("no balls");
      } else {
        var tmp = this.state.userBag;
        var tmpDec = tmp["master ball"] - 1;
        tmp["master ball"] = tmpDec;
        console.log(tmpDec, tmp);
        this.setState(
          {
            userBag: tmp
          },
          function() {
            axios
              .patch("/bag", {
                username: context.state.user,
                bag: context.state.userBag
              })
              .then(function(resp) {
                console.log(resp);
              });
          }
        );
        console.log("caught with master ball");
        if (this.state.userParty.length < 6) {
          var pok = this.state.userParty;
          var tmppok = this.prettyPoke();
          pok.push(tmppok);
          console.log(pok);
          axios
            .patch("/user", { username: context.state.user, party: pok })
            .then(function(resp) {
              console.log("patched");
            });
          this.setState({
            page: "random",
            message: "YOU CAUGHT " + this.state.name
          });
          setTimeout(function() {
            context.setState({
              page: "home"
            });
          }, 2000);
        } else {
          var pok = this.state.userBox;
          var tmppok = this.prettyPoke();
          pok.push(tmppok);
          console.log(pok);
          axios
            .patch("/userBox", { username: context.state.user, box: pok })
            .then(function(resp) {
              console.log("patched");
            });
          this.setState({
            page: "random",
            message: "YOU CAUGHT " + this.state.name
          });
          setTimeout(function() {
            context.setState({
              page: "home"
            });
          }, 2000);
        }
      }
    }
  }
  run() {
    this.setState({
      page: "home"
    });
  }
  changeParty(data) {
    var arr = [];
    arr.push(this.state.userParty[data]);
    this.setState({
      pokeOut: arr,
      pokeOutIndex: data,
      myHp: this.state.userParty[data].healthStat
    });
  }
  mart() {
    this.setState({
      page: "mart"
    });
  }
  buy(data) {
    console.log(data);
    var tmp = this.state.userBag;
    var tmpVal = tmp[data];
    tmpVal += 15;
    tmp[data] = tmpVal;
    console.log(tmp);
    var context = this;
    axios
      .patch("/bag", {
        username: context.state.user,
        bag: context.state.userBag
      })
      .then(function(resp) {
        console.log(resp);
      });
  }
  home() {
    this.setState({
      page: "home"
    });
  }
  nevermind() {
    this.setState({
      page: "random"
    });
  }
  render() {
    let page = "";
    if (this.state.page === "bag") {
      page = (
        <Bag
          nevermind={this.nevermind}
          catch={this.catch}
          bag={this.state.userBag}
        />
      );
    }
    if (this.state.page === "mart") {
      page = <Mart home={this.home} buy={this.buy} bag={this.state.userBag} />;
    }
    if (this.state.page === "login") {
      page = (
        <Login
          username={this.state.user}
          user={this.user}
          change={this.change}
        />
      );
    }
    if (this.state.page === "choose") {
      page = (
        <Choose
          click={this.click}
          pikachu={this.state.starters[3].img}
          charmander={this.state.starters[1].img}
          bulbasaur={this.state.starters[0].img}
          squirtle={this.state.starters[2].img}
        />
      );
    }
    if (this.state.page === "random") {
      page = (
        <Random
          box={this.state.userBox}
          changeParty={this.changeParty}
          pokeOut={this.state.pokeOut}
          oppMax={this.state.currhp}
          maxHp={this.state.pokeOut[0].healthStat}
          message={this.state.message}
          bag={this.bag}
          run={this.run}
          myhp={this.state.myHp}
          attack={this.attack}
          moves={this.state.randMoves}
          lvl={this.state.randLvl}
          myPoke={this.state.userParty}
          pokemon={this.state.pokemon}
          name={this.state.name}
          hp={this.state.tmphp}
          spatt={this.state.currspAtt}
          speed={this.state.currspeed}
          att={this.state.curratt}
          spdef={this.state.currspDef}
          def={this.state.currdef}
        />
      );
    }
    if (this.state.page === "home") {
      page = (
        <div style={{ textAlign: "center" }}>
          <button
            style={{ height: 30, backgroundColor: "LightCoral" }}
            id="randomBtn"
            onClick={this.random}
          >
            Random Encounter
          </button>
          <br />
          <button
            style={{ height: 30, marginTop: 10, backgroundColor: "cyan" }}
            id="randomBtn"
            onClick={this.mart}
          >
            Poke Mart
          </button>
        </div>
      );
    }
    // let page = <button id='randomBtn' onClick={this.random} style={{display:'none'}}>Random Encounter</button>
    // if(this.state.randomEnc){
    //   page = <Random name={this.state.name} hp={this.state.currhp} spatt={this.state.currspAtt} speed={this.state.currspeed} att={this.state.curratt} spdef={this.state.currspDef} def={this.state.currdef}/>
    // }
    return <div style={this.style}>{page}</div>;
  }
}

export default App;
