import React, { Component } from "react";

import Config from "../../Config";

class NewGame extends Component {
  render() {
    const { lang, handleNewGame } = this.props;

    return (
      <div
        id={Config.buttonIds.newGame}
        className={Config.buttonClassNames.newGame}
        onClick={handleNewGame}
      >
        {Config.buttonTitles.newGame[lang]}
      </div>
    );
  }
}

export default NewGame;
