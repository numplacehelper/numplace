import React, { Component } from "react";

import Config from "../src/Config";

class StepBack extends Component {
  render() {
    const { mode, helpMode, trace, handleStepBack } = this.props;

    return (
      <button
        id={Config.buttonIds.stepBack}
        className={Config.buttonClassNames.stepBack}
        onClick={handleStepBack}
        disabled={
          mode === Config.mode.play &&
          helpMode === Config.helpMode.none &&
          trace.length > 0
            ? null
            : true
        }
      >
        {Config.buttonTitles.stepBack}
      </button>
    );
  }
}

export default StepBack;
