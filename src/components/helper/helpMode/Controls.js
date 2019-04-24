import React, { Component } from "react";

import Util from "../../../Util";
import Config from "../../../Config";

import forwardLogo from "../../../images/forward.svg";
import forwardDisabledLogo from "../../../images/forwardDisabled.svg";
import fastForwardLogo from "../../../images/fastForward.svg";
import fastForwardDisabledLogo from "../../../images/fastForwardDisabled.svg";
import backwardLogo from "../../../images/backward.svg";
import backwardDisabledLogo from "../../../images/backwardDisabled.svg";
import rewindLogo from "../../../images/rewind.svg";
import rewindDisabledLogo from "../../../images/rewindDisabled.svg";
import selectLogo from "../../../images/select.svg";
import selectDisabledLogo from "../../../images/selectDisabled.svg";
import eraseLogo from "../../../images/erase.svg";
import eraseDisabledLogo from "../../../images/eraseDisabled.svg";

class Controls extends Component {
  constructor() {
    super();
    this.state = { isSkipIneffective: true };
  }

  checkboxIsSkip = React.createRef();

  getButton = controlType => {
    const {
      lang,
      helpMode,
      markerStatus,
      trace,
      candidateLevel,
      handleControls
    } = this.props;

    let disabled = true;
    let label = "";
    let titleCaption = "";

    const activeSymbols = {
      [Config.candidateControls.forward]: forwardLogo,
      [Config.candidateControls.fastForward]: fastForwardLogo,
      [Config.candidateControls.backward]: backwardLogo,
      [Config.candidateControls.reset]: rewindLogo,
      [Config.candidateControls.select]: selectLogo,
      [Config.candidateControls.erase]: eraseLogo
    };

    const disabledSymbols = {
      [Config.candidateControls.forward]: forwardDisabledLogo,
      [Config.candidateControls.fastForward]: fastForwardDisabledLogo,
      [Config.candidateControls.backward]: backwardDisabledLogo,
      [Config.candidateControls.reset]: rewindDisabledLogo,
      [Config.candidateControls.select]: selectDisabledLogo,
      [Config.candidateControls.erase]: eraseDisabledLogo
    };

    const iconSizeSmall = Config.candidateControlIconSizes.small;
    const iconSizeLarge = Config.candidateControlIconSizes.large;
    const iconStyleSmall = { width: iconSizeSmall, height: iconSizeSmall };
    const iconStyleLarge = { width: iconSizeLarge, height: iconSizeLarge };

    const iconStyles = {
      [Config.candidateControls.forward]: iconStyleSmall,
      [Config.candidateControls.fastForward]: iconStyleSmall,
      [Config.candidateControls.backward]: iconStyleSmall,
      [Config.candidateControls.reset]: iconStyleSmall,
      [Config.candidateControls.select]: iconStyleLarge,
      [Config.candidateControls.erase]: iconStyleLarge
    };

    let btnClsName = Config.buttonClassNames.candidateButton;

    let symbol = disabledSymbols[controlType];

    if (
      ([
        Config.candidateControls.backward,
        Config.candidateControls.reset
      ].includes(controlType) &&
        trace.length > 0) ||
      (controlType === Config.candidateControls.select &&
        helpMode === Config.helpMode.candidates &&
        markerStatus === Config.buttonStatus.active &&
        candidateLevel >=
          Util.getLevelNumFromFunctionName(
            Config.candidateTypes.displayCandidates
          )) ||
      ([
        Config.helpMode.candidates,
        Config.helpMode.singleNum,
        Config.helpMode.both,
        Config.helpMode.multipleNums
      ].includes(helpMode) &&
        candidateLevel >=
          Util.getLevelNumFromFunctionName(
            Config.candidateTypes.singleCandidate
          ))
    ) {
      symbol = activeSymbols[controlType];
      disabled = null;
    }

    label = (
      <img
        src={symbol}
        style={iconStyles[controlType]}
        alt={Config.constrolIconCaptions[controlType][lang]}
        title={Config.constrolIconCaptions[controlType][lang]}
      />
    );

    return (
      <button
        key={controlType}
        id={Util.getControlId(controlType)}
        className={btnClsName}
        title={titleCaption}
        onClick={() => handleControls(controlType)}
        disabled={disabled}
      >
        {label}
      </button>
    );
  };

  handleCheckbox = e => {
    const { handleSkipIneffectiveStatus } = this.props;

    const isSkipIneffective = e.currentTarget.checked;

    this.setState({ isSkipIneffective });

    handleSkipIneffectiveStatus(isSkipIneffective);
  };

  render() {
    const { lang, mode, helpMode, candidateLevel } = this.props;

    let disabled = true;
    // let clsName = Config.buttonClassNames.candidateContainer;

    // if (
    //   mode !== Config.mode.play ||
    //   ![Config.helpMode.none, Config.helpMode.candidates].includes(helpMode)
    // ) {
    //   clsName = [clsName, Config.buttonClassNames.candidateDisabled].join(" ");
    // }

    if (
      mode === Config.mode.play &&
      helpMode === Config.helpMode.candidates &&
      candidateLevel >
        Util.getLevelNumFromFunctionName(
          Config.candidateTypes.displayCandidates
        )
    ) {
      disabled = null;
    }

    const buttons = Config.candidateControlArray.map(controlType =>
      this.getButton(controlType)
    );

    return (
      <div>
        <div
          id={Config.buttonIds.controls}
          className={Config.buttonClassNames.candidateButtonWrapper}
        >
          {buttons}
        </div>
        <label
          key={Config.buttonIds.controlLabelSkipIneffective}
          id={Config.buttonIds.controlLabelSkipIneffective}
          className={Config.buttonClassNames.controlSkipIneffective}
        >
          <input
            type="checkbox"
            ref={this.checkboxIsSkip}
            name={Config.formNames.skipIneffective}
            onChange={this.handleCheckbox}
            checked={this.state.isSkipIneffective}
            disabled={disabled}
          />
          {Config.helpModeButtonLabels.skipIneffective[lang]}
        </label>
      </div>
    );
  }
}

export default Controls;
