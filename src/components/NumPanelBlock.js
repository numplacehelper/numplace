import React, { Component } from "react";

import Cell from "./Cell";

import Util from "../Util";
import Config from "../Config";

class NumPanelBlock extends Component {
  render() {
    const {
      blockId,
      candidateLevel,
      blockClass,
      cellIdBase,
      cellClass,
      inhibitedClass,
      appearanceArray,
      onClickFunc
    } = this.props;

    const numArray = Util.getNsequence(Config.size);
    let cellLabels = [];
    let clsNames = [];

    for (const [i, num] of numArray.entries()) {
      cellLabels.push(cellIdBase + num);

      let clsName = [cellClass, Util.getCellNumClass(num, null, true)].join(
        " "
      );

      if (appearanceArray && appearanceArray[i] !== null) {
        if (
          candidateLevel ===
          Util.getLevelNumFromFunctionName(
            Config.candidateTypes.displayCandidates
          )
        ) {
          let appearance = appearanceArray[i];
          if (Config.wideExclusiveStatuses.includes(appearanceArray[i])) {
            appearance = Config.candidateStatus.candidate;
          }
          clsName = [clsName, appearance].join(" ");
        } else {
          clsName = [clsName, appearanceArray[i]].join(" ");
        }
      }

      if (inhibitedClass) {
        clsName = [clsName, inhibitedClass].join(" ");
      }

      clsNames.push(clsName);
    }

    const cells = numArray.map((num, i) => {
      return (
        <Cell
          key={cellLabels[i]}
          cellId={cellLabels[i]}
          num={num}
          onClick={onClickFunc}
          clsName={clsNames[i]}
        />
      );
    });

    return (
      <div id={blockId} className={blockClass}>
        {cells}
      </div>
    );
  }
}

export default NumPanelBlock;
