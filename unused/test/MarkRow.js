import React, { Component } from "react";

// import NumPanelBlock from "../NumPanelBlock";
// import NumPanelControl from "./NumPanelControl";
import Cell from "../Cell";

import Util from "../../Util";
import Config from "../../Config";

import "../../css/Floating.css";

class MarkRow extends Component {
  getCells = cellIdBase => {
    const { onClickFunc } = this.props;

    const cellClass = "markCell";

    const idxArray = Util.getIndexSequence(Config.sizeB);
    let clsNames = idxArray.map(i =>
      [cellClass, Util.getCellNumClass(i + 1, null, true)].join(" ")
    );

    let cellLabels = idxArray.map(i => cellIdBase + i);
    const cells = cellLabels.map((cellLabel, i) => {
      return (
        <Cell
          key={cellLabel}
          cellId={cellLabel}
          num={i + 1}
          onClick={onClickFunc}
          clsName={clsNames[i]}
        />
      );
    });
    return cells;
  };

  render() {
    // const { onClickFunc } = this.props;

    const wrapperBase = "markWrapper";
    const rowIdBase = "markRow";
    const idBase = "row";
    const idBaseShort = Util.capitalize(Util.getFirstLetter(idBase));

    const rowWrapperId = wrapperBase + Util.capitalize(idBase);
    const rowWrapperClass = wrapperBase + Util.capitalize(idBase);
    // const cellIdBase = "mark" + Util.capitalize(idBase) + "Cell";

    // for (const i of idxArray) {
    //   cellLabels.push(cellIdBase + i);

    //   let clsName = [cellClass, Util.getCellNumClass(i, null, true)].join(
    //     " "
    //   );
    //   // if (appearanceArray && appearanceArray[i] !== null) {
    //   //   clsName = [clsName, appearanceArray[i]].join(" ");
    //   // }

    //   clsNames.push(clsName);
    // }

    const numArray = Util.getNsequence(Config.sizeB);

    const cellIdBases = numArray.map(n => "mark" + idBaseShort + n);

    const rows = cellIdBases.map((cellIdBase, i) => {
      const cells = this.getCells(cellIdBase);
      return (
        <div key={rowIdBase + i} id={rowIdBase + i} className={rowIdBase}>
          {cells}
        </div>
      );
    });

    return (
      <div id={rowWrapperId} className={rowWrapperClass}>
        {rows}
      </div>
    );
  }
}

export default MarkRow;
