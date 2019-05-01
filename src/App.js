import React, { Component } from "react";

import SudokuBoard from "./components/sudokuBoard/SudokuBoard";
import ControlPanel from "./components/control/ControlPanel";
import HelperPanel from "./components/helper/HelperPanel";
import Footer from "./components/Footer";

import Floating from "./components/floating/Floating";
import ShowMessage from "./components/floating/ShowMessage";

import Util from "./Util";
import Config from "./Config";

import { getRandomInt } from "./util/Random";

import "./App.css";

class App extends Component {
  getInitialState() {
    const numMatrix = Util.initMatrix();

    return {
      lang: Config.lang.en,
      mode: Config.mode.set, // set, play
      helpMode: Config.helpMode.none, // none, check, singleNum, candidates
      checkMode: Config.checkMode.duplicates,

      numMatrix: numMatrix,
      ansMatrix: Util.initMatrix(),
      isRegisteredMatrix: Util.getRegisteredFlags(numMatrix),
      numCounts: Util.countNumbers(numMatrix),
      candidates: Util.initCube(Config.candidateStatus.candidate),
      exclusiveCandidates: [],
      trace: [],
      markerStatus: Config.buttonStatus.waiting,
      markerNums: Util.initMarkerNums(),

      // gameLevel: 10,
      gameLevel: 0,
      sampleGameID: null,

      singleNumValue: 0,
      multipleNums: [],

      candidateLevel: null,
      isStepByStep: true,
      isSkipIneffective: true,
      duplicates: [],

      activeCellIndex: null,

      mousePosition: {
        x: 0,
        y: 0
      },

      showNumPanel: false,
      isShowMessage: false,
      message: "",

      isFilled: false,
      isComplete: false,
      isGameDone: false,
      didUpdate: false
    };
  }

  constructor() {
    super();
    this.state = this.getInitialState();
  }

  componentDidUpdate() {
    const { isFilled, isComplete, numMatrix, trace } = this.state;
    // console.log("inside componentDidUpdate");

    if (!isComplete && !isFilled && Util.isAllFilled(numMatrix)) {
      const successMessages = Config.messages.success;

      this.setState({ isFilled: true });

      if (this.doCheckDuplicates() === Config.result.passed) {
        let isShowMessage = true;
        let message = successMessages[getRandomInt(0, successMessages.length)];

        if (Util.countManualInputs(trace) === 0) {
          isShowMessage = false;
        }

        this.setState({
          helpMode: Config.helpMode.none,
          candidateLevel: null,
          isComplete: true,
          isShowMessage,
          message
        });
      } else {
        this.setState({
          isShowMessage: true,
          message: Config.messages.failure
        });
      }
    }
  }

  calcAnswer = numMatrix => {
    // const { gameLevel, isSkipIneffective } = this.state;
    const { isSkipIneffective } = this.state;

    // console.log("inside calcAnswer");

    // const candidateLevel = Config.candidateLevelTypesArray.length - 1;
    const helpMode = Config.helpMode.candidates;
    const isStepByStep = false;
    const isSkipLevel1 = false;
    const singleNumValue = null;
    const isMarkerOff = true;

    let dataset = {
      numMatrix: Util.deepCopy(numMatrix),
      candidates: Util.initCube(Config.candidateStatus.candidate),
      exclusiveCandidates: [],
      markerNums: Util.initMarkerNums(),
      trace: [],
      // gameLevel: gameLevel === 10 ? 0 : gameLevel
      gameLevel: 0
    };

    let conditions = {
      // candidateLevel,
      helpMode,
      singleNumValue,
      isStepByStep,
      isSkipLevel1,
      isSkipIneffective,
      isMarkerOff
    };

    // console.log("game level: ", dataset.gameLevel);

    for (
      let candidateLevel = 2;
      candidateLevel < Config.candidateLevelTypesArray.length;
      candidateLevel++
    ) {
      conditions.candidateLevel = candidateLevel;

      dataset = Util.setCandidates(dataset, conditions);

      // console.log("game level: ", dataset.gameLevel);

      // There is a cell full of wide-removed //
      if (dataset === null) {
        return null;
      }

      dataset = Util.convertSelectable2Selected(dataset);

      if (Util.isAllFilled(dataset.numMatrix)) {
        dataset.gameLevel = candidateLevel;
        break;
      }
    }

    // console.log("game level: ", dataset.gameLevel);

    // return dataset.numMatrix;
    return dataset;
  };

  addNumNStore = cellInfo => {
    const { checkMode, ansMatrix } = this.state;

    // console.log("inside addNumNStore");

    this.setState(prevState => {
      let duplicates = prevState.duplicates;
      let helpMode = prevState.helpMode;

      let dataset = {
        numMatrix: prevState.numMatrix,
        isRegisteredMatrix: prevState.isRegisteredMatrix,
        candidates: prevState.candidates,
        exclusiveCandidates: prevState.exclusiveCandidates,
        markerNums: prevState.markerNums,
        trace: prevState.trace
      };

      dataset = this.addNum(dataset, cellInfo);

      // There is a cell full of wide-removed //
      if (dataset === null) {
        return {
          isShowMessage: true,
          message: Config.alertMessages.deadEnd
        };
      }

      if (!duplicates) {
        duplicates = [];
      }

      if (checkMode === Config.checkMode.duplicates || duplicates.length > 0) {
        duplicates = Util.checkDuplicate(dataset.numMatrix);
      } else if (checkMode === Config.checkMode.correctness) {
        duplicates = Util.checkCorrectness(ansMatrix, dataset.numMatrix);
      }

      return {
        helpMode: helpMode,
        numMatrix: dataset.numMatrix,
        isRegisteredMatrix: dataset.isRegisteredMatrix,
        numCounts: Util.countNumbers(dataset.numMatrix),
        trace: dataset.trace,
        duplicates: duplicates,
        candidates: dataset.candidates,
        exclusiveCandidates: dataset.exclusiveCandidates,
        markerNums: dataset.markerNums
      };
    });
  };

