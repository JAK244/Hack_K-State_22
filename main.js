//Called to make a move
function playCoin (column) {//return void
    //Check if column full
    if(coinsInColumn[column - 1] > 6){
        console.error(`Too many coins in column ${column}`);
        return;
    }
    
    //update the bitboard
    let row = coinsInColumn[column - 1];
    console.log(`${row}`)
    if (currentTurn == 'red') {
        board.red = board.red | toBitPosition(column, row);
    } else {
        board.blue = board.blue | toBitPosition(column, row);
    }

    //create HTML coin element (displays coin for user)
    const coin = document.createElement("div");
    coin.classList.add("coin");
    coin.style.backgroundColor = "var(--" + currentTurn + ")";
    coin.style.gridRow = 6 - coinsInColumn[column - 1] + 1;
    coinsInColumn[column - 1] += 1;
    coin.style.gridColumn = column;
    
    //Prepares for next move
    togglePlayer();//alternate player
    addMoveHistory(column);//pushes move to history
    document.getElementById("board").appendChild(coin);
    checkWin();
}

//Converts column/row positiion to a number representing a bitboard position
function toBitPosition (column, row) {
    let bitVal = 0x000000000000001;
    bitVal = bitVal << (column - 1) * 8;
    bitVal = bitVal << row;
    return bitVal;
}

function undoLastMove () {

}

function addMoveHistory (column) {
    moveQueue.push(column);
}

//changes active player
function togglePlayer () {
    if (currentTurn == 'red') {
        currentTurn = 'blue';
    } else {
        currentTurn = 'red';
    }
}

function readBoard() {
    //read red
    //read blue

}

function checkWin (board) {
    if(findLongestChain(board.red) > 3)
    {
        return "red wins"
    }
    
    if(findLongestChain(board.blue) > 3)
    {
        return "blue wins"
    }

    if(board.red | board.blue == 2139062143 )
    {
       return "draw"
    }


   
    //check blue for wins
    //check if board full (draw)
    //return result
}

let coinsInColumn = [0, 0, 0, 0, 0, 0, 0];
let moveQueue = [];
let board = {red: 0, blue: 0};
let currentTurn = 'red';

//Finds the longest chain on the board
function findLongestChain(board) {
    let longestChain = 0;
    for (let i = 0; i < 64; i++) {
        if ((board >> i) & 0x01) {
            let j = 0;
            let chain = 1;
            while((board >> i + j) & 0x01) {
                j++;
                chain++;
            }
            if (longestChain < chain) longestChain = chain;
            j = 0;
            while((board >> i + j) & 0x01){
                j += 8;
                chain++;
            }
            if(longestChain < chain) longestChain = chain;

            j = 0;
            while((board >> i + j) & 0x01){
                j += 9;
                chain++;
            }
            if(longestChain < chain) longestChain = chain;
        }
    }
}