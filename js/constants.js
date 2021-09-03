export const constants = {
    canvas: document.getElementById("canvas"),
    ctx: canvas.getContext("2d"),
    cellSize: 150,
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
        width: 1200,
        height: 900
    },


    test: 1
}
