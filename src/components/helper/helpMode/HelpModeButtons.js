import React, { Component } from "react";

// import Util from "../../../Util";
import Config from "../../../Config";

class HelpModeButtons extends Component {
  getButton = type => {
    const { lang, mode, helpMode, handleHelpMode } = this.props;

    // const myself = this.constructor.name.toLowerCase();
    let disabled = true;

    let btnClsName = Config.helpModeButtonClassNames[type];
    if (
      helpMode !== Config.helpMode.none &&
      (helpMode === type ||
        helpMode === Config.helpMode.both ||
        helpMode === Config.helpMode.multipleNums)
    ) {
      btnClsName = [btnClsName, Config.buttonStatus.active].join(" ");
    }

    if (
      mode === Config.mode.play &&
      !(type === Config.helpMode.none && helpMode === Config.helpMode.none)
    ) {
      disabled = null;
    }

    const buttonType =
      type === Config.helpMode.multipleNums ? Config.helpMode.singleNum : type;
    const id = Config.helpModeButtonIds[buttonType];
    let title = Config.helpModeCaptions[buttonType][lang];

    if (type === Config.helpMode.singleNum) {
      if (helpMode === Config.helpMode.singleNum) {
        title = Config.helpModeCaptions[Config.helpMode.none][lang];
      } else if (helpMode === Config.helpMode.candidates) {
        title = Config.helpModeCaptions[Config.helpMode.both][lang];
      } else if (helpMode === Config.helpMode.both) {
        title = Config.helpModeCaptions[Config.helpMode.multipleNums][lang];
      }
    } else if (type === Config.helpMode.multipleNums) {
      title = Config.helpModeCaptions[Config.helpMode.none][lang];
    } else if (type === Config.helpMode.candidates) {
      if (helpMode === Config.helpMode.candidates) {
        title = Config.helpModeCaptions[Config.helpMode.none][lang];
      } else if (helpMode === Config.helpMode.singleNum) {
        title = Config.helpModeCaptions[Config.helpMode.both][lang];
      }
    }

    return (
      <button
        key={id}
        id={id}
        className={btnClsName}
        title={title}
        onClick={() => handleHelpMode(type)}
        disabled={disabled}
      >
        {Config.helpModeButtonLabels[type][lang]}
      </button>
    );
  };

  render() {
    const { helpMode } = this.props;

    const buttonTypes =
      helpMode === Config.helpMode.multipleNums
        ? Config.helpModeArray4displayOnMultipleNums
        : Config.helpModeArray4display;
    // let clsName = Config.helpModeButtonClassNames.container;

    // if (mode !== Config.mode.play) {
    //   clsName = [clsName, Config.buttonClassNames.candidateDisabled].join(" ");
    // }

    const buttons = buttonTypes.map(type => this.getButton(type));

    return (
      <div
        id={Config.helpModeButtonIds.wrapper}
        className={Config.helpModeButtonClassNames.wrapper}
      >
        {buttons}
      </div>
    );
  }
}

export default HelpModeButtons;
