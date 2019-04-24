import React, { Component } from "react";

import NumPanelBlock from "../NumPanelBlock";
import NumPanelControl from "./NumPanelControl";

import Config from "../../Config";

class NumPanel extends Component {
  render() {
    const { handleNumPanelClick } = this.props;

    return (
      <div id={Config.panelIds.numPanelContainer}>
        <NumPanelBlock
          key={Config.panelIds.numPanel}
          blockId={Config.panelIds.numPanel}
          blockClass={Config.panelClassNames.block}
          cellIdBase={Config.panelIds.numPanelCell}
          cellClass={Config.panelClassNames.cell}
          onClickFunc={handleNumPanelClick}
        />
        <NumPanelControl {...this.props} />
      </div>
    );
  }
}

export default NumPanel;
