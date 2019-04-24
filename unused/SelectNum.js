import React, { Component } from "react";

import Popup from "./Popup";

export default class SelectNum extends Component {
  constructor(props) {
    super(props);
    // save the popup state
    this.state = {
      visible: false, // initially set it to be hidden
      value: "" // and its content to be empty
    };
  }

  popup(value) {
    console.log("fired ok");
    this.setState({
      visible: true, // set it to be visible
      value: value // and its content to be the value
    });
  }

  render() {
    // conditionally render the popup element based on current state
    const popup = this.state.visible ? (
      <Popup value={this.state.value} />
    ) : null;
    return (
      <ul>
        {popup}
        <li key={0} onClick={() => this.popup("Hello World")}>
          Click Me!
        </li>
      </ul>
    );
  }
}