  addNum = (dataset, cellInfo) => {
    const { mode, helpMode, ansMatrix, candidateLevel } = this.state;

    let { numMatrix, isRegisteredMatrix, trace } = dataset;

    // console.log("inside addNum");

    const num = Util.getNumFromNumMatrix(numMatrix, cellInfo.idx);
    if (num) {
      cellInfo.prevNum = num;
    }

    numMatrix = Util.assignNum2NumMatrix(numMatrix, cellInfo);

    if (!Util.isNumCorrect(ansMatrix, cellInfo)) {
      cellInfo.isWrong = true;
    }

    // // process either game setting or playing
    const traceLength = trace.length;
    if (Config.updateHelpModes.includes(helpMode) && candidateLevel !== null) {
      dataset = Util.updateCandidates(dataset, cellInfo, candidateLevel);

      // There is a cell full of wide-removed //
      if (dataset === null) {
        return null;
      }
    }

    // process either game setting or playing
    if (mode === Config.mode.set) {
      isRegisteredMatrix = Util.assignTruth2regMatrix(
        isRegisteredMatrix,
        Util.initRegInfo(cellInfo.idx)
      );
    } else if (mode === Config.mode.play && !cellInfo.isBackward) {
      if (trace.length > traceLength) {
        const traceItem = trace[trace.length - 1];
        traceItem.numMatrix = cellInfo;
        traceItem.operation = Config.operationTypes.manual;
      } else {
        trace.push(
          Util.initTraceItemNum(cellInfo, Config.operationTypes.manual)
        );
      }
    }

    dataset.isRegisteredMatrix = isRegisteredMatrix;

    return dataset;
  };

  deleteNumNStore = idx => {
    const { checkMode } = this.state;

    this.setState(prevState => {
      let duplicates = prevState.duplicates;

      let dataset = {
        numMatrix: prevState.numMatrix,
        isRegisteredMatrix: prevState.isRegisteredMatrix,
        trace: prevState.trace
      };

      dataset = this.deleteNum(dataset, idx);

      if (checkMode === Config.checkMode.duplicates || duplicates.length > 0) {
        duplicates = Util.checkDuplicate(dataset.numMatrix);
      }

      return {
        numMatrix: dataset.numMatrix,
        isRegisteredMatrix: dataset.isRegisteredMatrix,
        numCounts: Util.countNumbers(dataset.numMatrix),
        trace: dataset.trace,

        duplicates,

        isFilled: false,
        isComplete: false,
        isGameDone: false
      };
    });
  };

  deleteNum = (dataset, idx, isBackward = false) => {
    const { mode } = this.state;

    // console.log("inside deleteNum");

    let { numMatrix, isRegisteredMatrix, trace } = dataset;

    // save the num to be deleted for trace //
    const num = Util.getNumFromNumMatrix(numMatrix, idx);

    numMatrix = Util.assignNum2NumMatrix(
      numMatrix,
      Util.initCellInfo(idx, null)
    );

    if (mode === Config.mode.set) {
      isRegisteredMatrix = Util.assignTruth2regMatrix(
        isRegisteredMatrix,
        Util.initRegInfo(idx, false)
      );
    }

    if (mode === Config.mode.play && !isBackward) {
      trace.push(Util.initTraceItem(Util.initCellInfo(idx, -num)));
    }

    dataset.isRegisteredMatrix = isRegisteredMatrix;

    return dataset;
  };

  addMarkerNStore = markerInfo => {
    // console.log("inside addMarker");

    this.setState(prevState => {
      let dataset = {
        markerNums: prevState.markerNums,
        candidates: prevState.candidates,
        trace: prevState.trace
      };

      dataset = this.addMarker(dataset, markerInfo);

      return {
        markerNums: dataset.markerNums,
        candidates: dataset.candidates,
        trace: dataset.trace
      };
    });
  };

  addMarker = (dataset, markerInfo) => {
    // console.log("inside addMarker");

    const { candidateLevel } = this.state;

    let { markerNums, candidates, trace } = dataset;
    let markerTrace = [];
    let candidateTrace = [];

    const duplicatedIdx = Util.findNumInMarker(markerNums, markerInfo);

    if (duplicatedIdx !== null) {
      return {};
    }

    markerInfo.status = Config.candidateStatus.exclusiveSingle;

    markerNums = Util.setMarkerNum(markerNums, markerInfo);

    if (candidateLevel !== null && candidateLevel > 0) {
      let candidateTraceTmp = [];
      let markerTraceTmp = [];

      [
        candidates,
        markerNums,
        candidateTraceTmp,
        markerTraceTmp
      ] = Util.setRelatedCandidatesBySingleMark(
        candidates,
        markerInfo,
        markerNums
      );

      if (markerTraceTmp && markerTraceTmp.length > 0) {
        markerTrace = markerTrace.concat(markerTraceTmp);
      }
      if (candidateTraceTmp && candidateTraceTmp.length > 0) {
        candidateTrace = candidateTrace.concat(candidateTraceTmp);
      }

      [
        candidates,
        markerNums,
        candidateTraceTmp,
        markerTraceTmp
      ] = Util.setRelatedCandidatesByMultipleMarks(
        candidates,
        markerNums,
        markerInfo
      );

      if (markerTraceTmp && markerTraceTmp.length > 0) {
        markerTrace = markerTrace.concat(markerTraceTmp);
      }
      if (candidateTraceTmp && candidateTraceTmp.length > 0) {
        candidateTrace = candidateTrace.concat(candidateTraceTmp);
      }
    }

    if (
      markerTrace.length === 0 ||
      !Util.findPreviousMarkerInfo(markerNums, markerTrace, markerInfo)
    ) {
      markerTrace.push(markerInfo);
    }

    const traceItem = Util.initTraceItem(
      null,
      candidateTrace,
      markerTrace,
      Config.operationTypes.manual
    );

    trace.push(traceItem);

    return dataset;
  };

  delMarker = markerInfos => {
    // console.log("inside delMarker");

    this.setState(prevState => {
      let trace = prevState.trace;

      const [markerNums, newMarkerInfos] = Util.resetMarker(
        prevState.markerNums,
        markerInfos
      );

      trace.push(Util.initTraceItemMarker(newMarkerInfos));

      return { markerNums, trace };
    });
  };

