import React, { Component } from "react";
const Login = props => (
  <div style={{ textAlign: "center" }}>
    <h1>GIVE US A USERNAME</h1>
    <form name="myForm">
      Name:{" "}
      <input
        type="text"
        value={props.username}
        id="username"
        onChange={props.change}
      />
      <button onClick={props.user}> Log In</button>
    </form>
  </div>
);

module.exports = Login;
