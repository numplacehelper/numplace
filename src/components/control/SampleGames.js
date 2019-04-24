import React, { Component } from "react";

import Util from "../../Util";
import Config from "../../Config";

class SampleGames extends Component {
  render() {
    const { lang, gameLevel, handleSampleGames } = this.props;

    // console.log("inside SampleGames");

    const buttonSet = Util.getSampleGameList().map(level => {
      const innerWrapperId =
        Config.buttonIds.sampleGameInnerWrapper + Util.capitalize(level);
      const innerWrapperClass = Config.buttonClassNames.sampleGameInnerWrapper;

      const buttons = Config.sampleGames[level].map((_, i) => {
        const buttonId = Util.getSampleGameButtonId(level, i);

        let btnClsName = Config.buttonClassNames.sampleGameButton;

        const buttonTitle = Util.getSampleGameButtonLabel(level, i);

        if (gameLevel === buttonId) {
          btnClsName = [btnClsName, Config.buttonStatus.active].join(" ");
        }

        let title = Util.getSampleGameButtonTitle(level, i, lang);

        return (
          <button
            key={buttonId}
            id={Config.buttonIds.sampleGame + Util.capitalize(buttonId)}
            className={btnClsName}
            title={title}
            onClick={() => handleSampleGames(buttonId)}
          >
            {buttonTitle}
          </button>
        );
      });

      return (
        <div
          key={innerWrapperId}
          id={innerWrapperId}
          className={innerWrapperClass}
        >
          {buttons}
        </div>
      );
    });

    return (
      <div
        id={Config.buttonIds.sampleGameWrapper}
        className={Config.buttonClassNames.sampleGameFrame}
      >
        <div>
          <h3>{Config.buttonTitles.sampleGames[lang]}</h3>
        </div>
        <div className={Config.buttonClassNames.sampleGameWrapper}>
          {buttonSet}
        </div>
      </div>
    );
  }
}

export default SampleGames;