  updateMarkerStatusNStore = cellInfo => {
    // console.log("inside updateMarkerStatus");

    this.setState(prevState => {
      let dataset = {
        candidates: prevState.candidates,
        markerNums: prevState.markerNums
      };

      dataset = this.updateMarkerStatus(dataset, cellInfo);

      return {
        markerNums: dataset.markerNums
      };
    });
  };

  updateMarkerStatus = (dataset, cellInfo) => {
    // console.log("inside updateMarkerStatus");

    const { candidateLevel } = this.state;

    let { candidates, markerNums } = dataset;

    // update marker status of the cells added num //
    let markerIdxs = Util.getMarkerIdxsFromCellIdx(cellInfo.idx);

    // convert exclusive type from triple to double //
    for (let markerIdx of markerIdxs) {
      let infos = Util.getInfosFromMarkerNums(markerNums, markerIdx);

      if (
        infos.nums.length === 2 &&
        infos.statuses[0] === Config.candidateStatus.exclusiveTriple
      ) {
        for (let [i, num] of infos.nums.entries()) {
          markerIdx.i = i;
          const markerInfo = Util.initMarkerInfo(
            markerIdx,
            num,
            Config.candidateStatus.exclusiveDouble
          );
          markerNums = Util.assignMarkerStatus(markerNums, markerInfo);
        }
      }
    }

    // update marker statuses remote from the cell added num //
    markerIdxs = Util.getRelatedMarkerIdxsFromCellIdx(cellInfo.idx);

    // set selectable type A to markerNums //
    for (let markerIdx of markerIdxs) {
      const nums = Util.getNumsFromMarkerNums(markerNums, markerIdx);

      if (nums.length > 0) {
        const cellIdxs = Util.getCorrespondingCellIdxs2MarkerIdx(markerIdx);

        // find selectable type A //
        for (let num of nums) {
          let concerningCellInfos = cellIdxs.map(idx =>
            Util.initCellInfo(idx, num)
          );

          if (
            Util.countNumInCandidates(candidates, concerningCellInfos) === 1 &&
            candidateLevel >
              Util.getLevelNumFromFunctionName(
                Config.candidateTypes.displayCandidates
              )
          ) {
            const targetMarkerInfo = Util.initMarkerInfo(markerIdx, num);

            markerNums = Util.assignSelectable2MarkerNums(
              markerNums,
              targetMarkerInfo
            );
          }
        }
      }
    }

    // set selectable type B to markerNums //
    let relatedCellIdxs = Util.getRelatedIndicesBesidesItself(cellInfo.idx);
    relatedCellIdxs = Util.removeWideSelectedCellIdxs(
      candidates,
      relatedCellIdxs
    );

    for (let cellIdx of relatedCellIdxs) {
      markerNums = Util.setSelectableB2MarkerNums(
        markerNums,
        candidates,
        cellIdx
      );
    }

    return dataset;
  };

  // Pop up panel to input a number to a cell //
  handleNumPanelClick = event => {
    const { activeCellIndex } = this.state;

    // console.log("inside handleNumPanelClick");

    const num = parseInt(event.target.id.slice(1, 2));
    if (activeCellIndex && 0 < num && num < 10) {
      if (Util.isMarkerIndex(activeCellIndex)) {
        this.addMarkerNStore(Util.initMarkerInfo(activeCellIndex, num));
      } else {
        this.addNumNStore(Util.initCellInfo(activeCellIndex, num));
      }
    }

    this.setState({
      showNumPanel: false,
      activeCellIndex: null
    });
  };

  // To delete a number from a cell //
  handleDelete = () => {
    const { activeCellIndex } = this.state;

    // console.log("inside handleDelete");

    if (activeCellIndex) {
      if (Util.isMarkerIndex(activeCellIndex)) {
        const markerInfo = Util.initCellInfo(activeCellIndex, null);

        this.delMarker([markerInfo]);
      } else {
        this.deleteNumNStore(activeCellIndex);
      }
    }

    this.setState({
      showNumPanel: false,
      activeCellIndex: null
    });
  };

  // To cancel number insertion thru popup number panel //
  handleCancel = () => {
    // console.log("inside handleCancel");

    this.setState({
      showNumPanel: false
    });
  };

  // To check whether duplcates exist or matach to the answer //
  handleCheck = level => {
    // console.log("inside handleCheck");

    const id = Config.buttonIds.check + Util.capitalize(level);
    const { numMatrix, ansMatrix } = this.state;

    this.setState(prevState => {
      let duplicates = prevState.duplcates;

      if (level === Config.checkMode.none || level === prevState.checkMode) {
        duplicates = [];
        level = Config.checkMode.none;
      } else if (level === Config.checkMode.duplicates) {
        duplicates = Util.checkDuplicate(numMatrix);
      } else if (level === Config.checkMode.correctness) {
        duplicates = Util.checkCorrectness(ansMatrix, numMatrix);
      }

      return {
        checkMode: level,
        duplicates
      };
    });

    document.getElementById(id).blur();
  };

