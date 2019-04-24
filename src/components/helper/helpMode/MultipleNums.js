import React, { Component } from "react";

import Util from "../../../Util";
import Config from "../../../Config";

import "../../../css/cell.css";

class MultipleNums extends Component {
  handleChange = event => {
    const { handleMultipleNums } = this.props;

    const num = parseInt(event.target.value);
    // const checked = event.target.checked;

    handleMultipleNums(num);
  };

  render() {
    const { multipleNums, numCounts } = this.props;

    const checkboxs = Util.getNsequence(Config.size).map(num => {
      const id = Util.appendNum(Config.buttonIds.multipleNums, num);
      const labelId = Util.appendNum(Config.buttonIds.multipleNumsLabel, num);
      const checkboxId = Util.appendNum(
        Config.buttonIds.multipleNumsCheckbox,
        num
      );

      let labelDivClassName = Config.panelClassNames.cellNum + num;
      if (numCounts[num] === Config.size) {
        labelDivClassName = Util.appendNum(Config.panelClassNames.cellNum, 0);
      }

      let labelClassName = null;
      if (numCounts[num] === Config.size) {
        labelClassName = Config.buttonClassNames.multipleNumsDone;
      } else if (numCounts[num] > Config.size) {
        labelClassName = Config.buttonClassNames.multipleNumsExceeding;
      }

      const checked = multipleNums.includes(num);
      const name = Util.appendNum("num", num);

      return (
        <label key={id} id={id} className={labelClassName}>
          <div key={labelId} className={labelDivClassName}>
            {num > 0 ? num : "-"}
          </div>

          <input
            type="checkbox"
            key={checkboxId}
            name={name}
            value={num.toString()}
            onChange={this.handleChange}
            checked={checked}
          />
        </label>
      );
    });

    return (
      <div
        id={Config.buttonIds.multipleNums}
        className={Config.buttonClassNames.multipleNumsCheckBoxWrapper}
      >
        {checkboxs}
      </div>
    );
  }
}

export default MultipleNums;
