import React, { Component } from "react";

import NewGame from "./NewGame";
import SampleGames from "./SampleGames";
import Restart from "./Restart";
import SetUp from "./SetUp";

import Config from "../../Config";

import "../../css/ControlPanel.css";

class ControlPanel extends Component {
  render() {
    const { lang } = this.props;

    return (
      <div
        id={Config.panelIds.control}
        className={Config.panelClassNames.control}
      >
        <h2>{Config.panelTitles.control[lang]}</h2>
        <NewGame {...this.props} />
        <SetUp {...this.props} />
        <SampleGames {...this.props} />
        <Restart {...this.props} />
      </div>
    );
  }
}

export default ControlPanel;