  handleHelpMode = type => {
    // console.log("inside handleHelpMode");

    let singleNumValue = 0;
    let candidateLevel = null;
    let candidates = Util.initCube(Config.candidateStatus.candidate);
    let exclusiveCandidates = [];

    this.setState(prevState => {
      const prevHelpMode = prevState.helpMode;
      const prevSingleNumValue = prevState.singleNumValue;
      let prevMultipleNums = prevState.multipleNums;
      let numMatrix = prevState.numMatrix;
      let markerNums = prevState.markerNums;
      let trace = prevState.trace;

      let dataset = {
        numMatrix,
        candidates,
        exclusiveCandidates,
        markerNums,
        trace
      };

      const stopCondition = Config.backwardStopCondition.numInsertion;

      // kind of cancel //
      if (prevHelpMode === type) {
        dataset = this.doBackward(dataset, stopCondition);

        return {
          helpMode: Config.helpMode.none,
          candidateLevel: null,
          candidates: dataset.candidates,
          exclusiveCandidates: dataset.exclusiveCandidates,
          markerNums: dataset.markerNums,
          trace: dataset.trace
        };
      } else if (
        prevHelpMode === Config.helpMode.both ||
        prevHelpMode === Config.helpMode.multipleNums
      ) {
        // return to candidates mode //
        if (type === Config.helpMode.candidates) {
          return {
            helpMode: Config.helpMode.candidates,
            singleNumValue: 0,
            multipleNums: []
          };

          // change from both to multipleNums by pressing singleNum //
        } else if (prevHelpMode === Config.helpMode.both) {
          let candidateLevel = prevState.candidateLevel;
          if (
            candidateLevel >=
            Util.getLevelNumFromFunctionName(
              Config.candidateTypes.singleCandidate
            )
          ) {
            candidateLevel = Util.getLevelNumFromFunctionName(
              Config.candidateTypes.removeByInsertedNum
            );
          }
          return {
            helpMode: Config.helpMode.multipleNums,
            candidateLevel,
            multipleNums: prevSingleNumValue ? [prevSingleNumValue] : [1]
          };
        } else if (prevHelpMode === Config.helpMode.multipleNums) {
          dataset = this.doInitSingleNum(singleNumValue, candidateLevel);

          // There is a cell full of wide-removed //
          if (dataset === null) {
            return {
              helpMode: Config.helpMode.none,

              candidates: Util.initCube,
              exclusiveCandidates: [],
              markerNums: this.initMarkerNums,
              trace: [],
              multipleNums: [],

              isShowMessage: true,
              message: Config.alertMessages.deadEnd
            };
          }

          return {
            helpMode: Config.helpMode.singleNum,
            candidates: dataset.candidates,
            exclusiveCandidates: dataset.exclusiveCandidates,
            markerNums: dataset.markerNums,
            trace: dataset.trace,
            multipleNums: [],
            singleNumValue:
              prevMultipleNums.length > 0 ? prevMultipleNums.shift() : 1
          };
        }
      } else {
        if (Config.helpModeArray4display.includes(prevHelpMode)) {
          let candidateLevel = prevState.candidateLevel;
          if (
            candidateLevel >=
            Util.getLevelNumFromFunctionName(
              Config.candidateTypes.singleCandidate
            )
          ) {
            candidateLevel = Util.getLevelNumFromFunctionName(
              Config.candidateTypes.removeByInsertedNum
            );
          }

          return {
            helpMode: Config.helpMode.both,
            candidateLevel,
            singleNumValue: prevState.singleNumValue
              ? prevState.singleNumValue
              : 1
          };
        } else {
          candidateLevel = 0;

          if (type === Config.helpMode.singleNum) {
            singleNumValue = prevState.singleNumValue
              ? prevState.singleNumValue
              : 1;

            dataset = this.doInitSingleNum(singleNumValue, candidateLevel);

            // There is a cell full of wide-removed //
            if (dataset === null) {
              return {
                isShowMessage: true,
                message: Config.alertMessages.deadEnd
              };
            }
          } else if (type === Config.helpMode.candidates) {
            dataset.trace = [];

            dataset = this.doInitCandidates(candidateLevel);

            // There is a cell full of wide-removed //
            if (dataset === null) {
              return {
                isShowMessage: true,
                message: Config.alertMessages.deadEnd
              };
            }

            trace = trace.concat(dataset.trace);
          }
        }
      }

      return {
        helpMode: type,
        candidates: dataset.candidates,
        exclusiveCandidates: dataset.exclusiveCandidates,
        markerNums: dataset.markerNums,
        trace,
        singleNumValue,
        candidateLevel
      };
    });

    const id = Config.helpModeButtonIds[type];
    document.getElementById(id).blur();
  };

  doCheckDuplicates = () => {
    const { checkMode, numMatrix, ansMatrix } = this.state;

    let duplicates = Util.checkDuplicate(numMatrix);

    if (checkMode === Config.checkMode.correctness) {
      const wrongIdxs = Util.checkCorrectness(ansMatrix, numMatrix);
      duplicates = duplicates.concat(wrongIdxs);
    }

    this.setState({
      duplicates
    });

    if (duplicates.length === 0) {
      return Config.result.passed;
    }
    return Config.result.failed;
  };

  handleSingleNum = (num, nLevel = null) => {
    // console.log("inside handleSingleNum");

    const { mode, helpMode, candidateLevel, isSkipIneffective } = this.state;
    const singleNumValue = parseInt(num);

    if (singleNumValue === 0) {
      if (helpMode === Config.helpMode.singleNum) {
        this.setState({
          helpMode: Config.helpMode.none,
          singleNumValue
        });
      } else {
        this.setState({
          singleNumValue
        });
      }
      return;
    } else if (
      mode === Config.mode.set ||
      (helpMode === Config.helpMode.candidates && nLevel === null)
    ) {
      this.setState({
        singleNumValue
      });
      return;
    }

    this.setState(prevState => {
      if (prevState.mode === Config.mode.play) {
        if (nLevel === null) {
          if (candidateLevel === null) {
            nLevel = 0;
          } else {
            nLevel = candidateLevel;
          }
        }
      }

      let dataset = {
        numMatrix: prevState.numMatrix,
        candidates: prevState.candidates,
        exclusiveCandidates: prevState.exclusiveCandidates,
        markerNums: prevState.markerNums,
        trace: prevState.trace
        // gameLevel: 0
      };

      if (helpMode === Config.helpMode.both) {
        const conditions = {
          candidateLevel,
          helpMode,
          singleNumValue,
          isStepByStep: true,
          isSkipLevel1: true,
          isSkipIneffective
        };

        dataset = Util.setCandidates(dataset, conditions);

        // There is a cell full of wide-removed //
        if (dataset === null) {
          return {
            isShowMessage: true,
            message: Config.alertMessages.deadEnd
          };
        }
      } else {
        dataset = this.doInitSingleNum(singleNumValue, nLevel);

        // There is a cell full of wide-removed //
        if (dataset === null) {
          return {
            isShowMessage: true,
            message: Config.alertMessages.deadEnd
          };
        }
      }

      return {
        helpMode:
          helpMode === Config.helpMode.both
            ? helpMode
            : Config.helpMode.singleNum,
        singleNumValue,
        candidateLevel: nLevel,
        candidates: dataset.candidates,
        exclusiveCandidates: dataset.exclusiveCandidates,
        markerNums: dataset.markerNums,
        trace: dataset.trace
      };
    });
  };

