import { constants } from './constants.js';

const controlsBar = {
    width: constants.logicDimensions.width,
    // height: 100,
    height: constants.cellSize,
}

export const handleControlsBar = () => {
    constants.ctx.clearRect(0, 0, constants.canvas.width, constants.canvas.height);
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

export function collision(first, second) {
    if ( !(
        first.x > second.x + second.width ||
        first.x + first.width < second.x ||
        first.y > second.y + second.height ||
        first.y + first.height < second.y)
    ) {
        return true;
    }
}

export function HSLToHex(h,s,l) {
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
      x = c * (1 - Math.abs((h / 60) % 2 - 1)),
      m = l - c/2,
      r = 0,
      g = 0, 
      b = 0; 

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0;
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0;
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x;
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c;
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c;
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x;
  }
  // Having obtained RGB, convert channels to hex
  r = Math.round((r + m) * 255).toString(16);
  g = Math.round((g + m) * 255).toString(16);
  b = Math.round((b + m) * 255).toString(16);

  // Prepend 0s, if necessary
  if (r.length == 1)
    r = "0" + r;
  if (g.length == 1)
    g = "0" + g;
  if (b.length == 1)
    b = "0" + b;

  return "#" + r + g + b;
}