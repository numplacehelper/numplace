import React, { Component } from "react";

import Check from "./Check";
import HelpModePane from "./helpMode/HelpModePane";
// import HelpModeButtons from "./helpMode/HelpModeButtons";
// import SingleNum from "./helpMode/SingleNum";
// import CandidateLevels from "./helpMode/CandidatesLevels";
// import Controls from "./helpMode/Controls";
import MarkerButton from "./MarkerButton";
import LangButton from "./LangButton";
import HelpButton from "./HelpButton";
import Indicator from "./Indicator";

import Config from "../../Config";

import "../../css/ControlPanel.css";

class HelperlPanel extends Component {
  render() {
    const { lang } = this.props;

    return (
      <div
        id={Config.panelIds.helper}
        className={Config.panelClassNames.helper}
      >
        <div id={Config.buttonIds.helperLableWrapper}>
          <h2>{Config.panelTitles.helper[lang]}</h2>
          <Indicator {...this.props} />
        </div>

        <Check {...this.props} />
        <HelpModePane {...this.props} />
        <MarkerButton {...this.props} />
        <HelpButton {...this.props} />
        <LangButton {...this.props} />
      </div>
    );
  }
}

export default HelperlPanel;
