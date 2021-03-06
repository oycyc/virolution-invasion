export const elements = {
    // starting screen
    startScreen: document.getElementById("starting-screen"),
    startGameBtn: document.getElementById("start-btn"),
    // actual game
    mainContainer: document.getElementById("main"),
    gameCanvas: document.getElementById("canvas"),
    // hud
    championTrash: document.getElementById("destroy"),

}

export const constants = {
    debugMode: null,
    canvas: document.getElementById("canvas"),
    ctx: canvas.getContext("2d"),
    cellSize: 150,
    cellGap: 3,
    gameGrid: [],
    selectedChampionIndex: -1,
    champions: [],
    enemies: [],
    enemyPositions: [],
    enemiesInterval: 600,
    numberOfResources: 5000,
    score: 0,
    frame: 0,
    gameOver: false,
    projectiles: [],
    mouse: {
        x: 0,
        y: 0,
        width: 0.1,
        height: 0.1,
        clicked: false
    },
    floatingMessages: [],
    winningScore: 500000,
    resources: [],

    logicDimensions: {
        width: 1200,
        height: 900
    },

    championFiles: [new Image(), new Image(), new Image(), new Image()],
    testingImg : new Image(), 
    tutorialFinished: true,
    removalStatus: false,

}




export const championConsts = {
    // display dimensions (grid)
    width: constants.cellSize - constants.cellGap * 2,
    height: constants.cellSize - constants.cellGap * 2,
    // sprite dimensions 
    spriteWidth: 150,
    spriteHeight: 150,

}

constants.championFiles[0].src = "./assets/champion-sprites/test3.png";
constants.championFiles[1].src = "./assets/champion-sprites/vaccine-sprite.png";
constants.championFiles[2].src = "./assets/champion-sprites/soap-sprite.png";
constants.championFiles[3].src = "./assets/champion-sprites/pill-sprite.png";
