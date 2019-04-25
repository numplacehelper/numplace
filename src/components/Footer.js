import React, { Component } from "react";

import Config from "../Config";
import Util from "../Util";

import "../css/cell.css";
import "../css/cellColor.css";
import "../App.css";

class Footer extends Component {
  render() {
    const { lang, gameLevel } = this.props;

    const gameInfo = Util.getSampleGameInfo(gameLevel);

    let credit = "";
    if (gameInfo) {
      credit = Util.getCredit(
        Config.sampleGames[gameInfo.gameClass][gameInfo.idx].credit[lang],
        lang
      );
    }

    return (
      <div
        id={Config.panelIds.footer}
        className={Config.panelClassNames.footer}
      >
        <span
          id={Config.panelIds.footerCredit}
          className={Config.panelClassNames.footerCredit}
        >
          {credit}
        </span>
      </div>
    );
  }
}

export default Footer;
