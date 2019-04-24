import React, { Component } from "react";

import Delete from "./Delete";
import Cancel from "./Cancel";

import Config from "../../Config";

class NumPanelControl extends Component {
  render() {
    return (
      <div id={Config.panelIds.numPanelControl}>
        <Delete {...this.props} />
        <Cancel {...this.props} />
      </div>
    );
  }
}

export default NumPanelControl;
