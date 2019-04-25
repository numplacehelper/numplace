class Config {
  static lang = {
    en: "en",
    ja: "ja"
  };

  static size = 9;
  static sizeB = 3;
  static numCells = Math.pow(Config.size, 2);

  static maxLoopNum = 20;
  static maxUnionSize = 4;
  static maxSquareNum = 4;

  // static footerClassName = "App-footer";

  static traceTypes = {
    numMatrix: "numMatrix",
    candidate: "candidate",
    marker: "marker"
  };

  static traceElementTypes = Object.assign(
    { operation: "operation" },
    Config.traceTypes
  );

  static operationTypes = {
    manual: "manual",
    auto: "auto"
  };

  static candidateTypes = {
    displayCandidates: "displayCandidates",
    removeByInsertedNum: "removeByInsertedNum",
    singleCandidate: "singleCandidate",
    singleExclusive: "singleExclusive",
    multipleExclusive: "multipleExclusive",
    square: "square",
    assumptionTest: "assumptionTest"
  };

  static candidateLevelTypes = {
    level0: Config.candidateTypes.displayCandidates,
    level1: Config.candidateTypes.removeByInsertedNum,
    level2: Config.candidateTypes.singleCandidate,
    level3: Config.candidateTypes.singleExclusive,
    level4: Config.candidateTypes.multipleExclusive,
    level5: Config.candidateTypes.square,
    level6: Config.candidateTypes.assumptionTest
  };

  static candidateLevelTypesArray = [
    Config.candidateTypes.displayCandidates,
    Config.candidateTypes.removeByInsertedNum,
    Config.candidateTypes.singleCandidate,
    Config.candidateTypes.singleExclusive,
    Config.candidateTypes.multipleExclusive,
    Config.candidateTypes.square,
    Config.candidateTypes.assumptionTest
  ];

  static stepByStepLevels = [
    Config.candidateLevelTypes.level2,
    Config.candidateLevelTypes.level3,
    Config.candidateLevelTypes.level4,
    Config.candidateLevelTypes.level5,
    Config.candidateLevelTypes.level6
  ];

  static candidateLevels = [
    "level0",
    "level1",
    "level2",
    "level3",
    "level4",
    "level5",
    "level6"
  ];

  static restrictionTypes = {
    row: "row",
    column: "col",
    col: "col",
    block: "blk",
    blk: "blk"
  };

  static restrictionTypesShort = {
    row: "r",
    r: "r",
    column: "c",
    col: "c",
    c: "c",
    block: "b",
    blk: "b",
    b: "b"
  };

  static restrictionTypesStraightArray = ["row", "col"];
  static restrictionTypesStraightShortArray = ["r", "c"];
  static restrictionTypesArray = [
    ...Config.restrictionTypesStraightArray,
    "blk"
  ];

  static invBRC = {
    b: Config.restrictionTypes.blk,
    r: Config.restrictionTypes.row,
    c: Config.restrictionTypes.col
  };

  static mode = {
    set: "set",
    play: "play"
  };

  static helpMode = {
    none: "none",
    singleNum: "singleNum",
    candidates: "candidates",
    both: "both",
    multipleNums: "multipleNums"
  };

  static helpModeArray4display = [
    Config.helpMode.singleNum,
    Config.helpMode.candidates
  ];

  static helpModeArray4displayOnMultipleNums = [
    Config.helpMode.multipleNums,
    Config.helpMode.candidates
  ];

  static helpModeArray = [
    ...Config.helpModeArray4display,
    Config.helpMode.none
  ];

  static updateHelpModes = [
    ...Config.helpModeArray4display,
    Config.helpMode.both,
    Config.helpMode.multipleNums
  ];

  static checkMode = {
    none: "none",
    duplicates: "duplicates",
    correctness: "correctness"
  };

  static checkModeArray = [
    Config.checkMode.duplicates,
    Config.checkMode.correctness
  ];

  static processTypes = {
    insertion: "insertion",
    candidates: "candidates",
    singleNum: "singleNum"
  };

  static panelIds = {
    sudokuBoard: "sudokuBoard",
    block: "block",
    cellContainerSuffix: "Container",
    control: "controlPanel",
    helper: "helperPanel",

    numPanelContainer: "numPanelContainer",
    numPanelWrapper: "numPanelWrap",
    numPanel: "numPanel",
    numPanelCell: "N",
    numPanelControl: "numPanelControl",
    messageWrapper: "messageWrap",

    footer: "footer",
    footerCredit: "footerCredit",

    textForm: "textForm"
  };

  static panelClassNames = {
    block: "block",
    subBlock: "subBlock",
    cell: "cell",
    cellContainer: "cellContainer",
    smallCell: "smallCell",
    subCell: "subCell",
    cellNum: "num",
    control: "controlPanel",
    helper: "controlPanel",
    numPanelWrapper: "float-wrap",
    messageWrapper: "float-wrap-M",

    footer: "App-footer",
    footerCredit: "footerCredit",

    textForm: "textForm"
  };

  static panelTitles = {
    header: {
      en: "Number Place Helper",
      ja: "ナンプレ ヘルパー"
    },
    helper: {
      en: "Helper",
      ja: "ヘルパーパネル"
    },
    control: {
      en: "Game Control",
      ja: "ゲームパネル"
    },
    textForm: "Game Data"
  };

  static buttonIds = {
    // Game control //
    newGame: "newGame",
    sampleGameWrapper: "sampleGameWrapper",
    sampleGameInnerWrapper: "sampleGameInnerWrapper",
    sampleGame: "sampleGame",
    setup: "setup",
    save: "save",
    restart: "restart",

    // Helper //
    check: "check",
    checkWrapper: "checkWrapper",

    singleNum: "singleNumWrapper",
    singleNumRadio: "radio",
    singleNumButton: "singleNumButton",

    multipleNums: "multipleNums",
    multipleNumsLabel: "multipleNumsLabel",
    multipleNumsCheckbox: "multipleNumsCheckbox",

    candidateWrapper: "candidateWrapper",
    candidates: "candidates",
    candidateLevels: "candidateLevels",

    controlButtonWrapper: "controlButtonWrapper",
    controls: "controls",
    controlLabelSkipIneffective: "controlLabelSkipIneffective",

    marker: "marker",

    lang: "lang",
    help: "help",

    // Number Panel //
    delete: "delete",
    cancel: "cancel"
  };

  static buttonClassNames = {
    // Game control //
    newGame: "controlButton",

    sampleGameFrame: "controlButtonWrapper controlButton",
    sampleGameWrapper: "sampleGameWrapper",
    sampleGameInnerWrapper: "sampleGameInnerWrapper",
    sampleGameButton: "sampleGameButton",

    setup: "controlButton",
    save: "controlButton",
    restart: "controlButton",

    // Helper //
    check: "controlButton",
    checkTitle: "controlTitle",
    checkButton: "sampleGameButton",

    singleNumTitle: "controlTitle",
    singleNumContainer: "controlButtonWrapper controlButton",
    singleNumRadioWrapper: "radioWrapper",
    singleNumButtonWrapper: "candidateButtonWrapper",
    singleNumDisabled: "inaccessible",
    singleNumDone: "allDone",
    singleNumExceeding: "exceeding",
    singleNumButton: "sampleGameButton",

    multipleNumsContainer: "controlButtonWrapper controlButton",
    multipleNumsCheckBoxWrapper: "checkBoxWrapper",
    multipleNumsDisabled: "inaccessible",
    multipleNumsDone: "allDone",
    multipleNumsExceeding: "exceeding",

    candidateTitle: "controlTitle",
    candidateContainer: "controlButtonWrapper controlButton",
    candidateButtonWrapper: "candidateButtonWrapper",
    candidates: "controlButton",
    candidateDisabled: "inaccessible",
    candidateButton: "sampleGameButton",

    controlSkipIneffective: "controlCheckbox",
    marker: "controlButton",
    lang: "controlButton",
    help: "controlButton",

    // Number Panel //
    delete: "controlButton",
    cancel: "controlButton"
  };

  static buttonStatus = {
    waiting: "waiting",
    active: "active",
    disabled: "disabled"
  };

  static buttonTitles = {
    // Game control //
    newGame: {
      en: "New Game",
      ja: "新しいゲーム"
    },
    setup: {
      en: "Set & Play",
      ja: "ゲームスタート"
    },
    edit: {
      en: "Edit Game",
      ja: "ゲームを修正する"
    },
    sampleGames: {
      en: "Sample Games",
      ja: "サンプルゲーム"
    },
    restart: {
      en: "Restart",
      ja: "再スタート"
    },
    save: "Save",

    // Helper //
    check: "Check",
    singleNum: "Single Number",
    candidates: "Candidates",
    controls: "Controls",
    marker: {
      en: "Marker",
      ja: "マーカー"
    },
    help: {
      en: "Help",
      ja: "ヘルプ"
    },

    // Number Panel //
    delete: "Delete",
    cancel: "Cancel"
  };

  static langButtonTitles = {
    en: "English",
    ja: "日本語"
  };

  static helpModeButtonIds = {
    container: "helpModeContainer",
    wrapper: "helpModeWrapper",
    title: "helpModeTitle",
    none: "cancelButton",
    candidates: "candidatesButton",
    singleNum: "singleNumButton",
    multipleNums: "singleNumButton"
  };

  static helpModeButtonClassNames = {
    container: "controlButtonWrapper controlButton",
    wrapper: "candidateButtonWrapper",
    title: "controlTitle",
    none: "sampleGameButton",
    candidates: "sampleGameButton",
    singleNum: "sampleGameButton",
    multipleNums: "sampleGameButton"
  };

  static formNames = {
    skipIneffective: "skipIneffective"
  };

  static candidateControls = {
    reset: "reset",
    backward: "backward",
    forward: "forward",
    fastForward: "fastForward",
    select: "select",
    erase: "erase"
  };

  static candidateActiveControls = {
    singleNum: [
      Config.candidateControls.reset,
      Config.candidateControls.backward,
      Config.candidateControls.forward,
      Config.candidateControls.fastForward,
      Config.candidateControls.select
    ],
    candidates: [Object.keys(Config.candidateControls)]
  };

  static candidateControlArray = [
    Config.candidateControls.reset,
    Config.candidateControls.backward,
    Config.candidateControls.forward,
    Config.candidateControls.fastForward,
    Config.candidateControls.select,
    Config.candidateControls.erase
  ];

  static candidateButtonGroupNames = ["levels", "controls"];

  static candidateButtons = [
    ...Config.candidateLevels,
    ...Config.candidateControlArray
  ];

  static candidateStatus = {
    assigned: "assigned",
    selected: "selected",
    selectable: "selectable",
    candidate: "candidate",
    exclusiveSingle: "exclusiveSingleCandidate",
    exclusiveDouble: "exclusiveDoubleCandidate",
    exclusiveTriple: "exclusiveTripleCandidate",
    exclusiveQuadruple: "exclusiveQuadrupleCandidate",
    exclusiveSquare: "exclusiveSquareCandidate",

    assumptionTest: "assumptionTest",

    removable: "removable",
    removed: "removed",

    shadowed: "shadowed",
    weaklyShadowed: "weaklyShadowed",
    inhibited: "inhibited"
  };

  static exclusiveMultiples4marker = [
    Config.candidateStatus.exclusiveDouble,
    Config.candidateStatus.exclusiveTriple
  ];

  static exclusiveTypes4marker = [
    Config.candidateStatus.exclusiveSingle,
    ...Config.exclusiveMultiples4marker
  ];

  static exclusiveMultiples = [
    Config.candidateStatus.exclusiveDouble,
    Config.candidateStatus.exclusiveTriple,
    Config.candidateStatus.exclusiveQuadruple
  ];

  static narrowExclusiveStatuses = [
    Config.candidateStatus.exclusiveSingle,
    ...Config.exclusiveMultiples
  ];

  static exclusiveStatuses = [
    ...Config.narrowExclusiveStatuses,
    Config.candidateStatus.exclusiveSquare,
    Config.candidateStatus.assumptionTest
  ];

  static wideExclusiveStatuses = [
    Config.candidateStatus.selectable,
    ...Config.exclusiveStatuses
  ];

  static selectedList = [
    Config.candidateStatus.assigned,
    Config.candidateStatus.selected
  ];

  static wideSelectedList = [
    ...Config.selectedList,
    Config.candidateStatus.selectable
  ];

  static wideRemovedList = [
    Config.candidateStatus.removable,
    Config.candidateStatus.removed
  ];

  static narrowCandidateList = [
    Config.candidateStatus.candidate,
    Config.candidateStatus.exclusiveSingle,
    Config.candidateStatus.exclusiveDouble,
    Config.candidateStatus.exclusiveTriple,
    Config.candidateStatus.exclusiveQuadruple,
    Config.candidateStatus.exclusiveSquare,
    Config.candidateStatus.assumptionTest
  ];

  static markerRelatedExclusiveTypes = [
    Config.candidateStatus.selectable,
    Config.candidateStatus.exclusiveSingle,
    Config.candidateStatus.exclusiveDouble,
    Config.candidateStatus.exclusiveTriple
  ];

  static candidateList = [
    ...Config.narrowCandidateList,
    Config.candidateStatus.selectable
  ];

  static wideCandidateList = [
    Config.candidateStatus.removable,
    ...Config.candidateList
  ];

  static registered = "registered";
  static duplicated = "duplicated";

  static checkButtonLabels = {
    title: {
      en: "Insertion Check",
      ja: "入力チェック"
    },
    none: {
      en: "Cancel",
      ja: "キャンセル"
    },
    duplicates: {
      en: "Duplicate",
      ja: "重複"
    },
    correctness: {
      en: "Correctness",
      ja: "不正解"
    }
  };

  static checkTitleCaptions = {
    none: {
      en: "Cancel Check Function",
      ja: "チェック機能をオフにする"
    },
    duplicates: {
      en: "Check Duplicates all the time",
      ja: "重複を常時チェック"
    },
    correctness: {
      en: "Check Correctness all the time",
      ja: "正解と一致しない入力を常時チェック"
    }
  };

  static helpModeButtonLabels = {
    title: {
      en: "Helper Functions",
      ja: "ヘルパー機能"
    },
    none: {
      en: "Cancel",
      ja: "キャンセル"
    },
    singleNum: {
      en: "Single Num",
      ja: "単一数表示"
    },
    multipleNums: {
      en: "Multi Nums",
      ja: "複数数表示"
    },
    candidates: {
      en: "Candidates",
      ja: "候補表示"
    },
    skipIneffective: {
      en: "Skip ineffective exclusives",
      ja: "無効な排他的候補を非表示"
    }
  };

  static helpModeCaptions = {
    none: {
      en: "Cancel the current helper function",
      ja: "ヘルパー機能をオフにする"
    },
    singleNum: {
      en: "Shadow numbers other than the selected number",
      ja: "選択された数字のみ表示"
    },
    candidates: {
      en: "Show candidates of cells",
      ja: "候補の表示"
    },
    both: {
      en: "Combine the single number and the candidates functions",
      ja: "単一数表示と候補表示の同時利用"
    },
    multipleNums: {
      en: "Show selected numbers with candidates",
      ja: "複数数表示と候補表示の同時利用"
    }
  };

  static singleNumLevels = ["level0", "level1", "level2", "level3"];

  static singleNumCaptions = {
    level0: {
      en: "Shadow numbers other than the selected number",
      ja: "選択した数字以外を目立たなくする"
    },
    level1: {
      en: "Shadow cells inhibited by the number",
      ja: "すでに盤上にある数字によって選択不可能なセルに影をつける"
    },
    level2: {
      en: "Highlight selectable cells",
      ja: "選択可能なセルを目立たせる"
    },
    level3: {
      en: "Shadow cells constrained by the candidates in other blocks",
      ja: "排他的な候補によって選択不可能なセルに影をつける"
    }
  };

  static candidateLevelCaptions = {
    level0: {
      en: "Show a candidate panel in each cell",
      ja: "候補を表示する"
    },
    level1: {
      en: "Remove candidates inhibited by numbers on other cells",
      ja: "すでに盤上にある数字によって選択不可能な数字を候補から削除する"
    },
    level2: {
      en: "Highlight selectable candidates",
      ja: "選択可能な候補を目立たせる"
    },
    level3: {
      en:
        "Highlight candidates constraining other cells by the selected single number",
      ja: "排他的な単一数候補によって選択不可能なセルからその数字を削除する"
    },
    level4: {
      en: "Highlight candidates constraining other cells by a few numbers",
      ja: "複数の数による排他的候補を目立たせる"
    },
    level5: {
      en: "Highlight square candidates",
      ja: "井桁候補を目立たせる"
    },
    level6: {
      en: "Highlight assumption-test candidates",
      ja: "仮定-試験によって候補から除外される数字を表示する"
    }
  };

  static constrolIconCaptions = {
    reset: {
      en: "Reset",
      ja: "これまでの操作を無効にする"
    },
    backward: {
      en: "Backward",
      ja: "ヘルパー機能による表示をひとつ前に戻す"
    },
    forward: {
      en: "Forward",
      ja: "ヘルパー機能を進める"
    },
    fastForward: {
      en: "Fast forward",
      ja: "ヘルパー機能を可能な限り進める"
    },
    select: {
      en: "Select all selectable candidates",
      ja: "選択可能なセルを全て選択する"
    },
    erase: {
      en: "Remove colors of exclusive candidates",
      ja: "ヘルパー機能による色つけを解除する"
    }
  };

  static candidateControlIconSizes = {
    small: "14px",
    large: "16px"
  };

  static backwardStopCondition = {
    wrongInsertion: "wrongInsertion",
    numInsertion: "numInsertion"
  };

  static result = {
    passed: "passed",
    failed: "failed"
  };

  static messages = {
    success: [
      "Complete!",
      "Perfect!",
      "Excellent!",
      "Incredible!",
      "Phenomenal!",
      "Well done!",
      "Good job!",
      "Great!",
      "Awesome!",
      "Wonderful!",
      "Bravo!",
      "Amazing!",
      "You did it!",
      "You're genius!"
    ],
    failure: "There are some duplicates."
  };

  static alertMessages = {
    duplicates: "There are some duplicates.",
    deadEnd: "A cell with no candidates.",
    wrongQuestion: "This is insoluble."
  };

  static helpPath = "./help/";

  static helpFiles = {
    en: "help_en.html",
    ja: "help_ja.html"
  };

  static dummyMatrix = [
    [1, 2, 3, 4, 5, 6, 7, 8, 9],
    [4, 5, 6, 7, 8, 9, 1, 2, 3],
    [7, 8, 9, 1, 2, 3, 4, 5, 6],
    [2, 3, 4, 5, 6, 7, 8, 9, 1],
    [5, 6, 7, 8, 9, 1, 2, 3, 4],
    [8, 9, 1, 2, 3, 4, 5, 6, 7],
    [3, 4, 5, 6, 7, 8, 9, 1, 2],
    [6, 7, 8, 9, 1, 2, 3, 4, 5],
    [9, 1, 2, 3, 4, 5, 6, null, null]
  ];

  static sampleGameClasses = {
    beginner: "beginner",
    easy: "easy",
    medium: "medium",
    hard: "hard",
    xtreme: "xtreme"
  };

  static sampleGameClassList = [
    Config.sampleGameClasses.beginner,
    Config.sampleGameClasses.easy,
    Config.sampleGameClasses.medium,
    Config.sampleGameClasses.hard,
    Config.sampleGameClasses.xtreme
  ];

  static sampleGameTitles = {
    beginner: {
      en: "Beginner",
      ja: "初心者"
    },
    easy: {
      en: "Easy",
      ja: "初級"
    },
    medium: {
      en: "Medium",
      ja: "中級"
    },
    hard: {
      en: "Hard",
      ja: "上級"
    },
    xtreme: {
      en: "Extreme",
      ja: "超上級"
    }
  };

  static sampleGames = {
    [Config.sampleGameClassList[0]]: [
      // {
      //   credit: {
      //     publisher: "Byakuyasyobo",
      //     author: "Akihiko Takise",
      //     book: "Syokyu NumPra 12 Gatsugo",
      //     question: "Q1"
      //   },
      //   matrix: [
      //     [8, 0, 0, 0, 0, 1, 0, 0, 6],
      //     [0, 0, 0, 9, 0, 6, 0, 3, 0],
      //     [0, 0, 0, 3, 4, 2, 1, 0, 0],
      //     [0, 7, 4, 0, 0, 0, 2, 1, 9],
      //     [0, 0, 8, 0, 5, 0, 4, 0, 0],
      //     [9, 1, 3, 0, 0, 0, 8, 6, 0],
      //     [0, 0, 5, 7, 1, 4, 0, 0, 0],
      //     [0, 2, 0, 8, 0, 3, 0, 0, 0],
      //     [1, 0, 0, 2, 0, 0, 0, 0, 4]
      //   ]
      // },
      {
        credit: {
          en: {
            publisher: "Byakuyasyobo",
            author: "Akihiko Takise",
            book: "Syokyu NumPra 12 Gatsugo",
            question: "Q1"
          },
          ja: {
            publisher: "白夜書房",
            author: "たきせあきひこ",
            book: "初級ナンプレ 12月号",
            question: "Q1"
          }
        },
        matrix: [
          [8, 0, 0, 0, 0, 1, 0, 0, 6],
          [0, 0, 0, 9, 0, 6, 0, 3, 0],
          [0, 0, 0, 3, 4, 2, 1, 0, 0],
          [0, 7, 4, 0, 0, 0, 2, 1, 9],
          [0, 0, 8, 0, 5, 0, 4, 0, 0],
          [9, 1, 3, 0, 0, 0, 8, 6, 0],
          [0, 0, 5, 7, 1, 4, 0, 0, 0],
          [0, 2, 0, 8, 0, 3, 0, 0, 0],
          [1, 0, 0, 2, 0, 0, 0, 0, 4]
        ]
      },
      // Syokyu NumPre 12 Gatugo Q252
      // [Config.sampleGameList[0]]:
      {
        // credit: {
        //   publisher: "Byakuyasyobo",
        //   author: "Akihiko Takise",
        //   book: "Syokyu NumPra 12 Gatsugo",
        //   question: "Q252"
        // },
        credit: {
          en: {
            publisher: "Byakuyasyobo",
            author: "Akihiko Takise",
            book: "Syokyu NumPra 12 Gatsugo",
            question: "Q252"
          },
          ja: {
            publisher: "白夜書房",
            author: "たきせあきひこ",
            book: "初級ナンプレ 12月号",
            question: "Q252"
          }
        },
        matrix: [
          [5, 0, 1, 0, 0, 0, 7, 0, 0],
          [0, 0, 0, 0, 0, 3, 0, 0, 0],
          [6, 0, 9, 0, 0, 7, 1, 0, 4],
          [0, 0, 0, 0, 1, 0, 4, 3, 0],
          [0, 0, 0, 7, 0, 6, 0, 0, 0],
          [0, 2, 8, 0, 9, 0, 0, 0, 0],
          [4, 0, 5, 6, 0, 0, 2, 0, 7],
          [0, 0, 0, 9, 0, 0, 0, 0, 0],
          [0, 0, 2, 0, 0, 0, 5, 0, 1]
        ]
      },
      {
        // credit: {
        //   publisher: "Byakuyasyobo",
        //   author: "Akihiko Takise",
        //   book: "Syokyu NumPra 12 Gatsugo",
        //   question: "Q11"
        // },
        credit: {
          en: {
            publisher: "Byakuyasyobo",
            author: "Akihiko Takise",
            book: "Syokyu NumPra 12 Gatsugo",
            question: "Q11"
          },
          ja: {
            publisher: "白夜書房",
            author: "たきせあきひこ",
            book: "初級ナンプレ 12月号",
            question: "Q11"
          }
        },
        matrix: [
          [0, 0, 0, 8, 0, 6, 0, 0, 3],
          [0, 0, 2, 9, 0, 0, 7, 4, 0],
          [0, 7, 0, 0, 4, 0, 0, 6, 0],
          [6, 4, 0, 0, 1, 0, 0, 0, 7],
          [0, 0, 7, 4, 0, 3, 1, 0, 0],
          [5, 0, 0, 0, 6, 0, 0, 3, 2],
          [0, 3, 0, 0, 2, 0, 0, 8, 0],
          [0, 9, 1, 0, 0, 7, 6, 0, 0],
          [2, 0, 0, 5, 0, 1, 0, 0, 0]
        ]
      },
      {
        // credit: {
        //   publisher: "Byakuyasyobo",
        //   author: "Akihiko Takise",
        //   book: "Syokyu NumPra 12 Gatsugo",
        //   question: "Q200"
        // },
        credit: {
          en: {
            publisher: "Byakuyasyobo",
            author: "Akihiko Takise",
            book: "Syokyu NumPra 12 Gatsugo",
            question: "Q200"
          },
          ja: {
            publisher: "白夜書房",
            author: "たきせあきひこ",
            book: "初級ナンプレ 12月号",
            question: "Q200"
          }
        },
        matrix: [
          [1, 0, 0, 0, 0, 0, 0, 0, 4],
          [0, 9, 0, 8, 0, 2, 0, 0, 0],
          [0, 0, 3, 0, 0, 9, 1, 0, 0],
          [0, 6, 0, 0, 5, 0, 4, 1, 0],
          [0, 0, 0, 3, 0, 6, 0, 0, 0],
          [0, 8, 5, 0, 4, 0, 0, 3, 0],
          [0, 0, 6, 5, 0, 0, 2, 0, 0],
          [0, 0, 0, 6, 0, 7, 0, 5, 0],
          [2, 0, 0, 0, 0, 0, 0, 0, 7]
        ]
      },
      {
        // credit: {
        //   publisher: "Byakuyasyobo",
        //   author: "Akihiko Takise",
        //   book: "Chukyu NumPra 2 Gatsugo",
        //   question: "Q7"
        // },
        credit: {
          en: {
            publisher: "Byakuyasyobo",
            author: "Akihiko Takise",
            book: "Syokyu NumPra 12 Gatsugo",
            question: "Q7"
          },
          ja: {
            publisher: "白夜書房",
            author: "たきせあきひこ",
            book: "中級ナンプレ 2月号",
            question: "Q7"
          }
        },
        matrix: [
          [0, 0, 0, 0, 6, 0, 0, 0, 1],
          [0, 0, 1, 7, 0, 2, 0, 0, 0],
          [0, 6, 0, 5, 0, 4, 0, 0, 0],
          [0, 3, 2, 0, 0, 0, 8, 7, 0],
          [9, 0, 0, 0, 5, 0, 0, 0, 6],
          [0, 4, 5, 0, 0, 0, 3, 2, 0],
          [0, 0, 0, 1, 0, 6, 0, 8, 0],
          [0, 0, 0, 9, 0, 7, 2, 0, 0],
          [3, 0, 0, 0, 8, 0, 0, 0, 0]
        ]
      }
    ],
    [Config.sampleGameClassList[1]]: [
      // {
      //   credit: "Tyukyu Numpla Feburary Q251",
      //   matrix: [
      //     [0, 0, 0, 0, 3, 0, 0, 0, 0],
      //     [0, 0, 2, 0, 6, 0, 8, 0, 0],
      //     [0, 8, 0, 5, 0, 2, 0, 4, 0],
      //     [0, 0, 5, 0, 0, 3, 2, 0, 0],
      //     [9, 2, 0, 0, 0, 0, 0, 3, 1],
      //     [0, 0, 1, 4, 0, 0, 6, 0, 0],
      //     [0, 3, 0, 9, 0, 7, 0, 6, 0],
      //     [0, 0, 7, 0, 8, 0, 3, 0, 0],
      //     [0, 0, 0, 0, 1, 0, 0, 0, 0]
      //   ]
      // },
      // // Pocket sudoku 11 joukyuuhen Q1
      // [Config.sampleGameList[1]]: {
      // [Config.sampleGameList[1]]: {
      //   {
      //     credit: "Tyukyu Numpla Feburary Q1",
      //     matrix: [
      //       [0, 5, 0, 2, 0, 6, 0, 1, 0],
      //       [3, 0, 0, 0, 4, 0, 0, 0, 6],
      //       [0, 0, 2, 0, 0, 0, 0, 0, 0],
      //       [9, 0, 0, 0, 8, 0, 0, 0, 5],
      //       [0, 6, 0, 9, 7, 5, 0, 2, 0],
      //       [2, 0, 0, 0, 6, 0, 0, 0, 1],
      //       [0, 0, 0, 0, 0, 0, 7, 0, 0],
      //       [1, 0, 0, 0, 5, 0, 0, 0, 9],
      //       [0, 9, 0, 7, 0, 3, 0, 6, 0]
      //     ]
      //   }
      {
        // credit: {
        //   publisher: "Nagaoka Shoten",
        //   author: "Mitunori Kawasaki, Kaori Kawasaki",
        //   book: "NumPla premium Zeus",
        //   question: "Q1"
        // },
        credit: {
          en: {
            publisher: "Nagaoka Shoten",
            author: "Mitsunori Kawasaki, Kaori Kawasaki",
            book: "NumPla premium Zeus",
            question: "Q1"
          },
          ja: {
            publisher: "永岡書店",
            author: "川崎光徳・川崎芳織",
            book: "超難問ナンプレプレミアム ゼウス",
            question: "Q1"
          }
        },
        matrix: [
          [0, 0, 0, 0, 0, 0, 0, 8, 3],
          [0, 0, 1, 4, 0, 0, 0, 0, 0],
          [0, 3, 0, 9, 0, 0, 5, 0, 0],
          [0, 5, 7, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 2, 0, 6, 0],
          [0, 0, 0, 0, 7, 0, 1, 0, 4],
          [0, 0, 4, 0, 0, 7, 0, 0, 2],
          [3, 0, 0, 0, 6, 0, 0, 0, 0],
          [5, 0, 0, 0, 0, 8, 9, 0, 0]
        ]
      },
      {
        // credit: {
        //   publisher: "Softbank Creative",
        //   author: "Nikoli",
        //   book: "Pocket sudoku 11 jokyuhen",
        //   question: "Q1"
        // },
        credit: {
          en: {
            publisher: "Softbank Creative",
            author: "Nikoli",
            book: "Pocket sudoku 11 jokyuhen",
            question: "Q1"
          },
          ja: {
            publisher: "Softbank Creative",
            author: "ニコリ",
            book: "Pocket sudoku 11 上級編",
            question: "Q1"
          }
        },
        matrix: [
          [0, 0, 0, 0, 0, 0, 9, 7, 0],
          [0, 0, 0, 0, 0, 0, 3, 8, 0],
          [0, 0, 0, 9, 2, 0, 0, 0, 0],
          [0, 0, 0, 7, 5, 0, 0, 9, 8],
          [5, 6, 0, 0, 0, 0, 0, 3, 7],
          [7, 3, 0, 0, 4, 8, 0, 0, 0],
          [0, 0, 0, 0, 6, 9, 0, 0, 0],
          [0, 7, 2, 0, 0, 0, 0, 0, 0],
          [0, 8, 5, 0, 0, 0, 0, 0, 0]
        ]
      },
      {
        // credit: {
        //   publisher: "Nagaoka Shoten",
        //   author: "Mitsunori Kawasaki, Kaori Kawasaki",
        //   book: "NumPla premium Zeus",
        //   question: "Q2"
        // },
        credit: {
          en: {
            publisher: "Nagaoka Shoten",
            author: "Mitsunori Kawasaki, Kaori Kawasaki",
            book: "NumPla premium Zeus",
            question: "Q2"
          },
          ja: {
            publisher: "永岡書店",
            author: "川崎光徳・川崎芳織",
            book: "超難問ナンプレプレミアム ゼウス",
            question: "Q2"
          }
        },
        matrix: [
          [0, 0, 0, 2, 7, 0, 0, 0, 4],
          [0, 0, 8, 0, 0, 0, 2, 0, 0],
          [0, 5, 0, 0, 1, 0, 9, 0, 0],
          [1, 0, 0, 0, 0, 0, 0, 5, 6],
          [4, 0, 3, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 2, 0],
          [0, 9, 6, 0, 0, 0, 0, 0, 3],
          [0, 0, 0, 5, 0, 8, 0, 0, 0],
          [8, 0, 0, 1, 0, 0, 6, 0, 0]
        ]
      },
      {
        // // credit: "Pocket sudoku 11 jokyuhen Q11",
        // credit: {
        //   publisher: "Softbank Creative",
        //   author: "Nikoli",
        //   book: "Pocket sudoku 11 jokyuhen",
        //   question: "Q11"
        // },
        credit: {
          en: {
            publisher: "Softbank Creative",
            author: "Nikoli",
            book: "Pocket sudoku 11 jokyuhen",
            question: "Q11"
          },
          ja: {
            publisher: "Softbank Creative",
            author: "ニコリ",
            book: "Pocket sudoku 11 上級編",
            question: "Q11"
          }
        },
        matrix: [
          [1, 0, 0, 7, 0, 0, 0, 6, 0],
          [0, 7, 0, 0, 1, 0, 0, 0, 4],
          [0, 0, 3, 0, 0, 2, 0, 0, 0],
          [3, 0, 0, 5, 0, 0, 1, 0, 0],
          [0, 2, 0, 0, 8, 0, 0, 7, 0],
          [0, 0, 6, 0, 0, 3, 0, 0, 8],
          [0, 0, 0, 4, 0, 0, 3, 0, 0],
          [5, 0, 0, 0, 6, 0, 0, 1, 0],
          [0, 1, 0, 0, 0, 8, 0, 0, 2]
        ]
      },
      {
        // // credit: "Pocket Sudoku 11 Jokyuhen Q3",
        // credit: {
        //   publisher: "Softbank Creative",
        //   author: "Nikoli",
        //   book: "Pocket sudoku 11 jokyuhen",
        //   question: "Q3"
        // },
        credit: {
          en: {
            publisher: "Softbank Creative",
            author: "Nikoli",
            book: "Pocket sudoku 11 jokyuhen",
            question: "Q3"
          },
          ja: {
            publisher: "Softbank Creative",
            author: "ニコリ",
            book: "Pocket sudoku 11 上級編",
            question: "Q3"
          }
        },
        matrix: [
          [0, 1, 0, 0, 0, 5, 0, 0, 0],
          [0, 0, 5, 0, 2, 0, 3, 0, 4],
          [0, 0, 0, 6, 0, 0, 0, 8, 0],
          [5, 0, 0, 0, 7, 0, 4, 0, 0],
          [0, 9, 0, 0, 0, 0, 0, 1, 0],
          [0, 0, 2, 0, 5, 0, 0, 0, 6],
          [0, 6, 0, 0, 0, 8, 0, 0, 0],
          [8, 0, 7, 0, 3, 0, 2, 0, 0],
          [0, 0, 0, 7, 0, 0, 0, 9, 0]
        ]
      },
      {
        // // credit: "NumPra premium Zeus Q62",
        // credit: {
        //   publisher: "Nagaoka Shoten",
        //   author: "Mitsunori Kawasaki, Kaori Kawasaki",
        //   book: "NumPla premium Zeus",
        //   question: "Q62"
        // },
        credit: {
          en: {
            publisher: "Nagaoka Shoten",
            author: "Mitsunori Kawasaki, Kaori Kawasaki",
            book: "NumPla premium Zeus",
            question: "Q62"
          },
          ja: {
            publisher: "永岡書店",
            author: "川崎光徳・川崎芳織",
            book: "超難問ナンプレプレミアム ゼウス",
            question: "Q62"
          }
        },
        matrix: [
          [0, 0, 2, 0, 7, 0, 6, 0, 0],
          [0, 0, 0, 9, 0, 3, 0, 0, 0],
          [0, 0, 5, 0, 0, 0, 3, 0, 1],
          [9, 8, 0, 0, 0, 0, 0, 1, 0],
          [0, 0, 0, 3, 0, 0, 0, 0, 7],
          [0, 0, 0, 6, 4, 0, 0, 5, 0],
          [0, 0, 1, 0, 0, 0, 7, 0, 2],
          [0, 0, 0, 0, 0, 5, 0, 0, 0],
          [4, 0, 0, 0, 0, 8, 0, 0, 0]
        ]
      }
    ],
    [Config.sampleGameClassList[2]]: [
      {
        // // credit: "Pocket sudoku 11 jokyuhen Q54",
        // credit: {
        //   publisher: "Softbank Creative",
        //   author: "Nikoli",
        //   book: "Pocket sudoku 11 jokyuhen",
        //   question: "Q54"
        // },
        credit: {
          en: {
            publisher: "Softbank Creative",
            author: "Nikoli",
            book: "Pocket sudoku 11 jokyuhen",
            question: "Q54"
          },
          ja: {
            publisher: "Softbank Creative",
            author: "ニコリ",
            book: "Pocket sudoku 11 上級編",
            question: "Q54"
          }
        },
        matrix: [
          [0, 1, 0, 0, 3, 0, 0, 0, 8],
          [4, 0, 0, 6, 0, 0, 0, 2, 0],
          [0, 0, 9, 0, 0, 0, 5, 0, 0],
          [0, 7, 0, 0, 0, 5, 0, 0, 0],
          [1, 0, 0, 0, 8, 0, 0, 0, 3],
          [0, 0, 0, 4, 0, 0, 0, 7, 0],
          [0, 0, 6, 0, 0, 0, 9, 0, 0],
          [0, 8, 0, 0, 0, 9, 0, 0, 1],
          [7, 0, 0, 0, 2, 0, 0, 6, 0]
        ]
      },
      // [Config.sampleGameList[2]]: {
      // {
      //   credit: "Gekikara Sudoku10 Q99",
      //   matrix: [
      //     [0, 0, 2, 1, 0, 0, 0, 7, 6],
      //     [0, 0, 3, 6, 0, 0, 0, 1, 5],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [5, 7, 0, 0, 0, 3, 9, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 8, 5, 0, 0, 0, 6, 2],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [8, 2, 0, 0, 0, 9, 3, 0, 0],
      //     [4, 3, 0, 0, 0, 2, 6, 0, 0]
      //   ]
      // },
      // [Config.sampleGameList[2]]: {
      {
        // // credit: "Pocket Sudoku 11 Jokyuhen Q79",
        // credit: {
        //   publisher: "Softbank Creative",
        //   author: "Nikoli",
        //   book: "Pocket sudoku 11 jokyuhen",
        //   question: "Q79"
        // },
        credit: {
          en: {
            publisher: "Softbank Creative",
            author: "Nikoli",
            book: "Pocket sudoku 11 jokyuhen",
            question: "Q79"
          },
          ja: {
            publisher: "Softbank Creative",
            author: "ニコリ",
            book: "Pocket sudoku 11 上級編",
            question: "Q79"
          }
        },
        matrix: [
          [0, 0, 0, 0, 0, 0, 0, 2, 1],
          [0, 0, 0, 6, 0, 0, 3, 8, 0],
          [0, 0, 7, 0, 0, 3, 5, 0, 0],
          [0, 8, 0, 0, 5, 1, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 8, 2, 0, 0, 9, 0],
          [0, 0, 2, 4, 0, 0, 7, 0, 0],
          [0, 3, 9, 0, 0, 6, 0, 0, 0],
          [8, 6, 0, 0, 0, 0, 0, 0, 0]
        ]
      },
      // [Config.sampleGameList[2]]: {
      {
        // // credit: "Gekikara sudoku 10 Q87",
        // credit: {
        //   publisher: "Nikoli",
        //   author: "Rimu Takayura",
        //   book: "Gekikara Sudoku 10",
        //   question: "Q87"
        // },
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Rimu Takayura",
            book: "Gekikara Sudoku 10",
            question: "Q87"
          },
          ja: {
            publisher: "ニコリ",
            author: "高由良りむ",
            book: "激辛数独 10",
            question: "Q87"
          }
        },
        matrix: [
          [0, 0, 0, 5, 0, 0, 7, 0, 0],
          [0, 3, 0, 0, 0, 9, 0, 8, 0],
          [5, 0, 8, 0, 0, 0, 9, 0, 0],
          [0, 7, 0, 0, 2, 0, 0, 0, 8],
          [0, 0, 0, 1, 0, 4, 0, 0, 0],
          [9, 0, 0, 0, 7, 0, 0, 1, 0],
          [0, 0, 6, 0, 0, 0, 5, 0, 9],
          [0, 8, 0, 4, 0, 0, 0, 3, 0],
          [0, 0, 7, 0, 0, 3, 0, 0, 0]
        ]
      },
      // [Config.sampleGameList[2]]: {
      {
        // // credit: "Gekikara sudoku 10 Q97",
        // credit: {
        //   publisher: "Nikoli",
        //   author: "Anpai",
        //   book: "Gekikara Sudoku 10",
        //   question: "Q97"
        // },
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Anpai",
            book: "Gekikara Sudoku 10",
            question: "Q97"
          },
          ja: {
            publisher: "ニコリ",
            author: "あんぱい",
            book: "激辛数独 10",
            question: "Q97"
          }
        },
        matrix: [
          [0, 0, 0, 0, 0, 1, 0, 5, 0],
          [0, 0, 7, 0, 3, 0, 0, 0, 1],
          [0, 6, 0, 2, 0, 0, 0, 0, 0],
          [0, 0, 6, 0, 1, 0, 0, 0, 4],
          [0, 5, 0, 6, 0, 7, 0, 2, 0],
          [4, 0, 0, 0, 2, 0, 9, 0, 0],
          [0, 0, 0, 0, 0, 8, 0, 3, 0],
          [8, 0, 0, 0, 5, 0, 2, 0, 0],
          [0, 1, 0, 9, 0, 0, 0, 0, 0]
        ]
      },
      {
        // // credit: "Pocket Sudoku 11 Jokyuhen Q103",
        // credit: {
        //   publisher: "Softbank Creative",
        //   author: "Nikoli",
        //   book: "Pocket sudoku 11 jokyuhen",
        //   question: "Q103"
        // },
        credit: {
          en: {
            publisher: "Softbank Creative",
            author: "Nikoli",
            book: "Pocket sudoku 11 jokyuhen",
            question: "Q103"
          },
          ja: {
            publisher: "Softbank Creative",
            author: "ニコリ",
            book: "Pocket sudoku 11 上級編",
            question: "Q103"
          }
        },
        matrix: [
          [0, 0, 0, 0, 0, 6, 7, 0, 0],
          [0, 2, 3, 0, 0, 0, 8, 9, 0],
          [5, 9, 0, 0, 0, 0, 0, 6, 0],
          [3, 0, 0, 6, 0, 2, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 9, 0, 1, 0, 0, 4],
          [0, 3, 0, 0, 0, 0, 0, 1, 6],
          [0, 1, 9, 0, 0, 0, 5, 7, 0],
          [0, 0, 5, 2, 0, 0, 0, 0, 0]
        ]
      },
      {
        // // credit: "Gekikara Sudoku 10 103",
        // credit: {
        //   publisher: "Nikoli",
        //   author: "Susumu Kondo",
        //   book: "Gekikara Sudoku 10",
        //   question: "Q103"
        // },
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Susumu Kondo",
            book: "Gekikara Sudoku 10",
            question: "Q103"
          },
          ja: {
            publisher: "ニコリ",
            author: "近藤夲",
            book: "激辛数独 10",
            question: "Q103"
          }
        },
        matrix: [
          [0, 0, 0, 0, 0, 7, 9, 0, 0],
          [8, 4, 0, 0, 1, 0, 0, 0, 0],
          [0, 1, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 2, 0, 0, 6, 0, 0],
          [0, 3, 0, 0, 4, 0, 0, 5, 0],
          [0, 0, 7, 0, 0, 9, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 3, 0],
          [0, 0, 0, 0, 5, 0, 0, 4, 1],
          [0, 0, 2, 6, 0, 0, 0, 0, 0]
        ]
      }
    ],
    // Gekikara Sudoku10 Q105
    [Config.sampleGameClassList[3]]: [
      {
        // // credit: "Gekikara Sudoku10 Q82",
        // credit: {
        //   publisher: "Nikoli",
        //   author: "Chibisukemaru",
        //   book: "Gekikara Sudoku 10",
        //   question: "Q82"
        // },
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Chibisukemaru",
            book: "Gekikara Sudoku 10",
            question: "Q82"
          },
          ja: {
            publisher: "ニコリ",
            author: "チビスケ丸",
            book: "激辛数独 10",
            question: "Q82"
          }
        },
        matrix: [
          [0, 0, 1, 0, 5, 0, 0, 0, 9],
          [4, 0, 0, 1, 0, 0, 2, 0, 0],
          [0, 6, 0, 0, 0, 4, 0, 5, 0],
          [9, 0, 0, 0, 0, 0, 7, 0, 0],
          [0, 0, 0, 0, 1, 0, 0, 0, 0],
          [0, 0, 4, 0, 0, 0, 0, 0, 3],
          [0, 3, 0, 2, 0, 0, 0, 8, 0],
          [0, 0, 9, 0, 0, 5, 0, 0, 7],
          [8, 0, 0, 0, 3, 0, 4, 0, 0]
        ]
      },
      // {
      //   credit: "Gekikara Sudoku 10 84",
      //   matrix: [
      //     [0, 0, 1, 5, 0, 0, 0, 3, 0],
      //     [0, 0, 0, 0, 0, 8, 7, 0, 0],
      //     [0, 5, 0, 0, 4, 0, 0, 0, 0],
      //     [0, 4, 0, 3, 0, 0, 0, 0, 9],
      //     [1, 0, 0, 0, 0, 0, 0, 0, 6],
      //     [8, 0, 0, 0, 0, 7, 0, 2, 0],
      //     [0, 0, 0, 0, 3, 0, 0, 6, 0],
      //     [0, 0, 5, 4, 0, 0, 0, 0, 0],
      //     [0, 3, 0, 0, 0, 6, 9, 0, 0]
      //   ]
      // },
      {
        // // credit: "ChoGekikara sudoku 4 15",
        // credit: {
        //   publisher: "Nikoli",
        //   author: "Nyoroppi",
        //   book: "ChoGekikara Sudoku 4",
        //   question: "Q15"
        // },
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Nyoroppi",
            book: "ChoGekikara Sudoku 4",
            question: "Q15"
          },
          ja: {
            publisher: "ニコリ",
            author: "にょろっぴぃ",
            book: "超激辛数独 4",
            question: "Q15"
          }
        },
        matrix: [
          [0, 0, 0, 0, 4, 9, 0, 0, 0],
          [0, 3, 7, 0, 0, 0, 6, 1, 0],
          [0, 9, 2, 0, 7, 0, 0, 5, 0],
          [0, 7, 0, 9, 0, 0, 1, 8, 0],
          [0, 0, 0, 0, 8, 0, 0, 0, 0],
          [0, 1, 6, 0, 0, 4, 0, 7, 0],
          [0, 8, 0, 0, 5, 0, 7, 9, 0],
          [0, 2, 1, 0, 0, 0, 5, 3, 0],
          [0, 0, 0, 3, 1, 0, 0, 0, 0]
        ]
      },
      // {
      //   credit: "ChoGekikara sudoku 4 16",
      //   matrix: [
      //     [0, 0, 0, 5, 0, 0, 0, 0, 0],
      //     [0, 0, 2, 0, 3, 0, 1, 0, 0],
      //     [0, 4, 0, 0, 0, 7, 0, 5, 0],
      //     [0, 3, 0, 4, 0, 0, 0, 6, 0],
      //     [0, 0, 1, 0, 0, 0, 2, 0, 0],
      //     [0, 8, 0, 0, 0, 5, 0, 7, 0],
      //     [0, 6, 0, 3, 0, 0, 0, 8, 0],
      //     [0, 0, 8, 0, 2, 0, 9, 0, 0],
      //     [0, 0, 0, 0, 0, 1, 0, 0, 0]
      //   ]
      // },
      //   {
      //     credit: "ChoGekikara sudoku 4 18",
      //     matrix: [
      //       [0, 0, 6, 2, 0, 0, 0, 7, 0],
      //       [0, 8, 0, 0, 9, 0, 0, 0, 2],
      //       [1, 0, 0, 0, 5, 0, 0, 0, 0],
      //       [5, 0, 0, 9, 0, 0, 0, 0, 0],
      //       [0, 6, 2, 0, 0, 0, 1, 4, 0],
      //       [0, 0, 0, 0, 0, 3, 0, 0, 7],
      //       [0, 0, 0, 0, 1, 0, 0, 0, 6],
      //       [6, 0, 0, 0, 3, 0, 0, 8, 0],
      //       [0, 5, 0, 0, 0, 4, 3, 0, 0]
      //     ]
      //   },
      //   {
      //     credit: "ChoGekikara Sudoku 4 20",
      //     matrix: [
      //       [0, 4, 0, 0, 0, 1, 0, 0, 2],
      //       [9, 0, 0, 0, 5, 0, 1, 0, 0],
      //       [0, 3, 0, 4, 0, 0, 0, 6, 0],
      //       [0, 0, 3, 0, 0, 0, 0, 0, 5],
      //       [0, 2, 0, 0, 0, 0, 0, 4, 0],
      //       [7, 0, 0, 0, 0, 0, 3, 0, 0],
      //       [0, 8, 0, 0, 0, 3, 0, 2, 0],
      //       [0, 0, 9, 0, 2, 0, 0, 0, 1],
      //       [6, 0, 0, 1, 0, 0, 0, 9, 0]
      //     ]
      //   },
      {
        // // credit: "ChoGekikara Sudoku4 40",
        // credit: {
        //   publisher: "Nikoli",
        //   author: "Haasan",
        //   book: "ChoGekikara Sudoku 4",
        //   question: "Q40"
        // },
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Haasan",
            book: "ChoGekikara Sudoku 4",
            question: "Q40"
          },
          ja: {
            publisher: "ニコリ",
            author: "はあさん",
            book: "超激辛数独 4",
            question: "Q40"
          }
        },
        matrix: [
          [7, 0, 0, 5, 0, 2, 0, 0, 9],
          [0, 6, 0, 0, 9, 0, 0, 5, 0],
          [0, 0, 2, 0, 0, 0, 8, 0, 0],
          [0, 0, 0, 2, 0, 7, 0, 0, 0],
          [0, 0, 0, 0, 5, 0, 0, 0, 0],
          [0, 0, 0, 3, 0, 9, 0, 0, 0],
          [0, 0, 5, 0, 0, 0, 7, 0, 0],
          [0, 9, 0, 0, 8, 0, 0, 6, 0],
          [4, 0, 0, 7, 0, 1, 0, 0, 3]
        ]
      },
      {
        // // credit: "Gekikara Sudoku10 105",
        // credit: {
        //   publisher: "Nikoli",
        //   author: "Mitsuyuki Okuyama",
        //   book: "Gekikara Sudoku 10",
        //   question: "Q105"
        // },
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Mitsuyuki Okuyama",
            book: "Gekikara Sudoku 10",
            question: "Q105"
          },
          ja: {
            publisher: "ニコリ",
            author: "おく山みつゆき",
            book: "激辛数独 10",
            question: "Q105"
          }
        },
        matrix: [
          [0, 0, 0, 7, 0, 0, 0, 3, 0],
          [0, 0, 6, 0, 2, 0, 5, 0, 0],
          [0, 2, 0, 0, 0, 4, 0, 0, 0],
          [0, 0, 0, 9, 0, 0, 0, 7, 0],
          [0, 0, 7, 0, 5, 0, 6, 0, 0],
          [0, 4, 0, 0, 0, 8, 0, 0, 0],
          [0, 0, 0, 8, 0, 0, 0, 9, 0],
          [0, 0, 5, 0, 6, 0, 7, 0, 0],
          [0, 8, 0, 0, 0, 9, 0, 0, 0]
        ]
      },
      // {
      //   credit: "Gekikara Sudoku 10 99",
      //   matrix: [
      //     [0, 0, 2, 1, 0, 0, 0, 7, 6],
      //     [0, 0, 3, 6, 0, 0, 0, 1, 5],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [5, 7, 0, 0, 0, 3, 9, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 8, 5, 0, 0, 0, 6, 2],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [8, 2, 0, 0, 0, 9, 3, 0, 0],
      //     [4, 3, 0, 0, 0, 2, 6, 0, 0]
      //   ]
      // },
      // {
      //   credit: "Gekikara Sudoku 10 101",
      //   matrix: [
      //     [0, 0, 0, 7, 0, 8, 0, 6, 0],
      //     [0, 0, 0, 0, 1, 0, 2, 0, 8],
      //     [0, 0, 0, 0, 0, 6, 0, 7, 0],
      //     [9, 0, 0, 0, 0, 0, 3, 0, 2],
      //     [0, 6, 0, 0, 0, 0, 0, 9, 0],
      //     [5, 0, 3, 0, 0, 0, 0, 0, 1],
      //     [0, 4, 0, 3, 0, 0, 0, 0, 0],
      //     [8, 0, 1, 0, 2, 0, 0, 0, 0],
      //     [0, 7, 0, 8, 0, 9, 0, 0, 0]
      //   ]
      // }
      {
        // // credit: "ChoGekikara Sudoku 4 Q84",
        // credit: {
        //   publisher: "Nikoli",
        //   author: "Aquablue",
        //   book: "ChoGekikara Sudoku 4",
        //   question: "Q84"
        // },
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Sakusaku",
            book: "ChoGekikara Sudoku 4",
            question: "Q84"
          },
          ja: {
            publisher: "ニコリ",
            author: "さくさく",
            book: "超激辛数独 4",
            question: "Q84"
          }
        },
        matrix: [
          [2, 0, 0, 8, 0, 0, 0, 0, 3],
          [0, 0, 7, 0, 0, 0, 9, 0, 0],
          [0, 6, 0, 0, 9, 0, 0, 5, 0],
          [1, 0, 0, 2, 0, 0, 0, 0, 0],
          [0, 0, 4, 0, 5, 0, 6, 0, 0],
          [0, 0, 0, 0, 0, 3, 0, 0, 1],
          [0, 5, 0, 0, 8, 0, 0, 2, 0],
          [0, 0, 6, 0, 0, 0, 5, 0, 0],
          [3, 0, 0, 0, 0, 4, 0, 0, 8]
        ]
      },
      {
        // // credit: "ChoGekikara Sudoku 4 Q85",
        // credit: {
        //   publisher: "Nikoli",
        //   author: "Okayusan",
        //   book: "ChoGekikara Sudoku 4",
        //   question: "Q85"
        // },
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Koki",
            book: "ChoGekikara Sudoku 4",
            question: "Q85"
          },
          ja: {
            publisher: "ニコリ",
            author: "Koki",
            book: "超激辛数独 4",
            question: "Q85"
          }
        },
        matrix: [
          [0, 0, 0, 7, 0, 0, 0, 0, 0],
          [0, 0, 2, 0, 1, 0, 9, 0, 0],
          [0, 3, 0, 0, 0, 8, 0, 4, 0],
          [0, 0, 1, 0, 0, 0, 0, 0, 2],
          [0, 4, 0, 0, 0, 0, 0, 7, 0],
          [9, 0, 0, 0, 0, 0, 5, 0, 0],
          [0, 7, 0, 4, 0, 0, 0, 8, 0],
          [0, 0, 5, 0, 9, 0, 2, 0, 0],
          [0, 0, 0, 0, 0, 7, 0, 0, 0]
        ]
      }
    ],
    [Config.sampleGameClassList[4]]: [
      {
        // // credit: "ChoJokyu NumPla vol.12 Q201",
        // credit: {
        //   publisher: "Byakuyashobo",
        //   author: "Akihiko Takise",
        //   book: "ChoJokyu NumPla vol.12",
        //   question: "Q201"
        // },
        credit: {
          en: {
            publisher: "Byakuyashobo",
            author: "Akihiko Takise",
            book: "ChoJokyu NumPla vol.12",
            question: "Q201"
          },
          ja: {
            publisher: "白夜書房",
            author: "たきせあきひこ",
            book: "超上級ナンプレ vol.12",
            question: "Q201"
          }
        },
        matrix: [
          [0, 0, 0, 7, 0, 4, 0, 0, 0],
          [0, 0, 7, 0, 2, 0, 8, 4, 0],
          [0, 2, 0, 9, 0, 0, 0, 6, 0],
          [1, 0, 5, 0, 0, 0, 0, 0, 7],
          [0, 7, 0, 0, 1, 0, 0, 2, 0],
          [6, 0, 0, 0, 0, 0, 5, 0, 4],
          [0, 6, 0, 0, 0, 7, 0, 3, 0],
          [0, 4, 1, 0, 5, 0, 2, 0, 0],
          [0, 0, 0, 2, 0, 3, 0, 0, 0]
        ]
      },
      {
        // // credit: "ChoJokyu NumPla vol.12 Q202",
        // credit: {
        //   publisher: "Byakuyashobo",
        //   author: "Akihiko Takise",
        //   book: "ChoJokyu NumPla vol.12",
        //   question: "Q202"
        // },
        credit: {
          en: {
            publisher: "Byakuyashobo",
            author: "Akihiko Takise",
            book: "ChoJokyu NumPla vol.12",
            question: "Q202"
          },
          ja: {
            publisher: "白夜書房",
            author: "たきせあきひこ",
            book: "超上級ナンプレ vol.12",
            question: "Q202"
          }
        },
        matrix: [
          [0, 2, 0, 0, 0, 9, 5, 0, 0],
          [5, 8, 0, 0, 0, 0, 0, 4, 0],
          [0, 0, 0, 0, 4, 0, 8, 0, 1],
          [0, 0, 0, 1, 0, 8, 0, 0, 7],
          [0, 0, 3, 0, 0, 0, 6, 0, 0],
          [6, 0, 0, 3, 0, 7, 0, 0, 0],
          [4, 0, 1, 0, 7, 0, 0, 0, 0],
          [0, 6, 0, 0, 0, 0, 0, 3, 2],
          [0, 0, 5, 4, 0, 0, 0, 1, 0]
        ]
      },
      // {
      //   credit: "ChoGekikara Sudoku 4 68",
      //   matrix: [
      //     [0, 4, 0, 0, 0, 8, 0, 0, 5],
      //     [2, 0, 0, 4, 0, 0, 0, 7, 0],
      //     [0, 0, 5, 0, 3, 0, 6, 0, 0],
      //     [0, 7, 0, 0, 0, 5, 0, 0, 8],
      //     [0, 0, 4, 0, 0, 0, 5, 0, 0],
      //     [3, 0, 0, 6, 0, 0, 0, 1, 0],
      //     [0, 0, 9, 0, 6, 0, 1, 0, 0],
      //     [0, 1, 0, 0, 0, 2, 0, 0, 7],
      //     [5, 0, 0, 7, 0, 0, 0, 2, 0]
      //   ]
      // },
      // {
      //   credit: "Gekikara Sudoku2 88",
      //   matrix: [
      //     [5, 0, 0, 0, 0, 0, 0, 0, 6],
      //     [0, 0, 0, 8, 3, 6, 0, 0, 0],
      //     [0, 0, 3, 0, 0, 0, 1, 0, 0],
      //     [0, 7, 0, 5, 0, 2, 0, 4, 0],
      //     [0, 3, 0, 0, 0, 0, 0, 1, 0],
      //     [0, 8, 0, 3, 0, 9, 0, 2, 0],
      //     [0, 0, 9, 0, 0, 0, 5, 0, 0],
      //     [0, 0, 0, 2, 4, 8, 0, 0, 0],
      //     [7, 0, 0, 0, 0, 0, 0, 0, 1]
      //   ]
      // },
      // {
      //   credit: "Gekikara Sudoku2 85",
      //   matrix: [
      //     [2, 0, 0, 0, 3, 4, 0, 0, 0],
      //     [0, 0, 0, 2, 0, 0, 0, 0, 7],
      //     [0, 5, 0, 0, 0, 0, 6, 0, 0],
      //     [0, 3, 0, 0, 0, 0, 8, 0, 0],
      //     [0, 6, 0, 0, 2, 0, 0, 9, 0],
      //     [0, 0, 8, 0, 0, 0, 0, 5, 0],
      //     [0, 0, 5, 0, 0, 0, 0, 8, 0],
      //     [4, 0, 0, 0, 0, 8, 0, 0, 0],
      //     [0, 0, 0, 6, 7, 0, 0, 0, 3]
      //   ]
      // },
      // {
      //   credit: "Gekikara Sudoku2 20",
      //   matrix: [
      //     [1, 0, 0, 0, 0, 9, 0, 0, 0],
      //     [0, 2, 0, 7, 0, 0, 4, 0, 3],
      //     [0, 0, 3, 0, 0, 0, 0, 6, 0],
      //     [0, 9, 0, 4, 0, 0, 8, 0, 5],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [3, 0, 1, 0, 0, 6, 0, 4, 0],
      //     [0, 5, 0, 0, 0, 0, 7, 0, 0],
      //     [6, 0, 2, 0, 0, 4, 0, 8, 0],
      //     [0, 0, 0, 5, 0, 0, 0, 0, 9]
      //   ]
      // },
      // {
      //   credit: "ChoGekikara Sudoku4 37",
      //   matrix: [
      //     [0, 0, 0, 0, 0, 1, 2, 0, 0],
      //     [0, 0, 9, 6, 0, 0, 0, 3, 0],
      //     [0, 0, 3, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 5, 3, 0, 0, 0, 6, 0],
      //     [0, 0, 0, 0, 5, 0, 0, 0, 0],
      //     [0, 4, 0, 0, 0, 2, 1, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 8, 0, 0],
      //     [0, 2, 0, 0, 0, 8, 4, 0, 0],
      //     [0, 0, 6, 9, 0, 0, 0, 0, 0]
      //   ]
      // },
      // {
      //   credit: "ChoGekikara Sudoku4 33",
      //   matrix: [
      //     [0, 0, 0, 1, 0, 0, 0, 0, 0],
      //     [0, 0, 2, 0, 0, 0, 8, 0, 0],
      //     [0, 6, 0, 0, 0, 8, 4, 9, 0],
      //     [5, 0, 0, 0, 6, 0, 9, 0, 0],
      //     [0, 0, 0, 4, 3, 1, 0, 0, 0],
      //     [0, 0, 1, 0, 2, 0, 0, 0, 3],
      //     [0, 2, 6, 9, 0, 0, 0, 5, 0],
      //     [0, 0, 4, 0, 0, 0, 3, 0, 0],
      //     [0, 0, 0, 0, 0, 6, 0, 0, 0]
      //   ]
      // },
      // {
      //   credit: "ChoGekikara Sudoku4 32",
      //   matrix: [
      //     [0, 0, 0, 0, 3, 0, 0, 0, 4],
      //     [0, 0, 4, 0, 0, 7, 0, 8, 0],
      //     [0, 6, 5, 1, 0, 0, 0, 0, 0],
      //     [0, 0, 7, 0, 0, 0, 0, 6, 0],
      //     [2, 0, 0, 0, 1, 0, 0, 0, 3],
      //     [0, 4, 0, 0, 0, 0, 9, 0, 0],
      //     [0, 0, 0, 0, 0, 9, 5, 7, 0],
      //     [0, 9, 0, 6, 0, 0, 1, 0, 0],
      //     [8, 0, 0, 0, 2, 0, 0, 0, 0]
      //   ]
      // },
      // {
      //   credit: "ChoGekikara Sudoku4 26",
      //   matrix: [
      //     [0, 0, 0, 0, 0, 6, 7, 8, 0],
      //     [0, 0, 8, 0, 0, 0, 3, 0, 0],
      //     [0, 2, 0, 4, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 4, 0, 5, 0],
      //     [0, 0, 3, 0, 0, 0, 1, 0, 0],
      //     [0, 1, 0, 5, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 8, 0, 4, 0],
      //     [0, 0, 9, 0, 0, 0, 6, 0, 0],
      //     [0, 3, 7, 1, 0, 0, 0, 0, 0]
      //   ]
      // },
      // {
      //   credit: "ChoGekikara Sudoku4 25",
      //   matrix: [
      //     [0, 0, 3, 0, 0, 9, 0, 0, 4],
      //     [0, 0, 4, 0, 0, 8, 0, 0, 0],
      //     [0, 0, 2, 0, 0, 0, 0, 7, 0],
      //     [0, 0, 0, 0, 7, 0, 0, 6, 0],
      //     [0, 7, 0, 0, 5, 0, 0, 2, 0],
      //     [0, 1, 0, 0, 2, 0, 0, 0, 0],
      //     [0, 8, 0, 0, 0, 0, 1, 0, 0],
      //     [0, 0, 0, 4, 0, 0, 5, 0, 0],
      //     [6, 0, 0, 3, 0, 0, 9, 0, 0]
      //   ]
      // },
      {
        credit: {
          en: {
            publisher: "Nikoli",
            author: "Tanpopo-gumi",
            book: "ChoGekikara Sudoku 4",
            question: "Q90"
          },
          ja: {
            publisher: "ニコリ",
            author: "たんぽぽ組",
            book: "超激辛数独 4",
            question: "Q90"
          }
        },
        matrix: [
          [0, 0, 0, 6, 0, 8, 0, 4, 0],
          [7, 0, 0, 1, 0, 4, 0, 0, 9],
          [0, 0, 4, 0, 9, 0, 7, 0, 0],
          [1, 9, 0, 0, 0, 0, 0, 7, 6],
          [0, 0, 7, 0, 0, 0, 5, 0, 0],
          [6, 4, 0, 0, 0, 0, 0, 3, 1],
          [0, 0, 8, 0, 1, 0, 6, 0, 0],
          [4, 0, 0, 8, 0, 6, 0, 0, 7],
          [0, 2, 0, 5, 0, 7, 0, 0, 0]
        ]
      }
      // {
      //   credit: "",
      //   matrix: [
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0],
      //     [0, 0, 0, 0, 0, 0, 0, 0, 0]
      //   ]
      // },
    ]
  };

  // static headerTitle = "Number Place Helper";

  static creditTemplate = {
    en:
      "__question__ in __book__ created by __author__ published by __publisher__",
    ja: "__question__  __author__ 作成 (__book__, __publisher__ 出版)"
  };
}

export default Config;
