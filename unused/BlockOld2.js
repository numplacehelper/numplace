import React, { Component } from "react";

import Cell from "../src/components/Cell";
// import Util from "../../Util";
import Config from "../src/Config";

class Block extends Component {
  render() {
    const {
      blockId,
      numArray,
      cellLabels,
      clsNames,
      // styles,
      funcs
      //   onClick
    } = this.props;

    const cells = numArray.map((num, i) => {
      return (
        <Cell
          key={cellLabels[i]}
          cellId={cellLabels[i]}
          num={num}
          //   onClick={onClick}
          onClick={funcs[i]}
          // style={styles[i]}
          clsName={clsNames[i]}
        />
      );
    });

    return (
      <div id={blockId} className={Config.panelClassNames.block}>
        {cells}
      </div>
    );
  }
}

export default Block;
