import { constants } from './constants.js';

const aspectRatio = 3 / 2;
let canvasPosition;
let viewWidth;
let viewHeight;

const resizeCanvas = () => {
    canvasPosition = constants.canvas.getBoundingClientRect();
    // add some logic where if it's full screen then just normal window.innerWidth - 4
    // but if it's a smaller screen add more percentage to the 0.1
    // then assign the extra space to the divs?
    viewWidth = window.innerWidth - (window.innerWidth * 0.1);
    viewHeight = window.innerHeight - 4;



    if (viewWidth / aspectRatio > viewHeight) {
        viewWidth = viewHeight * aspectRatio;
    } else {
        viewHeight = viewWidth / aspectRatio;
    }

    constants.canvas.style.width = viewWidth + "px";
    constants.canvas.style.height = viewHeight + "px";
}

const updateMousePosition = event => {
    canvasPosition = constants.canvas.getBoundingClientRect();
    let WIDTH_SIZE_CHANGE = viewWidth / constants.logicDimensions.width;
    let HEIGHT_SIZE_CHANGE = viewHeight / constants.logicDimensions.height;

    constants.mouse.x = (event.x - canvasPosition.left)/WIDTH_SIZE_CHANGE;
    constants.mouse.y = (event.y - canvasPosition.top)/HEIGHT_SIZE_CHANGE;
}


export const startEventListeners = () => {
    // resizing
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // mouse
    constants.canvas.addEventListener("mousemove", updateMousePosition);

    constants.canvas.addEventListener("mouseleave", () => {
        constants.mouse.x = undefined;
        constants.mouse.y = undefined;
    })

    constants.canvas.addEventListener("mousedown", () => {
        constants.mouse.clicked = true;
    })

    constants.canvas.addEventListener("mouseup", () => {
        constants.mouse.clicked = false;
    })
}