import React, { Component } from "react";

class Display extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.name,
      level: props.level,
      imgUrl: props.src
    };
  }

  render() {
    return (
      <div id="courseBox" class="c">
        <h2> {this.state.name.toUpperCase()}</h2>
        <p> {this.state.level}</p>
        <img width="200" alt="none" src={this.state.imgUrl} />
        <hr/>
        <button id="searchBtn">MORE DETAILS</button>
      </div>
    );
  }
}

export default Display;
