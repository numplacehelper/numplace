import React, { Component } from "react";

import Util from "../../../Util";
import Config from "../../../Config";

import "../../../css/cell.css";

class NumCounter extends Component {
  getNumCounter = num => {
    const { numCounts } = this.props;

    console.log(`num: ${num}, numCount: ${numCounts[num]}`);
    // console.log("numCounts");
    // console.log(numCounts);

    const counterID = Util.appendNum(Config.buttonIds.numCounter, num);
    const clsCounter = Config.buttonClassNames.numCounter;
    // const clsCounterBar = Util.appendNum(
    //   Config.buttonClassNames.numCounterBar,
    //   num
    // );

    const idxArray = Util.getIndexSequence(Config.size);
    let bars = null;

    if (num > 0) {
      bars = idxArray.map(i => {
        // console.log("i: ", i);

        const barID = Config.buttonIds.numCounterBar + num + i;
        let clsCounterBar = Config.buttonClassNames.numCounterBar;

        if (i >= Config.size - numCounts[num]) {
          clsCounterBar = [
            clsCounterBar,
            Util.appendNum(Config.buttonClassNames.indicator, num)
          ].join(" ");
        }

        return <div key={barID} id={barID} className={clsCounterBar} />;
      });
    }

    return (
      <div key={counterID} id={counterID} className={clsCounter}>
        {bars}
      </div>
    );
  };

  render() {
    console.log("inside NumCounter");

    const idx10Array = Util.getIndexSequence(Config.size + 1);

    const counters = idx10Array.map(num => this.getNumCounter(num));

    return <div id={Config.buttonIds.numCounterWrapper}>{counters}</div>;
  }
}

export default NumCounter;
