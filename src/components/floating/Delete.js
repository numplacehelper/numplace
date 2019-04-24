import React, { Component } from "react";

import Util from "../../Util";
import Config from "../../Config";

class Delete extends Component {
  render() {
    const { numMatrix, markerNums, activeCellIndex, handleDelete } = this.props;

    let disabled = true;
    if (activeCellIndex) {
      if (typeof activeCellIndex.b !== "undefined") {
        if (Util.isNumInMarker(markerNums, activeCellIndex)) {
          disabled = null;
        }
      } else {
        if (Util.isNumInCell(numMatrix, activeCellIndex)) {
          disabled = null;
        }
      }
    }

    return (
      <button
        id={Config.buttonIds.delete}
        onClick={handleDelete}
        disabled={disabled}
      >
        {Config.buttonTitles.delete}
      </button>
    );
  }
}

export default Delete;
