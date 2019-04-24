import React, { Component } from "react";

import Cell from "./Cell";
import Util from "../src/Util";
import Config from "../src/Config";

class Block extends Component {
  render() {
    const {
      blockId,
      helpMode,
      numMatrix,
      isRegisteredMatrix,
      duplicates,
      singleNumValue,
      appearanceMatrix,
      isNumPanel,
      showFloating,
      handleNumPanelClick,
      handleNumInsert
    } = this.props;

    const cellIndices = isNumPanel
      ? Util.getCellIndicesFromBlockIndex(0)
      : Util.getCellIndicesFromBlockId(blockId);

    const cells = cellIndices.map(cellIdx => {
      const num = numMatrix[cellIdx.r][cellIdx.c];
      let isRegistered = null;
      let duplicated = null;
      let appearance = null;
      const cellLabel = isNumPanel
        ? Config.panelIds.numPanelCell + num
        : Util.index2R1C1(cellIdx);

      if (!isNumPanel) {
        isRegistered = isRegisteredMatrix[cellIdx.r][cellIdx.c];

        if (helpMode === Config.helpMode.check) {
          duplicated = Util.isIdxInDuplicates(duplicates, cellIdx);
        }

        if (appearanceMatrix.length > 0) {
          appearance = appearanceMatrix[cellIdx.r][cellIdx.c];
        }
      }

      return (
        <Cell
          key={cellLabel}
          cellId={cellLabel}
          block={blockId}
          num={num}
          isRegistered={isRegistered}
          appearance={appearance}
          singleNumValue={isNumPanel ? null : singleNumValue}
          showFloating={showFloating}
          isNumPanel={isNumPanel}
          handleNumPanelClick={handleNumPanelClick}
          handleNumInsert={handleNumInsert}
          duplicated={duplicated}
        />
      );
    });

    return (
      <div id={blockId} className={Config.panelClassNames.block}>
        {cells}
      </div>
    );
  }
}

export default Block;
