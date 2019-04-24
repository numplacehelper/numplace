import React, { Component } from "react";

import Config from "../../Config";

class Restart extends Component {
  render() {
    const { lang, mode, trace, handleRestart } = this.props;

    return (
      <button
        id={Config.buttonIds.restart}
        className={Config.buttonClassNames.restart}
        onClick={handleRestart}
        disabled={mode === Config.mode.set || trace.length === 0 ? true : null}
      >
        {Config.buttonTitles.restart[lang]}
      </button>
    );
  }
}

export default Restart;
