import { constants } from './constants.js';

const controlsBar = {
    width: constants.logicDimensions.width,
    // height: 100,
    height: constants.cellSize,
}

export const handleControlsBar = () => {
    constants.ctx.clearRect(0, 0, canvas.width, canvas.height);
    // constants.ctx.fillStyle = "blue";
    constants.ctx.fillStyle = randomColor;
    constants.ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
}

var o = Math.round, r = Math.random, s = 255;
let randomColor =  'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';


export const handleGameStatus = () => {
    constants.ctx.fillStyle = "gold";
    constants.ctx.font = "30px Arial";
    constants.ctx.fillText("Resources: " + constants.numberOfResources, 180, 40);
    constants.ctx.fillText("Score: " + constants.score, 180, 80);
    if (constants.gameOver) {
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "90px Arial";
        constants.ctx.fillText("GAME OVER", 135, 330);
    }
    
    if (constants.score >= constants.winningScore && constants.enemies.length === 0) {
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "60px Arial";
        constants.ctx.fillText("Level Complete", 130, 300);
        constants.ctx.font = "30px Arial";
        constants.ctx.fillText("Yay", 134, 340);
    }
}