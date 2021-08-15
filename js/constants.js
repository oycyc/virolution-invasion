export const constants = {
    canvas: document.getElementById("canvas"),
    ctx: canvas.getContext("2d"),
    cellSize: 100,
    cellGap: 3,
    gameGrid: [],
    defenders: [],
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
    defender1: new Image(),
    defender2: new Image(),
    enemy1: new Image(),
    enemy2: new Image(),
}

files.defender1.src = "./assets/sprites/plant.png";
files.defender2.src = "./assets/sprites/red.png";
files.enemy1.src = "./assets/sprites/dino.png";
files.enemy2.src = "./assets/sprites/dino2.png";