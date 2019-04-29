import Config from "./Config";
// import "./util/ArrayPermutation";
import { k_combinations } from "./util/combinations";

class Util {
  // this might be useful for future //
  // get key of an object from the value //
  // Object.keys(x).find(key => x[key] === 2)

  static getIndexSequence(N = Config.size) {
    return Array.from(Array(N).keys());
  }

  static getRedundantIndexSequence() {
    let idxSequence = this.getIndexSequence();
    const redundant = this.getIndexSequence(Config.size - 1);
    idxSequence = idxSequence.concat(redundant.reverse());
    return idxSequence;
  }

  static getNsequence(N = Config.size) {
    return this.getIndexSequence(N).map(i => i + 1);
  }

  static getBlockIdByNum(num) {
    return Config.panelIds.block + num;
  }

  static getBlockNumFromBlockId(blockId) {
    return parseInt(blockId.slice(-1));
  }

  static getBlockIdxFromBlockId(blockId) {
    return this.getBlockNumFromBlockId(blockId) - 1;
  }

  static abbreviateBlockId(blockId) {
    return blockId.slice(0, 1).toUpperCase() + blockId.slice(-1);
  }

  static initArray(val = null, len = Config.size) {
    return new Array(len).fill(val);
  }

  static initMatrix(val = null, len = Config.size) {
    return this.initArray(val, len).map(val => this.initArray(val, len));
  }

  static initCube(val = null, len = Config.size) {
    return this.initArray(val, len).map(val => this.initMatrix(val, len));
  }

  static initNumPanelMatrix() {
    const arr = this.getNsequence(Config.size);
    const numPanelMatrix = [];
    while (arr.length) numPanelMatrix.push(arr.splice(0, Config.sizeB));

    return numPanelMatrix;
  }

  static initCellIdx(r = null, c = null) {
    return { r, c };
  }

  static initCellInfo(
    idxs = null,
    nums = null,
    status = null,
    type = null,
    rcbIdx = null,
    unionSize = null,
    isBackward = false
  ) {
    if (idxs !== null && idxs.constructor === Array) {
      if (nums !== null && nums.constructor === Array) {
        return {
          idxs,
          nums,
          status,
          type,
          rcbIdx,
          unionSize,
          isBackward
        };
      } else {
        return {
          idxs: idxs,
          num: nums,
          status,
          type,
          rcbIdx,
          unionSize,
          isBackward
        };
      }
    } else {
      if (nums !== null && nums.constructor === Array) {
        return {
          idx: idxs,
          nums: nums,
          status,
          type,
          rcbIdx,
          unionSize,
          isBackward
        };
      }
    }

    return {
      idx: idxs,
      num: nums,
      status,
      type,
      rcbIdx,
      unionSize,
      isBackward
    };
  }

  static initRegInfo(idx, truth = true) {
    return { idx, truth };
  }

  static initMarkerIdx(b = null, rcType = "", rc = null, i = null) {
    return { b, rcType, rc, i };
  }

  static initMarkerInfo(idx, num = null, status = null) {
    return { idx, num, status };
  }

  static initCheckboxArray(multipleNums) {
    // console.log("inside initCheckboxArray");

    const checkedArray = Util.initArray(false, Config.size + 1);
    multipleNums.forEach(num => (checkedArray[num] = true));

    return checkedArray;
  }

  static getContentFromMatrix(matrix, idx) {
    return matrix[idx.r][idx.c];
  }

  static getNumFromNumMatrix(numMatrix, idx) {
    return this.getContentFromMatrix(numMatrix, idx);
  }

  static getCandidateStatusArray(candidates, idx) {
    return this.getContentFromMatrix(candidates, idx);
  }

  static getCandidateStatus(candidates, cellInfo) {
    if ("idxs" in cellInfo) {
      return cellInfo.idxs.map(
        idx =>
          this.getCandidateStatusArray(candidates, idx)[this.n2i(cellInfo.num)]
      );
    } else if ("idx" in cellInfo) {
      return this.getCandidateStatusArray(candidates, cellInfo.idx)[
        this.n2i(cellInfo.num)
      ];
    }
    return null;
  }

  static getCandidateStatuses(candidates, idx, nums) {
    const statusArray = this.getCandidateStatusArray(candidates, idx);
    return nums.map(num => statusArray[this.n2i(num)]);
  }

  static combineStatuses(targetStatuses) {
    targetStatuses = targetStatuses.map(status =>
      this.convertExclusive2Candidates(status)
    );

    if (targetStatuses.includes(Config.candidateStatus.selected)) {
      return Config.candidateStatus.selected;
    } else if (targetStatuses.includes(Config.candidateStatus.selectable)) {
      return Config.candidateStatus.selectable;
    } else if (targetStatuses.includes(Config.candidateStatus.candidate)) {
      return Config.candidateStatus.candidate;
    }

    return Config.candidateStatus.removed;
  }

  static getNarrowCandidateNumsFromStatusArray(statusArray) {
    // console.log("inside getNarrowCandidateNumsFromStatusArray");

    let candidateNums = [];

    for (let [i, status] of statusArray.entries()) {
      if (this.isNarrowCandidate(status)) {
        candidateNums.push(this.i2n(i));
      }
    }

    return candidateNums;
  }

  static getNarrowCandidateNumsFromCandidates(candidates, idx) {
    const statuses = this.getCandidateStatusArray(candidates, idx);

    return this.getNarrowCandidateNumsFromStatusArray(statuses);
  }

  static getCandidateNumMatrix(candidates) {
    // console.log("inside getCandidateMatrix");

    return candidates.map(row =>
      row.map(statuses => {
        return this.getNarrowCandidateNumsFromStatusArray(statuses);
      })
    );
  }

  static getNumsFromCandidateNumMatrix(candidateNumMatrix, idx) {
    // console.log("inside getNumsFromCandidateNumMatrix");

    return this.getContentFromMatrix(candidateNumMatrix, idx);
  }

  static countNumsInCandidateNumMatrix(candidateNumMatrix, idx) {
    // console.log("inside countNumsInCandidateNumMatrix");

    return this.getNumsFromCandidateNumMatrix(candidateNumMatrix, idx).length;
  }

  static getAllCellIndicies() {
    const idxArray = this.getIndexSequence();

    let idxs = [];

    for (let r of idxArray) {
      for (let c of idxArray) {
        idxs.push(this.initCellIdx(r, c));
      }
    }
    return idxs;
  }

  static convertCellInfo2MarkerInfo(cellInfo) {
    // console.log("inside convertCellInfo2MarkerInfo");

    let markerIdx = null;
    if (this.isExclusiveSingle(cellInfo.status)) {
      const rcType = this.getFirstLetter(cellInfo.type);

      markerIdx = this.initMarkerIdx(
        cellInfo.rcbIdx,
        rcType,
        cellInfo.idxs[0][rcType]
      );
    } else if (this.isExclusiveDoubleOrTriple(cellInfo.status)) {
      if (cellInfo.type === Config.restrictionTypes.blk) {
        const rcType = this.isInSameRowCol(cellInfo.idxs);

        if (rcType) {
          markerIdx = this.initMarkerIdx(
            cellInfo.rcbIdx,
            rcType,
            cellInfo.idxs[0][rcType]
          );
        }
      } else {
        const blkIdx = this.isInSameBlock(cellInfo.idxs);

        if (typeof blkIdx === "number") {
          markerIdx = this.initMarkerIdx(
            blkIdx,
            this.getFirstLetter(cellInfo.type),
            cellInfo.rcbIdx
          );
        }
      }
    } else {
      return null;
    }

    if (markerIdx === null) {
      return null;
    }

    if (cellInfo.num) {
      return this.initMarkerInfo(markerIdx, cellInfo.num, cellInfo.status);
    }

    return cellInfo.nums.map(num =>
      this.initMarkerInfo(markerIdx, num, cellInfo.status)
    );
  }

  static initTraceItem(
    numInfo = null,
    candInfoArray = [],
    markerInfoArray = [],
    operation = Config.operationTypes.manual
  ) {
    // // console.log("inside initTraceItem");

    if (candInfoArray && candInfoArray.constructor !== Array) {
      candInfoArray = [candInfoArray];
    }
    if (markerInfoArray && markerInfoArray.constructor !== Array) {
      markerInfoArray = [markerInfoArray];
    }

    return {
      [Config.traceTypes.numMatrix]: numInfo,
      [Config.traceTypes.candidate]: candInfoArray,
      [Config.traceTypes.marker]: markerInfoArray,
      [Config.traceElementTypes.operation]: operation
    };
  }

  static initTraceItemNum(
    numInfo = null,
    operation = Config.operationTypes.manual
  ) {
    return this.initTraceItem(numInfo, null, null, operation);
  }

  static initTraceItemCandidate(
    candInfos = null,
    operation = Config.operationTypes.manual
  ) {
    if (candInfos.constructor === Array) {
      return this.initTraceItem(null, candInfos, null, operation);
    }
    return this.initTraceItem(null, [candInfos], null, operation);
  }

  static initTraceItemMarker(
    markerInfos = null,
    operation = Config.operationTypes.manual
  ) {
    if (markerInfos.constructor === Array) {
      return this.initTraceItem(null, null, markerInfos, operation);
    }
    return this.initTraceItem(null, null, [markerInfos], operation);
  }

  static initMarkerNums() {
    // console.log("inside initMarkerNums");

    const markerNums = this.getIndexSequence().map(blkIdx => {
      return ["r", "c"].reduce((idxs, rcType) => {
        idxs[rcType] = this.getRowColIndicesFromBlockIdx(blkIdx, rcType).reduce(
          (dic, r) => {
            dic[r] = {
              nums: this.initArray(null, Config.sizeB),
              statuses: this.initArray(null, Config.sizeB)
            };
            return dic;
          },
          {}
        );
        return idxs;
      }, {});
    });

    return markerNums;
  }

  static assignNum2NumMatrix(numMatrix, cellInfo) {
    const idx = cellInfo.idx;
    numMatrix[idx.r][idx.c] = cellInfo.num;
    return numMatrix;
  }

  static assignTruth2regMatrix(regMatrix, cellInfo) {
    const idx = cellInfo.idx;

    regMatrix[idx.r][idx.c] = cellInfo.truth;
    return regMatrix;
  }

  static assignAppearance(appMatrix, idx, appearance) {
    appMatrix[idx.r][idx.c] = appearance;
    return appMatrix;
  }

  static resetNumMatrix(numMatrix, isRegisteredMatrix) {
    isRegisteredMatrix.forEach((regRow, r) => {
      regRow.forEach((isRegistered, c) => {
        if (!isRegistered) {
          numMatrix[r][c] = null;
        }
      });
    });

    return numMatrix;
  }

  static assignStatus2Candidates(candidates, cellInfo, status) {
    // console.log("inside assignCandidates");

    const idx = cellInfo.idx;
    const num = cellInfo.num;

    candidates[idx.r][idx.c][Util.n2i(num)] = status;

    return candidates;
  }

