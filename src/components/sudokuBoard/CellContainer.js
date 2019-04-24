import React, { Component } from "react";

import Cell from "../Cell";
import NumPanelBlock from "../NumPanelBlock";

import Util from "../../Util";
import Config from "../../Config";

import "../../css/cell.css";

class CellContainer extends Component {
  render() {
    const {
      candidateLevel,
      cellId,
      lastCandidate,
      appearanceSubCellArray,
      appearanceSmallCell,
      inhibitedClass,
      onCellClick,
      handleCandidateCell
    } = this.props;

    // console.log("inside CellContainer");

    const blockId = cellId + Util.capitalize(Config.panelIds.block);

    let clsName = [Config.panelClassNames.smallCell, appearanceSmallCell].join(
      " "
    );
    if (inhibitedClass) {
      clsName = [clsName, inhibitedClass].join(" ");
    }

    return (
      <div
        id={cellId + Config.panelIds.cellContainerSuffix}
        className={Config.panelClassNames.cellContainer}
      >
        <NumPanelBlock
          blockId={blockId}
          candidateLevel={candidateLevel}
          blockClass={Config.panelClassNames.subBlock}
          cellIdBase={cellId + Config.panelIds.numPanelCell}
          cellClass={Config.panelClassNames.subCell}
          inhibitedClass={inhibitedClass}
          appearanceArray={appearanceSubCellArray}
          onClickFunc={handleCandidateCell}
        />
        <Cell
          key={cellId}
          cellId={cellId}
          lastCandidate={lastCandidate}
          onClick={inhibitedClass ? null : onCellClick}
          clsName={clsName}
        />
      </div>
    );
  }
}

export default CellContainer;
