export const constants = {
    canvas: document.getElementById("canvas"),
    ctx: canvas.getContext("2d"),
    cellSize: 100,
    cellGap: 3,
    gameGrid: [],
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
        width: 900,
        height: 600
    },


    test: 1
}

// object of file paths
export const files = {
    champion1: new Image(),
    champion2: new Image(),
    enemy1: new Image(),
    enemy2: new Image(),
}

files.champion1.src = "./assets/sprites/plant.png";
files.champion2.src = "./assets/sprites/red.png";
files.enemy1.src = "./assets/sprites/dino.png";
files.enemy2.src = "./assets/sprites/dino2.png";