  handleSingleNumLevel = level => {
    // console.log("inside handleSingleNumLevel");

    // const { helpMode } = this.state;

    let nLevel = Util.getLevelNum(level);
    let { singleNumValue } = this.state;
    const id = Util.getSingleNumBtnId(level);

    document.getElementById(id).blur();

    this.setState(() => {
      const isSkipLevel1 = false;
      const dataset = this.doCandidates(nLevel, singleNumValue, isSkipLevel1);

      // There is a cell full of wide-removed //
      if (dataset === null) {
        return {
          isShowMessage: true,
          message: Config.alertMessages.deadEnd
        };
      }

      return {
        candidateLevel: nLevel,
        candidates: dataset.candidates,
        trace: dataset.trace
      };
    });
  };

  doInitSingleNum = (singleNumValue, candidateLevel = 0) => {
    // console.log("inside doInitSingleNum");

    const { numMatrix, isSkipIneffective } = this.state;

    const conditions = {
      candidateLevel,
      helpMode: Config.helpMode.singleNum,
      singleNumValue,
      isStepByStep: true,
      isSkipLevel1: false,
      isSkipIneffective
    };

    return Util.initCandidates(numMatrix, conditions);
  };

  doInitCandidates = (candidateLevel = 0) => {
    // console.log("inside doInitCandidates");

    const { numMatrix, isSkipIneffective } = this.state;

    const conditions = {
      candidateLevel,
      helpMode: Config.helpMode.candidates,
      singleNumValue: 0,
      isStepByStep: true,
      isSkipLevel1: false,
      isSkipIneffective
    };

    return Util.initCandidates(numMatrix, conditions);
  };

  doCandidates = (
    candidateLevel = 0,
    singleNumValue = 0,
    isSkipLevel1 = false
  ) => {
    const {
      helpMode,
      numMatrix,
      candidates,
      exclusiveCandidates,
      markerNums,
      trace,
      isSkipIneffective
    } = this.state;

    const conditions = {
      candidateLevel,
      helpMode,
      singleNumValue,
      isStepByStep: true,
      isSkipLevel1,
      isSkipIneffective
    };

    let dataset = {
      numMatrix: Util.deepCopy(numMatrix),
      candidates: Util.deepCopy(candidates),
      exclusiveCandidates: Util.deepCopy(exclusiveCandidates),
      markerNums: Util.deepCopy(markerNums),
      trace: Util.deepCopy(trace)
      // gameLevel: 0
    };

    return Util.setCandidates(dataset, conditions);
  };

  handleMultipleNums = num => {
    this.setState(prevState => {
      let multipleNums = prevState.multipleNums;

      if (multipleNums.includes(num)) {
        const index = multipleNums.indexOf(num);
        if (index > -1) {
          multipleNums.splice(index, 1);
        }
      } else {
        multipleNums.push(num);
        multipleNums.sort();
      }

      return { multipleNums };
    });
  };

  handleNumInsert = event => {
    const { singleNumValue, numMatrix } = this.state;

    // console.log("inside handleNumInsert");

    const cellAddress = event.target.id;
    const idx = Util.R1C12Index(cellAddress);

    let num = parseInt(event.target.getAttribute("data-num"));

    if (isNaN(num)) {
      if (singleNumValue !== null && singleNumValue !== 0) {
        num = singleNumValue;
      } else {
        return;
      }
    }

    if (0 < num && num < 10) {
      if (Util.getNumFromNumMatrix(numMatrix, idx) === num) {
        this.deleteNumNStore(idx);
      } else {
        this.addNumNStore(Util.initCellInfo(idx, num));
      }
    }

    this.setState({
      activeCellIndex: null
    });
  };

  handleMarkerCell = event => {
    const { singleNumValue, markerNums } = this.state;

    // console.log("inside handleMarkerCell");

    const cellAddress = event.target.id;
    let idx = null;
    let num = null;

    if (Util.isMarkerAddress(cellAddress)) {
      idx = Util.markerId2Idx(cellAddress);

      if (singleNumValue !== null && singleNumValue !== 0) {
        num = singleNumValue;
      } else {
        return;
      }

      const markerInfo = Util.initMarkerInfo(idx, num);
      const oldNum = Util.getNumFromMarkerNums(markerNums, idx);

      if (oldNum === num) {
        this.delMarker([markerInfo]);
      } else {
        this.addMarkerNStore(markerInfo);
      }
    }

    this.setState({
      activeCellIndex: null
    });
  };

  handleCandidateLevels = level => {
    // console.log("inside handleCandidates");

    const id = Util.getCandidateLevelId(level);
    const { helpMode } = this.state;

    this.setState(prevState => {
      let candidateLevel = Util.getLevelNum(level);
      let singleNumValue = prevState.singleNumValue;
      let isSkipLevel1 = true;
      let dataset = {};

      if (prevState.candidateLevel === 0) {
        isSkipLevel1 = false;
      }

      if (helpMode === Config.helpMode.singleNum) {
        if (
          !prevState.candidateLevel ||
          prevState.candidateLevel > candidateLevel
        ) {
          dataset = this.doInitSingleNum(singleNumValue, candidateLevel);
        } else {
          dataset = this.doCandidates(
            candidateLevel,
            singleNumValue,
            isSkipLevel1
          );
        }
      } else {
        singleNumValue = 0;

        dataset = this.doCandidates(
          candidateLevel,
          singleNumValue,
          isSkipLevel1
        );
      }

      // There is a cell full of wide-removed //
      if (dataset === null) {
        return {
          isShowMessage: true,
          message: Config.alertMessages.deadEnd
        };
      }

      return {
        candidateLevel,
        candidates: dataset.candidates,
        exclusiveCandidates: dataset.exclusiveCandidates,
        markerNums: dataset.markerNums,
        trace: dataset.trace
      };
    });

    document.getElementById(id).blur();
  };

