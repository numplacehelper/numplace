import React, { Component } from "react";

import Config from "../../Config";

class Save extends Component {
  render() {
    const { mode, handleSave } = this.props;

    // console.log("inside Save");

    return (
      <button
        id={Config.buttonIds.save}
        className={Config.buttonClassNames.save}
        onClick={handleSave}
        disabled={mode === Config.mode.play ? null : true}
      >
        {Config.buttonTitles.save}
      </button>
    );
  }
}

export default Save;
