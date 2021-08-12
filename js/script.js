const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
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

canvas.addEventListener("mousedown", function() {
    mouse.clicked = true;
})

canvas.addEventListener("mouseup", function() {
    mouse.clicked = false;
})


let canvasPosition = canvas.getBoundingClientRect();
console.log(canvasPosition);
canvas.addEventListener("mousemove", function(event) {
    mouse.x = event.x - canvasPosition.left;
    mouse.y = event.y - canvasPosition.top;

})

canvas.addEventListener("mouseleave", function() {
    mouse.x = undefined;
    mouse.y = undefined;
})

// game board
const controlsBar = {
    width: canvas.width,
    height: cellSize,
}

class Cell {
    constructor(x, y,) {
        this.x = x;
        this.y = y;
        this.width = cellSize;
        this.height = cellSize;
    }

    draw() {
        // make sure mouse has a position and it's colliding
        if (mouse.x && mouse.y && collision(this, mouse)) {
            ctx.strokeStyle = "black";
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
    }
}

function createGrid() {
    for (let y = cellSize; y < canvas.height; y += cellSize) {
        for (let x = 0; x < canvas.width; x += cellSize) {
            gameGrid.push(new Cell(x, y));
        }
    }
}
createGrid();

function handleGameGrid() {
    for (let i = 0; i < gameGrid.length; i++) {
        gameGrid[i].draw();
    }
}

// DEFENDERS
const defender1 = new Image();
defender1.src = "./assets/sprites/plant.png";
const defender2 = new Image();
defender2.src = "./assets/sprites/red.png";


class Defender {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
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
        // ctx.fillStyle = "blue";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 5);


