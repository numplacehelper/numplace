import React, { Component } from "react";
// Required to use React portals
// import ReactDOM from "react-dom";

import NumPanel from "./NumPanel";
import Config from "../../Config";

import "../../css/Floating.css";

class Floating extends Component {
  state = {
    showNumPanel: !!this.props.showNumPanel
  };

  componentWillReceiveProps({ showNumPanel }) {
    this.setState({ showNumPanel });
  }

  handleModalClick = () => {
    this.setState({
      showNumPanel: false
    });
  };

  render() {
    const { modal, closeOnModalClick, mousePosition } = this.props;
    const { showNumPanel } = this.state;
    const isModal = modal ? " modal" : "";
    const doShow = showNumPanel ? " show" : "";
    const id = Config.panelIds.numPanelWrapper;
    const clsName = [
      Config.panelClassNames.numPanelWrapper,
      isModal,
      doShow
    ].join(" ");

    const props = {
      onClick: closeOnModalClick ? this.handleModalClick : null
    };

    // const float = (
    return (
      <div
        id={id}
        {...props}
        className={clsName}
        style={{
          position: "absolute",
          left: mousePosition.x,
          top: mousePosition.y,
          display: showNumPanel ? "flex" : "none"
        }}
      >
        <NumPanel {...this.props} />
      </div>
    );
    // );

    // return viewport ? ReactDOM.createPortal(float, document.body) : float;
  }
}

export default Floating;
