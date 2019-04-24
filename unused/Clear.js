import React, { Component } from "react";

import Config from "../src/Config";

class Clear extends Component {
  render() {
    const { helpMode, handleClear } = this.props;

    let clsName = Config.buttonClassNames.clear;
    if (helpMode !== Config.helpMode.none) {
      clsName = [clsName, Config.buttonStatus.waiting].join(" ");
    }
    // console.log(clsName);

    return (
      <button
        id={Config.buttonIds.clear}
        // className={Config.buttonClassNames.clear}
        className={clsName}
        onClick={handleClear}
        disabled={helpMode === Config.helpMode.none ? true : null}
      >
        {Config.buttonTitles.clear}
      </button>
    );
  }
}

export default Clear;
