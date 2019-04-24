import React, { Component } from "react";
// Required to use React portals
// import ReactDOM from "react-dom";

import Util from "../../Util";
import Config from "../../Config";

import "../../css/ShowMessage.css";

class ShowTextarea extends Component {
  state = {
    isShowTextarea: !!this.props.isShowTextarea
  };

  componentWillReceiveProps({ isShowTextarea }) {
    this.setState({ isShowTextarea });
  }

  render() {
    const {
      modal,
      numMatrix,
      isRegisteredMatrix,

      // viewport,
      closeOnModalClick,
      message,
      // gameData,
      handleCloseClick
    } = this.props;

    const { isShowTextarea } = this.state;
    const isModal = modal ? " modal" : "";
    const doShow = isShowTextarea ? " show" : "";
    // const isViewport = viewport ? " viewport" : "";
    const id = Config.panelIds.textForm;
    const clsName = [Config.panelClassNames.textForm, isModal, doShow].join(
      " "
    );

    // let prevNumMatrix = prevState.numMatrix;
    // const prevIsRegisteredMatrix = prevState.isRegisteredMatrix;

    const orgNumMatrix = Util.resetNumMatrix(numMatrix, isRegisteredMatrix);
    const gameData = Util.convNumMatrix2CSV(orgNumMatrix);

    // const props = {
    //   onClick: closeOnModalClick ? handleMessageModalClick : null
    // };

    // const float = (
    return (
      <div
        id={id}
        // {...props}
        className={clsName}
        style={{
          position: "absolute",
          display: isShowTextarea ? "flex" : "none"
        }}
      >
        {/* {this.props.children} */}
        <h2>{Config.panelTitles.textForm}</h2>
        <textarea name="textarea1" value={gameData} cols="15" rows="15">
          {/* {gameData} */}
        </textarea>
        <button onClick={handleCloseClick}>Close</button>
      </div>
    );

    // return viewport ? ReactDOM.createPortal(float, document.body) : float;
  }
}

export default ShowTextarea;
