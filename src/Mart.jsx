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
            <div key={index} onClick={() => props.buy(`${name}`)}>
              Buy {name} x15
            </div>
          );
        })}
      </ul>
      <button onClick={props.home}> Done Buying</button>
    </div>
  );
};

module.exports = Bag;
