import React, { Component } from "react";

import Config from "../../Config";
import Util from "../../Util";

class Check extends Component {
  getButton = level => {
    const { lang, mode, checkMode, handleCheck } = this.props;

    const myself = this.constructor.name.toLowerCase();
    const label = Config.checkButtonLabels[level][lang];
    const titleCaption = Config.checkTitleCaptions[level][lang];
    let disabled = true;
    let btnClsName = Config.buttonClassNames.checkButton;

    if (level !== Config.checkMode.none && level === checkMode) {
      btnClsName = [btnClsName, Config.buttonStatus.active].join(" ");
    }

    if (
      [Config.checkMode.none, Config.checkMode.duplicates].includes(level) ||
      mode === Config.mode.play
    ) {
      disabled = null;
    }

    return (
      <button
        key={level}
        id={Config.buttonIds[myself] + Util.capitalize(level)}
        className={btnClsName}
        title={titleCaption}
        onClick={() => handleCheck(level)}
        disabled={disabled}
      >
        {label}
      </button>
    );
  };

  render() {
    const { lang, checkMode } = this.props;

    // console.log("inside Check");

    let clsName = Config.buttonClassNames.candidateContainer;

    let titleClassName = Config.buttonClassNames.checkTitle;
    if (checkMode !== Config.checkMode.none) {
      titleClassName = [titleClassName, Config.buttonStatus.active].join(" ");
    }

    const buttons = Config.checkModeArray.map(type => this.getButton(type));

    return (
      <div id={Config.buttonIds.check} className={clsName}>
        <div>
          <h3 className={titleClassName}>
            {Config.checkButtonLabels.title[lang]}
          </h3>
        </div>
        <div
          id={Config.buttonIds.checkWrapper}
          className={Config.buttonClassNames.candidateButtonWrapper}
        >
          {buttons}
        </div>
      </div>
    );
  }
}

export default Check;
