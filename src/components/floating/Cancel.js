import React, { Component } from "react";

import Config from "../../Config";

class Cancel extends Component {
  render() {
    return (
      <button id={Config.buttonIds.cancel} onClick={this.props.handleCancel}>
        {Config.buttonTitles.cancel}
      </button>
    );
  }
}

export default Cancel;
