import React, { Component } from "react";

import Util from "../../Util";
import Config from "../../Config";

import "../../css/cellColor.css";

class Indicator extends Component {
  render() {
    const { gameLevel } = this.props;

    // console.log("inside Indicator");

    const clsName = Util.appendNum(Config.buttonIds.indicator, gameLevel);

    return (
      <div id={Config.buttonIds.indicatorWrapper}>
        <span id={Config.buttonIds.indicator} className={clsName} />
      </div>
    );
  }
}

export default Indicator;
