// export const canvas = document.getElementById("canvas");
// export const ctx = canvas.getContext("2d");
// ctx.mozImageSmoothingEnabled = false;
// ctx.msImageSmoothingEnabled = false;
// ctx.imageSmoothingEnabled = false;
// canvas.width = 900;
// canvas.height = 600;
 
// // global variables
// export const cellSize = 100;
// export const cellGap = 3;
// export const gameGrid = [];
// export const defenders = [];
// export const enemies = [];
// export const enemyPositions = [];
// export let enemiesInterval = 600;
// export let numberOfResources = 300;
// export let score = 0;
// export let frame = 0;
// export let gameOver = false;
// export const projectiles = [];
 
//  // mouse 
// export const mouse = {
//     x: 0,
//     y: 0,
//     width: 0.1,
//     height: 0.1,
//     clicked: false
// }

// export const floatingMessages = [];

export default {
    canvas: document.getElementById("canvas"),
    ctx: canvas.getContext("2d"),
    cellSize: 100,
    cellGap: 3,
    gameGrid: [],
    defenders: [],
    enemies: [],
    enemyPositions: [],
    enemiesInterval: 600,
    numberOfResources: 300,
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







    test: 1

}