        if (this.chosenDefender === 1) {
            // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
            ctx.drawImage(defender1,
                this.frameX * this.spriteWidth,
                0,
                this.spriteWidth,
                this.spriteHeight,
                this.x,
                this.y,
                this.width, this.height);
        } else if (this.chosenDefender === 2) {
            ctx.drawImage(defender2,
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
        if (frame % 50 === 0) {
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
            projectiles.push(new Projectile(this.x + 70, this.y + 50));
            this.shootNow = false;
        }
    }
}

function handleDefenders() {
    for (let i = 0; i < defenders.length; i++) {
        defenders[i].draw();
        defenders[i].update();
        if (enemyPositions.indexOf(defenders[i].y) !== -1) {
            defenders[i].shooting = true;
        } else {
            defenders[i].shooting = false;
        }

        for (let j = 0; j < enemies.length; j++) {
            if (defenders[i] && collision(defenders[i], enemies[j])) {
                enemies[j].movement = 0;
                defenders[i].health -= 0.2;
            }

            if (defenders[i] && defenders[i].health <= 0) {
                defenders.splice(i, 1);
                i--;
                enemies[j].movement = enemies[j].speed;
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

    if (collision(mouse, card1) && mouse.clicked) {
        chosenDefender = 1;
    } else if (collision(mouse, card2) && mouse.clicked) {
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

    ctx.lineWidth = 1;
    ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
    ctx.fillRect(card1.x, card1.y, card1.width, card1.height);
    ctx.strokeStyle = card1stroke;
    ctx.strokeRect(card1.x, card1.y, card1.width, card1.height);
    ctx.drawImage(defender1, 0, 0, 167, 243, 0, 5, 167/3, 243/3)


    ctx.fillRect(card2.x, card2.y, card2.width, card2.height);
    ctx.strokeStyle = card2stroke;
    ctx.strokeRect(card2.x, card2.y, card2.width, card2.height);
    ctx.drawImage(defender2, 0, 0, 167, 243, 80, 5, 167/3, 243/3)
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
        this.width = cellSize - cellGap * 2;
        this.height = cellSize - cellGap * 2;
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
        if (frame % 8 === 0) {
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = this.minFrame;
        }

    }

    draw() {
        // ctx.fillStyle = "red";
        // ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.font = "30px Arial";
        ctx.fillText(Math.floor(this.health), this.x + 15, this.y + 25);
        // ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
        ctx.drawImage(this.enemyType,
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
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].update();
        enemies[i].draw();
        if (enemies[i].x < 0) {
            gameOver = true;
        }

        if (enemies[i].health <= 0) {
            let gainedResources = enemies[i].maxHealth / 10;
            numberOfResources += gainedResources;
            score += gainedResources;

            floatingMessages.push(new floatingMessage("+" + gainedResources,
                enemies[i].x,
                enemies[i].y,
                30, "black"));
            floatingMessages.push(new floatingMessage("+" + gainedResources,
                250,
                50,
                30, "gold"));


            enemyPositions.splice(enemyPositions.indexOf(enemies[i].y), 1);
            enemies.splice(i, 1);
            i--;
        }
    }

    if (frame % enemiesInterval === 0 && score < winningScore) {
        let verticalPosition = Math.floor(Math.random() * 5 + 1) * cellSize + cellGap;
        enemies.push(new Enemy(verticalPosition));
        enemyPositions.push(verticalPosition);
        if (enemiesInterval > 120) {
            enemiesInterval -= 100;
        }
        console.log(enemyPositions);
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
        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleProjectiles() {
    for (let i = 0; i < projectiles.length; i++) {
        projectiles[i].update();
        projectiles[i].draw();


        for (let j = 0; j < enemies.length; j++) {
            if (enemies[j] && projectiles[i] && collision(projectiles[i], enemies[j])) {
                enemies[j].health -= projectiles[i].power;
                projectiles.splice(i , 1);
                i--;
            }
        }

        if (projectiles[i] && projectiles[i].x > canvas.width - cellSize) {
            projectiles.splice(i, 1);
            i--;
        }
        console.log("projectiles " + projectiles.length)
    }
}




// resources
const amounts = [20, 30, 40];
class Resource {
    constructor() {
        this.x = Math.random() * (canvas.width - cellSize);
        this.y = (Math.floor(Math.random() * 5) + 1) * cellSize + 25;
        this.width = cellSize * 0.6;
        this.height = cellSize * 0.6;
        this.amount = amounts[Math.floor(Math.random() * amounts.length)];

    }

    draw() {
        ctx.fillStyle = "yellow";
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "black";
        ctx.font = "20px Arial";
        ctx.fillText(this.amount, this.x + 15, this.y + 25);
    }
}
const winningScore = 50;
const resources = [];
function handleResources() {
    if (frame % 500 === 0 && score < winningScore) {
        resources.push(new Resource());
    }

    for (let i = 0; i < resources.length; i++) {
        resources[i].draw();
        if (resources[i] && mouse.x && mouse.y && collision(resources[i], mouse)) {
            numberOfResources += resources[i].amount;
            floatingMessages.push(new floatingMessage("+" + resources[i].amount,
            resources[i].x,
            resources[i].y,
            30, "black"));
            floatingMessages.push(new floatingMessage("+" + resources[i].amount,
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
const floatingMessages = [];
class floatingMessage {
    constructor(message, x, y, size, color) {
        this.message = message;
        this.x = x;
        this.y = y;
        this.size = size;
        this.lifeSpan = 0;
        this.color = color;
        this.opacity = 1;
    }

    update() {
        this.y -= 0.3;
        this.lifeSpan += 1;
        if (this.opacity > 0.03) this.opacity -= 0.03;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.font = this.size + "px Arial";
        ctx.fillText(this.message, this.x, this.y);
        ctx.globalAlpha = 1;
    }
} 

function handleFloatingMessages() {
    for (let i = 0; i < floatingMessages.length; i++) {
        floatingMessages[i].update();
        floatingMessages[i].draw();
        if (floatingMessages[i].lifeSpan >= 50) {
            floatingMessages.splice(i, 1);
            i--;
        }
    }
}








// UTILITIES 
function handleGameStatus() {
    ctx.fillStyle = "gold";
    ctx.font = "30px Arial";
    ctx.fillText("Resources: " + numberOfResources, 180, 40);
    ctx.fillText("Score: " + score, 180, 80);
    if (gameOver) {
        ctx.fillStyle = "black";
        ctx.font = "90px Arial";
        ctx.fillText("GAME OVER", 135, 330);
    }
    
    if (score >= winningScore && enemies.length === 0) {
        ctx.fillStyle = "black";
        ctx.font = "60px Arial";
        ctx.fillText("Level Complete", 130, 300);
        ctx.font = "30px Arial";
        ctx.fillText("Yay", 134, 340);
    }
}














function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "blue";
    // ctx.fillStyle = random_rgba();
    ctx.fillRect(0, 0, controlsBar.width, controlsBar.height);
    handleGameGrid();
    handleResources();
    handleDefenders();
    handleEnemies();
    handleProjectiles();
    chooseDefender()
    handleGameStatus();
    handleFloatingMessages();
    frame++;
    // console.log(frame);
    if (!gameOver) requestAnimationFrame(animate);
}
animate();



function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

function collision(first, second) {
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


window.addEventListener("resize", function() {
    canvasPosition = canvas.getBoundingClientRect();
})


// place defenders
canvas.addEventListener("click", function() {
    // find out how this works..
    const gridPositionX = mouse.x - (mouse.x % cellSize) + cellGap;
    const gridPositionY = mouse.y - (mouse.y % cellSize) + cellGap;
    // end if clicked on top toolbar display
    if (gridPositionY < cellSize) return;
    // end if defender already exist in same position
    for (const defender of defenders) {
        if (defender.x === gridPositionX && defender.y === gridPositionY) {
            return;
        }
    }

    let defenderCost = 100;
    if (numberOfResources >= defenderCost) {
        defenders.push(new Defender(gridPositionX, gridPositionY));
        numberOfResources -= defenderCost;
        console.log("it works");
    } else {
        floatingMessages.push(new floatingMessage("Need more resources!",
            mouse.x,
            mouse.y,
            20, "blue"))
    }
})