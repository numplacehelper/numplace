import React, { Component } from "react";

import Floating from "../src/components/floating/Floating";
import NumPanel from "../src/components/floating/NumPanel";

// Currently not used //
class FloatingNumPanel extends Component {
  render() {
    // const {
    //   // floating,
    //   showNumPanel,
    //   mousePosition,
    //   isNum,
    //   handleNumPanelClick,
    //   handleDelete
    // } = this.props;

    // console.log(mousePosition);

    return (
      <Floating
        {...this.props}
        modal
        // showNumPanel={floating}
        // showNumPanel={showNumPanel}
        viewport
        closeOnModalClick
        // mousePosition={mousePosition}
      >
        {/* <NumPanel
          {...this.props}
          // isNum={isNum}
          // handleNumPanelClick={handleNumPanelClick}
          // handleDelete={handleDelete}
        /> */}
      </Floating>
    );
  }
}

export default FloatingNumPanel;
