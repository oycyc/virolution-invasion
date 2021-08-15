import { constants } from './constants.js';
import { startEventListeners } from './eventListeners.js';

import { createGrid, handleGameGrid } from './GameBoard.js';

// place new defender in defender.js ? maybe
import { handleDefenders, chooseDefender } from './defenders.js';
import { handleEnemies } from './enemies.js';
import { handleProjectiles } from './projectiles.js';

import { handleResources } from './resources.js';
import { handleFloatingMessages } from './floatingMessage.js';

import { handleControlsBar, handleGameStatus } from './utils.js';

// canvas logic dimensions (NOT APPEARANCE DIMENSIONS)
constants.canvas.width = constants.logicDimensions.width;
constants.canvas.height = constants.logicDimensions.height;
// disable image smoothing when scaling to prevent pixelation 
constants.ctx.mozImageSmoothingEnabled = false;
constants.ctx.msImageSmoothingEnabled = false;
constants.ctx.imageSmoothingEnabled = false;



startEventListeners();
createGrid();













function animate() {
    handleControlsBar();
    handleGameGrid();
    handleResources();
    handleDefenders();
    handleEnemies();
    handleProjectiles();
    chooseDefender()
    handleGameStatus();
    handleFloatingMessages();
    constants.frame++;
    // console.log(frame);
    if (!constants.gameOver) requestAnimationFrame(animate);
}
animate();














