import React, { Component } from "react";

export default class Popup extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    console.log("this is not fired");
    const { value } = this.props;

    return (
      <div className="popup">
        <p>{value}</p>
      </div>
    );
  }
}
