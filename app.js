const gameArea = document.querySelector('#gamearea');
const scoreDisplay = document.querySelector('#score');
const gameSize = 15;
const lasers = [];
const deadLasers = [];
let playerLocation = 202;
let direction = 1;
let score = 0;
const baddies = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
                15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
                30, 31, 32, 33, 34, 35, 36, 37, 38, 39];

function handleLasers(){
    cells.forEach(cell => cell.classList.remove('laser'));                          //Removes all existing lasers before updating
    if(lasers.length){                                                              //Makes sure we got lasers to process
        for(let i = 0; i < lasers.length; i++){                                     //Moves every laser to its new position
            lasers[i] -= gameSize;                                      
        }
        lasers.forEach((laser, index) => laser < 0 ? deadLasers.push(index) : cells[laser].classList.add('laser')); //Renders lasers and saves off-grid lasers for removal
        deadLasers.forEach(dead => {                                                
            lasers.splice(dead, 1);                                                 //Removes every laser that's traveled off-screen from the array
            deadLasers.shift();                                                     //Clears removed lasers from to-remove array
        })
    }
}

function generateBaddies(){
    cells.forEach(cell => cell.classList.remove('enemy'));
    if(baddies[0] % gameSize === 0 && direction === -1){                            // If aliens hit the left, move down a row and reverse direction
        direction = 1;
        for(let i = 0; i < baddies.length; i++){
            baddies[i] += gameSize; 
        }
    }
    else if((baddies[baddies.length - 1] + 1) % 15 === 0 && direction === 1){
        direction = -1;
        for(let i = 0; i < baddies.length; i++){
            baddies[i] += gameSize;
        }
    }
    baddies.forEach(baddie => {
        cells[baddie].classList.add('enemy');
    });
                for(let i = 0; i < baddies.length; i++){
                    baddies[i] += direction;
                }
}

function generateBoard(){
    for(let i = 0; i < gameSize * gameSize; i++){
        const newDiv = document.createElement('div');
        newDiv.classList.add('cell');
        newDiv.textContent = i;
        gameArea.appendChild(newDiv);
    }
    return(document.querySelectorAll('.cell'));
}

function movePlayer(moveDirection){
    cells[playerLocation].classList.remove('player');
    if(moveDirection === 37 && playerLocation % gameSize !== 0){                    // Establishes left edge of player range
        playerLocation--;
    }
    else if(moveDirection === 39 && (playerLocation + 1) % gameSize !==0 ){         // Establishes right edge of player range
        playerLocation++;
    }
    drawPlayer();
}

function drawPlayer(){
    cells[playerLocation].classList.add('player');
}

function update(){
    drawPlayer();
    generateBaddies();
    handleLasers();
}


window.addEventListener('keydown', e => {
    if(e.keyCode === 37 || e.keyCode === 39){
        movePlayer(e.keyCode);
    }
    if(e.keyCode === 32){
        lasers.push(playerLocation);
        handleLasers();
    }
})

const cells = generateBoard();
const gamePlay = setInterval(update, 500);