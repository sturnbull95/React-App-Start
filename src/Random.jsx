import React, { Component } from "react";
const Random = props => {
  console.log("hello out", props.pokeOut);
  return (
    <div>
      <div
        style={{
          marginLeft: 650
        }}
      >
        <span
          style={{
            paddingRight: 5
          }}
        >
          Lvl. {props.lvl}
        </span>{" "}
        <span>{props.name}</span>
        <br />
        <div style={{ marginTop: 10 }}>
          {" "}
          {props.hp}/{props.oppMax}{" "}
        </div>
        <img style={{ marginLeft: 50 }} src={props.pokemon} />
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div style={{ textAlign: "left" }}>
        <img src={props.pokeOut[0].img} />
        <span>
          {props.pokeOut[0].name} {props.pokeOut[0].level}
        </span>
        <div style={{ marginLeft: 150 }}>
          {" "}
          {props.myhp}/{props.maxHp}{" "}
        </div>
        <ul>
          {props.pokeOut[0].moves.map(function(name, index) {
            console.log(name);
            return (
              <li key={index} onClick={() => props.attack(index)}>
                {name}
              </li>
            );
          })}
        </ul>
        <div
          style={{
            textAlign: "center",
            color: "red",
            textDecoration: "bold",
            borderStyle: "solid"
          }}
        >
          {" "}
          {props.message}
        </div>
        <br />
        <br />
        <br />
        <br />
        <button
          style={{ marginLeft: 450, height: 30 }}
          onClick={() => props.run()}
        >
          {" "}
          RUN AWAY{" "}
        </button>
        <button
          style={{ marginLeft: 10, height: 30 }}
          onClick={() => props.bag()}
        >
          {" "}
          BAG{" "}
        </button>
        <br />
        <br />
        <br />
        <br />
        <div style={{ textDecoration: "underline", color: "red" }}>
          {" "}
          YOUR PARTY{" "}
        </div>
        <br />
        <ul>
          {props.myPoke.map(function(name, index) {
            console.log(name);
            return (
              <img
                src={name.img}
                key={index}
                onClick={() => props.changeParty(index)}
              />
            );
          })}
        </ul>
      </div>
      <div>
        <div style={{ textDecoration: "underline", color: "red" }}>
          {" "}
          YOUR BOX{" "}
        </div>
        <br />
        <ul>
          {props.box.map(function(name, index) {
            console.log(name);
            return <img src={name.img} key={index} />;
          })}
        </ul>
      </div>
    </div>
  );
};

module.exports = Random;
