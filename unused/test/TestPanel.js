import React, { Component } from "react";

import NumPanelBlock from "../NumPanelBlock";
// import NumPanelControl from "./NumPanelControl";
// import MarkRow from "../sudokuBoard/MarkRow";
import Mark from "../sudokuBoard/Marker";

import Util from "../../Util";
import Config from "../../Config";

import "./test.css";

class TestPanel extends Component {
  render() {
    const { handleTestPanelClick } = this.props;

    return (
      <div id="testNumPanelContainer">
        {/* <MarkRow key="markColumn" onClickFunc={handleTestPanelClick} /> */}
        <Mark key="markRow" rowCol="row" onClickFunc={handleTestPanelClick} />
        <NumPanelBlock
          key="testNumPanelWrapper"
          //   key={Config.panelIds.numPanel}
          blockId={"test" + Util.capitalize(Config.panelIds.numPanel)}
          // numMatrix={Util.initNumPanelMatrix()}
          // blockId={Config.panelIds.numPanel}
          blockClass={"test" + Util.capitalize(Config.panelClassNames.block)}
          cellIdBase={"test" + Util.capitalize(Config.panelIds.numPanelCell)}
          cellClass={Config.panelClassNames.cell}
          onClickFunc={handleTestPanelClick}
          // isNumPanel={true}
          // handleNumPanelClick={handleTestPanelClick}
        />
        <div id="dummyCell" />
        <Mark key="markCol" rowCol="col" onClickFunc={handleTestPanelClick} />

        {/* <NumPanelControl {...this.props} /> */}
      </div>
    );
  }
}

export default TestPanel;
