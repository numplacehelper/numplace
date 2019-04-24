import React, { Component } from "react";

import Config from "../src/Config";
// import Util from "../Util";

class Cell extends Component {
  render() {
    const {
      cellId,
      num,
      isRegistered,
      duplicated,
      singleNumValue,
      appearance,
      showFloating,
      isNumPanel,
      handleNumPanelClick,
      handleNumInsert
    } = this.props;

    let clsName = Config.panelClassNames.cell;
    if (isRegistered) {
      clsName = [clsName, Config.registered].join(" ");
    }
    if (duplicated) {
      clsName = [clsName, Config.duplicated].join(" ");
    } else if (appearance) {
      clsName = [clsName, appearance].join(" ");
    }

    const onClickFunc = isNumPanel
      ? handleNumPanelClick
      : !singleNumValue
      ? showFloating
      : !appearance
      ? handleNumInsert
      : null;

    const col = num ? Config.numColor[num] : Config.numColor[0];
    let myStyle = {};
    if (!appearance) {
      myStyle = { color: col };
    } else if (appearance === Config.appearance.shadowed) {
      myStyle = {
        color: Config.hiddenFontColor,
        background: Config.hiddenBGColor
      };
    } else if (appearance.includes(Config.appearance.inhibited)) {
      myStyle = {
        color: col,
        background: Config.inhibitedCellColor[singleNumValue]
      };
    } else if (duplicated) {
      myStyle = { color: col, background: Config.duplicatedColor };
    } else {
      myStyle = { color: col };
    }

    return (
      <div
        id={cellId}
        className={clsName}
        style={myStyle}
        onClick={onClickFunc}
      >
        {num}
      </div>
    );
  }
}

export default Cell;
