import React, { Component } from 'react';
const Choose = (props) => (
  <div>
  <h1> It's Dangerous to go alone. Take one of these </h1>
  <div style={{display:'flex',justifyContent:'center'}}>
  <img className="pic" src={props.pikachu} onClick={()=> props.click('3')}/>
  <img className="pic" src={props.squirtle} onClick={()=> props.click('2')}/>
  <img className="pic" src={props.charmander} onClick={()=> props.click('1')}/>
  <img className="pic" src={props.bulbasaur} onClick={()=> props.click('0')}/>
  </div>
  </div>
)

module.exports = Choose;
