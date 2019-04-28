import React, { Component } from "react";

// import Util from "../../Util";
import Config from "../../Config";

class HelpButton extends Component {
  handleHelp = () => {
    const { handleHelpButton, lang } = this.props;

    const fileName = Config.helpFiles[lang];
    const path = Config.helpPath + fileName;

    // window.open("./help/help_ja.html", "_blank");
    window.open(path, "_blank");
    handleHelpButton();
  };

  render() {
    const { lang } = this.props;

    // console.log("inside HelpButton");

    let clsName = Config.buttonClassNames.help;

    const buttonTitle = Config.buttonTitles.help[lang];

    return (
      <button
        id={Config.buttonIds.help}
        className={clsName}
        onClick={this.handleHelp}
      >
        {buttonTitle}
      </button>
    );
  }
}

export default HelpButton;
