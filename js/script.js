import {constants} from './constants.js';

console.log(constants.test)
constants.test += 1;
console.log(constants.test);
constants.test += 5;
console.log(constants.test);

constants.canvas.width = 900;
constants.canvas.height = 600;
constants.ctx.mozImageSmoothingEnabled = false;
constants.ctx.msImageSmoothingEnabled = false;
constants.ctx.imageSmoothingEnabled = false;

canvas.addEventListener("mousedown", function() {
    constants.mouse.clicked = true;
})

canvas.addEventListener("mouseup", function() {
    constants.mouse.clicked = false;
})


let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);
// canvas.addEventListener("mousemove"  , function(event) {
//     mouse.x = event.x - canvasPosition.left;
//     mouse.y = event.y - canvasPosition.top;

// })
canvas.style.width = "1400px";
canvas.style.height = "800px";
let CSS_WIDTH = 1400;
let CSS_HEIGHT = 800;

window.addEventListener("resize", testing);

function testing() {
    canvasPosition = canvas.getBoundingClientRect();
    // add some logic where if it's full screen then just normal window.innerWidth - 4
    // but if it's a smaller screen add more percentage to the 0.1
    // then assign the extra space to the divs?
    CSS_WIDTH = window.innerWidth - (window.innerWidth * 0.1);
    CSS_HEIGHT = window.innerHeight - 4;


    // game ratio
    let ratio = 3 / 2;

    if (CSS_WIDTH / ratio > CSS_HEIGHT) {
        CSS_WIDTH = CSS_HEIGHT * ratio;
    } else {
        CSS_HEIGHT = CSS_WIDTH / ratio;
    }

    canvas.style.width = CSS_WIDTH + "px";
    canvas.style.height = CSS_HEIGHT + "px";
}

testing()

canvas.addEventListener("mousemove", function(event) {
    canvasPosition = canvas.getBoundingClientRect();
    let WIDTH_SIZE_CHANGE = CSS_WIDTH / 900;
    let HEIGHT_SIZE_CHANGE = CSS_HEIGHT / 600;


    constants.mouse.x = (event.x - canvasPosition.left)/WIDTH_SIZE_CHANGE;
    constants.mouse.y = (event.y - canvasPosition.top)/HEIGHT_SIZE_CHANGE;
})

canvas.addEventListener("mouseleave", function() {
    constants.mouse.x = undefined;
    constants.mouse.y = undefined;
})

// game board
export const controlsBar = {
    width: canvas.width,
    // height: 100,
    height: constants.cellSize,
}

import { createGrid, handleGameGrid } from './GameBoard.js';

createGrid();



// DEFENDERS
const defender1 = new Image();
defender1.src = "./assets/sprites/plant.png";
const defender2 = new Image();
defender2.src = "./assets/sprites/red.png";


class Defender {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = constants.cellSize - constants.cellGap * 2;
        this.height = constants.cellSize - constants.cellGap * 2;
        this.shooting = false;
        this.shootNow = false;
        this.health = 100;
        this.timer = 0;
        this.frameX = 0;
        this.frameY = 0;
        this.spriteWidth = 167;
        this.spriteHeight = 243;
        this.minFrame = 0;
        this.maxFrame = 1;
        this.chosenDefender = chosenDefender;

    }

    draw() {
        // constants.ctx.fillStyle = "blue";
        // constants.ctx.fillRect(this.x, this.y, this.width, this.height);
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "30px Arial";
        constants.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 5);


        if (this.chosenDefender === 1) {
            // constants.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
            constants.ctx.drawImage(defender1,
                this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width, this.height);
        } else if (this.chosenDefender === 2) {
            constants.ctx.drawImage(defender2,
                this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width, this.height);
        }

    }

    update() {
        if (constants.frame % 50 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
            if (this.frameX === 1) this.shootNow = true;
        }

        
        // if defender sprite sheet has different frames, use if elif to adjust
        if (this.shooting) {
            this.minFrame = 0;
            this.maxFrame = 1;
        } else {
            this.minFrame = 0;
            this.maxFrame = 1;
        }

        if (this.shooting && this.shootNow) {
            constants.projectiles.push(new Projectile(this.x + 70, this.y + 50));
            this.shootNow = false;
        }
    }
}

function handleDefenders() {
    for (let i = 0; i < constants.defenders.length; i++) {
        constants.defenders[i].draw();
        constants.defenders[i].update();
        if (constants.enemyPositions.indexOf(constants.defenders[i].y) !== -1) {
            constants.defenders[i].shooting = true;
        } else {
            constants.defenders[i].shooting = false;
        }

        for (let j = 0; j < constants.enemies.length; j++) {
            if (constants.defenders[i] && collision(constants.defenders[i], constants.enemies[j])) {
                constants.enemies[j].movement = 0;
                constants.defenders[i].health -= 0.2;
            }

            if (constants.defenders[i] && constants.defenders[i].health <= 0) {
                constants.defenders.splice(i, 1);
                i--;
                constants.enemies[j].movement = constants.enemies[j].speed;
            }
        }
    }
}

