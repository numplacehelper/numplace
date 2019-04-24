import React, { Component } from "react";
// Required to use React portals
// import ReactDOM from "react-dom";

import Config from "../../Config";

import "../../css/ShowMessage.css";

import closeLogo from "../../images/close.svg";

class ShowMessage extends Component {
  state = {
    show: !!this.props.isShowMessage
  };

  componentWillReceiveProps({ isShowMessage }) {
    this.setState({ isShowMessage });
  }

  render() {
    const {
      modal,
      // viewport,
      closeOnModalClick,
      message,
      handleMessageModalClick
    } = this.props;
    const { isShowMessage } = this.state;
    const isModal = modal ? " modal" : "";
    const doShow = isShowMessage ? " show" : "";
    // const isViewport = viewport ? " viewport" : "";
    const id = Config.panelIds.messageWrapper;
    const clsName = [
      Config.panelClassNames.messageWrapper,
      isModal,
      doShow
    ].join(" ");

    const props = {
      onClick: closeOnModalClick ? handleMessageModalClick : null
    };

    // const float = (
    return (
      <div
        id={id}
        {...props}
        className={clsName}
        style={{
          position: "absolute",
          display: isShowMessage ? "flex" : "none"
        }}
      >
        {/* {this.props.children} */}
        <h1>{message}</h1>
        <img src={closeLogo} alt="close" title="close" />
      </div>
    );

    // return viewport ? ReactDOM.createPortal(float, document.body) : float;
  }
}

export default ShowMessage;
