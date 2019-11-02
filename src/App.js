import React, { Component } from 'react';
// import { render } from "react-dom";
import $ from "jquery";
import './App.css';

import rdata from "./data.json";


class App extends Component {
  constructor() {
    //you must call the Component constructor function using super(), before setting any properties in this class - this is a react standard
    super();

    //this is a react standard, you must call this.state
    this.state = {
      data: rdata,
      score: 0,
      topscore: 0
    }

  }

  checkImage = (event) => {

    // debugger;

    //event.target will get you what you just clicked on, which is the image

    var imageId = event.target.getAttribute('data-id');
    // debugger;
    let bool = false;

    for (let i = 0; i < this.state.data.length; i++) {
      if (this.state.data[i].id == imageId) {
        if (this.state.data[i].clicked == false)
          bool = true;
      }
    }

    if (bool) {

      //need to make clicked to true

      let data = this.state.data.map(item => {
        if (item.id == imageId) item.clicked = true;
        return item;
      })

      //shuffle the data array
      data.sort(() => Math.random() - 0.5);

      let score = this.state.score + 1;

      this.setState({
        data,
        score
      }, () => {
        if (this.state.score == this.state.data.length) {
          this.setState({
            topscore: this.state.score,
            score: 0
          })
        }
      })

    } else {
      this.setState({
        topscore: this.state.score,
        score: 0
      })
    }
  }

  render() {
    return (
      <div className="App">

        <h2>Score: {this.state.score} | Top Score: {this.state.topscore}</h2>

        <div className="imageContainer">
          {this.state.data.map(item => (
            <img
              key={item.id}
              data-id={item.id}
              onClick={this.checkImage}
              src={item.image}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