  static assignCandidate2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.candidate
    );
  }

  static assignSelected2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.selected
    );
  }

  static assignSelectable2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.selectable
    );
  }

  static assignExclusiveSingle2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.exclusiveSingle
    );
  }

  static assignExclusiveDouble2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.exclusiveDouble
    );
  }

  static assignExclusiveTriple2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.exclusiveTriple
    );
  }

  static assignExclusiveQuadruple2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.exclusiveQuadruple
    );
  }

  static assignExclusiveSquare2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.exclusiveSquare
    );
  }

  static assignAssumptionTest2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.assumptionTest
    );
  }

  static assignRemovable2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.removable
    );
  }

  static assignRemoved2Candidates(candidates, cellInfo) {
    return this.assignStatus2Candidates(
      candidates,
      cellInfo,
      Config.candidateStatus.removed
    );
  }

  static assignCandidateStatus4SingleNum(candidates, cellInfo, status) {
    if (!("idxs" in cellInfo)) {
      return [candidates, null];
    }

    cellInfo.prevStatuses = [];
    for (let idx of cellInfo.idxs) {
      const cellInfoSub = this.initCellInfo(idx, cellInfo.num);

      cellInfo.prevStatuses.push(
        this.getCandidateStatus(candidates, cellInfoSub)
      );

      candidates = this.assignStatus2Candidates(
        candidates,
        cellInfoSub,
        status
      );
    }

    return [candidates, cellInfo];
  }

  static resetCandidateStatuses(candidates) {
    return candidates.map(row =>
      row.map(cell =>
        cell.map(status =>
          this.isNarrowCandidate(status)
            ? Config.candidateStatus.candidate
            : status
        )
      )
    );
  }

  static getNumInfoFromTraceItem(traceItem) {
    return traceItem[Config.traceTypes.numMatrix];
  }

  static getCandidateInfoFromTraceItem(traceItem) {
    return traceItem[Config.traceTypes.candidate];
  }

  static getMarkerInfoFromTraceItem(traceItem) {
    return traceItem[Config.traceTypes.marker];
  }

  static getAllParticularInfosFromTrace(trace, infoType) {
    let particularTrace = trace.map(traceItem => traceItem[infoType]);
    particularTrace = particularTrace.filter(
      particularTraceItem => particularTraceItem
    );

    if (infoType === Config.traceTypes.numMatrix) {
      return particularTrace;
    }

    return this.flattenMatrix2Array(particularTrace);
  }

  static getAllNumInfosFromTrace(trace) {
    return this.getAllParticularInfosFromTrace(
      trace,
      Config.traceTypes.numMatrix
    );
  }

  static getAllCandidateInfosFromTrace(trace) {
    return this.getAllParticularInfosFromTrace(
      trace,
      Config.traceTypes.candidate
    );
  }

  static getAllMarkerInfosFromTrace(trace) {
    return this.getAllParticularInfosFromTrace(trace, Config.traceTypes.marker);
  }

  static countNumbers(numMatrix) {
    let numCounts = this.initArray(0, Config.size + 1);
    const allIdxs = this.getAllCellIndicies();

    for (let idx of allIdxs) {
      const val = this.getNumFromNumMatrix(numMatrix, idx);
      if (val) {
        numCounts[val]++;
      }
    }

    return numCounts;
  }

  static isAllWideSelected(candidates) {
    // console.log("inside isAllWideSelected");

    return (
      Config.numCells === this.countWideSelectedCellsInCandidates(candidates)
    );
  }

  static countWideSelectedCellsInCandidates(candidates) {
    // console.log("inside countWideSelectInCandidates");

    const candArray = this.flattenMatrix2Array(candidates);

    const countWideSelected = candArray.reduce(
      (count, candCell) => count + this.isWideSelectedInStatuses(candCell),
      0
    );

    return countWideSelected;
  }

  static countNumInCandidates(candidates, cellInfos) {
    const candidateCells = cellInfos.filter(cellInfo =>
      this.isNarrowCandidate(this.getCandidateStatus(candidates, cellInfo))
    );

    return candidateCells.length;
  }

  static countNarrowCandidates(candidates, idx) {
    const statuses = this.getCandidateStatusArray(candidates, idx);
    return statuses.reduce(
      (count, status) => count + this.isNarrowCandidate(status),
      0
    );
  }

  static countCandidates(candidates, idx) {
    const statuses = this.getCandidateStatusArray(candidates, idx);
    return statuses.reduce(
      (count, status) => count + this.isCandidate(status),
      0
    );
  }

  static isSingleCandidate(candidates, idx) {
    return this.countCandidates(candidates, idx) === 1;
  }

  static getSingleCandidate(candidates, idx) {
    let candNums = this.getCandidateNums(candidates, idx);
    if (candNums.length === 1) {
      return candNums.pop();
    }
    return null;
  }

  static countWideRemoved(candidates, idx) {
    return this.getCandidateStatusArray(candidates, idx).reduce(
      (count, status) => count + this.isWideRemoved(status),
      0
    );
  }

  static countManualInputs(trace) {
    // console.log("inside countManualInputs");

    return trace.filter(
      traceItem => traceItem.operation === Config.operationTypes.manual
    ).length;
  }

  static getSelectableNum(candidates, idx) {
    const statuses = this.getCandidateStatusArray(candidates, idx);
    if (this.countNarrowCandidates(candidates, idx) === 1) {
      for (let [i, status] of statuses.entries()) {
        if (this.isNarrowCandidate(status)) {
          return this.i2n(i);
        }
      }
    }
    return null;
  }

  static getSelectableIdx(candidates, idx) {
    const statuses = this.getCandidateStatusArray(candidates, idx);
    for (let [i, status] of statuses.entries()) {
      if (this.isSelectable(status)) {
        return i;
      }
    }
    return null;
  }

  static isNumInCell(numMatrix, idx) {
    // console.log("inside isNumInCell function in Util.js");

    if (idx && idx.r !== null && idx.c !== null) {
      return !!numMatrix[idx.r][idx.c];
    }
    return false;
  }

  static isMarkerAddress(address) {
    return Util.getFirstLetter(address) === "B";
  }

  static isMarkerIndex(idx) {
    return typeof idx.b !== "undefined";
  }

  static hasNumInMarker(markerNums, idx) {
    const nums = this.getNumsFromMarkerNums(markerNums, idx);
    return nums.length > 0;
  }

  static isNumInMarker(markerNums, idx) {
    if (idx && this.isMarkerIndex(idx)) {
      return !!this.getNumFromMarkerNums(markerNums, idx);
    }
    return false;
  }

  static isTheNumInMarker(markerNums, markerInfo) {
    // console.log("inside isTheNumInMarker");

    const idx = markerInfo.idx;
    if (idx && this.isMarkerIndex(idx) && markerInfo.num !== null) {
      const nums = this.getNumArrayFromMarkerNums(markerNums, idx);
      return nums.includes(markerInfo.num);
    }
    return false;
  }

  static sumArray(ary) {
    return ary.reduce((a, b) => a + b, 0);
  }

  static n2i(n) {
    return n - 1;
  }

  static i2n(i) {
    return i + 1;
  }

  // count cells assigned a number to check all cells are filled with numbers //
  static countNonZeroCells(numMatrix) {
    return numMatrix
      .reduce((a, b) => a.concat(b))
      .map(a => a > 0)
      .reduce((a, b) => a + b, 0);
  }

  // convert elements of a matrix from empty to null //
  static convEmpty2Null(m) {
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m.length; c++) {
        if (!m[r][c]) {
          m[r][c] = null;
        }
      }
    }
    return m;
  }

  // convert elements of a matrix from zero to null //
  static convZero2Null(m) {
    // const allIdxs = this.getAllCellIndicies();

    // for (let idx of allIdxs) {
    //   const val = this.getNumFromNumMatrix(m, idx);
    //   if (!val) {
    //     m = this.assignNum2NumMatrix(m, this.initCellInfo(idx, null));
    //   }
    // }
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m.length; c++) {
        // if (!m[r][c] || m[r][c] === 0) {
        if (!m[r][c]) {
          m[r][c] = null;
        }
      }
    }
    return m;
  }

  static convNull2Zero(m) {
    for (let r = 0; r < m.length; r++) {
      for (let c = 0; c < m.length; c++) {
        // if (!m[r][c] || m[r][c] === null) {
        if (!m[r][c]) {
          m[r][c] = 0;
        }
      }
    }
    return m;
  }

  static getSampleGameList() {
    return Config.sampleGameClassList;
  }

  static getDummyMatrix() {
    return Config.dummyMatrix;
  }

  static getSampleGameButtonId(level, i) {
    return level + "-" + this.i2n(i);
  }

  static getSampleGameButtonLabel(level, i) {
    return this.getFirstLetter(level).toUpperCase() + this.i2n(i);
  }

  static getSampleGameButtonTitle(level, i, lang = "en") {
    const classTitle = Config.sampleGameTitles[level][lang];
    return this.capitalize(this.getSampleGameButtonId(classTitle, i));
  }

  static getSampleMatrix(levelId) {
    // console.log("inside levelId");

    const gameInfo = this.getSampleGameInfo(levelId);

    const gameNumMatrix = this.deepCopy(
      Config.sampleGames[gameInfo.gameClass][gameInfo.idx].matrix
    );

    return this.convZero2Null(gameNumMatrix);
  }

  static getSampleGameInfo(levelId) {
    if (!levelId) {
      return null;
    }

    const [gameClass, n] = levelId.split("-");
    return {
      gameClass,
      idx: parseInt(this.n2i(n))
    };
  }

  static flipLang(lang) {
    // console.log("inside flipLang");

    const langs = Object.values(Config.lang);
    const idx = langs.indexOf(lang);

    return langs[idx ? 0 : 1];
  }

  static getCredit(crediteInfo, lang) {
    // console.log("inside getCredit");

    let credit = Config.creditTemplate[lang];

    for (let [key, val] of Object.entries(crediteInfo)) {
      credit = credit.replace("__" + key + "__", val);
    }

    return credit;
  }

  // return flags to distinguish originally set numbers for a game //
  static getRegisteredFlags(numMatrix) {
    return numMatrix.map(row => row.map(num => num !== null));
  }

  // return numbers in a block assigned by index (0-8) as an array (obsolete?) //
  static getNumbersFromBlockIndex(m, blkIndex) {
    const blockCellIndices = this.getBlkIndicesFromIdx(blkIndex);

    // // should use map function //
    // let blkNums = [];
    // blockCellIndices.forEach(idx => {
    //   // blkNums.push(m[idx.r][idx.c]);
    //   blkNums.push(this.getNumFromNumMatrix(m, idx));
    // });
    // return blkNums;

    return this.getNumbersFromIndices(m, blockCellIndices);
  }

  // return numbers in a block assigned by number (1-9) as an array (obsolete?) //
  static getNumbersFromBlockIdx(m, blkIdx) {
    // return this.getNumbersFromBlockIndex(m, blkNum - 1);
    return this.getNumbersFromBlockIndex(m, blkIdx);
  }

  static getNumbersFromBlockNum(m, blkNum) {
    // return this.getNumbersFromBlockIndex(m, blkNum - 1);
    // return this.getNumbersFromBlockIndex(m, this.n2i(blkNum));
    return this.getNumbersFromBlockIdx(m, this.n2i(blkNum));
  }

  // return numbers of an element assigned by the indices //
  static getNumbersFromIndices(m, indices) {
    // console.log("inside getNumbersFromIndices");

    // return indices.map(idx => m[idx.r][idx.c]);
    return indices.map(idx => this.getNumFromNumMatrix(m, idx));
  }

  // return cellInfo (number and the index of the matrix) //
  static getCellInfoArrayFromIndices(numMatrix, cellIndices) {
    // return cellIndices.map(idx => {
    //   return {
    //     idx: idx,
    //     num: numMatrix[idx.r][idx.c]
    //   };
    // });

    return cellIndices.map(idx =>
      this.initCellInfo(idx, this.getNumFromNumMatrix(numMatrix, idx))
    );
  }

  // return numbers in a row as an array (obsolete?) //
  static getRowNumbers(m, r) {
    return m[r];
  }

  // return numbers in a column as an array (obsolete?) //
  static getColNumbers(m, c) {
    let colNums = [];
    for (let r = 0; r < m.length; r++) {
      colNums.push(m[r][c]);
    }
    return colNums;
  }

  // return cell indices of the assigned row index //
  static getRowIndicesFromIdx(r) {
    // console.log("inside getCellIndicesFromRowIndex");

    return this.getIndexSequence(Config.size).map(c => {
      return this.initCellIdx(r, c);
    });
  }

  // return cell indices of the assigned column index //
  static getColIndicesFromIdx(c) {
    // console.log("inside getCellIndicesFromColIndex");

    return this.getIndexSequence(Config.size).map(r => {
      return this.initCellIdx(r, c);
    });
  }

  static getRowIndicesFromBlockIdx(blkIdx) {
    const rowBase = Math.floor(blkIdx / Config.sizeB) * Config.sizeB;
    return this.getIndexSequence(Config.sizeB).map(i => i + rowBase);
  }

  static getColIndicesFromBlockIdx(blkIdx) {
    const colBase = (blkIdx % Config.sizeB) * Config.sizeB;
    return this.getIndexSequence(Config.sizeB).map(i => i + colBase);
  }

  static getRowColIndicesFromBlockIdx(blkIdx, rcType) {
    // console.log("inside getRowColIndicesFromBlockIdx");

    if (rcType === "r" || rcType === "row") {
      return this.getRowIndicesFromBlockIdx(blkIdx);
    }
    return this.getColIndicesFromBlockIdx(blkIdx);
  }

  static getCellIdxsFromMarkerIdx(markerIdx) {
    // console.log("inside getCellIdxsFromMarkerIdx");

    const counterRCs = this.getRowColIndicesFromBlockIdx(
      markerIdx.b,
      this.flipRCType(markerIdx.rcType)
    );

    return counterRCs.map(counterRC =>
      markerIdx.rcType === "r"
        ? this.initCellIdx(markerIdx.rc, counterRC)
        : this.initCellIdx(counterRC, markerIdx.rc)
    );
  }

  static getRowColWiseBlockIdxSequence(rcType) {
    const shortIdxArray = this.getIndexSequence(Config.sizeB);

    if (rcType === "r") {
      return shortIdxArray.map(i =>
        shortIdxArray.map(j => j + Config.sizeB * i)
      );
    }
    return shortIdxArray.map(i => shortIdxArray.map(j => j * Config.sizeB + i));
  }

  static getBlkIndicesFromIdx(blkIdx) {
    // console.log("inside getCellIndicesFromIdx");

    const rowIdxs = this.getRowIndicesFromBlockIdx(blkIdx);
    const colIdxs = this.getColIndicesFromBlockIdx(blkIdx);

    return rowIdxs.reduce(
      (idxs, r) => idxs.concat(colIdxs.map(c => this.initCellIdx(r, c))),
      []
    );
  }

  static getTargetCellIndicesByMarkerIdx(markerIdx, candidates) {
    // console.log("inside getTargetCellIndicesByMarkerIdx");

    const idxs = this.getCellIdxsFromMarkerIdx(markerIdx);

    return this.removeWideSelectedCellIdxs(candidates, idxs);
  }

  static removeWideSelectedCellIdxs(candidates, cellIdxs) {
    return cellIdxs.filter(idx => !this.isWideSelectedInCell(candidates, idx));
  }

  static getRelatedCellIndicesByMarkerIdx(markerIdx, candidates) {
    let cellIndices = this.getBlkIndicesFromIdx(markerIdx.b);
    const targetCellIndices = cellIndices.filter(
      idx => idx[markerIdx.rcType] === markerIdx.rc
    );

    cellIndices = cellIndices.concat(
      this.getCellIndices(markerIdx.rc, markerIdx.rcType)
    );

    return cellIndices.filter(
      idx =>
        !this.isIdxInDuplicates(targetCellIndices, idx) &&
        !this.isWideSelectedInCell(candidates, idx)
    );
  }

  // return cell indices of the assigned row/column/block index //
  static getCellIndices(idx, type = "row") {
    // console.log("inside getCellIndices with type: ", type);

    let cellIndices = [];
    switch (type) {
      case "r":
      case "row":
        cellIndices = this.getRowIndicesFromIdx(idx);
        break;
      case "c":
      case "col":
      case "column":
        cellIndices = this.getColIndicesFromIdx(idx);
        break;
      case "b":
      case "blk":
      case "block":
        cellIndices = this.getBlkIndicesFromIdx(idx);
        break;
      default:
        break;
    }
    return cellIndices;
  }

  static getAllIndices(idx) {
    const blockIdx = this.getBlockIdxFromCellIdx(idx);

    const indices = {
      row: this.getRowIndicesFromIdx(idx.r),
      col: this.getColIndicesFromIdx(idx.c),
      blk: this.getBlkIndicesFromIdx(blockIdx)
    };
    return indices;
  }

  // return row indices of the assigned block index //
  static getBlkRowIndicesFromIdx(blkIdx) {
    // console.log("inside getBlkRowIndicesFromIdx");

    const rowBase = Math.floor(blkIdx / Config.sizeB) * Config.sizeB;
    let rowIndices = this.getIndexSequence(Config.sizeB);

    return rowIndices.map(r => r + rowBase);
  }

  // return column indices of the assigned block index //
  static getBlkColIndicesFromIdx(blkIdx) {
    // console.log("inside getBlkColIndicesFromIdx");

    const colBase = (blkIdx % Config.sizeB) * Config.sizeB;

    let colIndices = this.getIndexSequence(Config.sizeB);
    return colIndices.map(c => c + colBase);
  }

  static getBlkRowColIndicesFromIdx(blkIdx, rcType) {
    return rcType === "row"
      ? this.getBlkRowIndicesFromIdx(blkIdx)
      : this.getBlkColIndicesFromIdx(blkIdx);
  }

  static getCandidateCellIndices(candidates, rcbIdx, type) {
    let cellIndices = this.getCellIndices(rcbIdx, type);
    return this.removeSelectCells(candidates, cellIndices);
  }

  static removeSelectCells(candidates, idxs) {
    return idxs.filter(idx => !this.isWideSelectedInCell(candidates, idx));
  }

  static getRelatedIndicesBesidesItself(idx) {
    // console.log("inside getReletedIndicesBesidesItself");

    const rows2 = this.getRowIndicesWithoutTheIdx(idx);
    const cols2 = this.getColIndicesWithoutTheIdx(idx);
    const blks2 = this.getBlockOnlyIndicesFromCellIdx(idx);

    return rows2.concat(cols2).concat(blks2);
  }

  static getRowIndicesWithoutTheIdx(idx) {
    const rows = this.getRowIndicesFromIdx(idx.r);
    rows.splice(idx.c, 1);
    return rows;
  }

  static getColIndicesWithoutTheIdx(idx) {
    const cols = this.getColIndicesFromIdx(idx.c);
    cols.splice(idx.r, 1);
    return cols;
  }

  static getBlockOnlyIndicesFromCellIdx(idx) {
    const blockIdx = this.getBlockIdxFromCellIdx(idx);
    const blks = this.getBlkIndicesFromIdx(blockIdx);

    return blks.filter(bIdx => bIdx.r !== idx.r && bIdx.c !== idx.c);
  }

  // return cell indices of the assigned block num //
  static getBlkIndicesFromNum(blkNum) {
    // return this.getBlkIndicesFromIdx(blkNum - 1, Config.size);
    return this.getBlkIndicesFromIdx(this.n2i(blkNum), Config.size);
  }

  static getCellIndicesFromBlockId(blockId) {
    const nBlock = this.getBlockNumFromBlockId(blockId);
    return this.getBlkIndicesFromNum(nBlock);
  }

  static getBlockIdxFromCellIdx(idx) {
    let blockIdx = Math.floor(idx.r / Config.sizeB) * Config.sizeB;
    blockIdx += Math.floor(idx.c / Config.sizeB);
    return blockIdx;
  }

  static getRelatedIndices4union(candidates, idxs, rcbIdx, rcbType) {
    // console.log("inside getRelatedIndices4union");

    let cellIndices = this.getCandidateCellIndices(candidates, rcbIdx, rcbType);

    let cellIndicesTmp = [];
    if (rcbType === "blk") {
      const rcType = this.isInSameRowCol(idxs);
      if (rcType) {
        cellIndicesTmp = this.getCandidateCellIndices(
          candidates,
          idxs[0][rcType],
          rcType
        );
      }
    } else {
      const blkIdx = this.isInSameBlock(idxs);

      if (typeof blkIdx === "number") {
        cellIndicesTmp = this.getCandidateCellIndices(
          candidates,
          blkIdx,
          "blk"
        );
      }
    }

    cellIndices = cellIndices.concat(cellIndicesTmp);
    cellIndices = this.removeDuplicatedIndices(cellIndices);

    // remove the union cells themselves //
    cellIndices = cellIndices.filter(idx => !this.isIdxInDuplicates(idxs, idx));

    return cellIndices;
  }

  static getRelatedCellInfo4unionA(candidates, unionCell) {
    let cellInfos = [];

    let cellIndices = this.getRelatedIndices4union(
      candidates,
      unionCell.idxs,
      unionCell.rcbIdx,
      unionCell.type
    );

    for (let idx of cellIndices) {
      for (let num of unionCell.nums) {
        const cellInfo = this.initCellInfo(
          idx,
          num,
          Config.candidateStatus.removable
        );
        const prevStatus = this.getCandidateStatus(candidates, cellInfo);

        if (this.isNarrowCandidate(prevStatus)) {
          cellInfo.prevStatus = prevStatus;
          cellInfos.push(cellInfo);
        }
      }
    }
    return cellInfos;
  }

  static getRelatedCellInfo4unionB(candidates, unionCell) {
    let relatedCellInfos = [];
    const idxArray = this.getIndexSequence();

    if (unionCell.type !== Config.restrictionTypes.block) {
      return [];
    }

    for (let rcType of Config.restrictionTypesStraightShortArray) {
      const counterRCType = this.flipRCType(rcType);

      if (!this.isInSameRowCol(unionCell.idxs, rcType)) {
        continue;
      }

      // if (this.isInSameRowCol(unionCell.idxs, rcType)) {
      const rc = unionCell.idxs[0][rcType];

      for (let counterRC of idxArray) {
        if (unionCell.idxs.map(idx => idx[counterRCType]).includes(counterRC)) {
          continue;
        }

        // if (
        //   !unionCell.idxs.map(idx => idx[counterRCType]).includes(counterRC)
        // ) {
        for (let num of unionCell.nums) {
          const idx =
            rcType === Config.restrictionTypesShort.row
              ? this.initCellIdx(rc, counterRC)
              : this.initCellIdx(counterRC, rc);
          const cellInfo = this.initCellInfo(
            idx,
            num,
            Config.candidateStatus.removable
          );
          cellInfo.prevStatus = this.getCandidateStatus(candidates, cellInfo);

          if (this.isNarrowCandidate(cellInfo.prevStatus)) {
            relatedCellInfos.push(cellInfo);
          }
        }
        // }
      }
      // }
    }

    return relatedCellInfos;
  }

  static getRelatedBlockIdxsFromCellIdx(idx) {
    const blockIdx = this.getBlockIdxFromCellIdx(idx);

    let blkIdxs = {};
    for (let rcType of ["r", "c"]) {
      const blkSequence = this.getRowColWiseBlockIdxSequence(rcType);

      blkIdxs[rcType] = blkSequence
        .filter(idxs => idxs.includes(blockIdx))
        .pop();
    }

    return blkIdxs;
  }

  static index2R1C1(idx) {
    return `R${idx.r + 1}C${idx.c + 1}`;
  }

  static R1C12Index(r1c1) {
    return {
      r: parseInt(r1c1.slice(1, 2)) - 1,
      c: parseInt(r1c1.slice(3, 4)) - 1
    };
  }

  static R1C1N12CellInfo(r1c1n1) {
    return {
      idx: this.R1C12Index(r1c1n1.slice(0, 4)),
      num: parseInt(r1c1n1.slice(5, 6))
    };
  }

  static getR1C1FromBlockId(blockId) {
    const cellIndices = this.getCellIndicesFromBlockId(blockId);
    const cellIndicesR1C1 = cellIndices.map(i => this.index2R1C1(i));

    return cellIndicesR1C1;
  }

  static markerId2Idx(markerId) {
    // console.log("inside markerId2Idx");

    // const b = parseInt(markerId.slice(1, 2)) - 1;
    // const rc = parseInt(markerId.slice(3, 4)) - 1;
    // const i = parseInt(markerId.slice(5, 6)) - 1;
    const b = this.n2i(parseInt(markerId.slice(1, 2)));
    const rcType = markerId.slice(2, 3).toLowerCase();
    const rc = this.n2i(parseInt(markerId.slice(3, 4)));
    const i = this.n2i(parseInt(markerId.slice(5, 6)));

    return this.initMarkerIdx(b, rcType, rc, i);
  }

  static markerIdx2Id(idx) {
    return `B${idx.b}${idx.rcType}${idx.rc}I${idx.i + 1}`;
  }

  static getMarkerIdxsFromCellIdx(idx) {
    const blockIdx = this.getBlockIdxFromCellIdx(idx);

    return ["r", "c"].map(rcType =>
      this.initMarkerIdx(blockIdx, rcType, idx[rcType])
    );
  }

  static getCorrespondingCellIdxs2MarkerIdx(markerIdx) {
    const RCIdxs = Util.getRowColIndicesFromBlockIdx(
      markerIdx.b,
      Util.flipRCType(markerIdx.rcType)
    );

    return RCIdxs.map(rc =>
      markerIdx.rcType === "r"
        ? Util.initCellIdx(markerIdx.rc, rc)
        : Util.initCellIdx(rc, markerIdx.rc)
    );
  }

  static getRelatedMarkerIdxsFromCellIdx(cellIdx) {
    // console.log("inside getRelatedMarkerIdxsFromCellIdx");

    const blockSeq = this.getRelatedBlockIdxsFromCellIdx(cellIdx);

    let markerIdxs = [];
    for (let rcType of Object.keys(blockSeq)) {
      const blockIdxs = blockSeq[rcType].reduce(
        (ary, i) => ary.concat(Array(3).fill(i)),
        []
      );
      for (let [rc, b] of blockIdxs.entries()) {
        markerIdxs.push(this.initMarkerIdx(b, this.flipRCType(rcType), rc));
      }
    }

    return markerIdxs;
  }

  static getNumFromMarkerNums(markerNums, idx) {
    const nums = this.getNumArrayFromMarkerNums(markerNums, idx);
    return nums[idx.i];
  }

  static getNumsFromMarkerNums(markerNums, idx) {
    const nums = this.getNumArrayFromMarkerNums(markerNums, idx);
    return nums.filter(num => num !== null);
  }

  static getNumArrayFromMarkerNums(markerNums, idx) {
    // console.log("inside markerNums");

    const nums = markerNums[idx.b][idx.rcType][idx.rc].nums;
    return nums;
  }

  static getInfoArrayFromMarkerNums(markerNums, idx) {
    return markerNums[idx.b][idx.rcType][idx.rc];
  }

  static getInfosFromMarkerNums(markerNums, idx) {
    // console.log("inside getInfosFromMarkerNums");

    const infoArray = this.getInfoArrayFromMarkerNums(markerNums, idx);

    const infos = { nums: [], statuses: [] };
    for (let [i, num] of infoArray.nums.entries()) {
      if (num !== null) {
        infos.nums.push(num);
        infos.statuses.push(infoArray.statuses[i]);
      }
    }

    return infos;
  }

  static isTheMarkerCellNull(markerNums, idx) {
    return markerNums[idx.b][idx.rcType][idx.rc].nums[idx.i] === null;
  }

  static setMarkerNum(markerNums, markerInfo) {
    // console.log("inside setMarkerNum");

    let idx = markerInfo.idx;
    let isReset = false;

    if (markerInfo.num < 0) {
      isReset = true;
      markerInfo.num = Math.abs(markerInfo.num);
    }

    if (this.isTheNumInMarker(markerNums, markerInfo)) {
      idx = this.findNumInMarker(markerNums, markerInfo);
    } else if (idx.i === null || this.getNumFromMarkerNums(markerNums, idx)) {
      idx.i = this.getFirstNullIdx(
        this.getNumArrayFromMarkerNums(markerNums, idx)
      );
    }

    if (isReset) {
      markerNums[idx.b][idx.rcType][idx.rc].nums[idx.i] = null;
      markerNums[idx.b][idx.rcType][idx.rc].statuses[idx.i] = null;
    } else {
      markerNums[idx.b][idx.rcType][idx.rc].nums[idx.i] = markerInfo.num;
      markerNums[idx.b][idx.rcType][idx.rc].statuses[idx.i] = markerInfo.status;
    }

    markerNums[idx.b][idx.rcType][idx.rc] = this.sortMarkerNums(
      this.getInfoArrayFromMarkerNums(markerNums, idx)
    );

    return markerNums;
  }

  static resetMarker(markerNums, markerInfos) {
    // console.log("inside resetMarker");

    for (let markerInfo of markerInfos) {
      let markerInfoArray = [];
      if ("nums" in markerInfo) {
        for (let [i, num] of markerInfo.nums.entries()) {
          const targetMarkerInfo = this.initMarkerInfo(markerInfo.idx, num);
          if ("prevStatuses" in markerInfo) {
            if (num !== markerInfo.num) {
              targetMarkerInfo.prevStatus = markerInfo.prevStatuses[i];
            }
          }
          markerInfoArray.push(targetMarkerInfo);
        }
      } else {
        markerInfoArray.push(markerInfo);
      }

      for (let mInfo of markerInfoArray) {
        if (typeof mInfo.num !== "number") {
          mInfo.num = this.getNumFromMarkerNums(markerNums, mInfo.idx);
          if (!mInfo.num) {
            continue;
          }
        }

        if ("prevStatus" in mInfo) {
          mInfo = this.initMarkerInfo(mInfo.idx, mInfo.num, mInfo.prevStatus);
        } else {
          mInfo = this.initMarkerInfo(mInfo.idx, -mInfo.num, null);
        }

        markerNums = this.setMarkerNum(markerNums, mInfo);
      }
    }

    return [markerNums, markerInfos];
  }

  static assignMarkerStatusSub(markerNums, mInfo) {
    const idx = this.findNumInMarker(markerNums, mInfo);

    if (idx !== null) {
      markerNums[idx.b][idx.rcType][idx.rc].statuses[idx.i] = mInfo.status;
    }
    return markerNums;
  }

  static assignMarkerStatus(markerNums, markerInfo) {
    // console.log("inside assignMarkerStatus");

    if (Object.keys(markerInfo).includes("nums")) {
      for (let num of markerInfo.nums) {
        markerInfo.num = num;
        markerNums = this.assignMarkerStatusSub(markerNums, markerInfo);
      }
    } else if (Object.keys(markerInfo).includes("num")) {
      markerNums = this.assignMarkerStatusSub(markerNums, markerInfo);
    }

    return markerNums;
  }

  static assignSelectable2MarkerNums(markerNums, markerInfo) {
    markerInfo.status = Config.candidateStatus.selectable;
    return this.assignMarkerStatus(markerNums, markerInfo);
  }

  static assignExclusiveSingle2MarkerNums(markerNums, markerInfo) {
    markerInfo.status = Config.candidateStatus.exclusiveSingle;
    return this.assignMarkerStatus(markerNums, markerInfo);
  }

  static assignExclusiveDouble2MarkerNums(markerNums, markerInfo) {
    markerInfo.status = Config.candidateStatus.exclusiveDouble;
    return this.assignMarkerStatus(markerNums, markerInfo);
  }

  static assignExclusiveTriple2MarkerNums(markerNums, markerInfo) {
    markerInfo.status = Config.candidateStatus.exclusiveTriple;
    return this.assignMarkerStatus(markerNums, markerInfo);
  }

  static getMarkerStatus(markerNums, idx) {
    return markerNums[idx.b][idx.rcType][idx.rc].statuses[idx.i];
  }

  static isMarkerStatusSelectable(markerNums, idx) {
    return (
      this.getMarkerStatus(markerNums, idx) ===
      Config.candidateStatus.selectable
    );
  }

  static sortMarkerNums(rcInfo) {
    // console.log("inside sortMarkerNums");

    let sorted = {
      nums: [],
      statuses: []
    };

    sorted.nums.push(rcInfo.nums.shift());
    sorted.statuses.push(rcInfo.statuses.shift());

    while (rcInfo.nums.length > 0) {
      const newNum = rcInfo.nums.shift();
      const status = rcInfo.statuses.shift();
      let idx = sorted.nums.length;

      if (newNum !== null) {
        for (let [i, num] of sorted.nums.entries()) {
          if (num === null || num > newNum) {
            idx = i;
            break;
          }
        }
      }

      sorted.nums.splice(idx, 0, newNum);
      sorted.statuses.splice(idx, 0, status);
    }

    return sorted;
  }

  static findNumInMarker(markerNums, markerInfo) {
    // console.log("inside findNumInMarker");

    let idx = markerInfo.idx;

    if (markerInfo.num === null) {
      return idx;
    }

    const nums = this.getNumArrayFromMarkerNums(markerNums, idx);
    const i = nums.indexOf(markerInfo.num);

    if (i >= 0) {
      idx.i = i;
      return idx;
    }
    return null;
  }

  static flipMarkerStatus(markerStatus) {
    return markerStatus === Config.buttonStatus.active
      ? Config.buttonStatus.waiting
      : Config.buttonStatus.active;
  }

  static updateMarkerStatus(markerNums, markerInfo, markerTrace, status) {
    // console.log("inside updateMarkerStatus2Selectable");

    let targetMarkerInfo = this.findPreviousMarkerInfo(
      markerNums,
      markerTrace,
      markerInfo
    );

    if (targetMarkerInfo) {
      targetMarkerInfo.prevStatus = targetMarkerInfo.status;
      targetMarkerInfo.status = status;

      markerNums = this.assignMarkerStatus(markerNums, targetMarkerInfo);
    }

    return [markerNums, targetMarkerInfo];
  }

  static updateMarkerStatus2Selectable(markerNums, markerInfo, markerTrace) {
    // console.log("inside updateMarkerStatus2Selectable");

    return this.updateMarkerStatus(
      markerNums,
      markerInfo,
      markerTrace,
      Config.candidateStatus.selectable
    );
  }

  static updateMarkerStatus2ExDouble(markerNums, markerInfo, markerTrace) {
    return this.updateMarkerStatus(
      markerNums,
      markerInfo,
      markerTrace,
      Config.candidateStatus.exclusiveDouble
    );
  }

  static updateMarkerStatus2ExTriple(markerNums, markerInfo, markerTrace) {
    return this.updateMarkerStatus(
      markerNums,
      markerInfo,
      markerTrace,
      Config.candidateStatus.exclusiveTriple
    );
  }

  static findPreviousMarkerInfo(markerNums, markerTrace, markerInfo) {
    if (markerTrace === null || markerTrace.length === 0) {
      return null;
    }

    // should rely on newest marker //
    const revMarkerTrace = markerTrace.reverse();
    let matchedMarkerInfo = null;

    for (let prevMInfo of revMarkerTrace) {
      if (this.isMatchTwoMarkers(markerInfo, prevMInfo)) {
        const idx = this.findNumInMarker(markerNums, prevMInfo);

        if (idx !== null) {
          matchedMarkerInfo = this.initMarkerInfo(idx, markerInfo.num);
          matchedMarkerInfo.prevStatus = prevMInfo.status;

          break;
        }
      }
    }

    return matchedMarkerInfo;
  }

  static getFirstNullIdx(ary) {
    for (let [i, num] of ary.entries()) {
      if (num === null) {
        return i;
      }
    }
    return null;
  }

  static isAllFilled(numMatrix) {
    return this.countNonZeroCells(numMatrix) === Config.numCells;
  }

  static extractRowInfo(m, r) {
    let rowInfo = [];

    if (
      m.length === Config.size &&
      m[r].length === Config.size &&
      m.length > r
    ) {
      m[r].forEach((num, c) => {
        rowInfo.push(this.initCellInfo(this.initCellIdx(r, c), num));
      });
    }
    return rowInfo;
  }

  static extractColInfo(m, c) {
    let colInfo = [];

    if (m.length === this.size && m.length > c) {
      m.forEach((row, r) => {
        colInfo.push(this.initCellInfo(this.initCellIdx(r, c), row[c]));
      });
    }
    return colInfo;
  }

  static extactBlockInfo(m, blkIdx) {
    let blkInfo = [];
    const indices = this.getBlkIndicesFromIdx(blkIdx, Config.size);

    if (m.length === Config.size && indices.length === Config.size) {
      indices.forEach(idx => {
        blkInfo.push(this.initCellInfo(idx, m[idx.r][idx.c]));
      });
    }
    return blkInfo;
  }

  static findDuplicatedIndices(numMatrix, cellIndices) {
    // console.log("inside findDuplicatedIndices");

    let dupCellIndices = [];
    const cellInfoArray = this.getCellInfoArrayFromIndices(
      numMatrix,
      cellIndices
    );
    const nulllessCellInfoArray = this.removeNullsFromCellInfo(cellInfoArray);

    nulllessCellInfoArray.sort(function(a, b) {
      if (a.num > b.num) {
        return 1;
      }
      if (a.num < b.num) {
        return -1;
      }
      return 0;
    });

    for (var i = 0; i < nulllessCellInfoArray.length - 1; i++) {
      // if duplicates found //
      if (nulllessCellInfoArray[i + 1].num === nulllessCellInfoArray[i].num) {
        // if first time or duplicates for different number from the previous duplicates //
        if (
          dupCellIndices.length === 0 ||
          !this.isTwoIdxsSame(
            dupCellIndices[dupCellIndices.length - 1],
            nulllessCellInfoArray[i].idx
          )
        ) {
          dupCellIndices.push(nulllessCellInfoArray[i].idx);
        }
        dupCellIndices.push(nulllessCellInfoArray[i + 1].idx);
      }
    }

    return dupCellIndices;
  }

  static checkDuplicate(numMatrix) {
    var duplicates = [];

    const idxSequence = this.getIndexSequence(Config.size);

    Config.restrictionTypesArray.forEach(type => {
      idxSequence.forEach(idx => {
        const cellIndices = this.getCellIndices(idx, type);
        let dup = this.findDuplicatedIndices(numMatrix, cellIndices);

        if (dup.length > 0) {
          if (duplicates.length > 0) {
            dup = dup.filter(
              dupidx => !this.isIdxInDuplicates(duplicates, dupidx)
            );
          }
          duplicates = duplicates.concat(dup);
        }
      });
    });

    return duplicates;
  }

  static checkCorrectness(ansMatrix, numMatrix) {
    // console.log("inside checkCorrectness");

    let wrongIdxs = [];
    if (ansMatrix === null || this.isMatrixAllNull(ansMatrix)) {
      return [];
    }

    const idxArray = this.getIndexSequence();
    for (let r of idxArray) {
      for (let c of idxArray) {
        const idx = this.initCellIdx(r, c);
        if (
          !this.isNumCorrect(
            ansMatrix,
            this.initCellInfo(idx, this.getNumFromNumMatrix(numMatrix, idx))
          )
        ) {
          wrongIdxs.push(this.initCellIdx(r, c));
        }
      }
    }

    return wrongIdxs;
  }

  static isNumCorrect(ansMatrix, cellInfo) {
    const ans = this.getNumFromNumMatrix(ansMatrix, cellInfo.idx);
    return ans === null || cellInfo.num === null || ans === cellInfo.num;
  }

  static isMatrixAllNull(m) {
    const ary = this.flattenMatrix2Array(m);
    return ary.reduce((isAllNull, elem) => elem === null && isAllNull, true);
  }

  static isTwoArraysSame(ary1, ary2) {
    // console.log("inside isTwoArraysSame");

    if (
      ary1 === null ||
      ary2 === null ||
      ary1.length === 0 ||
      ary1.length !== ary2.length
    ) {
      return null;
    }

    return ary1.reduce((isSame, e1, i) => isSame && e1 === ary2[i], true);
  }

  static isAllNumbersSame(nums) {
    if (nums.length < 2) {
      return false;
    }

    return this.removeDuplicatedNumbers(nums).length === 1;
  }

  static isAllStatusesSame(statuses) {
    if (statuses.length < 2) {
      return false;
    }

    const statusList = statuses.reduce(
      (statusList, status) =>
        statusList.includes(status) ? statusList : [...statusList, status],
      []
    );

    return statusList.length === 1;
  }

  static isTwoIdxsSame(idx1, idx2) {
    return JSON.stringify(idx1) === JSON.stringify(idx2);
  }

  static isTwoIdxSetsSame(idxs1, idxs2) {
    for (let [i, idx1] of idxs1.entries()) {
      if (!this.isTwoIdxsSame(idx1, idxs2[i])) {
        return false;
      }
    }
    return true;
  }

  static isInSameRowCol(idxs, directions = ["r", "c"]) {
    for (let rc of directions) {
      const rcIdxs = idxs.map(idx => idx[rc]);
      if (this.isAllNumbersSame(rcIdxs)) {
        // return true;
        return rc;
      }
    }
    return false;
  }

  static isInSameBlock(idxs) {
    const blkIdxs = idxs.map(idx => this.getBlockIdxFromCellIdx(idx));
    if (this.isAllNumbersSame(blkIdxs)) {
      return blkIdxs[0];
    }
    return false;
  }

  static isNewPairCell(pairCell, exclusiveCandidates) {
    for (let exCand of exclusiveCandidates) {
      if (this.isTwoIdxsSame(pairCell, exCand)) {
        return false;
      }
    }
    return true;
  }

  static checkTwoIdxsInSameBlock(idx1, idx2) {
    const blkIdx1 = this.getBlockIdxFromCellIdx(idx1);
    const blkIdx2 = this.getBlockIdxFromCellIdx(idx2);

    if (blkIdx1 === blkIdx2) {
      return blkIdx1;
    }
    return -1;
  }

  static checkIdxsInSameBlock(idxs) {
    const blkIdxs = idxs.map(idx => this.getBlockIdxFromCellIdx(idx));

    if (this.isAllNumbersSame(blkIdxs)) {
      return blkIdxs[0];
    }
    return -1;
  }

  static removeDuplicatedNumbers(nums) {
    // console.log("inside removeDuplicatedNumbers");

    const numsArray = nums.reduce((ary, num) => {
      ary.includes(num) || ary.push(num);
      return ary;
    }, []);

    return numsArray;
  }

  static removeDuplicatedIndices(idxsArray) {
    const uniqueIndices = idxsArray.reduce((ary, idx) => {
      this.isInCellInfoArray(ary, idx) || ary.push(idx);
      return ary;
    }, []);
    return uniqueIndices;
  }

  static isIdxInDuplicates(duplicates, idx) {
    return duplicates.filter(didx => this.isTwoIdxsSame(didx, idx)).length > 0;
  }

  static getIsDuplicatedFromBlockNum(duplicates, blockNum) {
    const cellIndices = this.getBlkIndicesFromNum(blockNum);

    return this.getIsDuplicatedFromIndices(duplicates, cellIndices);
  }

  static getIsDuplicatedFromIndices(duplicates, cellIndices) {
    return cellIndices.map(idx => this.isIdxInDuplicates(duplicates, idx));
  }

  static getAppearanceMatrixFromNumMatrix(numMatrix) {
    let appearanceMatrix = this.initMatrix(Config.candidateStatus.candidate);

    const allCellIdxs = this.getAllCellIndicies();
    for (let idx of allCellIdxs) {
      const num = this.getNumFromNumMatrix(numMatrix, idx);
      if (num !== null) {
        const appearance = this.appendNum(Config.candidateStatus.selected, num);

        appearanceMatrix = this.assignAppearance(
          appearanceMatrix,
          idx,
          appearance
        );
      }
    }

    return appearanceMatrix;
  }

  static getAppearanceMatrixFromCandidates(
    candidates,
    // helpMode,
    multipleNums,
    candidateLevel
  ) {
    // console.log("inside getAppearanceMatrixFromCandidates");

    // console.log("multipleNums");
    // console.log(multipleNums);

    let appearanceMatrix = this.initMatrix(Config.candidateStatus.candidate);
    const removeTypes = Config.wideRemovedList;
    const allCellIdxs = this.getAllCellIndicies();

    let selected = [];
    let selectable = [];

    selected = multipleNums.map(num =>
      this.appendNum(Config.candidateStatus.selected, num)
    );

    selectable = multipleNums.map(num =>
      this.appendNum(Config.candidateStatus.selectable, num)
    );

    for (let idx of allCellIdxs) {
      const targetStatuses = this.getCandidateStatuses(
        candidates,
        idx,
        multipleNums
      );

      const combinedStatus = this.combineStatuses(targetStatuses);
      const i = targetStatuses.indexOf(combinedStatus);

      let appearance = Config.candidateStatus.candidate;

      if (this.isSelected(combinedStatus)) {
        appearance = selected[i];
      } else if (this.hasSelected(candidates, idx)) {
        appearance = Config.candidateStatus.shadowed;
      } else if (candidateLevel > 0) {
        if (removeTypes.includes(combinedStatus)) {
          appearance = Config.candidateStatus.inhibited;
        } else if (candidateLevel > 1 && this.isSelectable(combinedStatus)) {
          appearance = selectable[i];
        }
      }

      appearanceMatrix = this.assignAppearance(
        appearanceMatrix,
        idx,
        appearance
      );
    }

    return appearanceMatrix;
  }

  static setSingleNumExclusiveCandidatesA(dataset, num, conditions) {
    // console.log("inside setSingleNumExclusiveCandidatesA");

    let { candidates, exclusiveCandidates, markerNums, trace } = dataset;

    const { isStepByStep, isSkipIneffective } = conditions;

    let candidateTrace = [];

    let prevMarkerTrace = this.getAllMarkerInfosFromTrace(trace);
    prevMarkerTrace = prevMarkerTrace.filter(traceItem =>
      Config.exclusiveMultiples4marker.includes(traceItem.status)
    );

    const idxSequence = this.getIndexSequence();
    const expectedLength = this.getUnionSizes(Config.sizeB);

    for (let blkIdx of idxSequence) {
      const cellIndices = this.getBlkIndicesFromIdx(blkIdx);

      let candidateCells = this.getSingleNumCandidateCells(
        candidates,
        num,
        cellIndices,
        Config.processTypes.singleNum
      );

      if (!expectedLength.includes(candidateCells.length)) {
        continue;
      }

      const rcType = this.isInSameRowCol(candidateCells);

      if (!rcType) {
        continue;
      }

      const direction = this.convertRCType2Direction(rcType);

      let targetCellInfo = this.initCellInfo(
        candidateCells,
        num,
        Config.candidateStatus.exclusiveSingle,
        direction,
        blkIdx
      );

      let markerInfo = null;
      markerInfo = this.convertCellInfo2MarkerInfo(targetCellInfo);

      if (
        this.isInExclusiveCandidates(exclusiveCandidates, targetCellInfo) ||
        !this.isStatusWorth2Store(prevMarkerTrace, markerInfo)
      ) {
        continue;
      }

      let updateCellIdxs = this.getCandidateCellIndices(
        candidates,
        targetCellInfo.idxs[0][rcType],
        direction
      );

      updateCellIdxs = this.getSingleNumCandidateCells(
        candidates,
        num,
        updateCellIdxs,
        Config.processTypes.candidates
      );

      updateCellIdxs = updateCellIdxs.filter(
        idx => !this.isIdxInDuplicates(targetCellInfo.idxs, idx)
      );

      if (isSkipIneffective && updateCellIdxs.length === 0) {
        continue;
      }

      [candidates, targetCellInfo] = this.assignCandidateStatus4SingleNum(
        candidates,
        targetCellInfo,
        Config.candidateStatus.exclusiveSingle
      );

      if (targetCellInfo) {
        candidateTrace.push(targetCellInfo);
      }

      let updateCellInfo = this.initCellInfo(
        updateCellIdxs,
        num,
        Config.candidateStatus.removable
      );

      [candidates, updateCellInfo] = this.assignCandidateStatus4SingleNum(
        candidates,
        updateCellInfo,
        Config.candidateStatus.removable
      );

      if (this.isCellsAllWideRemoved(candidates, updateCellInfo.idxs)) {
        return null;
      }

      if (updateCellInfo) {
        candidateTrace.push(updateCellInfo);
      }

      exclusiveCandidates.push(targetCellInfo);

      markerNums = this.setMarkerNum(markerNums, markerInfo);

      trace.push(
        this.initTraceItem(
          null,
          candidateTrace,
          [markerInfo],
          Config.operationTypes.auto
        )
      );

      if (
        isStepByStep &&
        Config.stepByStepLevels.includes(Config.candidateLevelTypes.level3)
      ) {
        return dataset;
      }
    }

    return dataset;
  }

  static getSingleNumBTargetIdxs(candidates, num, direction, rcIdx) {
    let candidateIdxs = this.getSingleNumCandidateCells(
      candidates,
      num,
      this.getCellIndices(rcIdx, direction),
      Config.processTypes.candidates
    );

    if (candidateIdxs.length > Config.sizeB) {
      return [null, null];
    }

    const blkIdx = this.isInSameBlock(candidateIdxs);

    if (typeof blkIdx !== "number") {
      return [null, null];
    }

    return [candidateIdxs, blkIdx];
  }

  static getSingleNumBUntargetIdxs(candidates, num, targetIdxs, blkIdx) {
    let untargetIdxs = this.getBlkIndicesFromIdx(blkIdx);
    untargetIdxs = untargetIdxs.filter(
      idx => !this.isIdxInDuplicates(targetIdxs, idx)
    );
    untargetIdxs = this.getSingleNumCandidateCells(
      candidates,
      num,
      untargetIdxs,
      Config.processTypes.candidates
    );

    return untargetIdxs;
  }

  static setSingleNumExclusiveCandidatesB(dataset, num, conditions) {
    // console.log("inside setSingleNumExclusiveCandidatesB");

    let { candidates, exclusiveCandidates, markerNums, trace } = dataset;
    const { isStepByStep, isSkipIneffective } = conditions;

    const idxSequence = this.getIndexSequence();

    let prevMarkerTrace = this.getAllMarkerInfosFromTrace(trace);
    prevMarkerTrace = prevMarkerTrace.filter(traceItem =>
      Config.exclusiveMultiples4marker.includes(traceItem.status)
    );

    let candidateTrace = [];

    for (let direction of Config.restrictionTypesStraightArray) {
      for (let rc of idxSequence) {
        let targetIdxs = [];
        let blkIdx = null;
        [targetIdxs, blkIdx] = this.getSingleNumBTargetIdxs(
          candidates,
          num,
          direction,
          rc
        );

        if (targetIdxs === null) {
          continue;
        }

        const untargetIdxs = this.getSingleNumBUntargetIdxs(
          candidates,
          num,
          targetIdxs,
          blkIdx
        );

        if (isSkipIneffective && untargetIdxs.length === 0) {
          continue;
        }

        let targetCellInfo = this.initCellInfo(
          targetIdxs,
          num,
          Config.candidateStatus.exclusiveSingle,
          direction,
          blkIdx
        );

        const markerInfo = this.convertCellInfo2MarkerInfo(targetCellInfo);

        if (
          this.isInExclusiveCandidates(exclusiveCandidates, targetCellInfo) ||
          !this.isStatusWorth2Store(prevMarkerTrace, markerInfo)
        ) {
          continue;
        }

        [candidates, targetCellInfo] = this.assignCandidateStatus4SingleNum(
          candidates,
          targetCellInfo,
          Config.candidateStatus.exclusiveSingle
        );

        if (targetCellInfo) {
          candidateTrace.push(targetCellInfo);
        }

        let untargetCellInfo = this.initCellInfo(
          untargetIdxs,
          num,
          Config.candidateStatus.removable
        );

        [candidates, untargetCellInfo] = this.assignCandidateStatus4SingleNum(
          candidates,
          untargetCellInfo,
          Config.candidateStatus.removable
        );

        if (this.isCellsAllWideRemoved(candidates, untargetCellInfo.idxs)) {
          return null;
        }

        if (untargetCellInfo) {
          candidateTrace.push(untargetCellInfo);
        }

        exclusiveCandidates.push(targetCellInfo);

        markerNums = this.setMarkerNum(markerNums, markerInfo);

        trace.push(
          this.initTraceItem(
            null,
            candidateTrace,
            [markerInfo],
            Config.operationTypes.auto
          )
        );

        if (
          isStepByStep &&
          Config.stepByStepLevels.includes(Config.candidateLevelTypes.level3)
        ) {
          return dataset;
        }
      }
    }

    return dataset;
  }

  static traceBackCandidates(candidates, candInfos) {
    // console.log("inside traceBackCandidates");

    for (let candInfo of candInfos) {
      if ("idxs" in candInfo) {
        if ("prevStatuses" in candInfo) {
          for (let [i, idx] of candInfo.idxs.entries()) {
            const cellInfo = this.initCellInfo(idx, candInfo.num);
            candidates = this.assignStatus2Candidates(
              candidates,
              cellInfo,
              candInfo.prevStatuses[i]
            );
          }
        } else {
          continue;
        }
      } else if ("nums" in candInfo) {
        if ("prevStatuses" in candInfo) {
          for (let [i, num] of candInfo.nums.entries()) {
            const cellInfo = this.initCellInfo(candInfo.idx, num);
            candidates = this.assignStatus2Candidates(
              candidates,
              cellInfo,
              candInfo.prevStatuses[i]
            );
          }
        } else {
          continue;
        }
      } else {
        candidates = this.assignStatus2Candidates(
          candidates,
          candInfo,
          candInfo.prevStatus
        );
      }
    }

    return candidates;
  }

  static initDataset() {
    return {
      candidates: this.initCube(Config.candidateStatus.candidate),
      exclusiveCandidates: [],
      markerNums: this.initMarkerNums(),
      trace: []
    };
  }

  static initCandidates(numMatrix, conditions) {
    // console.log("inside initCandidates");

    let dataset = Util.initDataset();
    dataset.numMatrix = numMatrix;
    // dataset.gameLevel = 0;

    dataset = this.setCandidates(dataset, conditions);

    return dataset;
  }

  static setCandidates(dataset, conditions) {
    // console.log("inside setCandidates");

    dataset.traceItems = [];

    let { numMatrix, candidates, exclusiveCandidates } = dataset;

    const {
      candidateLevel,
      helpMode,
      isStepByStep,
      isSkipLevel1
      // isMarkerOff
    } = conditions;

    const processType = helpMode;
    const maxLoopNum =
      helpMode === Config.processTypes.singleNum ? 1 : Config.maxLoopNum;

    let helperLevel = 0;

    if (!isSkipLevel1) {
      helperLevel = 1;

      candidates = this.setCandidatesLevel1(
        candidates,
        numMatrix,
        candidateLevel
      );

      if (
        typeof dataset.gameLevel !== "undefined" &&
        dataset.gameLevel < helperLevel
      ) {
        dataset.gameLevel = helperLevel;
      }
    }

    // There is a cell full of wide-removed //
    if (candidates === null) {
      return null;
    }

    if (
      this.isAllWideSelected(candidates) ||
      candidateLevel <
        this.getLevelNumFromFunctionName(Config.candidateTypes.singleCandidate)
    ) {
      return dataset;
    }

    for (let loopNum = 1; loopNum <= maxLoopNum; loopNum++) {
      let exclusiveCandidateLength = exclusiveCandidates.length;
      // let exclusiveCandidateLengthLevel6 = exclusiveCandidates.length;

      for (let loopNum = 1; loopNum <= maxLoopNum; loopNum++) {
        let exclusiveCandidateLengthLevel5 = exclusiveCandidates.length;

        for (let loopNum = 1; loopNum <= maxLoopNum; loopNum++) {
          let exclusiveCandidateLengthLevel4 = exclusiveCandidates.length;

          for (let loopNum = 1; loopNum <= maxLoopNum; loopNum++) {
            let exclusiveCandidateLengthLevel3 = exclusiveCandidates.length;

            for (let loopNum = 1; loopNum <= maxLoopNum; loopNum++) {
              let exclusiveCandidateLengthLevel2 = exclusiveCandidates.length;
              helperLevel = 2;

              dataset = this.setSelectableA(dataset, conditions);

              // There is a cell full of wide-removed //
              if (dataset === null) {
                return null;
              }

              if (
                exclusiveCandidates.length > exclusiveCandidateLengthLevel2 &&
                typeof dataset.gameLevel !== "undefined" &&
                dataset.gameLevel < helperLevel
              ) {
                dataset.gameLevel = helperLevel;
              }

              if (
                this.isAllWideSelected(candidates) ||
                (isStepByStep &&
                  Config.stepByStepLevels.includes(
                    Config.candidateTypes.singleCandidate
                  ) &&
                  exclusiveCandidates.length > exclusiveCandidateLength)
              ) {
                return dataset;
              }

              if (processType === Config.processTypes.candidates) {
                dataset = this.setSelectableB(dataset, conditions);

                // There is a cell full of wide-removed //
                if (dataset === null) {
                  return null;
                }

                if (
                  exclusiveCandidates.length > exclusiveCandidateLengthLevel2 &&
                  typeof dataset.gameLevel !== "undefined" &&
                  dataset.gameLevel < helperLevel
                ) {
                  dataset.gameLevel = helperLevel;
                }

                if (
                  this.isAllWideSelected(candidates) ||
                  (isStepByStep &&
                    Config.stepByStepLevels.includes(
                      Config.candidateTypes.singleCandidate
                    ) &&
                    exclusiveCandidates.length > exclusiveCandidateLength)
                ) {
                  return dataset;
                }
              }

              if (
                exclusiveCandidates.length === exclusiveCandidateLengthLevel2
              ) {
                break;
              }
            }

            if (
              candidateLevel <
              this.getLevelNumFromFunctionName(
                Config.candidateTypes.singleExclusive
              )
            ) {
              if (exclusiveCandidates.length === exclusiveCandidateLength) {
                break;
              }

              continue;
            }

            // exclusiveCandidateLengthTmp = exclusiveCandidates.length;
            helperLevel = 3;

            dataset = this.setSingleNumExclusiveCandidates(dataset, conditions);

            // There is a cell full of wide-removed //
            if (dataset === null) {
              return null;
            }

            if (
              exclusiveCandidates.length > exclusiveCandidateLengthLevel3 &&
              typeof dataset.gameLevel !== "undefined" &&
              dataset.gameLevel < helperLevel
            ) {
              dataset.gameLevel = helperLevel;
            }

            if (
              this.isAllWideSelected(candidates) ||
              (isStepByStep &&
                Config.stepByStepLevels.includes(
                  Config.candidateLevelTypes.level3
                ) &&
                exclusiveCandidates.length > exclusiveCandidateLength)
            ) {
              return dataset;
            }

            if (exclusiveCandidates.length === exclusiveCandidateLengthLevel3) {
              break;
            }
          }

          if (
            candidateLevel <
            this.getLevelNumFromFunctionName(
              Config.candidateTypes.multipleExclusive
            )
          ) {
            if (exclusiveCandidates.length === exclusiveCandidateLength) {
              break;
            }
            continue;
          }

          // exclusiveCandidateLengthTmp = exclusiveCandidates.length;
          helperLevel = 4;

          dataset = this.setExclusiveUnionA(dataset, conditions);

          // There is a cell full of wide-removed //
          if (dataset === null) {
            return null;
          }

          if (
            exclusiveCandidates.length > exclusiveCandidateLengthLevel4 &&
            typeof dataset.gameLevel !== "undefined" &&
            dataset.gameLevel < helperLevel
          ) {
            dataset.gameLevel = helperLevel;
          }

          if (
            this.isAllWideSelected(candidates) ||
            (isStepByStep &&
              Config.stepByStepLevels.includes(
                Config.candidateLevelTypes.level3
              ) &&
              exclusiveCandidates.length > exclusiveCandidateLength)
          ) {
            return dataset;
          }

          dataset = this.setExclusiveUnionB(dataset, conditions);

          // There is a cell full of wide-removed //
          if (dataset === null) {
            return null;
          }

          if (
            exclusiveCandidates.length > exclusiveCandidateLengthLevel4 &&
            typeof dataset.gameLevel !== "undefined" &&
            dataset.gameLevel < helperLevel
          ) {
            dataset.gameLevel = helperLevel;
          }

          if (
            this.isAllWideSelected(candidates) ||
            (isStepByStep &&
              Config.stepByStepLevels.includes(
                Config.candidateLevelTypes.level4
              ) &&
              exclusiveCandidates.length > exclusiveCandidateLength)
          ) {
            return dataset;
          }

          if (exclusiveCandidates.length === exclusiveCandidateLengthLevel4) {
            break;
          }
        }

        if (
          candidateLevel <
          this.getLevelNumFromFunctionName(Config.candidateTypes.square)
        ) {
          if (exclusiveCandidates.length === exclusiveCandidateLength) {
            break;
          }
          continue;
        }

        // exclusiveCandidateLengthTmp = exclusiveCandidates.length;
        helperLevel = 5;

        dataset = this.setSquareCandidates(dataset, conditions);

        // There is a cell full of wide-removed //
        if (dataset === null) {
          return null;
        }

        if (
          exclusiveCandidates.length > exclusiveCandidateLengthLevel5 &&
          typeof dataset.gameLevel !== "undefined" &&
          dataset.gameLevel < helperLevel
        ) {
          dataset.gameLevel = helperLevel;
        }

        if (
          this.isAllWideSelected(candidates) ||
          (isStepByStep &&
            Config.stepByStepLevels.includes(
              Config.candidateLevelTypes.level5
            ) &&
            exclusiveCandidates.length > exclusiveCandidateLength)
        ) {
          return dataset;
        }

        if (exclusiveCandidates.length === exclusiveCandidateLengthLevel5) {
          break;
        }
      }

      if (
        candidateLevel <
        this.getLevelNumFromFunctionName(Config.candidateTypes.assumptionTest)
      ) {
        if (exclusiveCandidates.length === exclusiveCandidateLength) {
          break;
        }
        continue;
      }

      // exclusiveCandidateLengthTmp = exclusiveCandidates.length;
      helperLevel = 6;

      dataset = this.setAssumptionTest(dataset, conditions);

      if (
        exclusiveCandidates.length > exclusiveCandidateLength &&
        typeof dataset.gameLevel !== "undefined" &&
        dataset.gameLevel < helperLevel
      ) {
        dataset.gameLevel = helperLevel;
      }

      if (
        this.isAllWideSelected(candidates) ||
        (isStepByStep &&
          Config.stepByStepLevels.includes(Config.candidateLevelTypes.level6) &&
          exclusiveCandidates.length > exclusiveCandidateLength)
      ) {
        return dataset;
      }

      if (exclusiveCandidates.length === exclusiveCandidateLength) {
        break;
      }
    }

    return dataset;
  }

  static setCandidatesLevel1(candidates, numMatrix, nLevel = 1) {
    // console.log("inside setCandidatesLevel1");

    const allCellIdxs = this.getAllCellIndicies();

    for (let idx of allCellIdxs) {
      const num = this.getNumFromNumMatrix(numMatrix, idx);

      if (num !== null && num > 0 && num <= Config.size) {
        const targetCellInfo = Util.initCellInfo(idx, num);

        [candidates] = this.updateCandidateOfTheCell(
          candidates,
          targetCellInfo
        );

        if (nLevel > 0) {
          [candidates] = this.updateRelatedCells(
            candidates,
            targetCellInfo,
            nLevel,
            Config.processTypes.insertion
          );

          // There is a cell full of wide-removed //
          if (candidates === null) {
            return null;
          }
        }
      }
    }

    return candidates;
  }

  static setSelectableA(dataset, conditions) {
    // console.log("inside setSelectableA");

    let { candidates, exclusiveCandidates, markerNums, trace } = dataset;

    const {
      candidateLevel,
      helpMode,
      singleNumValue,
      isStepByStep
    } = conditions;

    let prevMarkerTrace = this.getAllMarkerInfosFromTrace(trace);

    prevMarkerTrace = prevMarkerTrace.filter(traceItem =>
      Config.exclusiveTypes4marker.includes(traceItem.status)
    );

    let candidateTrace = [];
    let candidateTraceTmp = [];

    const processType = helpMode;
    const idxSequence = this.getIndexSequence();
    const numSequence =
      helpMode === Config.helpMode.singleNum
        ? [singleNumValue]
        : this.getNsequence();

    for (let num of numSequence) {
      for (let type of Config.restrictionTypesArray) {
        for (let rcbIdx of idxSequence) {
          const cellIndices = this.getCellIndices(rcbIdx, type);

          let candidateCells = this.getSingleNumCandidateCells(
            candidates,
            num,
            cellIndices,
            Config.processTypes.singleNum
          );

          if (candidateCells.length !== 1) {
            continue;
          }

          const idx = candidateCells[0];

          const targetCellInfo = this.initCellInfo(
            idx,
            num,
            Config.candidateStatus.selectable
          );

          if (
            this.isInExclusiveCandidates(exclusiveCandidates, targetCellInfo)
          ) {
            continue;
          }

          // set status of the cell //
          [candidates, candidateTrace] = this.updateCandidateOfTheCell(
            candidates,
            targetCellInfo,
            processType
          );

          [candidates, candidateTraceTmp] = this.updateRelatedCells(
            candidates,
            targetCellInfo,
            candidateLevel,
            processType
          );

          // There is a cell full of wide-removed //
          if (candidates === null) {
            return null;
          }

          candidateTrace = candidateTrace.concat(candidateTraceTmp);

          let markerTrace = [];
          const markerIdxs = this.getMarkerIdxsFromCellIdx(targetCellInfo.idx);

          for (let markerIdx of markerIdxs) {
            let markerTraceTmp = null;
            let targetMarkerInfo = this.initMarkerInfo(
              markerIdx,
              targetCellInfo.num
            );

            [markerNums, markerTraceTmp] = this.updateMarkerStatus2Selectable(
              markerNums,
              targetMarkerInfo,
              prevMarkerTrace
            );

            if (markerTraceTmp) {
              markerTrace.push(markerTraceTmp);
            }
          }

          if (markerTrace.length === 0) {
            trace.push(
              this.initTraceItemCandidate(
                candidateTrace,
                Config.operationTypes.auto
              )
            );
          } else {
            trace.push(
              this.initTraceItem(
                null,
                candidateTrace,
                markerTrace,
                Config.operationTypes.auto
              )
            );
          }

          exclusiveCandidates.push(targetCellInfo);

          if (
            isStepByStep &&
            Config.stepByStepLevels.includes(
              Config.candidateTypes.singleCandidate
            )
          ) {
            return dataset;
          }
        }
      }
    }

    return dataset;
  }

  static setSelectableB(dataset, conditions) {
    // console.log("inside setSelectableB");

    let { candidates, exclusiveCandidates, markerNums, trace } = dataset;

    const { candidateLevel, helpMode, isStepByStep } = conditions;

    let prevMarkerTrace = this.getAllMarkerInfosFromTrace(trace);
    prevMarkerTrace = prevMarkerTrace.filter(traceItem =>
      Config.exclusiveTypes4marker.includes(traceItem.status)
    );

    const processType = Config.processTypes.candidates;
    let selectableCells = [];

    selectableCells = this.findSingleCandidateCellsB(
      candidates,
      exclusiveCandidates,
      helpMode,
      isStepByStep
    );

    for (let cellInfo of selectableCells) {
      let candidateTrace = [];
      let candidateTraceTmp = [];

      if (this.isInExclusiveCandidates(exclusiveCandidates, cellInfo)) {
        continue;
      }

      [candidates, candidateTraceTmp] = this.updateCandidateOfTheCell(
        candidates,
        cellInfo,
        processType
      );

      candidateTrace = candidateTrace.concat(candidateTraceTmp);

      [candidates, candidateTraceTmp] = this.updateRelatedCells(
        candidates,
        cellInfo,
        candidateLevel,
        processType
      );

      // There is a cell full of wide-removed //
      if (candidates === null) {
        return null;
      }

      candidateTrace = candidateTrace.concat(candidateTraceTmp);

      let markerTrace = [];

      const markerIdxs = this.getMarkerIdxsFromCellIdx(cellInfo.idx);

      for (let markerIdx of markerIdxs) {
        let markerTraceTmp = null;
        let targetMarkerInfo = this.initMarkerInfo(markerIdx, cellInfo.num);

        [markerNums, markerTraceTmp] = this.updateMarkerStatus2Selectable(
          markerNums,
          targetMarkerInfo,
          prevMarkerTrace
        );

        if (markerTraceTmp) {
          markerTrace.push(markerTraceTmp);
        }
      }

      if (markerTrace.length === 0) {
        trace.push(
          this.initTraceItemCandidate(
            candidateTrace,
            Config.operationTypes.auto
          )
        );
      } else {
        trace.push(
          this.initTraceItem(
            null,
            candidateTrace,
            markerTrace,
            Config.operationTypes.auto
          )
        );
      }

      exclusiveCandidates.push(cellInfo);
    }

    return dataset;
  }

  static setSingleNumExclusiveCandidates(dataset, conditions) {
    // console.log("inside setSingleNumExclusiveCandidates");

    let { exclusiveCandidates } = dataset;

    const { singleNumValue, isStepByStep } = conditions;

    const exclusiveCandidateLength = exclusiveCandidates.length;

    let numSequence = this.getNsequence();
    if (singleNumValue) {
      numSequence = [singleNumValue];
    }

    for (let num of numSequence) {
      dataset = this.setSingleNumExclusiveCandidatesA(dataset, num, conditions);

      // There is a cell full of wide-removed //
      if (dataset === null) {
        return null;
      }

      if (
        isStepByStep &&
        Config.stepByStepLevels.includes(Config.candidateLevelTypes.level3) &&
        exclusiveCandidates.length > exclusiveCandidateLength
      ) {
        return dataset;
      }

      dataset = this.setSingleNumExclusiveCandidatesB(dataset, num, conditions);

      // There is a cell full of wide-removed //
      if (dataset === null) {
        return null;
      }

      if (
        isStepByStep &&
        Config.stepByStepLevels.includes(Config.candidateLevelTypes.level3) &&
        exclusiveCandidates.length > exclusiveCandidateLength
      ) {
        return dataset;
      }
    }

    return dataset;
  }

  static setExclusiveUnionA(dataset, conditions) {
    // console.log("inside setExclusiveUnionA");

    // union size 2 finds 2 cells with the same two candidates //
    // such as [5, 7] and [5, 7] from cells with 2 remaining candidates //
    // union size 3 finds 3 cells with three candidates //
    // such as [1, 4, 8], [1, 4], [4, 8] from cells with 2 or 3 remaining candidates //

    let { candidates, exclusiveCandidates, markerNums, trace } = dataset;

    // const { isStepByStep, isSkipIneffective, isMarkerOff } = conditions;
    const { isStepByStep, isSkipIneffective } = conditions;

    let prevMarkerTrace = this.getAllMarkerInfosFromTrace(trace);
    prevMarkerTrace = prevMarkerTrace.filter(traceItem =>
      Config.exclusiveTypes4marker.includes(traceItem.status)
    );

    const idxArray = this.getIndexSequence();
    const unionSizes = this.getUnionSizes();

    const candNumMatrix = this.getCandidateNumMatrix(candidates);

    let candidateTrace = [];

    for (let type of Config.restrictionTypesArray) {
      for (let rcbIdx of idxArray) {
        const cellIndices = this.getCandidateCellIndices(
          candidates,
          rcbIdx,
          type
        );

        const cellIndicesLength = cellIndices.length;

        for (let unionSize of unionSizes) {
          const conditions = {
            type,
            rcbIdx,
            unionSize
          };

          const candLengths = this.getUnionSizes(unionSize);

          // let candidateCellIndices = cellIndices.filter(idx => {
          //   return candLengths.includes(
          //     this.countNumsInCandidateNumMatrix(candNumMatrix, idx)
          //   );
          // });

          let candidateCellIndices = cellIndices.filter(idx =>
            candLengths.includes(
              this.countNumsInCandidateNumMatrix(candNumMatrix, idx)
            )
          );

          if (
            cellIndicesLength < candidateCellIndices.length + 2 ||
            candidateCellIndices.length < unionSize
          ) {
            continue;
          }

          //   if (
          //   cellIndicesLength >= candidateCellIndices.length + 2 &&
          //   candidateCellIndices.length >= unionSize
          // ) {

          // let cellInfoArray = candidateCellIndices.map(idx => {
          //   return this.initCellInfo(
          //     idx,
          //     this.getNumsFromCandidateNumMatrix(candNumMatrix, idx)
          //   );
          // });

          let cellInfoArray = candidateCellIndices.map(idx =>
            this.initCellInfo(
              idx,
              this.getNumsFromCandidateNumMatrix(candNumMatrix, idx)
            )
          );

          const unionCells = this.findExclusiveUnionA(
            cellInfoArray,
            conditions
          );

          // unacceptable condition //
          if (unionCells === null) {
            console.log("findExclusiveUnionA found an illegal condtion.");
            return null;
          }

          for (let unionCell of unionCells) {
            if (
              this.isInCellInfoArrayIgnoringRCBInfo(
                exclusiveCandidates,
                unionCell
              )
            ) {
              continue;
            }

            // if (
            //   !this.isInCellInfoArrayIgnoringRCBInfo(
            //     exclusiveCandidates,
            //     unionCell
            //   )
            // ) {
            [candidates, candidateTrace] = this.updateCandidates4UnionA(
              candidates,
              unionCell,
              isSkipIneffective
            );

            // a cell with no candidates //
            if (candidates === null) {
              return null;
            }

            if (candidateTrace.length === 0) {
              continue;
            }

            exclusiveCandidates.push(unionCell);

            // if (typeof isMarkerOff !== "undefined" || !isMarkerOff) {
            const markerInfos = this.convertCellInfo2MarkerInfo(unionCell);

            let markerTrace = [];
            if (markerInfos && markerInfos.constructor === Array) {
              for (let markerInfo of markerInfos) {
                let targetMarkerInfo = this.findPreviousMarkerInfo(
                  markerNums,
                  prevMarkerTrace,
                  markerInfo
                );

                if (targetMarkerInfo) {
                  let markerTraceTmp = null;
                  [markerNums, markerTraceTmp] = this.updateMarkerStatus(
                    markerNums,
                    markerInfo,
                    prevMarkerTrace,
                    unionCell.status
                  );

                  if (markerTraceTmp) {
                    markerTrace.push(markerTraceTmp);
                  }
                } else {
                  markerNums = this.setMarkerNum(markerNums, markerInfo);
                  markerTrace.push(markerInfo);
                }
              }
            }

            if (markerTrace.length === 0) {
              trace.push(
                this.initTraceItemCandidate(
                  candidateTrace,
                  Config.operationTypes.auto
                )
              );
            } else {
              trace.push(
                this.initTraceItem(
                  null,
                  candidateTrace,
                  markerTrace,
                  Config.operationTypes.auto
                )
              );
            }
            // }

            if (
              isStepByStep &&
              Config.stepByStepLevels.includes(
                Config.candidateLevelTypes.level4
              )
            ) {
              return dataset;
            }
            // }
            // }
          }
        }
      }
    }

    return dataset;
  }

  static findExclusiveUnionA(cellInfoArray, conditions) {
    // console.log("inside findExclusiveUnionA");

    let unionCells = [];
    const candIdxArray = this.getIndexSequence(cellInfoArray.length);

    for (let unionIdxs of k_combinations(candIdxArray, conditions.unionSize)) {
      const idxs = unionIdxs.map(i => cellInfoArray[i].idx);

      if (
        conditions.type === Config.restrictionTypes.blk &&
        this.isInSameRowCol(idxs)
      ) {
        continue;
      }
      const numsUnion = this.getUnionNumbers(
        unionIdxs.map(i => cellInfoArray[i].nums)
      );

      if (numsUnion.length === conditions.unionSize) {
        const unionCell = this.initCellInfo(
          idxs,
          numsUnion,
          Config.wideExclusiveStatuses[conditions.unionSize],
          conditions.type,
          conditions.rcbIdx,
          conditions.unionSize
        );

        unionCells.push(unionCell);
      } else if (numsUnion.length < conditions.unionSize) {
        // this should not exist. something wrong //
        return null;
      }
    }
    return unionCells;
  }

  static setExclusiveUnionB(dataset, conditions) {
    // console.log("inside setExclusiveUnionB");

    // pair/triple/quadruple type B //
    let { candidates, exclusiveCandidates, markerNums, trace } = dataset;

    // const { isStepByStep, isSkipIneffective, isMarkerOff } = conditions;
    const { isStepByStep, isSkipIneffective } = conditions;

    let prevMarkerTrace = this.getAllMarkerInfosFromTrace(trace);
    prevMarkerTrace = prevMarkerTrace.filter(traceItem =>
      Config.exclusiveTypes4marker.includes(traceItem.status)
    );

    const idxArray = this.getIndexSequence();
    const numArray = this.getNsequence();
    const unionSizes = this.getUnionSizes();

    let candidateTrace = [];
    for (let type of Config.restrictionTypesArray) {
      for (let rcbIdx of idxArray) {
        let cellInfos = [];
        const cellIndices = this.getCandidateCellIndices(
          candidates,
          rcbIdx,
          type
        );

        // collect cellInfos for candidates //
        for (let num of numArray) {
          const cellInfo = this.extractCellInfoFromCandidate(
            candidates,
            num,
            cellIndices
          );

          if (cellInfo !== null) {
            cellInfos.push(cellInfo);
          }
        }

        const cellLength = cellInfos.length;
        if (cellLength === 0) {
          continue;
        }

        for (let unionSize of unionSizes) {
          if (cellLength < unionSize + 2) {
            continue;
          }

          const conditions = {
            type,
            rcbIdx,
            unionSize
          };

          let unionCellArrayB = this.findExclusiveUnionB(cellInfos, conditions);

          // console.log("unionCellArrayB");
          // console.log(unionCellArrayB);

          for (let unionCellB of unionCellArrayB) {
            if (
              this.isInCellInfoArrayIgnoringRCBInfo(
                exclusiveCandidates,
                unionCellB
              )
            ) {
              continue;
            }

            // if (
            //   !this.isInCellInfoArrayIgnoringRCBInfo(
            //     exclusiveCandidates,
            //     unionCellB
            //   )
            // ) {

            [candidates, candidateTrace] = this.updateCandidates4UnionB(
              candidates,
              unionCellB,
              isSkipIneffective
            );

            if (candidateTrace.length === 0) {
              continue;
            }

            exclusiveCandidates.push(unionCellB);

            // if (typeof isMarkerOff !== "undefined" || !isMarkerOff) {
            const markerInfos = this.convertCellInfo2MarkerInfo(unionCellB);

            let markerTrace = [];
            if (markerInfos && markerInfos.constructor === Array) {
              for (let markerInfo of markerInfos) {
                let targetMarkerInfo = this.findPreviousMarkerInfo(
                  markerNums,
                  prevMarkerTrace,
                  markerInfo
                );

                if (targetMarkerInfo) {
                  let markerTraceTmp = null;
                  [markerNums, markerTraceTmp] = this.updateMarkerStatus(
                    markerNums,
                    markerInfo,
                    prevMarkerTrace,
                    unionCellB.status
                  );

                  if (markerTraceTmp) {
                    markerTrace.push(markerTraceTmp);
                  }
                } else {
                  markerNums = this.setMarkerNum(markerNums, markerInfo);
                  markerTrace.push(markerInfo);
                }
              }
            }

            if (markerTrace.length === 0) {
              trace.push(
                this.initTraceItemCandidate(
                  candidateTrace,
                  Config.operationTypes.auto
                )
              );
            } else {
              trace.push(
                this.initTraceItem(
                  null,
                  candidateTrace,
                  markerTrace,
                  Config.operationTypes.auto
                )
              );
            }
            // }

            if (
              isStepByStep &&
              Config.stepByStepLevels.includes(
                Config.candidateLevelTypes.level4
              )
            ) {
              return dataset;
            }
            // }
            // }
          }
        }
      }
    }

    return dataset;
  }

  static findExclusiveUnionB(cellInfos, conditions) {
    // console.log("inside findExclusiveUnionB");

    const unionSizes = this.getUnionSizes(conditions.unionSize);
    let unionCellArrayB = [];
    let targetCellInfos = cellInfos.filter(cellInfo =>
      unionSizes.includes(cellInfo.idxs.length)
    );
    const candIdxArray = this.getIndexSequence(targetCellInfos.length);

    for (let unionIdxs of k_combinations(candIdxArray, conditions.unionSize)) {
      const idxsArray = unionIdxs.map(i => targetCellInfos[i].idxs);
      const idxsUnion = this.getUnionIndices(idxsArray);

      if (idxsUnion.length === conditions.unionSize) {
        const unionCell = this.initCellInfo(
          idxsUnion,
          unionIdxs.map(i => targetCellInfos[i].num),
          Config.wideExclusiveStatuses[conditions.unionSize],
          conditions.type,
          conditions.rcbIdx,
          conditions.unionSize
        );

        unionCellArrayB.push(unionCell);
      }
    }

    return unionCellArrayB;
  }

  static setSquareCandidates(dataset, conditions) {
    // console.log("inside setSquareCandidates");

    let { candidates, exclusiveCandidates, trace } = dataset;

    const { isStepByStep, isSkipIneffective } = conditions;

    let candidateTrace = [];
    let squareNums = this.getUnionSizes(Config.maxSquareNum);
    const numArray = this.getNsequence();

    for (let rowcol of Config.restrictionTypesStraightArray) {
      // const counterDirection = this.flipRowCol(rowcol);
      // const counterRC = this.getFirstLetter(counterDirection);

      for (let num of numArray) {
        const exclusiveSquareCandidates = exclusiveCandidates.filter(
          exCand => this.isExclusiveSquare(exCand.status) && num === exCand.num
        );

        for (let squareNum of squareNums) {
          const targetCellInfos = this.getSquareTargetCells(
            candidates,
            rowcol,
            num,
            squareNum
          );

          const squareCellInfoArray = this.findSquareCells(
            targetCellInfos,
            rowcol,
            squareNum
          );

          for (let squareCellInfo of squareCellInfoArray) {
            if (
              this.isInExclusiveSquareCandidates(
                exclusiveSquareCandidates,
                squareCellInfo
              )
            ) {
              continue;
            }

            [candidates, candidateTrace] = this.updateCandidates4Square(
              candidates,
              squareCellInfo,
              rowcol,
              isSkipIneffective
            );

            if (candidateTrace.length === 0) {
              continue;
            }

            // if (candidateTrace.length > 0) {
            exclusiveCandidates.push(squareCellInfo);

            trace.push(
              this.initTraceItemCandidate(
                candidateTrace,
                Config.operationTypes.auto
              )
            );

            if (
              isStepByStep &&
              Config.stepByStepLevels.includes(
                Config.candidateLevelTypes.level5
              )
            ) {
              return dataset;
            }
            // }
          }
        }
      }
    }

    return dataset;
  }

  static getSquareTargetCells(candidates, rowcol, num, squareNum) {
    const indexArray = this.getIndexSequence();
    const squareNums = this.getUnionSizes(squareNum);

    let targetCellInfos = [];

    for (let iRC of indexArray) {
      let cellIndices = this.getCandidateCellIndices(candidates, iRC, rowcol);

      cellIndices = cellIndices.filter(idx =>
        this.isNarrowCandidate(
          this.getCandidateStatus(candidates, this.initCellInfo(idx, num))
        )
      );

      if (squareNums.includes(cellIndices.length)) {
        targetCellInfos.push(this.initCellInfo(cellIndices, num));
      }
    }

    return targetCellInfos;
  }

  static findSquareCells(targetCellInfos, rowcol, squareNum) {
    // console.log("inside findSquareCells");

    if (targetCellInfos.length < squareNum) {
      return [];
    }

    let squareCellInfos = [];
    const counterRC = this.getFirstLetter(this.flipRowCol(rowcol));
    const num = targetCellInfos[0].num;
    const candIdxArray = this.getIndexSequence(targetCellInfos.length);

    for (let iSet of k_combinations(candIdxArray, squareNum)) {
      const candidateRCIdxsArray = iSet.map(i =>
        targetCellInfos[i].idxs.map(idx => idx[counterRC])
      );

      const unionRCIdxs = this.getUnionNumbers(candidateRCIdxsArray);

      if (unionRCIdxs.length === squareNum) {
        const squareCellInfo = {
          status: Config.candidateStatus.exclusiveSquare,
          num,
          idxsArray: iSet.map(i => targetCellInfos[i].idxs),
          rowcol: rowcol
        };

        squareCellInfos.push(squareCellInfo);
      }
    }

    return squareCellInfos;
  }

  static setAssumptionTest(dataset, conditions) {
    // console.log("inside setAssaumptionTest");

    let { candidates, exclusiveCandidates, trace } = dataset;

    const { isStepByStep } = conditions;

    let candidateTrace = [];
    let targetCellInfoSets = this.findAssumptionTest(dataset);

    for (let targetCellInfoSet of targetCellInfoSets) {
      if (
        this.isInExclusiveCandidates(exclusiveCandidates, targetCellInfoSet)
      ) {
        continue;
      }

      // if (
      //   !this.isInExclusiveCandidates(exclusiveCandidates, targetCellInfoSet)
      // ) {

      for (let [i, cellInfo] of targetCellInfoSet.cellInfos.entries()) {
        cellInfo.prevStatuses = [];
        cellInfo.statuses = [];

        for (let num of cellInfo.nums) {
          const cInfo = this.initCellInfo(cellInfo.idx, num);
          cellInfo.prevStatuses.push(
            this.getCandidateStatus(candidates, cInfo)
          );

          if (i === 0 && num === targetCellInfoSet.inhibitedNum) {
            cellInfo.statuses.push(Config.candidateStatus.removable);

            candidates = this.assignRemovable2Candidates(candidates, cInfo);
          } else {
            cellInfo.statuses.push(Config.candidateStatus.assumptionTest);

            candidates = this.assignAssumptionTest2Candidates(
              candidates,
              cInfo
            );
          }
        }

        candidateTrace.push(cellInfo);
      }

      exclusiveCandidates.push(targetCellInfoSet);

      if (candidateTrace.length > 0) {
        trace.push(
          this.initTraceItemCandidate(
            candidateTrace,
            Config.operationTypes.auto
          )
        );
      }

      if (
        isStepByStep &&
        Config.stepByStepLevels.includes(Config.candidateTypes.assumptionTest)
      ) {
        return dataset;
      }
      // }
    }

    return dataset;
  }

  static findAssumptionTest(dataset) {
    // console.log("inside findAssumptionTest");

    let { candidates } = dataset;
    let idxs = this.getAllCellIndicies();
    let targetCellInfos = [];

    idxs = idxs.filter(
      idx =>
        !this.isWideSelectedInCell(candidates, idx) &&
        this.countNarrowCandidates(candidates, idx) === 2
    );

    let cellInfos = idxs.map(idx =>
      this.initCellInfo(idx, this.getNarrowCandidateNums(candidates, idx))
    );

    let rectangles = this.getRectangleSet(cellInfos);

    for (let rectangle of rectangles) {
      const targetCellInfo = this.getAssumptionTestCellInfo(rectangle);
      if (targetCellInfo) {
        targetCellInfos.push(targetCellInfo);
      }
    }

    return targetCellInfos;
  }

  static getRectangleSet(cellInfos) {
    let rectangleSet = [];

    while (cellInfos.length >= 4) {
      const pivotCellInfo = cellInfos.shift();

      let rowMemberCellInfos = cellInfos.filter(
        cellInfo => pivotCellInfo.idx.r === cellInfo.idx.r
      );

      let colMemberCellInfos = cellInfos.filter(
        cellInfo => pivotCellInfo.idx.c === cellInfo.idx.c
      );

      for (let rowCell of rowMemberCellInfos) {
        for (let colCell of colMemberCellInfos) {
          let oppositeCellInfos = cellInfos.filter(
            cellInfo =>
              rowCell.idx.c === cellInfo.idx.c &&
              colCell.idx.r === cellInfo.idx.r
          );

          if (oppositeCellInfos.length === 1) {
            rectangleSet.push([
              [pivotCellInfo, oppositeCellInfos.pop()],
              [rowCell, colCell]
            ]);
          }
        }
      }
    }

    return rectangleSet;
  }

  static getAssumptionTestCellInfo(rectangleCellInfos) {
    for (let [i, aPair] of rectangleCellInfos.entries()) {
      const counterPair = rectangleCellInfos[i === 0 ? 1 : 0];

      for (let [j, pivotCell] of aPair.entries()) {
        const oppositeCell = aPair[j === 0 ? 1 : 0];

        for (let pNum of pivotCell.nums) {
          if (
            !(
              counterPair[0].nums.includes(pNum) &&
              counterPair[1].nums.includes(pNum)
            )
          ) {
            continue;
          }

          const counterNums = counterPair.map(cell =>
            cell.nums.filter(num => num !== pNum).pop()
          );

          if (this.isTwoArraysSame(oppositeCell.nums, counterNums)) {
            return {
              cellInfos: [pivotCell, oppositeCell, ...counterPair],
              inhibitedNum: pNum,
              status: Config.candidateStatus.assumptionTest
            };
          }
        }
      }
    }
    return null;
  }

  static isStatusWorth2Store(markerTrace, markerInfo) {
    // console.log("inside isStatusWorth2Store");

    for (let markerTraceItem of markerTrace) {
      if (this.isMatchTwoMarkers(markerTraceItem, markerInfo)) {
        return false;
      }
    }

    return true;
  }

  static isMatchTwoMarkers(markerInfoA, markerInfoB) {
    return (
      markerInfoA.num === markerInfoB.num &&
      markerInfoA.idx.b === markerInfoB.idx.b &&
      markerInfoA.idx.rcType === markerInfoB.idx.rcType &&
      markerInfoA.idx.rc === markerInfoB.idx.rc
    );
  }

  static selectSelectables(dataset) {
    // console.log("inside selectSelectables");

    let { numMatrix, candidates, markerNums, trace } = dataset;

    const targetTrace = this.getTraceItemsWithSelectables(trace);

    for (let targetTraceItem of targetTrace) {
      let numTrace = null;
      let candidateTrace = [];
      let markerTrace = [];

      for (let cellInfo of targetTraceItem.candidate) {
        const newCellInfo = this.deepCopy(cellInfo);

        if (
          this.isSelectableCellInfo(newCellInfo) &&
          this.isSelectable(this.getCandidateStatus(candidates, newCellInfo))
        ) {
          newCellInfo.prevStatus = Config.candidateStatus.selectable;
          newCellInfo.status = Config.candidateStatus.selected;

          numMatrix = this.assignNum2NumMatrix(numMatrix, newCellInfo);
          numTrace = newCellInfo;

          candidates = this.assignSelected2Candidates(candidates, newCellInfo);

          const markerIdxs = Util.getMarkerIdxsFromCellIdx(newCellInfo.idx);

          for (let markerIdx of markerIdxs) {
            const markerInfo = Util.initMarkerInfo(markerIdx, newCellInfo.num);
            let markerInfos4Trace = [];

            if (Util.isTheNumInMarker(markerNums, markerInfo)) {
              [markerNums, markerInfos4Trace] = Util.resetMarker(markerNums, [
                markerInfo
              ]);
            }

            markerTrace = markerTrace.concat(markerInfos4Trace);
          }

          candidateTrace.push(newCellInfo);
        } else if (this.isRemovableCellInfo(newCellInfo)) {
          if ("idxs" in newCellInfo) {
            let idxs = [];
            for (let idx of newCellInfo.idxs) {
              const cellInfoSub = this.initCellInfo(idx, newCellInfo.num);
              const status = this.getCandidateStatus(candidates, cellInfoSub);

              if (this.isRemovable(status)) {
                candidates = this.assignRemoved2Candidates(
                  candidates,
                  cellInfoSub
                );

                idxs.push(idx);
                newCellInfo.prevStatuses.push(status);
              }
            }

            if (idxs.length === 0) {
              continue;
            }

            newCellInfo.idxs = idxs;
            newCellInfo.status = Config.candidateStatus.removed;
            candidateTrace.push(newCellInfo);
          } else if (
            this.isRemovable(this.getCandidateStatus(candidates, newCellInfo))
          ) {
            candidates = this.assignRemoved2Candidates(candidates, newCellInfo);

            newCellInfo.prevStatus = Config.candidateStatus.removable;
            newCellInfo.status = Config.candidateStatus.removed;
            candidateTrace.push(newCellInfo);
          }
        }
      }

      if (numTrace !== null) {
        trace.push(
          this.initTraceItem(
            numTrace,
            candidateTrace,
            markerTrace,
            Config.operationTypes.auto
          )
        );
      } else if (candidateTrace.length > 0) {
        trace.push(
          this.initTraceItemCandidate(
            candidateTrace,
            Config.operationTypes.auto
          )
        );
      }
    }

    return dataset;
  }

  static convertSelectable2Selected(dataset) {
    let { numMatrix, candidates } = dataset;
    const allIdxs = this.getAllCellIndicies();

    for (let idx of allIdxs) {
      const i = this.getSelectableIdx(candidates, idx);
      const cellInfo = this.initCellInfo(idx, this.i2n(i));
      if (typeof i === "number") {
        numMatrix = this.assignNum2NumMatrix(numMatrix, cellInfo);

        [candidates] = this.updateCandidateOfTheCell(candidates, cellInfo);
      }
    }

    return dataset;
  }

  static eraseRmovalbe(dataset) {
    // console.log("inside eraseRmovalbe");

    let { candidates, trace } = dataset;
    const targetTrace = this.getTraceItemsWithRemovableWithoutSelectable(trace);

    for (let targetTraceItem of targetTrace) {
      let candidateTrace = [];
      for (let cellInfo of targetTraceItem.candidate) {
        let newCellInfo = this.deepCopy(cellInfo);

        if ("idxs" in newCellInfo) {
          newCellInfo.prevStatuses = [];

          // const idxs = newCellInfo.idxs.filter(idx => {
          //   const cellInfoSub = this.initCellInfo(
          //     idx,
          //     newCellInfo.num,
          //     newCellInfo.status
          //   );
          //   return (
          //     this.isRemovableCellInfo(cellInfoSub) &&
          //     this.isRemovable(this.getCandidateStatus(candidates, cellInfoSub))
          //   );
          // });

          // const idxs = newCellInfo.idxs.filter(idx =>
          //   this.isRemovable4erase(
          //     candidates,
          //     this.initCellInfo(idx, newCellInfo.num, newCellInfo.status)
          //   )
          // );

          let idxs = [];
          for (let idx of newCellInfo.idxs) {
            const cellInfoSub = this.initCellInfo(
              idx,
              newCellInfo.num,
              newCellInfo.status
            );
            if (this.isRemovable4erase(candidates, cellInfoSub)) {
              idxs.push(idx);
            }
          }
          // idxs = idxs.filter(idx =>
          //   this.isRemovable4erase(
          //     candidates,
          //     idx,
          //     newCellInfo.num,
          //     newCellInfo.status
          //   )
          // );

          if (idxs.length === 0) {
            continue;
          }

          for (let idx of idxs) {
            const cellInfoSub = this.initCellInfo(
              idx,
              newCellInfo.num,
              newCellInfo.status
            );

            newCellInfo.prevStatuses.push(Config.candidateStatus.removable);

            candidates = this.assignRemoved2Candidates(candidates, cellInfoSub);

            // candidateTrace.push(cellInfo);
          }

          newCellInfo.status = Config.candidateStatus.removed;
        } else {
          if (
            this.isRemovableCellInfo(newCellInfo) &&
            this.isRemovable(this.getCandidateStatus(candidates, newCellInfo))
          ) {
            newCellInfo.prevStatus = Config.candidateStatus.removable;
            newCellInfo.status = Config.candidateStatus.removed;

            candidates = this.assignRemoved2Candidates(candidates, newCellInfo);

            // candidateTrace.push(cellInfo);
          } else {
            continue;
          }
        }
        candidateTrace.push(newCellInfo);
      }

      if (candidateTrace.length > 0) {
        trace.push(
          this.initTraceItemCandidate(
            candidateTrace,
            Config.operationTypes.auto
          )
        );
      }
    }

    return dataset;
  }

  static isRemovable4erase(candidates, cellInfo) {
    // const cellInfoSub = this.initCellInfo(
    //   idx,
    //   newCellInfo.num,
    //   newCellInfo.status
    // );
    return (
      this.isRemovableCellInfo(cellInfo) &&
      this.isRemovable(this.getCandidateStatus(candidates, cellInfo))
    );
  }

  // static isRemovable4erase(candidates, idx, num, status) {
  //   const cellInfo = this.initCellInfo(idx, num, status);

  //   return (
  //     this.isRemovableCellInfo(cellInfo) &&
  //     this.isRemovable(this.getCandidateStatus(candidates, cellInfo))
  //   );
  // }

  static eraseExclusiveColors(candidates, trace) {
    let candidateTrace = [];
    const numArray = this.getNsequence();
    const allIdxs = this.getAllCellIndicies();

    for (let num of numArray) {
      const cellInfo4num = this.initCellInfo(
        [],
        num,
        Config.candidateStatus.candidate
      );
      cellInfo4num.prevStatuses = [];

      for (let idx of allIdxs) {
        const cellInfo = this.initCellInfo(
          idx,
          num,
          Config.candidateStatus.candidate
        );

        const status = this.getCandidateStatus(candidates, cellInfo);

        if (this.isWideExclusiveCandidate(status)) {
          cellInfo4num.idxs.push(idx);
          cellInfo4num.prevStatuses.push(status);

          candidates = this.assignCandidate2Candidates(candidates, cellInfo);
        }
      }

      if (cellInfo4num.idxs.length > 0) {
        candidateTrace.push(cellInfo4num);
      }
    }

    if (candidateTrace.length > 0) {
      trace.push(
        this.initTraceItemCandidate(candidateTrace, Config.operationTypes.auto)
      );
    }

    return [candidates, trace];
  }

  static filterTraceItems(trace, status, excludingStatus = "dummyStatus") {
    const traceCopy = this.deepCopy(trace);

    return traceCopy.filter(
      traceItem =>
        traceItem.candidate !== null &&
        traceItem.candidate.reduce(
          (hasStatus, cellInfo) => cellInfo.status === status || hasStatus,
          false
        ) &&
        !traceItem.candidate.reduce(
          (hasStatus, cellInfo) =>
            cellInfo.status === excludingStatus || hasStatus,
          false
        )
    );
  }

  static getTraceItemsWithSelectables(trace) {
    return this.filterTraceItems(trace, Config.candidateStatus.selectable);
  }

  static getTraceItemsWithRemovable(trace) {
    return this.filterTraceItems(trace, Config.candidateStatus.removable);
  }

  static getTraceItemsWithRemovableWithoutSelectable(trace) {
    return this.filterTraceItems(
      trace,
      Config.candidateStatus.removable,
      Config.candidateStatus.selectable
    );
  }

  static convertExclusive2Candidates(status) {
    return Config.narrowCandidateList.includes(status)
      ? Config.candidateStatus.candidate
      : status;
  }

  static setBackCandidates(candidates) {
    candidates = candidates.map(row =>
      row.map(cell =>
        cell.map(
          status =>
            Config.wideCandidateList.includes(status)
              ? Config.candidateStatus.candidate
              : status
          // this.convertExclusive2Candidates(status)
        )
      )
    );

    return candidates;
  }

  static updateCandidates4UnionA(candidates, unionCell, isSkipIneffective) {
    // console.log("inside updateCandidates4UnionA");

    let status = Config.wideExclusiveStatuses[unionCell.unionSize];

    let candidateTrace = [];
    let relatedCellInfos = this.getRelatedCellInfo4unionA(
      candidates,
      unionCell
    );

    if (isSkipIneffective && relatedCellInfos.length === 0) {
      return [candidates, []];
    }

    for (let idx of unionCell.idxs) {
      for (let num of unionCell.nums) {
        const targetCellInfo = this.initCellInfo(idx, num, status);
        const prevStatus = this.getCandidateStatus(candidates, targetCellInfo);

        if (this.isNarrowCandidate(prevStatus)) {
          candidates = this.assignStatus2Candidates(
            candidates,
            targetCellInfo,
            status
          );

          targetCellInfo.prevStatus = prevStatus;
          candidateTrace.push(targetCellInfo);
        }
      }
    }

    for (let cellInfo of relatedCellInfos) {
      candidates = this.assignRemovable2Candidates(candidates, cellInfo);

      if (this.isCellAllWideRemoved(candidates, cellInfo.idx)) {
        return [null, null];
      }
    }

    // console.log("relatedCellInfos");
    // console.log(relatedCellInfos);

    // if (this.isCellsAllWideRemoved(candidates, relatedCellInfos.idxs)) {
    //   return [null, null];
    // }

    candidateTrace = candidateTrace.concat(relatedCellInfos);

    return [candidates, candidateTrace];
  }

  static updateCandidates4UnionB(candidates, unionCell, isSkipIneffective) {
    let candidateTrace = [];
    let status = Config.wideExclusiveStatuses[unionCell.unionSize];

    const numArray = this.getNsequence();

    for (let idx of unionCell.idxs) {
      for (let num of numArray) {
        const assignStatus = unionCell.nums.includes(num)
          ? status
          : Config.candidateStatus.removable;
        const targetCellInfo = this.initCellInfo(idx, num, assignStatus);
        targetCellInfo.prevStatus = this.getCandidateStatus(
          candidates,
          targetCellInfo
        );

        if (this.isNarrowCandidate(targetCellInfo.prevStatus)) {
          candidateTrace.push(targetCellInfo);
        }
      }
    }

    let relatedCellInfos = this.getRelatedCellInfo4unionB(
      candidates,
      unionCell
    );

    const removableTargetCellInfos = candidateTrace.filter(
      cellInfo => cellInfo.status === Config.candidateStatus.removable
    );

    if (
      isSkipIneffective &&
      removableTargetCellInfos.length === 0 &&
      relatedCellInfos.length === 0
    ) {
      return [candidates, []];
    }

    for (let cellInfo of candidateTrace) {
      candidates = this.assignStatus2Candidates(
        candidates,
        cellInfo,
        cellInfo.status
      );
    }

    for (let cellInfo of relatedCellInfos) {
      candidates = this.assignRemovable2Candidates(candidates, cellInfo);

      // // This problem may never happen //
      // if (this.isCellAllWideRemoved(candidates, cellInfo.idx)) {
      //   return [null, null];
      // }
    }

    candidateTrace = candidateTrace.concat(relatedCellInfos);

    return [candidates, candidateTrace];
  }

  static updateCandidates4Square(
    candidates,
    squareCellInfo,
    rowcol,
    isSkipIneffective
  ) {
    // console.log("inside updateCandidates4Square");

    const counterDirection = this.flipRowCol(rowcol);
    const counterRC = this.getFirstLetter(counterDirection);

    // console.log("counterDirection: ", counterDirection);

    // const squareIndices = squareCellInfo.idxs1.concat(squareCellInfo.idxs2);
    const squareIndices = this.flattenMatrix2Array(squareCellInfo.idxsArray);
    const rawRCIdxs = squareCellInfo.idxsArray.map(idxs =>
      this.flattenMatrix2Array(idxs.map(idx => idx[counterRC]))
    );
    const keyRCIdxs = this.getUnionNumbers(rawRCIdxs);

    // console.log("squareIndices");
    // console.log(squareIndices);

    // console.log("rawRCIdxs");
    // console.log(rawRCIdxs);

    // console.log("keyRCIdxs");
    // console.log(keyRCIdxs);

    let candidateTrace = [];

    let targetCellInfos = [];
    let unTargetCellInfos = [];

    // for (let keyIdx of squareCellInfo.idxs1) {
    // for (let keyIdx of squareCellInfo.idxsArray[0]) {
    for (let keyRCIdx of keyRCIdxs) {
      const cellIndices = this.getCandidateCellIndices(
        candidates,
        // keyIdx[counterRC],
        keyRCIdx,
        counterDirection
      );

      for (let idx of cellIndices) {
        const cellInfo = this.initCellInfo(idx, squareCellInfo.num);
        cellInfo.prevStatus = this.getCandidateStatus(candidates, cellInfo);

        if (this.isInCellInfoArray(squareIndices, idx)) {
          cellInfo.status = Config.candidateStatus.exclusiveSquare;

          targetCellInfos.push(cellInfo);
        } else if (this.isNarrowCandidate(cellInfo.prevStatus)) {
          cellInfo.status = Config.candidateStatus.removable;

          unTargetCellInfos.push(cellInfo);
        }
      }
    }

    if (isSkipIneffective && unTargetCellInfos.length === 0) {
      // continue;
      return [candidates, []];
    }

    // console.log("targetCellInfos");
    // console.log(targetCellInfos);

    for (let cellInfo of targetCellInfos) {
      candidates = this.assignExclusiveSquare2Candidates(candidates, cellInfo);
    }

    // console.log("unTargetCellInfos");
    // console.log(unTargetCellInfos);

    for (let cellInfo of unTargetCellInfos) {
      candidates = this.assignRemovable2Candidates(candidates, cellInfo);

      if (this.isCellAllWideRemoved(candidates, cellInfo.idx)) {
        return null;
      }
    }

    candidateTrace = candidateTrace.concat(targetCellInfos);
    candidateTrace = candidateTrace.concat(unTargetCellInfos);

    return [candidates, candidateTrace];
  }

  static findCandidateSingle(cellInfos) {
    return cellInfos.filter(cellInfo => cellInfo.idxs.length === 1);
  }

  static findSingleCandidateCellsB(
    candidates,
    exclusiveCandidates,
    // helpMode,
    isStepByStep = true
  ) {
    // console.log("inside findSingleCandidateCells");

    let singleCandidateCells = [];

    // breakPoint:
    for (let [r, row] of candidates.entries()) {
      for (let [c, cell] of row.entries()) {
        if (
          cell.filter(cand => Config.wideSelectedList.includes(cand)).length > 0
        ) {
          continue;
        }

        if (
          cell.filter(cand => Config.narrowCandidateList.includes(cand))
            .length === 1
        ) {
          const idxs = Config.narrowCandidateList
            .map(status => cell.indexOf(status))
            .filter(idx => idx >= 0);

          if (idxs.length === 1) {
            const i = idxs.pop();

            const targetCellInfo = this.initCellInfo(
              this.initCellIdx(r, c),
              this.i2n(i),
              Config.candidateStatus.selectable
            );

            if (
              !this.isInExclusiveCandidates(exclusiveCandidates, targetCellInfo)
            ) {
              singleCandidateCells.push(targetCellInfo);
              // exclusiveCandidates.push(targetCellInfo);

              if (
                isStepByStep &&
                Config.stepByStepLevels.includes(
                  Config.candidateTypes.singleCandidate
                )
              ) {
                return singleCandidateCells;
              }
            }
          }
        }
      }
    }

    return singleCandidateCells;
  }

  static isInsoluble(candidates) {
    const allIdxs = this.getAllCellIndicies();

    for (let idx of allIdxs) {
      if (this.isCellAllWideRemoved(candidates, idx)) {
        return true;
      }
    }
    return false;
  }

  static findExclusiveCandidateUnionA(
    candidates,
    exclusiveCandidates,
    unionSize = 2,
    isStepByStep = true
  ) {
    // console.log("inside findExclusiveCandidateUnionA");
    // console.log("unionSize: ", unionSize);

    // union size 2 finds 2 cells with the same two candidates //
    // such as [5, 7] and [5, 7] from cells with 2 remaining candidates //
    // union size 3 finds 3 cells with three candidates //
    // such as [1, 4, 8], [1, 4], [4, 8] from cells with 2 or 3 remaining candidates //

    let unionCells = [];
    const candNumMatrix = this.getCandidateNumMatrix(candidates);
    const idxArray = this.getIndexSequence();

    // candLengths [2] for unionSize 2, [2,3] for unionSize 3
    const candLengths = this.getIndexSequence(unionSize - 1).map(i => i + 2);

    for (let type of Config.restrictionTypesArray) {
      for (let rcbIdx of idxArray) {
        let cellIndices = this.getCandidateCellIndices(
          candidates,
          rcbIdx,
          type
        );

        cellIndices = cellIndices.filter(idx =>
          candLengths.includes(candNumMatrix[idx.r][idx.c].length)
        );

        if (cellIndices.length >= unionSize) {
          let cellInfoArray = cellIndices.map(idx => {
            return {
              nums: candNumMatrix[idx.r][idx.c],
              idx: idx
            };
          });

          const candIdxArray = this.getIndexSequence(cellInfoArray.length);
          for (let unionIdxs of k_combinations(candIdxArray, unionSize)) {
            const idxs = unionIdxs.map(i => cellInfoArray[i].idx);
            if (type === "blk" && this.isInSameRowCol(idxs)) {
              continue;
            }

            const numsUnion = this.getUnionNumbers(
              unionIdxs.map(i => cellInfoArray[i].nums)
            );

            if (numsUnion.length === unionSize) {
              const unionCell = {
                nums: numsUnion,
                idxs: idxs,
                type: type,
                rcbIdx: rcbIdx
              };

              if (
                isStepByStep &&
                Config.stepByStepLevels.includes(
                  Config.candidateLevelTypes.level4
                ) &&
                !this.isInExclusiveCandidates(exclusiveCandidates, unionCell)
              ) {
                return [unionCell];
              }

              unionCells.push(unionCell);
            }
          }
        }
      }
    }

    return unionCells;
  }

  // set status for the very cell //
  static updateCandidateOfTheCell(
    candidates,
    cellInfo,
    // level = 1,
    processType = Config.processTypes.insertion
  ) {
    // console.log("inside updateCandidateOfTheCell");

    let indexArray = [];
    let selectStatus = Config.candidateStatus.candidate;
    let removeStatus = Config.candidateStatus.candidate;
    let candidateTrace = [];

    // set candidate types depending on the action type //
    if (processType === Config.processTypes.insertion) {
      selectStatus = Config.candidateStatus.selected;
      removeStatus = Config.candidateStatus.removed;
    } else {
      selectStatus = Config.candidateStatus.selectable;
      if (
        [
          Config.processTypes.candidates,
          Config.processTypes.singleNum
        ].includes(processType)
      ) {
        removeStatus = Config.candidateStatus.removable;
      }
    }

    if (processType === Config.processTypes.singleNum) {
      indexArray.push(Util.n2i(cellInfo.num));
    } else {
      indexArray = this.getIndexSequence();
    }

    for (let i of indexArray) {
      const targetCellInfo = Util.initCellInfo(cellInfo.idx, Util.i2n(i));

      if (cellInfo.num === Util.i2n(i)) {
        let targetCellInfo = this.initCellInfo(
          cellInfo.idx,
          cellInfo.num,
          selectStatus
        );

        targetCellInfo.prevStatus = this.getCandidateStatus(
          candidates,
          cellInfo
        );
        candidates = Util.assignStatus2Candidates(
          candidates,
          cellInfo,
          selectStatus
        );

        candidateTrace.push(targetCellInfo);
      } else {
        const prevStatus = Util.getCandidateStatus(candidates, targetCellInfo);

        if (!Util.isRemoved(prevStatus)) {
          candidates = Util.assignStatus2Candidates(
            candidates,
            targetCellInfo,
            removeStatus
          );

          targetCellInfo.status = removeStatus;
          targetCellInfo.prevStatus = prevStatus;
          candidateTrace.push(targetCellInfo);
        }
      }
    }

    return [candidates, candidateTrace];
  }

  static updateRelatedCells(
    candidates,
    cellInfo,
    level = 1,
    processType = Config.processTypes.insertion
  ) {
    // console.log("inside updateRelatedCells");

    let candidateTrace = [];

    if (level === 0) {
      return [candidates, candidateTrace];
    }

    const removeStatus =
      processType === Config.processTypes.insertion
        ? Config.candidateStatus.removed
        : Config.candidateStatus.removable;

    const relatedIndices = this.getSingleNumCandidateCells(
      candidates,
      cellInfo.num,
      this.getRelatedIndicesBesidesItself(cellInfo.idx),
      processType
    );

    for (let idx of relatedIndices) {
      let targetCellInfo = this.initCellInfo(idx, cellInfo.num, removeStatus);
      targetCellInfo.prevStatus = Util.getCandidateStatus(
        candidates,
        targetCellInfo
      );

      candidates = Util.assignStatus2Candidates(
        candidates,
        Util.initCellInfo(idx, cellInfo.num),
        removeStatus
      );

      if (this.isCellAllWideRemoved(candidates, idx)) {
        return [null, null];
      }

      candidateTrace.push(targetCellInfo);
    }

    return [candidates, candidateTrace];
  }

  static updateCandidates(dataset, cellInfo, candidateLevel) {
    let { candidates } = dataset;

    let candidateTrace = [];
    let candidateTraceTmp = [];

    [candidates, candidateTrace] = this.updateCandidateOfTheCell(
      candidates,
      cellInfo
    );

    [candidates, candidateTraceTmp] = this.updateRelatedCells(
      candidates,
      cellInfo,
      candidateLevel,
      Config.processTypes.insertion
    );

    // There is a cell full of wide-removed //
    if (candidates === null) {
      return null;
    }

    if (candidateTraceTmp.length > 0) {
      candidateTrace = candidateTrace.concat(candidateTraceTmp);
    }

    if (candidateTrace.length > 0) {
      dataset.trace.push(
        this.initTraceItemCandidate(candidateTrace, Config.operationTypes.auto)
      );
    }

    return dataset;
  }

  static flipCandidateStatus(candidates, cellInfo) {
    const status = this.getCandidateStatus(candidates, cellInfo);

    cellInfo.prevStatus = status;
    if (status !== Config.candidateStatus.removed) {
      cellInfo.status = Config.candidateStatus.removed;
      candidates = this.assignRemoved2Candidates(candidates, cellInfo);
    } else {
      cellInfo.status = Config.candidateStatus.candidate;
      candidates = this.assignCandidate2Candidates(candidates, cellInfo);
    }

    return [candidates, cellInfo];
  }

  static isSelected(candidateStatus) {
    return Config.selectedList.includes(candidateStatus);
  }

  static hasSelected(candidates, idx) {
    return this.getCandidateStatusArray(candidates, idx).reduce(
      (having, status) => having || this.isSelected(status),
      false
    );
  }

  static isWideSelected(candidateStatus) {
    return Config.wideSelectedList.includes(candidateStatus);
  }

  static isWideSelectedInStatuses(statuses) {
    return statuses.reduce(
      (isSelected, status) => this.isWideSelected(status) || isSelected,
      false
    );
  }

  static isWideSelectedInCell(candidates, idx) {
    return this.isWideSelectedInStatuses(
      this.getCandidateStatusArray(candidates, idx)
    );
  }

  static isStatusesAllNarrowCandidates(statuses) {
    return statuses.reduce(
      (isCandidates, status) => this.isNarrowCandidate(status) && isCandidates,
      true
    );
  }

  static isStatusesAllWideRemoved(statuses) {
    return statuses.reduce(
      (isRemoved, status) => this.isWideRemoved(status) && isRemoved,
      true
    );
  }

  static isCellAllWideRemoved(candidates, idx) {
    return this.countWideRemoved(candidates, idx) === Config.size;
  }

  static isCellsAllWideRemoved(candidates, idxs) {
    return idxs.reduce(
      (isWrong, idx) => this.isCellAllWideRemoved(candidates, idx) || isWrong,
      false
    );
  }

  static isLastCandidate(candidates, cellInfo) {
    return (
      this.countCandidates(candidates, cellInfo.idx) === 1 &&
      this.isCandidate(this.getCandidateStatus(candidates, cellInfo))
    );
  }

  static isWideCandidate(candidateStatus) {
    return Config.wideCandidateList.includes(candidateStatus);
  }

  static isNarrowCandidate(candidateStatus) {
    return Config.narrowCandidateList.includes(candidateStatus);
  }

  static isCandidate(candidateStatus) {
    // console.log("inside isCandidate");

    return Config.candidateList.includes(candidateStatus);
  }

  static isNarrowSelected(status) {
    return status === Config.candidateStatus.selected;
  }

  static isSelectable(status) {
    return status === Config.candidateStatus.selectable;
  }

  static isSelectableCell(candidates, idx) {
    const statuses = this.getCandidateStatusArray(candidates, idx);
    return statuses.includes(Config.candidateStatus.selectable);
  }

  static isRemovable(status) {
    return status === Config.candidateStatus.removable;
  }

  static isRemoved(status) {
    return status === Config.candidateStatus.removed;
  }

  static isWideRemoved(status) {
    return Config.wideRemovedList.includes(status);
  }

  static isExclusiveSingle(status) {
    return status === Config.candidateStatus.exclusiveSingle;
  }

  static isExclusiveDouble(status) {
    return status === Config.candidateStatus.exclusiveDouble;
  }

  static isExclusiveTriple(status) {
    return status === Config.candidateStatus.exclusiveTriple;
  }

  static isExclusiveQuadruple(status) {
    return status === Config.candidateStatus.exclusiveQuadruple;
  }

  static isExclusiveMultiple(status) {
    return Config.exclusiveMultiples.includes(status);
  }

  static isExclusiveDoubleOrTriple(status) {
    return this.isExclusiveDouble(status) || this.isExclusiveTriple(status);
  }

  static isExclusiveSquare(status) {
    return status === Config.candidateStatus.exclusiveSquare;
  }

  static isAssumptionTest(status) {
    return status === Config.candidateStatus.assumptionTest;
  }

  static isWideExclusiveCandidate(status) {
    return Config.wideExclusiveStatuses.includes(status);
  }

  static isCandidateWithoutRemovable(candidate) {
    const candidateUpper = candidate.toUpperCase();
    const statusCandidateUpper = Config.candidateStatus.candidate.toUpperCase();
    const statusSelectable = Config.candidateStatus.selectable;
    const statusRemovable = Config.candidateStatus.removable;

    return (
      (candidateUpper.includes(statusCandidateUpper) &&
        candidate !== statusRemovable) ||
      candidate === statusSelectable
    );
  }

  static isSelectableCellInfo(cellInfo) {
    return cellInfo.status === Config.candidateStatus.selectable;
  }

  static isRemovableCellInfo(cellInfo) {
    return cellInfo.status === Config.candidateStatus.removable;
  }

  static getNarrowCandidateNums(candidates, idx) {
    const nums = this.getNsequence();

    return nums.filter(num =>
      this.isNarrowCandidate(
        this.getCandidateStatus(candidates, this.initCellInfo(idx, num))
      )
    );
  }

  static getCandidateNums(candidates, idx) {
    const statusArray = this.getCandidateStatusArray(candidates, idx);

    let candNums = [];
    for (let [i, status] of statusArray.entries()) {
      if (this.isCandidate(status)) {
        candNums.push(this.i2n(i));
      }
    }

    return candNums;
  }

  static getWideCandidateNums(candidates, idx) {
    const nums = this.getNsequence();

    return nums.filter(num =>
      this.isWideCandidate(
        this.getCandidateStatus(candidates, this.initCellInfo(idx, num))
      )
    );
  }

  // not used? //
  static getCandidateIndicesFromCandidateArray(candidateArray) {
    const idxArray = this.getIndexSequence();
    return idxArray.filter(i => this.isCandidate(candidateArray[i]));
  }

  // not used? //
  static getCandidateIndicesFromCandidateArrayExcludingRemovable(
    candidateArray
  ) {
    const idxArray = this.getIndexSequence();
    return idxArray.filter(i =>
      this.isCandidateWithoutRemovable(candidateArray[i])
    );
  }

  static extractCellInfoFromCandidate(candidates, num, cellIndices) {
    // console.log("inside extractCellInfoFromCandidate");

    const filteredCellIndices = cellIndices.filter(idx =>
      this.isNarrowCandidate(
        this.getCandidateStatus(candidates, this.initCellInfo(idx, num))
      )
    );

    if (filteredCellIndices.length === 0) {
      return null;
    }

    return this.initCellInfo(filteredCellIndices, num);
  }

  // not used? //
  static extractCellInfoFromCandidateExcludingRemovable(
    candidates,
    num,
    cellIndices
  ) {
    const filteredCellIndices = cellIndices.filter(idx =>
      this.isCandidateWithoutRemovable(candidates[idx.r][idx.c][num - 1])
    );

    if (filteredCellIndices.length === 0) {
      return null;
    }
    return { num: num, idxs: filteredCellIndices };
  }

  // seems not used //
  static getSelectableCandidate4Num(candidates, num, cellIndices) {
    // console.log("inside getSelectableCandidate4Num");

    const cellInfo = this.extractCellInfoFromCandidate(
      candidates,
      num,
      cellIndices
    );

    if (cellInfo !== null && cellInfo.idxs.length === 1) {
      return {
        idx: cellInfo.idxs[0],
        num: num
      };
    }
    return null;
  }

  // Seems not used //
  static updateCandidates4Selectable(candidates, cellInfo) {
    // console.log("updateCandidates4Selectable is called");

    if (cellInfo !== null) {
      for (let i of this.getIndexSequence()) {
        if (i === cellInfo.num - 1) {
          candidates[cellInfo.idx.r][cellInfo.idx.c][i] =
            Config.candidateStatus.selectable;
        } else if (
          candidates[cellInfo.idx.r][cellInfo.idx.c][i] !==
          Config.candidateStatus.removed
        ) {
          candidates[cellInfo.idx.r][cellInfo.idx.c][i] =
            Config.candidateStatus.removable;
        }
      }
    }

    return candidates;
  }

  static getSingleNumCandidateCells(
    candidates,
    num,
    cellIndices,
    processType = Config.processTypes.insertion
  ) {
    // console.log("inside getSingleNumCandidateCells");

    let candidateCells = [];

    for (let idx of cellIndices) {
      const status = this.getCandidateStatus(
        candidates,
        this.initCellInfo(idx, num)
      );

      if (processType === Config.processTypes.insertion) {
        if (this.isSelected(status)) {
          return [];
        } else if (this.isWideCandidate(status)) {
          candidateCells.push(idx);
        }
      } else {
        if (this.isWideSelected(status)) {
          return [];
        } else if (this.isNarrowCandidate(status)) {
          candidateCells.push(idx);
        }
      }
    }

    return candidateCells;
  }

  static setRelatedCandidatesBySingleMark(
    candidates,
    markerInfo,
    markerNums = null
  ) {
    // console.log("inside setRelatedCandidatesBySingleMark");

    let candidateTrace = [];
    let markerTrace = [];

    const num = markerInfo.num;

    let cellIndices = this.getRelatedCellIndicesByMarkerIdx(
      markerInfo.idx,
      candidates
    );

    for (let idx of cellIndices) {
      const targetCellInfo = this.initCellInfo(idx, num);
      targetCellInfo.prevStatus = this.getCandidateStatus(
        candidates,
        targetCellInfo
      );

      if (!this.isNarrowCandidate(targetCellInfo.prevStatus)) {
        continue;
      }

      // if ( this.isNarrowCandidate( targetCellInfo.prevStatus ) ) {

      candidates = this.assignRemovable2Candidates(candidates, targetCellInfo);

      targetCellInfo.status = Config.candidateStatus.removable;

      candidateTrace.push(targetCellInfo);

      // find selectable type A //
      if (markerNums !== null) {
        let markerTraceTmp = null;

        [markerNums, markerTraceTmp] = this.setSelectableA2MarkerNums(
          markerNums,
          candidates,
          this.initCellInfo(idx, num)
        );

        if (markerTraceTmp) {
          markerTrace = markerTrace.concat(markerTraceTmp);
        }
      }

      // find selectable type B //
      let markerTraceTmp = null;
      [markerNums, markerTraceTmp] = this.setSelectableB2MarkerNums(
        markerNums,
        candidates,
        idx
      );

      if (markerTraceTmp) {
        markerTrace = markerTrace.concat(markerTraceTmp);
      }
      // }
    }

    return [candidates, markerNums, candidateTrace, markerTrace];
  }

  static setSelectableA2MarkerNums(markerNums, candidates, cellInfo) {
    // console.log("inside setSelectableA2MarkerNums");

    let markerTrace = [];
    const num = cellInfo.num;
    const relatedMarkerIdxs = this.getMarkerIdxsFromCellIdx(cellInfo.idx);

    for (let relatedMarkerIdx of relatedMarkerIdxs) {
      const relatedMarkerInfo = this.initMarkerInfo(relatedMarkerIdx, num);

      if (!this.isTheNumInMarker(markerNums, relatedMarkerInfo)) {
        continue;
      }

      // if (this.isTheNumInMarker(markerNums, relatedMarkerInfo)) {

      let concerningCellIdxs = this.getTargetCellIndicesByMarkerIdx(
        relatedMarkerIdx,
        candidates
      );

      let concerningCellInfos = concerningCellIdxs.map(idx =>
        this.initCellInfo(idx, num)
      );

      if (this.countNumInCandidates(candidates, concerningCellInfos) !== 1) {
        continue;
      }

      // if (this.countNumInCandidates(candidates, concerningCellInfos) === 1) {

      relatedMarkerInfo.prevStatus = this.getMarkerStatus(
        markerNums,
        relatedMarkerIdx
      );
      relatedMarkerInfo.status = Config.candidateStatus.selectable;

      markerNums = this.assignSelectable2MarkerNums(
        markerNums,
        relatedMarkerInfo
      );

      markerTrace.push(relatedMarkerInfo);
      // }
      // }
    }

    return [markerNums, markerTrace];
  }

  static setSelectableB2MarkerNums(markerNums, candidates, cellIdx) {
    let markerTrace = [];
    const selectableNum = this.getSelectableNum(candidates, cellIdx);

    if (markerNums === null || selectableNum === null) {
      return [markerNums, markerTrace];
    }

    // if (markerNums !== null && selectableNum !== null) {

    const relatedMarkerIdxs = this.getMarkerIdxsFromCellIdx(cellIdx);

    for (let relatedMarkerIdx of relatedMarkerIdxs) {
      const relatedMarkerInfo = this.initMarkerInfo(
        relatedMarkerIdx,
        selectableNum
      );

      if (!this.isTheNumInMarker(markerNums, relatedMarkerInfo)) {
        continue;
      }

      // if (this.isTheNumInMarker(markerNums, relatedMarkerInfo)) {

      relatedMarkerInfo.prevStatus = this.getMarkerStatus(
        markerNums,
        relatedMarkerIdx
      );
      relatedMarkerInfo.status = Config.candidateStatus.selectable;

      markerNums = this.assignSelectable2MarkerNums(
        markerNums,
        relatedMarkerInfo
      );

      markerTrace.push(relatedMarkerInfo);
      // }
    }
    // }

    return [markerNums, markerTrace];
  }

  static setRelatedCandidatesByMultipleMarks(
    candidates,
    markerNums,
    markerInfo
  ) {
    // console.log("inside setRelatedCandidatesByMultipleMarks");

    let candidateTrace = [];
    let markerTrace = [];

    const markerIdx = markerInfo.idx;
    const assignedNums = this.getNumsFromMarkerNums(markerNums, markerIdx);

    if (assignedNums.length < 2) {
      return [candidates, markerNums];
    }

    let concernedCellIdxs = this.getTargetCellIndicesByMarkerIdx(
      markerIdx,
      candidates
    );
    let targetCellIdxs = [];

    if (assignedNums.length === 2 && concernedCellIdxs.length === 3) {
      targetCellIdxs = concernedCellIdxs.filter(idx =>
        assignedNums.reduce(
          (isNumInCell, num) =>
            this.isNarrowCandidate(
              this.getCandidateStatus(candidates, this.initCellInfo(idx, num))
            ) || isNumInCell,
          false
        )
      );
    } else {
      targetCellIdxs = concernedCellIdxs;
    }

    if (assignedNums.length === targetCellIdxs.length) {
      const removableNums = this.getNsequence().filter(
        num => !assignedNums.includes(num)
      );

      for (let num of removableNums) {
        for (let idx of targetCellIdxs) {
          const cellInfo = this.initCellInfo(idx, num);
          const status = this.getCandidateStatus(candidates, cellInfo);

          if (!this.isNarrowCandidate(status)) {
            continue;
          }

          // if (this.isNarrowCandidate(status)) {

          cellInfo.prevStatus = status;
          cellInfo.status = Config.candidateStatus.removable;

          candidates = this.assignRemovable2Candidates(candidates, cellInfo);

          candidateTrace.push(cellInfo);
          // }
        }
      }

      markerInfo.nums = assignedNums;

      markerInfo.prevStatuses = [];
      for (let num of markerInfo.nums) {
        const tmpMarkerInfo = this.initMarkerInfo(markerInfo.idx, num);
        const idx = this.findNumInMarker(markerNums, tmpMarkerInfo);

        if (idx) {
          tmpMarkerInfo.idx = idx;
          markerInfo.prevStatuses.push(this.getMarkerStatus(markerNums, idx));
        } else {
          markerInfo.prevStatuses.push(null);
        }
      }

      if (assignedNums.length === 2) {
        markerNums = this.assignExclusiveDouble2MarkerNums(
          markerNums,
          markerInfo
        );

        markerInfo.status = Config.candidateStatus.exclusiveDouble;
      } else {
        markerNums = this.assignExclusiveTriple2MarkerNums(
          markerNums,
          markerInfo
        );

        markerInfo.status = Config.candidateStatus.exclusiveTriple;
      }

      markerTrace.push(markerInfo);
    } else {
      const doubleExclusiveCellIdxs = targetCellIdxs.filter(idx =>
        this.isTwoArraysSame(
          assignedNums,
          this.getWideCandidateNums(candidates, idx)
        )
      );

      if (doubleExclusiveCellIdxs.length === 2) {
        markerInfo.nums = assignedNums;

        markerInfo.prevStatuses = [];
        for (let num of markerInfo.nums) {
          const tmpMarkerInfo = this.initMarkerInfo(markerInfo.idx, num);
          const idx = this.findNumInMarker(markerNums, tmpMarkerInfo);

          if (idx) {
            tmpMarkerInfo.idx = idx;
            markerInfo.prevStatuses.push(this.getMarkerStatus(markerNums, idx));
          } else {
            markerInfo.prevStatuses.push(null);
          }
        }

        markerNums = this.assignExclusiveDouble2MarkerNums(
          markerNums,
          markerInfo
        );

        markerInfo.status = Config.candidateStatus.exclusiveDouble;

        markerTrace.push(markerInfo);

        if (concernedCellIdxs.length === 3) {
          const unTargetIdxs = concernedCellIdxs.filter(
            idx => !this.isIdxInDuplicates(doubleExclusiveCellIdxs, idx)
          );

          if (unTargetIdxs.length === 1) {
            for (let num of assignedNums) {
              const cellInfo = this.initCellInfo(unTargetIdxs[0], num);
              const status = this.getCandidateStatus(candidates, cellInfo);
              if (this.isNarrowCandidate(status)) {
                cellInfo.prevStatus = status;
                cellInfo.status = Config.candidateStatus.removable;

                candidates = this.assignRemovable2Candidates(
                  candidates,
                  cellInfo
                );

                candidateTrace.push(cellInfo);
              }
            }
          }
        }
      }
    }

    // a case that two nums form double exclusive //
    if (assignedNums.length === 3) {
      let targetCellInfos4nums = assignedNums.map(num => {
        return {
          idxs: targetCellIdxs.filter(idx =>
            this.isNarrowCandidate(
              this.getCandidateStatus(candidates, this.initCellInfo(idx, num))
            )
          ),
          num: num
        };
      });

      const targetCellInfos4nums2 = targetCellInfos4nums.filter(
        cellInfo => cellInfo.idxs.length === 2
      );

      if (
        targetCellInfos4nums2.length === 2 &&
        this.isTwoIdxSetsSame(
          targetCellInfos4nums2[0].idxs,
          targetCellInfos4nums2[1].idxs
        )
      ) {
        markerInfo.nums = targetCellInfos4nums2.map(cellInfo => cellInfo.num);

        markerInfo.prevStatuses = [];
        for (let num of markerInfo.nums) {
          const tmpMarkerInfo = this.initMarkerInfo(markerInfo.idx, num);
          const idx = this.findNumInMarker(markerNums, tmpMarkerInfo);

          if (idx) {
            tmpMarkerInfo.idx = idx;
            markerInfo.prevStatuses.push(this.getMarkerStatus(markerNums, idx));
          } else {
            markerInfo.prevStatuses.push(null);
          }
        }

        markerNums = this.assignExclusiveDouble2MarkerNums(
          markerNums,
          markerInfo
        );

        markerInfo.status = Config.candidateStatus.exclusiveDouble;

        markerTrace.push(markerInfo);
      }

      const targetCellInfos = targetCellIdxs.map(idx => {
        return {
          idx: idx,
          nums: assignedNums.filter(num =>
            this.isNarrowCandidate(
              this.getCandidateStatus(candidates, this.initCellInfo(idx, num))
            )
          )
        };
      });

      const selectableCellInfos = targetCellInfos.filter(
        cellInfo => cellInfo.nums.length === 1
      );

      for (let selectableCellInfo of selectableCellInfos) {
        markerInfo.nums = selectableCellInfo.nums;

        markerNums = this.assignSelectable2MarkerNums(markerNums, markerInfo);

        const removableCellIdxs = targetCellIdxs.filter(
          idx => !this.isTwoIdxsSame(selectableCellInfo.idx, idx)
        );

        for (let idx of removableCellIdxs) {
          const cellInfo = this.initCellInfo(idx, selectableCellInfo.nums[0]);
          const status = this.getCandidateStatus(candidates, cellInfo);

          if (!this.isNarrowCandidate(status)) {
            continue;
          }

          // if (this.isNarrowCandidate(status)) {
          cellInfo.prevStatus = status;
          cellInfo.status = Config.candidateStatus.removable;

          candidates = this.assignRemovable2Candidates(candidates, cellInfo);

          candidateTrace.push(cellInfo);
          // }
        }
      }
    }

    return [candidates, markerNums, candidateTrace, markerTrace];
  }

  static isNewStatusHigher(oldStatus, newStatus) {
    return (
      Config.narrowCandidateList.indexOf(oldStatus) <
      Config.narrowCandidateList.indexOf(newStatus)
    );
  }

  static isSingleNumCandidateCell(appearanceMatrix, idx) {
    return [
      Config.candidateStatus.candidate,
      Config.candidateStatus.exclusive
    ].includes(appearanceMatrix[idx.r][idx.c]);
  }

  static isInExclusiveCandidates(exclusiveCandidates, targetCellInfo) {
    return this.isInCellInfoArray(exclusiveCandidates, targetCellInfo);
  }

  static isInCellInfoArray(cellInfoArray, targetCellInfo) {
    for (let cellInfo of cellInfoArray) {
      if (this.isTwoIdxsSame(cellInfo, targetCellInfo)) {
        return true;
      }
    }
    return false;
  }

  static isInCellInfoArrayIgnoringRCBInfo(cellInfoArray, targetCellInfo) {
    let ary = [];
    let target = {};
    const removingKeys = ["rcbIdx", "type"];
    if (Object.keys(targetCellInfo).includes("rcbIdx")) {
      target = this.deepCopy(targetCellInfo);
      removingKeys.forEach(keyName => delete target[keyName]);

      ary = this.deepCopy(cellInfoArray);
      ary.forEach(item =>
        removingKeys.forEach(keyName => delete item[keyName])
      );
    } else {
      target = targetCellInfo;
      ary = cellInfoArray;
    }

    for (let cellInfo of ary) {
      if (this.isTwoIdxsSame(cellInfo, target)) {
        return true;
      }
    }
    return false;
  }

  static isInExclusiveSquareCandidates(exSquares, cellInfo) {
    const targetIdxs = this.flattenMatrix2Array(cellInfo.idxsArray);

    for (let exSquare of exSquares) {
      const idxs = this.flattenMatrix2Array(exSquare.idxsArray);

      if (
        targetIdxs.reduce(
          (isSame, tIdx) => this.isInCellInfoArray(idxs, tIdx) && isSame,
          true
        )
      ) {
        return true;
      }
    }
    return false;
  }

  static convertRemovable2Removed(candidates) {
    // console.log("inside: convertRemovable2Removed");

    return candidates.map(row =>
      row.map(cell =>
        cell.map(status =>
          status === Config.candidateStatus.removable
            ? Config.candidateStatus.removed
            : status
        )
      )
    );
  }

  static removeNullsFromArray(ary) {
    return ary.filter(x => x !== null);
  }

  static removeNullsFromNumbersWithIndex(ary) {
    return ary.filter(x => x.num !== null);
  }

  static removeNullsFromCellInfo(cellInfoArray) {
    return cellInfoArray.filter(x => x.num !== null);
  }

  static convertShortBRC(type) {
    return Config.restrictionTypesShort[type];
  }

  static convertLingBRC(rcType) {
    return Config.invBRC[rcType];
  }

  static flipRowCol(rc) {
    return rc === "row" ? "col" : "row";
  }

  static flipRCType(rcType) {
    return rcType === "r" ? "c" : "r";
  }

  static getUnionSizes(max = Config.maxUnionSize) {
    return this.getIndexSequence(max - 1).map(i => i + 2);
  }

  static getRCTypeFromCellInfo(cellInfo) {
    for (let rcType of Config.restrictionTypesStraightShortArray) {
      if (cellInfo.rcbTypes[rcType]) {
        return rcType;
      }
    }

    return null;
  }

  static convertRCType2Direction(rcType) {
    return Config.invBRC[rcType];
  }

  static getFirstLetter(s) {
    return s.slice(0, 1);
  }

  static getLastLetter(s) {
    return s.slice(-1);
  }

  static removeLastLetter(s) {
    return s.slice(0, s.length - 1);
  }

  static getCellNumClass(num, appearance = null, isSubCell = false) {
    let clsName = "";
    if (num !== null) {
      if (isSubCell) {
        clsName = Config.panelClassNames.cellNum + num;
      } else {
        clsName = Config.candidateStatus.selected + num;
      }
    }

    if (appearance !== null) {
      if (appearance.includes(Config.candidateStatus.inhibited)) {
        clsName = appearance;
      } else {
        clsName += this.capitalize(appearance);
      }
    }

    return clsName;
  }

  static getCandidateLevelTitle(level) {
    return this.capitalize(level.slice(0, 1) + level.slice(-1));
  }

  static getLevelNum(level) {
    if (Config.candidateControlArray.includes(level)) {
      return level;
    }
    return parseInt(level.slice(-1));
  }

  static getLevelNumFromFunctionName(functionName) {
    return Config.candidateLevelTypesArray.indexOf(functionName);
  }

  static getSingleNumBtnId(level) {
    return Config.buttonIds.singleNumButton + Util.capitalize(level);
  }

  // warned not use eval //
  // static fillBlockIdTemplate = function(templateString, n) {
  //   // return new Function("return `" + templateString + "`;").call(n);
  //   return eval("`" + templateString + "`");
  // };

  // not work nicely as I expected
  // static interpolate = function(template, ...expressions) {
  //   return template.reduce((accumulator, part, i) => {
  //     return accumulator + expressions[i - 1] + part;
  //   });
  // };

  static appendNum(str, num) {
    return str + num;
  }

  static getUnionNumbers(numSet) {
    const numsArray = this.flattenMatrix2Array(numSet);
    return this.removeDuplicatedNumbers(numsArray).sort();
  }

  static getUnionIndices(idxSet) {
    const idxsArray = idxSet.reduce((ary, idxs) => ary.concat(idxs), []);
    return this.removeDuplicatedIndices(idxsArray);
  }

  static getCandidateLevelId(level) {
    return Config.buttonIds.candidateLevels + this.capitalize(level);
  }

  static getControlId(type) {
    return Config.buttonIds.controls + this.capitalize(type);
  }

  static capitalize(str) {
    if (str !== null && str.length > 0) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    return null;
  }

  static decapitalize(str) {
    if (str !== null && str.length > 0) {
      return str.charAt(0).toLowerCase() + str.slice(1);
    }
    return null;
  }

  static flattenMatrix2Array(m) {
    return Array.prototype.concat.apply([], m);
  }

  static convNumMatrix2CSV(numMatrix) {
    const numMatrix0 = this.convNull2Zero(numMatrix);
    const lines = numMatrix0.map(row => row.join(","));
    let data = "";

    for (let line of lines) {
      data += line + "\n";
    }

    return data;
  }

  static deepCopy(org) {
    return JSON.parse(JSON.stringify(org));
  }

  // Function to download data to a file
  static download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function() {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  // static saveFile(text, filename) {
  //   // var text = $("#textarea").val();
  //   // var filename = $("#input-fileName").val()
  //   var blob = new Blob( [text], { type: "text/plain;charset=utf-8" } );
  //   saveAs(blob, filename + ".txt");
  // }
}

export default Util;
