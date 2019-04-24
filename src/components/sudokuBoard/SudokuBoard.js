import React, { Component } from "react";

import BoardBlock from "./BoardBlock";

import Util from "../../Util";
import Config from "../../Config";

import "../../css/SudokuBoard.css";

class SudokuBoard extends Component {
  render() {
    const {
      mode,
      helpMode,
      checkMode,
      numMatrix,
      candidates,
      isRegisteredMatrix,
      duplicates,
      singleNumValue,
      multipleNums,
      candidateLevel
    } = this.props;

    // console.log("inside SudokuBoard");
    // console.log("helpMode: ", helpMode);
    // console.log("singleNumValue: ", singleNumValue);
    // console.log("multipleNums");
    // console.log(multipleNums);

    const numbers = Util.getNsequence(Config.size);

    let appearanceMatrix = [];
    if (
      mode === Config.mode.play &&
      [Config.helpMode.singleNum, Config.helpMode.both].includes(helpMode)
    ) {
      // console.log("I want to see this");

      appearanceMatrix = Util.getAppearanceMatrixFromCandidates(
        candidates,
        // helpMode,
        [singleNumValue],
        candidateLevel
      );
    } else if (
      helpMode === Config.helpMode.multipleNums &&
      multipleNums &&
      multipleNums.length > 0
    ) {
      appearanceMatrix = Util.getAppearanceMatrixFromCandidates(
        candidates,
        // helpMode,
        multipleNums,
        candidateLevel
      );
    } else if (singleNumValue !== null && singleNumValue !== 0) {
      appearanceMatrix = Util.getAppearanceMatrixFromNumMatrix(numMatrix);
    }

    // console.log("inside render of SudokuBoard");

    const blocks = numbers.map(blockNum => {
      const blockId = Util.getBlockIdByNum(blockNum);
      const cellIndices = Util.getBlkIndicesFromNum(blockNum);
      const numArray = Util.getNumbersFromIndices(numMatrix, cellIndices);
      const isRegisteredArray = Util.getNumbersFromIndices(
        isRegisteredMatrix,
        cellIndices
      );

      let isDuplicatedArray = [];
      if (checkMode !== Config.checkMode.none && duplicates) {
        isDuplicatedArray = Util.getIsDuplicatedFromIndices(
          duplicates,
          cellIndices
        );
      }

      const appearanceArray =
        appearanceMatrix && appearanceMatrix.length === Config.size
          ? Util.getNumbersFromIndices(appearanceMatrix, cellIndices)
          : Util.initArray(null);

      const cellLabels = cellIndices.map(idx => Util.index2R1C1(idx));

      const clsNames = numArray.map((num, i) => {
        let clsName = Config.panelClassNames.cell;
        const appearanceClass =
          appearanceArray[i] === null || appearanceArray[i] === ""
            ? Util.getCellNumClass(num, appearanceArray[i])
            : appearanceArray[i];
        clsName = [clsName, appearanceClass].join(" ");

        if (isRegisteredArray[i]) {
          clsName = [clsName, Config.registered].join(" ");
        }
        if (isDuplicatedArray[i]) {
          clsName = [clsName, Config.duplicated].join(" ");
        }
        return clsName;
      });

      return (
        <BoardBlock
          key={blockId}
          blockId={blockId}
          numArray={numArray}
          appearanceArray={appearanceArray}
          cellLabels={cellLabels}
          clsNames={clsNames}
          {...this.props}
        />
      );
    });

    return <div id={Config.panelIds.sudokuBoard}>{blocks}</div>;
  }
}

export default SudokuBoard;
