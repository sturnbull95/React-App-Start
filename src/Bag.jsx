import React, { Component } from "react";
const Bag = props => {
  {
    var keys = Object.keys(props.bag);
  }
  return (
    <div style={{ textAlign: "center" }}>
      <ul>
        {keys.map(function(name, index) {
          return (
            <div key={index} onClick={() => props.catch(`${name}`)}>
              {name} {props.bag[name]}
            </div>
          );
        })}
      </ul>
      <button onClick={props.nevermind}> NeverMind</button>
    </div>
  );
};

module.exports = Bag;
