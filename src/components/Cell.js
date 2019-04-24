import React, { Component } from "react";

// import Config from "../Config";
// import Util from "../Util";

import "../css/cell.css";
import "../css/cellColor.css";

class Cell extends Component {
  render() {
    const { cellId, num, lastCandidate, clsName, onClick } = this.props;

    return (
      <div
        id={cellId}
        className={clsName}
        data-num={lastCandidate}
        onClick={onClick}
      >
        <span id={cellId + "span"}>{num}</span>
      </div>
    );
  }
}

export default Cell;
