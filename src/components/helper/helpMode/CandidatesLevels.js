import React, { Component } from "react";

import Util from "../../../Util";
import Config from "../../../Config";

class CandidateLevels extends Component {
  getButton = level => {
    const {
      lang,
      mode,
      helpMode,
      candidateLevel,
      handleCandidates: handleCandidateLevels
    } = this.props;

    const nLevel = Util.getLevelNum(level);
    let disabled = true;
    let label = "";
    let titleCaption = "";
    let btnClsName = Config.buttonClassNames.candidateButton;

    label = Util.getCandidateLevelTitle(level);

    if (helpMode === Config.helpMode.singleNum) {
      if (Object.keys(Config.singleNumCaptions).includes(level)) {
        titleCaption = Config.singleNumCaptions[level][lang];
      }
    } else {
      titleCaption = Config.candidateLevelCaptions[level][lang];
    }

    if (Util.getLevelNum(level) === candidateLevel) {
      btnClsName = [btnClsName, Config.buttonStatus.active].join(" ");
    }

    if (
      mode === Config.mode.play &&
      (helpMode === Config.helpMode.candidates ||
        (helpMode === Config.helpMode.singleNum &&
          nLevel <=
            Util.getLevelNumFromFunctionName(
              Config.candidateTypes.singleExclusive
            )) ||
        ([
          Config.helpMode.candidates,
          Config.helpMode.both,
          Config.helpMode.multipleNums
        ].includes(helpMode) &&
          nLevel <
            Util.getLevelNumFromFunctionName(
              Config.candidateTypes.singleCandidate
            )))
    ) {
      disabled = null;
    }

    return (
      <button
        key={level}
        id={Util.getCandidateLevelId(level)}
        className={btnClsName}
        title={titleCaption}
        onClick={() => handleCandidateLevels(level)}
        disabled={disabled}
      >
        {label}
      </button>
    );
  };

  render() {
    // const { mode, helpMode } = this.props;

    // let clsName = Config.buttonClassNames.candidateContainer;

    // if (
    //   mode !== Config.mode.play ||
    //   ![Config.helpMode.none, Config.helpMode.candidates].includes(helpMode)
    // ) {
    //   clsName = [clsName, Config.buttonClassNames.candidateDisabled].join(" ");
    // }

    const buttons = Config.candidateLevels.map(candidateLevel =>
      this.getButton(candidateLevel)
    );

    return (
      <div
        id={Config.buttonIds.candidates}
        className={Config.buttonClassNames.candidateButtonWrapper}
      >
        {buttons}
      </div>
    );
  }
}

export default CandidateLevels;
