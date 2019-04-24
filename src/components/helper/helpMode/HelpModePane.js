import React, { Component } from "react";

// import Util from "../../../Util";
import Config from "../../../Config";

import HelpModeButtons from "./HelpModeButtons";
import SingleNum from "./SingleNum";
import MultipleNums from "./MultipleNums";
import CandidateLevels from "./CandidatesLevels";
import Controls from "./Controls";

class HelpModePane extends Component {
  render() {
    const { lang, mode, helpMode } = this.props;

    let clsName = Config.helpModeButtonClassNames.container;

    if (mode !== Config.mode.play) {
      clsName = [clsName, Config.buttonClassNames.candidateDisabled].join(" ");
    }

    let titleClassName = Config.buttonClassNames.candidateTitle;

    const numPanel =
      helpMode === Config.helpMode.multipleNums ? (
        <MultipleNums {...this.props} />
      ) : (
        <SingleNum {...this.props} />
      );

    return (
      <div id={Config.helpModeButtonIds.container} className={clsName}>
        <div>
          <h3 className={titleClassName}>
            {Config.helpModeButtonLabels.title[lang]}
          </h3>
        </div>
        <HelpModeButtons {...this.props} />
        {numPanel}
        <CandidateLevels {...this.props} />
        <Controls {...this.props} />
      </div>
    );
  }
}

export default HelpModePane;
