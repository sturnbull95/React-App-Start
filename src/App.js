import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Options from './Options';
var functions = require('./PokemonFunctionality.js')

class App extends Component {
  constructor(props){

    super(props);
    this.state = {
      pokemon:this.props.pokemon,
      something: 'idle'
    };
    this.onSubmit = this.onSubmit.bind(this)
    this.startGame = this.startGame.bind(this)
  }
  onSubmit(input){
    // this.setState({
    //   action:input
    // })
    input.preventDefault()
    let something = document.querySelector('#name').value;
    console.log(something)
    this.setState({something: something});
    console.log(this.state)
    setTimeout(() => console.log(this.state), 0);
    document.querySelector('#name').value = '';
  }
  startGame(){
    console.log(functions.ivGen())
  }
  render() {
    return (
      <div className="App">
      <Options onSubmit={this.onSubmit} state = {this.state}/>
      <button type="button" onClick={this.startGame}>Start Game!</button>
        <img src={require(this.state.pokemon + "/1.png")} alt="Bulbasaur"/>
      </div>
    );
  }
}

export default App;
