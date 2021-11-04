import { elements, constants } from './constants.js';
import { startEventListeners } from './eventListeners.js';

import { createGrid, handleGameGrid } from './GameBoard.js';

// place new defender in defender.js ? maybe
import { updateChampionsFrame } from './champions.js';
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

const animate = () => {
    handleControlsBar();
    handleGameGrid();
    updateChampionsFrame();
    handleEnemies();
    handleResources();
    handleProjectiles();
    handleGameStatus();
    handleFloatingMessages();
    constants.frame++;
    


    // requestAnimationFrame() are paused when frame is hidden/running background tabs
    if (!constants.gameOver && constants.tutorialFinished) requestAnimationFrame(animate);
}

const startGame = () => {
    elements.startScreen.remove();
    // show the game canvas
    elements.mainContainer.classList.remove("start-no-display");
    
    startEventListeners();
    createGrid();
    animate();    
}

elements.startGameBtn.addEventListener("click", () => {
    startGame();
})














/*********************************************
  MODALS
 *********************************************/
const openModalButtons = document.querySelectorAll("[data-modal-target]");
const closeModalButtons = document.querySelectorAll("[data-close-button]");
const overlay = document.getElementById("overlay");

openModalButtons.forEach(item => {
	item.addEventListener("click", () => {
		const modal = document.querySelector(item.dataset.modalTarget);
		openModal(modal);
	})
});

closeModalButtons.forEach(item => {
	item.addEventListener("click", () => {
		const modal = item.closest(".modal");
		closeModal(modal);
	})
});

overlay.addEventListener("click", () => {
	const modals = document.querySelectorAll(".modal.active");
	modals.forEach(modal => {
		closeModal(modal);
	})
});

function openModal(modal) {
	if (modal == null) return;
	modal.classList.add("active");
	overlay.classList.add("active");
};

function closeModal(modal) {
	if (modal == null) return;
	modal.classList.remove("active");
	overlay.classList.remove("active");
};