  handleControls = controlType => {
    // console.log("inside handleControls");

    const id = Util.getControlId(controlType);

    const { candidateLevel } = this.state;

    if (controlType === Config.candidateControls.backward) {
      this.doBackwardNStore();

      return;
    } else if (controlType === Config.candidateControls.reset) {
      const isAll = true;
      this.doBackwardNStore(isAll);

      return;
    } else if (
      controlType === Config.candidateControls.select &&
      candidateLevel >
        Util.getLevelNumFromFunctionName(
          Config.candidateTypes.displayCandidates
        )
    ) {
      this.doSelectSelectableCandidates();
    } else if (
      candidateLevel >=
      Util.getLevelNumFromFunctionName(Config.candidateTypes.singleCandidate)
    ) {
      if (
        [
          Config.candidateControls.forward,
          Config.candidateControls.fastForward
        ].includes(controlType)
      ) {
        this.doForward(controlType);
        // } else if (controlType === Config.candidateControls.select) {
        //   this.doSelectSelectableCandidates();
      } else if (controlType === Config.candidateControls.erase) {
        this.doEraseExclusiveColors();
      }
    }

    document.getElementById(id).blur();
  };

  handleSkipIneffectiveStatus = isSkipIneffective => {
    this.setState({ isSkipIneffective });
  };

  doEraseExclusiveColors = () => {
    this.setState(prevState => {
      let candidates = prevState.candidates;
      let trace = prevState.trace;

      [candidates, trace] = Util.eraseExclusiveColors(candidates, trace);

      return {
        candidates,
        trace
      };
    });
  };

  doSelectSelectableCandidates = () => {
    // console.log("inside doSelectSelectableCandidates");

    this.setState(prevState => {
      let dataset = {
        numMatrix: prevState.numMatrix,
        candidates: prevState.candidates,
        markerNums: prevState.markerNums,
        trace: prevState.trace
      };

      dataset = Util.selectSelectables(dataset);

      dataset = Util.eraseRmovalbe(dataset);

      return {
        numMatrix: dataset.numMatrix,
        candidates: dataset.candidates,
        markerNums: dataset.markerNums,
        trace: prevState.trace,
        numCounts: Util.countNumbers(dataset.numMatrix)
      };
    });
  };

  doForward = controlType => {
    const {
      helpMode,
      singleNumValue,
      candidateLevel,
      isSkipIneffective
    } = this.state;

    // console.log("inside doForward");

    this.setState(prevState => {
      const isSkipLevel1 = true;
      const isStepByStep =
        controlType === Config.candidateControls.forward ? true : false;

      let dataset = {
        numMatrix: prevState.numMatrix,
        candidates: prevState.candidates,
        exclusiveCandidates: prevState.exclusiveCandidates,
        markerNums: prevState.markerNums,
        trace: prevState.trace
        // gameLevel: 0
      };

      let conditions = {
        candidateLevel,
        helpMode:
          helpMode === Config.helpMode.both
            ? Config.helpMode.candidates
            : helpMode,
        singleNumValue,
        isStepByStep,
        isSkipLevel1,
        isSkipIneffective
      };

      dataset = Util.setCandidates(dataset, conditions);

      // There is a cell full of wide-removed //
      if (dataset === null) {
        return {
          isShowMessage: true,
          message: Config.alertMessages.deadEnd
        };
      }

      return {
        candidates: dataset.candidates,
        exclusiveCandidates: dataset.exclusiveCandidates,
        trace: dataset.trace,
        markerNums: dataset.markerNums
      };
    });
  };

  doEraseCandidates = () => {
    this.setState(prevState => {
      let dataset = {
        candidates: prevState.candidates,
        trace: prevState.trace
      };

      dataset = Util.eraseRmovalbe(dataset);

      return {
        candidates: dataset.candidates,
        trace: dataset.trace
      };
    });
  };

  doBackwardNStore = (isAll = false) => {
    // console.log("inside doBackwardNStore");

    const { ansMatrix } = this.state;

    this.setState(prevState => {
      let duplicates = prevState.duplicates;
      let checkMode = prevState.checkMode;

      let dataset = {
        numMatrix: prevState.numMatrix,
        isRegisteredMatrix: null,
        candidates: prevState.candidates,
        exclusiveCandidates: prevState.exclusiveCandidates,
        markerNums: prevState.markerNums,
        trace: prevState.trace
      };

      let stopCondtion = null;
      if (isAll) {
        stopCondtion = Config.backwardStopCondition.wrongInsertion;
      }

      dataset = this.doBackward(dataset, stopCondtion);

      if (isAll) {
        checkMode = Config.checkMode.correctness;
      }
      if (checkMode === Config.checkMode.duplicates || duplicates.length > 0) {
        duplicates = Util.checkDuplicate(dataset.numMatrix);
      } else if (checkMode === Config.checkMode.correctness) {
        duplicates = Util.checkCorrectness(ansMatrix, dataset.numMatrix);
      }

      // if (duplicates.length === 0) {
      //   checkMode = Config.checkMode.none;
      // }

      return {
        checkMode,
        numMatrix: dataset.numMatrix,
        candidates: dataset.candidates,
        exclusiveCandidates: dataset.exclusiveCandidates,
        markerNums: dataset.markerNums,
        trace: dataset.trace,
        duplicates
      };
    });
  };

