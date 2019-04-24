import React, { Component } from "react";

// import Util from "../../Util";
import Config from "../../Config";

class SetUp extends Component {
  render() {
    const { lang, mode, handleSetUp } = this.props;

    let buttonTitle = Config.buttonTitles.setup[lang];
    if (mode === Config.mode.play) {
      buttonTitle = Config.buttonTitles.edit[lang];
    }

    return (
      <button
        id={Config.buttonIds.setup}
        className={Config.buttonClassNames.setup}
        onClick={handleSetUp}
      >
        {buttonTitle}
      </button>
    );
  }
}

export default SetUp;
