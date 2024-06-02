//******************************** Decleartion of required variables *****************************************
const canvas = document.getElementById('drawingBoard');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');
const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;
canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;
let isPainting = false;
let lineWidth = 5;
let startX;
let startY;


//****************************************** addEventListener function for click ******************************
toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});

//****************************************** addEventListener function for change *****************************
toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
    }
    if(e.target.id === 'LineWidth') {
        lineWidth = e.target.value;
    }
    
});

//******************************************* draw function ***************************************************
const draw = (e) => {
    if(!isPainting) {
        return;
    }
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    //**************************************** Moving to the starting position *********************************
    ctx.moveTo(startX - canvasOffsetX, startY - canvasOffsetY);
    //**************************************** Draw anything which you want current mouse position *************
    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - canvasOffsetY);
    ctx.stroke();
    //**************************************** Updation the starting position for the next segment *************
    startX = e.clientX;
    startY = e.clientY;
}

//****************************************** addEventListener function for mousedownb ********************************
canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

//****************************************** addEventListener function for mouseup ***********************************
canvas.addEventListener('mouseup', e => {
    isPainting = false;
    //**************************************** Reset the all drowing *************************************************
    ctx.beginPath();
});

//****************************************** addEventListener function for mousemove *********************************
canvas.addEventListener('mousemove', draw);