  doBackward = (dataset, stopCondition = null) => {
    // console.log("inside doBackward");

    let { candidates, markerNums, trace } = dataset;

    if (trace.length === 0) {
      return dataset;
    }

    let loopMax = 1;
    if (stopCondition) {
      loopMax = trace.length;
    }

    let datasetTmp = {
      numMatrix: Util.deepCopy(dataset.numMatrix),
      isRegisteredMatrix: null,
      candidates: Util.deepCopy(dataset.candidates),
      exclusiveCandidates: Util.deepCopy(dataset.exclusiveCandidates),
      markerNums: Util.deepCopy(dataset.markerNums),
      trace: []
    };

    for (let i = 0; i < loopMax; i++) {
      const lastEvent = trace.pop();

      const numInfo = Util.getNumInfoFromTraceItem(lastEvent);

      if (numInfo) {
        if (
          stopCondition === Config.backwardStopCondition.numInsertion &&
          "isWrong" in numInfo &&
          numInfo.isWrong
        ) {
          trace.push(lastEvent);
          break;
        }

        const num = numInfo.num;
        const idx = numInfo.idx;

        if (num > 0) {
          if ("prevNum" in numInfo && typeof numInfo.prevNum === "number") {
            let tmpCellInfo = Util.initCellInfo(numInfo.idx, numInfo.prevNum);
            datasetTmp.numMatrix = Util.assignNum2NumMatrix(
              datasetTmp.numMatrix,
              tmpCellInfo
            );
          } else {
            const isBackward = true;
            datasetTmp = this.deleteNum(datasetTmp, idx, isBackward);
          }
        } else {
          let cellInfo = Util.initCellInfo(idx, Math.abs(num));

          cellInfo.isBackward = true;
          datasetTmp = this.addNum(datasetTmp, cellInfo);
        }

        dataset.numMatrix = datasetTmp.numMatrix;
      }

      const candInfos = Util.getCandidateInfoFromTraceItem(lastEvent);

      if (candInfos && candInfos.length > 0) {
        dataset.candidates = Util.traceBackCandidates(candidates, candInfos);

        if (lastEvent.operation === Config.operationTypes.auto) {
          dataset.exclusiveCandidates.pop();
        }
      }

      const markerInfos = Util.getMarkerInfoFromTraceItem(lastEvent);

      if (markerInfos && markerInfos.length > 0) {
        [dataset.markerNums] = Util.resetMarker(markerNums, markerInfos);
      }
    }

    return dataset;
  };

  handleCandidateCell = event => {
    // console.log( "inside handleCandidateCell" );

    let cellInfo = Util.R1C1N12CellInfo(event.target.id);

    this.setState(prevState => {
      let candidates = prevState.candidates;
      let markerNums = prevState.markerNums;
      let trace = prevState.trace;

      const prevStatus = Util.getCandidateStatus(candidates, cellInfo);

      if (Util.isLastCandidate(candidates, cellInfo)) {
        return {
          isShowMessage: true,
          message: Config.alertMessages.deadEnd
        };
      }

      [candidates, cellInfo] = Util.flipCandidateStatus(candidates, cellInfo);

      const traceItem = Util.initTraceItemCandidate(
        [cellInfo],
        Config.operationTypes.manual
      );

      if (Util.isNarrowCandidate(prevStatus)) {
        let markerIdxs = Util.getMarkerIdxsFromCellIdx(cellInfo.idx);
        let markerTrace = [];

        for (let markerIdx of markerIdxs) {
          const markerInfo = Util.initMarkerInfo(markerIdx, cellInfo.num);
          const targetMarkerIdx = Util.findNumInMarker(markerNums, markerInfo);

          if (targetMarkerIdx !== null) {
            let concerningCellIdxs = Util.getTargetCellIndicesByMarkerIdx(
              targetMarkerIdx,
              candidates
            );

            concerningCellIdxs = concerningCellIdxs.filter(idx =>
              Util.isNarrowCandidate(
                Util.getCandidateStatus(
                  candidates,
                  Util.initCellInfo(idx, markerInfo.num)
                )
              )
            );

            if (concerningCellIdxs.length === 1) {
              const markerInfo = Util.initMarkerInfo(
                targetMarkerIdx,
                cellInfo.num
              );
              markerNums = Util.assignSelectable2MarkerNums(
                markerNums,
                markerInfo
              );

              markerTrace.push(markerInfo);
            }
          }
        }

        if (markerTrace.length > 0) {
          traceItem.marker = markerTrace;
        }
      }
      trace.push(traceItem);

      return { candidates, markerNums, trace };
    });
  };

  handleMarker = () => {
    // console.log("inside handleMarker");

    this.setState(prevState => {
      const markerStatus = Util.flipMarkerStatus(prevState.markerStatus);

      return { markerStatus };
    });

    document.getElementById(Config.buttonIds.marker).blur();
  };

  handleStepBack = () => {
    const { trace } = this.state;

    // console.log("hangleStepBack");

    if (!!trace.length) {
      const lastEvent = trace.pop();
      const num = lastEvent.numMatrix.num;
      const idx = lastEvent.numMatrix.idx;

      if (num > 0) {
        this.deleteNumNStore(idx, false);
      } else {
        this.addNumNStore(Util.initCellInfo(idx, Math.abs(num)));
      }
    }

    document.getElementById(Config.buttonIds.stepBack).blur();
  };

  handleClear = () => {
    // console.log("inside handleClear");

    this.setState({
      helpMode: Config.helpMode.none,
      exclusiveCandidates: [],
      duplicates: [],
      singleNumValue: 0,
      showNumPanel: false,
      isShowMessage: false
    });
    document.getElementById(Config.buttonIds.clear).blur();
  };

  handleNewGame = () => {
    // console.log("inside handleNewGame");

    const { lang } = this.state;
    let origState = this.getInitialState();
    origState.lang = lang;

    this.setState(origState);

    document.getElementById(Config.buttonIds.newGame).blur();
  };

  handleSampleGames = sampleLevel => {
    // console.log("inside handleSampleGames");

    const { lang } = this.state;
    const origState = this.getInitialState();

    const sampleMatrix = Util.getSampleMatrix(sampleLevel);
    const id = Config.buttonIds.sampleGame + Util.capitalize(sampleLevel);

    origState.numMatrix = sampleMatrix;
    origState.sampleGameID = sampleLevel;

    origState.lang = lang;

    // origState.ansMatrix = this.calcAnswer(sampleMatrix);
    const dataset = this.calcAnswer(sampleMatrix);

    // There is a cell full of wide-removed //
    // if (origState.ansMatrix === null) {
    if (dataset.ansMatrix === null) {
      this.setState({
        isShowMessage: true,
        message: Config.alertMessages.deadEnd
      });
    } else {
      origState.ansMatrix = dataset.numMatrix;
      // const gameLevel = dataset.gameLevel;

      // if (origState.ansMatrix) {
      origState.mode = Config.mode.play;
      origState.checkMode = Config.checkMode.none;
      origState.isRegisteredMatrix = Util.getRegisteredFlags(sampleMatrix);

      // if (Util.isAllFilled(origState.ansMatrix)) {
      //   origState.gameLevel = 6;
      // } else {
      //   origState.gameLevel = Config.candidateLevels.length;
      // }
      origState.gameLevel = Util.isAllFilled(origState.ansMatrix)
        ? dataset.gameLevel
        : Config.candidateLevels.length;

      origState.numCounts = Util.countNumbers(sampleMatrix);
    }

    this.setState(origState);

    document.getElementById(id).blur();
  };

