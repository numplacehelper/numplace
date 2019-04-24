import React, { Component } from "react";

import Util from "../../../Util";
import Config from "../../../Config";

import "../../../css/cell.css";

class SingleNum extends Component {
  render() {
    const { helpMode, singleNumValue, numCounts, handleSingleNum } = this.props;

    const radios = Util.getIndexSequence(Config.size + 1).map(num => {
      const id = Config.buttonIds.singleNumRadio + num;

      let labelDivClassName = Config.panelClassNames.cellNum + num;
      if (numCounts[num] === Config.size) {
        labelDivClassName = Util.appendNum(Config.panelClassNames.cellNum, 0);
      }

      let disabled = null;
      if (
        [Config.helpMode.singleNum, Config.helpMode.both].includes(helpMode) &&
        num === 0
      ) {
        disabled = true;
      }

      let labelClassName = null;
      if (
        numCounts[num] === Config.size ||
        ([Config.helpMode.singleNum, Config.helpMode.both].includes(helpMode) &&
          num === 0)
      ) {
        labelClassName = Config.buttonClassNames.singleNumDone;
      } else if (numCounts[num] > Config.size) {
        labelClassName = Config.buttonClassNames.singleNumExceeding;
      }

      return (
        <label key={id} id={id} className={labelClassName}>
          <div className={labelDivClassName}>{num > 0 ? num : "-"}</div>

          <input
            type="radio"
            name={Config.helpMode.singleNum}
            value={num.toString()}
            onChange={() => handleSingleNum(num)}
            checked={singleNumValue === num}
            disabled={disabled}
          />
        </label>
      );
    });

    return (
      <div
        id={Config.buttonIds.singleNum}
        className={Config.buttonClassNames.singleNumRadioWrapper}
      >
        {radios}
      </div>
    );
  }
}

export default SingleNum;
