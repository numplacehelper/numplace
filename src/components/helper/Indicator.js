import React, { Component } from "react";

// import Util from "../../Util";
import Config from "../../Config";

class Indicator extends Component {
  render() {
    const { lang, handleLang } = this.props;

    // console.log("inside Indicator");

    return (
      <div id={Config.buttonIds.indicatorWrapper}>
        <span id={Config.buttonIds.indicator} />
      </div>
    );
  }
}

export default Indicator;