const card1 = {
    x: 10,
    y: 10,
    width: 70,
    height: 85
}


const card2 = {
    x: 90,
    y: 10,
    width: 70,
    height: 85
}

let chosenDefender = 1;


function chooseDefender() {
    // put these in the card object
    let card1stroke = "black";
    let card2stroke = "black";

    if (collision(constants.mouse, card1) && constants.mouse.clicked) {
        chosenDefender = 1;
    } else if (collision(constants.mouse, card2) && constants.mouse.clicked) {
        chosenDefender = 2;
    }

    if (chosenDefender === 1) {
        card1stroke = "gold";
        card2stroke = "black"
    } else if (chosenDefender === 2) {
        card1stroke = "black";
        card2stroke = "gold";
    } else {
        card1stroke = "black";
        card2stroke = "black";
    }

    constants.ctx.lineWidth = 1;
    constants.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    constants.ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
    constants.ctx.strokeStyle = card1stroke;
    constants.ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
    constants.ctx.drawImage(defender1, 0, 0, 167, 243, 0, 5, 167/3, 243/3)


    constants.ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
    constants.ctx.strokeStyle = card2stroke;
    constants.ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);
    constants.ctx.drawImage(defender2, 0, 0, 167, 243, 80, 5, 167/3, 243/3)
}


// ENEMIES
const enemyTypes = [];
const enemy1 = new Image();
enemy1.src = "./assets/sprites/dino.png";
enemyTypes.push(enemy1);
const enemy2 = new Image();
enemy2.src = "./assets/sprites/dino2.png";
enemyTypes.push(enemy2);



class Enemy {
    constructor(verticalPosition) {
        this.x = canvas.width;
        this.y = verticalPosition;
        this.width = constants.cellSize - constants.cellGap * 2;
        this.height = constants.cellSize - constants.cellGap * 2;
        this.speed = Math.random() * 0.2 + 0.4;
        this.movement = this.speed;
        this.health = 100;
        this.maxHealth = this.health;
        this.enemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 7;
        this.spriteWidth = 680;
        this.spriteHeight = 472;
    }

    update() {
        this.x -= this.movement;
        if (constants.frame % 8 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }

    }

    draw() {
        // constants.ctx.fillStyle = "red";
        // constants.ctx.fillRect(this.x, this.y, this.width, this.height);
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "30px Arial";
        constants.ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        // constants.ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        constants.ctx.drawImage(this.enemyType,
            this.frameX * this.spriteWidth,
            0,
            this.spriteWidth,
            this.spriteHeight,
            this.x,
            this.y,
            this.width, this.height);
    }
}

function handleEnemies() {
    for (let i = 0; i < constants.enemies.length; i++) {
        constants.enemies[i].update();
        constants.enemies[i].draw();
        if (constants.enemies[i].x < 0) {
            // gameOver = true;
            // temp to figure out resizing
            continue;
        }

        if (constants.enemies[i].health <= 0) {
            let gainedResources = constants.enemies[i].maxHealth / 10;
            constants.numberOfResources += gainedResources;
            constants.score += gainedResources;

            constants.floatingMessages.push(new floatingMessage("+" + gainedResources,
                constants.enemies[i].x,
                constants.enemies[i].y,
                30, "black"));
                constants.floatingMessages.push(new floatingMessage("+" + gainedResources,
                250,
                50,
                30, "gold"));


            constants.enemyPositions.splice(constants.enemyPositions.indexOf(constants.enemies[i].y), 1);
            constants.enemies.splice(i, 1);
            i--;
        }
    }

    if (constants.frame % constants.enemiesInterval === 0 && constants.score < winningScore) {
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * constants.cellSize + constants.cellGap;
        constants.enemies.push(new Enemy(verticalPosition));
        constants.enemyPositions.push(verticalPosition);
        //console.log(constants.enemiesInterval)
        
        constants.enemiesInterval -= 200;
        // console.log(constants)
        if (constants.enemiesInterval > 120) {
            constants.enemiesInterval -= 100;
        }
        // console.log(enemyPositions);
    }
}




// projectiles
class Projectile {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 10;
        this.height = 10;
        this.power = 20;
        this.speed = 5;
    }

    update() {
        this.x += this.speed;

    }

    draw() {
        constants.ctx.fillStyle = "black";
        constants.ctx.beginPath();
        constants.ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        constants.ctx.fill();
    }
}

function handleProjectiles() {
    for (let i = 0; i < constants.projectiles.length; i++) {
        constants.projectiles[i].update();
        constants.projectiles[i].draw();


        for (let j = 0; j < constants.enemies.length; j++) {
            if (constants.enemies[j] && constants.projectiles[i] && collision(constants.projectiles[i], constants.enemies[j])) {
                constants.enemies[j].health -= constants.projectiles[i].power;
                constants.projectiles.splice(i , 1);
                i--;
            }
        }

        if (constants.projectiles[i] && constants.projectiles[i].x > canvas.width - constants.cellSize) {
            constants.projectiles.splice(i, 1);
            i--;
        }
        // console.log("projectiles " + projectiles.length)
    }
}




