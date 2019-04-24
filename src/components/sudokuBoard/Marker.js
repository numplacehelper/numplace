import React, { Component } from "react";

import Cell from "../Cell";

import Util from "../../Util";
import Config from "../../Config";

import "../../css/cellColor.css";

class Marker extends Component {
  getCells = (cellIdBase, markerInfos) => {
    const { markerStatus, onClickFunc, candidateLevel } = this.props;

    const onClick =
      markerStatus === Config.buttonStatus.active ? onClickFunc : null;
    const cellClass = "markCell";

    const numArray = Util.getNsequence(Config.sizeB);

    let nums = markerInfos.nums;
    if (!nums || nums.length !== Config.sizeB) {
      nums = Util.initArray(null, Config.sizeB);
    }

    let clsNames = nums.map((n, i) =>
      [cellClass, markerStatus, Util.getCellNumClass(n, null, true)].join(" ")
    );

    if (
      candidateLevel >
      Util.getLevelNumFromFunctionName(Config.candidateTypes.displayCandidates)
    ) {
      clsNames = clsNames.map((clsName, i) =>
        markerStatus === Config.buttonStatus.waiting ||
        markerInfos.statuses[i] === null ||
        markerInfos.statuses[i] === Config.candidateStatus.exclusiveSingle
          ? clsName
          : [clsName, markerInfos.statuses[i]].join(" ")
      );
    }

    let cellLabels = numArray.map(n => cellIdBase + "I" + n);
    const cells = cellLabels.map((cellLabel, i) => {
      return (
        <Cell
          key={cellLabel}
          cellId={cellLabel}
          num={markerStatus === Config.buttonStatus.active ? nums[i] : null}
          onClick={onClick}
          clsName={clsNames[i]}
        />
      );
    });
    return cells;
  };

  render() {
    const { rowColType, blockId, markerNums } = this.props;

    const rcType = Util.getFirstLetter(rowColType);
    const wrapperBase = "markWrapper";
    const rowColClass = "mark" + Util.capitalize(rowColType);
    const idBase = rowColType;
    const idBaseShort = Util.capitalize(Util.getFirstLetter(idBase));
    const rowColIdBase = Util.abbreviateBlockId(blockId) + idBaseShort;
    const wrapperId =
      wrapperBase + Util.capitalize(blockId) + Util.capitalize(idBase);
    const wrapperClass = wrapperBase + Util.capitalize(idBase);
    const blockIdx = Util.getBlockIdxFromBlockId(blockId);
    const rowColIndices = Util.getBlkRowColIndicesFromIdx(blockIdx, rowColType);
    const rowColNIndices = rowColIndices.map(i => i + 1);
    const cellIdBases = rowColNIndices.map(rc => rowColIdBase + rc);

    const rowCols = rowColNIndices.map((nRC, i) => {
      const markerIdx = Util.initMarkerIdx(blockIdx, rcType, nRC - 1);
      const markerInfos = Util.getInfoArrayFromMarkerNums(
        markerNums,
        markerIdx
      );
      const cells = this.getCells(cellIdBases[i], markerInfos);

      return (
        <div
          key={rowColIdBase + nRC}
          id={rowColIdBase + nRC}
          className={rowColClass}
        >
          {cells}
        </div>
      );
    });

    return (
      <div id={wrapperId} className={wrapperClass}>
        {rowCols}
      </div>
    );
  }
}

export default Marker;
