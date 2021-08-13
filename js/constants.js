const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.imageSmoothingEnabled = false;
canvas.width = 900;
canvas.height = 600;

// global variables
const cellSize = 100;
const cellGap = 3;
const gameGrid = [];
const defenders = [];
const enemies = [];
const enemyPositions = [];
let enemiesInterval = 600;
let numberOfResources = 300;
let score = 0;
let frame = 0;
let gameOver = false;
const projectiles = [];

// mouse 
const mouse = {
    x: 0,
    y: 0,
    width: 0.1,
    height: 0.1,
    clicked: false
}

const floatingMessages = [];