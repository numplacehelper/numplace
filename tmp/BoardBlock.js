import React, { Component } from "react";

import Cell from "../Cell";
import CellContainer from "./CellContainer";
import Marker from "./Marker";

import Util from "../../Util";
import Config from "../../Config";

class BoardBlock extends Component {
  render() {
    const {
      mode,
      helpMode,
      blockId,
      singleNumValue,
      multipleNums,
      candidates,
      candidateLevel,
      markerStatus,

      numArray,
      appearanceArray,
      markerNums,
      cellLabels,
      clsNames,

      showFloating,
      handleNumInsert,
      handleCandidateCell,
      handleMarkerCell
    } = this.props;

    // console.log("inside BoardBlock");

    const displayNums =
      helpMode === Config.helpMode.multipleNums
        ? multipleNums
        : [singleNumValue];
    const blockWrapperId = blockId + "wrapper";
    const blockWrapperClass = "blockWrapper";
    let inhibitedClass = null;

    const cells = numArray.map((num, i) => {
      let cell = null;

      if (
        [
          Config.helpMode.candidates,
          Config.helpMode.both,
          Config.helpMode.multipleNums
        ].includes(helpMode) &&
        num === null
      ) {
        const cellIdx = Util.R1C12Index(cellLabels[i]);
        let candidateArray = Util.deepCopy(
          Util.getCandidateStatusArray(candidates, cellIdx)
        );

        if (
          [Config.helpMode.both, Config.helpMode.multipleNums].includes(
            helpMode
          )
        ) {
          if (
            candidateLevel >=
            Util.getLevelNumFromFunctionName(
              Config.candidateTypes.singleCandidate
            )
          ) {
            candidateArray = candidateArray.map((status, j) =>
              displayNums.includes(Util.i2n(j)) || Util.isWideRemoved(status)
                ? status
                : Config.candidateStatus.weaklyShadowed
            );
          } else if (
            candidateLevel >
            Util.getLevelNumFromFunctionName(
              Config.candidateTypes.displayCandidates
            )
          ) {
            candidateArray = candidateArray.map((status, j) =>
              displayNums.includes(Util.i2n(j)) || Util.isRemoved(status)
                ? status
                : Config.candidateStatus.weaklyShadowed
            );
          }
        }

        let appearanceSmallCell = null;
        let onClickFunc = showFloating;

        if (
          helpMode !== Config.helpMode.multipleNums &&
          0 < singleNumValue &&
          singleNumValue <= Config.size
        ) {
          onClickFunc = handleNumInsert;
        }

        inhibitedClass = null;
        if (
          [Config.helpMode.both, Config.helpMode.multipleNums].includes(
            helpMode
          ) &&
          appearanceArray[i].includes(Config.candidateStatus.inhibited)
        ) {
          inhibitedClass = appearanceArray[i];
        }

        const singleCandidate = Util.getSingleCandidate(candidates, cellIdx);
        const isSelectable = Util.isSelectableCell(candidates, cellIdx);

        if (singleCandidate || isSelectable) {
          onClickFunc = handleNumInsert;
        }

        if (
          helpMode === Config.helpMode.candidates &&
          candidateLevel >
            Util.getLevelNumFromFunctionName(
              Config.candidateTypes.displayCandidates
            ) &&
          isSelectable
        ) {
          appearanceSmallCell = Config.candidateStatus.selectable;
        }

        cell = (
          <CellContainer
            key={cellLabels[i]}
            cellId={cellLabels[i]}
            candidateLevel={candidateLevel}
            lastCandidate={singleCandidate}
            appearanceSubCellArray={candidateArray}
            appearanceSmallCell={appearanceSmallCell}
            inhibitedClass={inhibitedClass}
            onCellClick={onClickFunc}
            handleCandidateCell={handleCandidateCell}
            clsName={clsNames[i]}
          />
        );
      } else {
        let onClickFunc = showFloating;

        if (helpMode !== Config.helpMode.multipleNums && singleNumValue) {
          onClickFunc =
            mode === Config.mode.set ||
            !appearanceArray[i].includes(Config.candidateStatus.shadowed)
              ? handleNumInsert
              : null;
        }

        cell = (
          <Cell
            key={cellLabels[i]}
            cellId={cellLabels[i]}
            num={num}
            onClick={onClickFunc}
            clsName={clsNames[i]}
          />
        );
      }
      return cell;
    });

    const markOnClickFunc =
      helpMode !== Config.helpMode.multipleNums && singleNumValue
        ? handleMarkerCell
        : showFloating;

    return (
      <div
        key={blockWrapperId}
        id={blockWrapperId}
        className={blockWrapperClass}
      >
        <Marker
          key={blockId + "markRow"}
          markerStatus={markerStatus}
          blockId={blockId}
          rowColType="row"
          markerNums={markerNums}
          candidateLevel={candidateLevel}
          onClickFunc={markOnClickFunc}
        />

        <div id={blockId} className={Config.panelClassNames.block}>
          {cells}
        </div>

        <Marker
          key={blockId + "markCol"}
          markerStatus={markerStatus}
          blockId={blockId}
          rowColType="col"
          markerNums={markerNums}
          candidateLevel={candidateLevel}
          onClickFunc={markOnClickFunc}
        />
      </div>
    );
  }
}

export default BoardBlock;
