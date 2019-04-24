import React, { Component } from "react";

import Util from "../../Util";
import Config from "../../Config";

class LangButton extends Component {
  render() {
    const { lang, handleLang } = this.props;

    // console.log("inside LangButton");

    let clsName = Config.buttonClassNames.lang;
    const theOtherLang = Util.flipLang(lang);
    const buttonTitle = Config.langButtonTitles[theOtherLang];

    return (
      <button
        id={Config.buttonIds.lang}
        className={clsName}
        onClick={handleLang}
      >
        {buttonTitle}
      </button>
    );
  }
}

export default LangButton;