  handleSetUp = () => {
    // console.log("inside handleSetUp");

    const { mode } = this.state;

    if (mode === Config.mode.set) {
      if (this.doCheckDuplicates() === Config.result.passed) {
        this.setState(prevState => {
          // const ansMatrix = this.calcAnswer(prevState.numMatrix);
          const dataset = this.calcAnswer(prevState.numMatrix);
          const ansMatrix = dataset.numMatrix;
          let gameLevel = dataset.gameLevel;

          if (ansMatrix) {
            // const gameLevel = Util.isAllFilled(ansMatrix)
            //   ? 6
            //   : Config.candidateLevels.length;
            gameLevel = Util.isAllFilled(ansMatrix)
              ? gameLevel
              : Config.candidateLevels.length;

            return {
              mode: Config.mode.play,
              helpMode: Config.helpMode.none,
              checkMode: Config.checkMode.none,
              singleNumValue: 0,
              ansMatrix,
              gameLevel
            };
          } else {
            return {
              isShowMessage: true,
              message: Config.alertMessages.wrongQuestion
            };
          }
        });
      } else {
        this.setState({
          checkMode: Config.checkMode.duplicates,
          isShowMessage: true,
          message: Config.alertMessages.duplicates
        });
      }
    } else {
      this.setState(prevState => {
        let numMatrix = prevState.numMatrix;
        const isRegisteredMatrix = prevState.isRegisteredMatrix;

        return {
          mode: Config.mode.set,
          helpMode: Config.helpMode.none,
          checkMode: Config.checkMode.duplicates,
          numMatrix: Util.resetNumMatrix(numMatrix, isRegisteredMatrix),
          candidates: Util.initCube(),
          exclusiveCandidates: [],
          markerNums: Util.initMarkerNums(),
          trace: [],
          singleNumValue: 0
        };
      });
    }

    document.getElementById(Config.buttonIds.setup).blur();
  };

  handleRestart = () => {
    const {
      lang,
      numMatrix,
      isRegisteredMatrix,
      sampleGameID,
      gameLevel
    } = this.state;
    const origState = this.getInitialState();

    // console.log("inside handleRestart");

    origState.lang = lang;
    origState.mode = Config.mode.play;
    origState.checkMode = Config.checkMode.none;

    origState.numMatrix = Util.resetNumMatrix(numMatrix, isRegisteredMatrix);
    origState.isRegisteredMatrix = isRegisteredMatrix;
    origState.sampleGameID = sampleGameID;
    origState.gameLevel = gameLevel;
    origState.numCounts = Util.countNumbers(origState.numMatrix);

    this.setState(origState);

    document.getElementById(Config.buttonIds.restart).blur();
  };

  handleHelpButton = () => {
    document.getElementById(Config.buttonIds.help).blur();
  };

  handleLang = () => {
    this.setState(prevState => {
      return { lang: Util.flipLang(prevState.lang) };
    });

    document.getElementById(Config.buttonIds.lang).blur();
  };

  showFloating = event => {
    const { mode, isRegisteredMatrix } = this.state;

    // console.log("insdie showFloating");

    let idx = null;
    const cellAddress = event.target.id;

    if (Util.isMarkerAddress(cellAddress)) {
      idx = Util.markerId2Idx(cellAddress);
    } else {
      idx = Util.R1C12Index(cellAddress);
    }

    if (
      !idx ||
      (!Util.isMarkerIndex(idx) &&
        (mode === Config.mode.play && isRegisteredMatrix[idx.r][idx.c]))
    ) {
      return;
    }

    this.setState({
      activeCellIndex: idx,
      mousePosition: {
        x: event.clientX,
        y: event.clientY
      },
      showNumPanel: true
    });
  };

  handleMessageModalClick = () => {
    // console.log("inside handleMessageModalClick");

    this.setState({
      isShowMessage: false
    });
  };

  render() {
    const { lang } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <h1>{Config.panelTitles.header[lang]}</h1>
        </header>
        <main className="App-main">
          <ControlPanel
            {...this.state}
            handleRestart={this.handleRestart}
            handleSetUp={this.handleSetUp}
            handleNewGame={this.handleNewGame}
            handleSampleGames={this.handleSampleGames}
            handleSave={this.handleSave}
          />
          <SudokuBoard
            {...this.state}
            showFloating={this.showFloating}
            handleNumInsert={this.handleNumInsert}
            handleCandidateCell={this.handleCandidateCell}
            handleMarkerCell={this.handleMarkerCell}
          />
          <HelperPanel
            {...this.state}
            handleCheck={this.handleCheck}
            handleHelpMode={this.handleHelpMode}
            handleSingleNum={this.handleSingleNum}
            handleSingleNumLevel={this.handleSingleNumLevel}
            handleMultipleNums={this.handleMultipleNums}
            handleCandidates={this.handleCandidateLevels}
            handleControls={this.handleControls}
            handleSkipIneffectiveStatus={this.handleSkipIneffectiveStatus}
            handleMarker={this.handleMarker}
            handleHelpButton={this.handleHelpButton}
            handleLang={this.handleLang}
            handleClear={this.handleClear}
          />
        </main>
        <Footer {...this.state} />
        {/* Popup panels (invisible at start) */}
        <Floating
          {...this.state}
          modal
          // viewport
          closeOnModalClick
          handleNumPanelClick={this.handleNumPanelClick}
          handleDelete={this.handleDelete}
          handleCancel={this.handleCancel}
        />
        <ShowMessage
          {...this.state}
          modal
          closeOnModalClick
          handleMessageModalClick={this.handleMessageModalClick}
        />
      </div>
    );
  }
}

export default App;