// resources
const amounts = [20, 30, 40];
class Resource {
    constructor() {
        this.x = Math.random() * (canvas.width - constants.cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * constants.cellSize + 25;
        this.width = constants.cellSize * 0.6;
        this.height = constants.cellSize * 0.6;
        this.amount = amounts[Math.floor(Math.random() * amounts.length)];

    }

    draw() {
        constants.ctx.fillStyle = "yellow";
        constants.ctx.fillRect(this.x, this.y, this.width, this.height);
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "20px Arial";
        constants.ctx.fillText(this.amount, this.x + 15, this.y + 25);
    }
}
const winningScore = 50;
const resources = [];
function handleResources() {
    if (constants.frame % 500 === 0 && constants.score < winningScore) {
        resources.push(new Resource());
    }

    for (let i = 0; i < resources.length; i++) {
        resources[i].draw();
        if (resources[i] && constants.mouse.x && constants.mouse.y && collision(resources[i], constants.mouse)) {
            constants.numberOfResources += resources[i].amount;
            constants.floatingMessages.push(new floatingMessage("+" + resources[i].amount,
            resources[i].x,
            resources[i].y,
            30, "black"));
            constants.floatingMessages.push(new floatingMessage("+" + resources[i].amount,
                250,
                50,
                30, "gold"));
            // remove after splice
            resources.splice(i, 1);
            i--;
        }
    }
}







// floating messages 
// const floatingMessages = [];
import { floatingMessage, handleFloatingMessages } from './floatingMessage.js';

// class floatingMessage {
//     constructor(message, x, y, size, color) {
//         this.message = message;
//         this.x = x;
//         this.y = y;
//         this.size = size;
//         this.lifeSpan = 0;
//         this.color = color;
//         this.opacity = 1;
//     }

//     update() {
//         this.y -= 0.3;
//         this.lifeSpan += 1;
//         if (this.opacity > 0.03) this.opacity -= 0.03;
//     }

//     draw() {
//         constants.ctx.globalAlpha = this.opacity;
//         constants.ctx.fillStyle = this.color;
//         constants.ctx.font = this.size + "px Arial";
//         constants.ctx.fillText(this.message, this.x, this.y);
//         constants.ctx.globalAlpha = 1;
//     }
// } 

// function handleFloatingMessages() {
//     for (let i = 0; i < floatingMessages.length; i++) {
//         floatingMessages[i].update();
//         floatingMessages[i].draw();
//         if (floatingMessages[i].lifeSpan >= 50) {
//             floatingMessages.splice(i, 1);
//             i--;
//         }
//     }
// }








// UTILITIES 
function handleGameStatus() {
    constants.ctx.fillStyle = "gold";
    constants.ctx.font = "30px Arial";
    constants.ctx.fillText("Resources: " + constants.numberOfResources, 180, 40);
    constants.ctx.fillText("Score: " + constants.score, 180, 80);
    if (constants.gameOver) {
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "90px Arial";
        constants.ctx.fillText("GAME OVER", 135, 330);
    }
    
    if (constants.score >= winningScore && constants.enemies.length === 0) {
        constants.ctx.fillStyle = "black";
        constants.ctx.font = "60px Arial";
        constants.ctx.fillText("Level Complete", 130, 300);
        constants.ctx.font = "30px Arial";
        constants.ctx.fillText("Yay", 134, 340);
    }
}














function animate() {
    constants.ctx.clearRect(0, 0, canvas.width, canvas.height);
    constants.ctx.fillStyle = "blue";
    // constants.ctx.fillStyle = random_rgba();
    constants.ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
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



function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
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

// eplace the if keyword with return, no need to nest extra




// place defenders
canvas.addEventListener("click", function() {
    // find out how this works..
    const gridPositionX = constants.mouse.x - (constants.mouse.x % constants.cellSize) + constants.cellGap;
    const gridPositionY = constants.mouse.y - (constants.mouse.y % constants.cellSize) + constants.cellGap;
    // end if clicked on top toolbar display
    if (gridPositionY < constants.cellSize) return;
    // end if defender already exist in same position
    for (const defender of constants.defenders) {
        if (defender.x === gridPositionX && defender.y === gridPositionY) {
            return;
        }
    }

    let defenderCost = 100;
    if (constants.numberOfResources >= defenderCost) {
        constants.defenders.push(new Defender(gridPositionX, gridPositionY));
        constants.numberOfResources -= defenderCost;
        console.log("it works");
    } else {
        constants.floatingMessages.push(new floatingMessage("Need more resources!",
            constants.mouse.x,
            constants.mouse.y,
            20, "blue"))
    }
})








import { test } from './testing.js';
test();