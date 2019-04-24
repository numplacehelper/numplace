import React, { Component } from "react";

import Config from "../../Config";

class MarkerButton extends Component {
  render() {
    const { lang, mode, markerStatus, handleMarker } = this.props;

    let clsName = Config.buttonClassNames.marker;
    if (markerStatus === Config.buttonStatus.active) {
      clsName = [clsName, Config.buttonStatus.active].join(" ");
    }

    return (
      <button
        id={Config.buttonIds.marker}
        className={clsName}
        onClick={handleMarker}
        disabled={mode === Config.mode.play ? null : true}
      >
        {Config.buttonTitles.marker[lang]}
      </button>
    );
  }
}

export default MarkerButton;
