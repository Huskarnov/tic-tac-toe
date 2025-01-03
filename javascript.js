let gameboard = (function GameBoard(){ //data manager object

        let gameboardArray = ['n','n','n','n','n','n','n','n','n'];

        // 0 1 2    
        // 3 4 5
        // 6 7 8

        let multiPlayer = false;
        let player = 1;

        let playerOneScore = 0;
        let playerTwoScore = 0;

        let gameOn = false;

        const getArray = ()=>{return gameboardArray};
        const getPlayer = ()=>{return player};
        const getGameOn = ()=>{return gameOn};

        const check = function(index){
            
                if (player == 1){
                    gameboardArray[index] = 'X';
                    }else{
                    gameboardArray[index] = 'O';
                    }
                    
                    gameOver();
                    
                    player = (player == 1)? 2:1;
        }

        // 0 1 2    
        // 3 4 5
        // 6 7 8

        const gameOver = function(){ //used in CHECK()

                gridLogger();

                if(gameOn){ //check 3 rows, 3 collumns, 2 diagonals
                    if(     (gameboardArray[0] !== 'n' && gameboardArray[0] == gameboardArray[1] && gameboardArray[1] == gameboardArray[2]) ||
                            (gameboardArray[3] !== 'n' && gameboardArray[3] == gameboardArray[4] && gameboardArray[4] == gameboardArray[5]) ||
                            (gameboardArray[6] !== 'n' && gameboardArray[6] == gameboardArray[7] && gameboardArray[7] == gameboardArray[8]) ||

                            (gameboardArray[0] !== 'n' && gameboardArray[0] == gameboardArray[3] && gameboardArray[3] == gameboardArray[6]) ||
                            (gameboardArray[1] !== 'n' && gameboardArray[1] == gameboardArray[4] && gameboardArray[4] == gameboardArray[7]) ||
                            (gameboardArray[2] !== 'n' && gameboardArray[2] == gameboardArray[5] && gameboardArray[5] == gameboardArray[8]) ||

                            (gameboardArray[0] !== 'n' && gameboardArray[0] == gameboardArray[4] && gameboardArray[4] == gameboardArray[8]) ||
                            (gameboardArray[2] !== 'n' && gameboardArray[2] == gameboardArray[4] && gameboardArray[4] == gameboardArray[6])
                        ){

                            console.log(`Player ${player} WINS`);
                            addScore();
                            gameOn = false; 
                            domManager.showAlert();
                    }
                };
            
            if(gameOn){

                for(let i = 8; i >=0; i-- ){
                
                    if(gameboardArray[i] == 'n'){
                        break
                    }else{
                        if(i == 0){
                            console.log('game over: TIE');
                            gameOn = false; 

                        }
                    } 
                }
            };
        }

        const addScore = function(){ //used in check
            if(player == 1){
                playerOneScore++;
            }else{
                playerTwoScore++;
            }
            domManager.renderScore(playerOneScore, playerTwoScore);
            console.log('Player 1 score:',playerOneScore);
            console.log('Player 2 score:',playerTwoScore);
        }

        const clearArray = function(){
            for(let i = 8; i >=0; i-- ){
                gameboardArray[i] = 'n';
    
                }
        };

        const newGame = function(){
            clearArray();
            gameOn = true; 
            player = 1;
            playerOneScore = 0;
            playerTwoScore = 0;
        }

        const stopGame = function(){
            gameOn = false;
        }
        const startGame = function(){
            gameOn = true;
        }

        return {getPlayer,getArray, getGameOn,check, gameOver, newGame, stopGame, startGame, clearArray};
})();

// ////////////////////////////////////////////////////////////////
    const getGrid = function(){
        let [x, y, z, v, b, c, g, h, j] = gameboard.getArray();
            return {x,y,z,v,b,c,g,h,j}
        }

    const gridLogger = function(){
        console.log(getGrid().x, getGrid().y, getGrid().z);
        console.log(getGrid().v, getGrid().b, getGrid().c);
        console.log(getGrid().g, getGrid().h, getGrid().j);
        console.log('----------------------');
        };
// ////////////////////////////////////////////////////////////////

let domManager = (function(){

    const gameSpace = document.querySelector('.gameSpace');
    const stop = document.querySelector('.stop');
    const newGameButton = document.querySelector('.gameSpace>button');
    const theGameGrid = document.querySelector('.gameGrid');
    const scorePannel = document.querySelector('.score');
    const scoreOne = document.querySelector('.scorePannel div:nth-child(1) p');
    const scoretwo = document.querySelector('.scorePannel div:nth-child(2) p');
    const alert = document.querySelector('.alert');
    const arrayOfGridItems = (document.querySelector('.gameGrid')).children;

    
    
    //set tiles click event
    for( let i = 8; i >= 0; i--){ 
        (arrayOfGridItems[i]).addEventListener('click', ()=>{
            
            if(gameboard.getGameOn() && arrayOfGridItems[i].innerHTML == ''){
            if(gameboard.getPlayer() == 1){
                arrayOfGridItems[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 24 24"><path fill="currentColor" d="M20 6.91L17.09 4L12 9.09L6.91 4L4 6.91L9.09 12L4 17.09L6.91 20L12 14.91L17.09 20L20 17.09L14.91 12z"/></svg>`;
                arrayOfGridItems[i].style.color = 'red';
            }else{
                arrayOfGridItems[i].innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="150px" height="150px" viewBox="0 0 24 24"><path fill="currentColor" d="M12 20a8 8 0 0 1-8-8a8 8 0 0 1 8-8a8 8 0 0 1 8 8a8 8 0 0 1-8 8m0-18A10 10 0 0 0 2 12a10 10 0 0 0 10 10a10 10 0 0 0 10-10A10 10 0 0 0 12 2"/></svg>`;
                arrayOfGridItems[i].style.color = 'blue';
            };

            gameboard.check(i);
            if(gameboard.getPlayer() == 1){
                theGameGrid.style.cursor = 'url(cursors/crossCursor.png), auto';
            }else{
            theGameGrid.style.cursor = 'url(cursors/circleCursor.png), auto';
            };
                };
            }
        );
    }

    //new game event
    newGameButton.addEventListener('click', ()=>{
        newGameButton.style.display = 'none';
        stop.style.display = 'block';
        scorePannel.style.display = 'flex';
        gameboard.newGame();

        if(gameboard.getPlayer() == 1){
            theGameGrid.style.cursor = 'url(cursors/crossCursor.png), auto';
        }else{
        theGameGrid.style.cursor = 'url(cursors/circleCursor.png), auto';
        };

        
    });

    //stop event
    stop.addEventListener('click', ()=>{

        if(gameboard.getGameOn() == true){
            stop.style.display = 'none';
        newGameButton.style.display = 'block';
        scorePannel.style.display = 'none';
        

        gameboard.newGame();
        gameboard.stopGame();

        clearBoard();

        }
        

    });
    
    alert.addEventListener('click', ()=>{
        alert.style.display = 'none';
        gameSpace.style.filter = 'blur(0)';

        for(let i = 8; i >= 0; i--){
            arrayOfGridItems[i].innerHTML = '';
        }
        gameboard.startGame();
        gameboard.clearArray();

    });

    const clearBoard = function(){
        for(let i = 8; i >= 0; i--){
            arrayOfGridItems[i].innerHTML = '';
        }
        scoreOne.innerHTML = '0';
        scoretwo.innerHTML = '0';

        theGameGrid.style.cursor = 'default';
        
    };

    const renderScore = function(scorePone, scorePtwo){
            scoreOne.innerHTML = scorePone.toString();
            scoretwo.innerHTML = scorePtwo.toString();
    };

    const showAlert = function(){
        
        if(gameboard.getPlayer() == 1){
            alert.style.color = 'red';
        }else{
            alert.style.color = 'blue';
        };

        alert.style.display = 'block';
        gameSpace.style.filter = 'blur(11px)';
    };

    return {renderScore, showAlert};
})()







// gameboard.check(6);
// gameboard.check(0);
// gameboard.check(1);
// gameboard.check(2);
// gameboard.check(3);
// gameboard.check(4);
// gameboard.check(5);
// gameboard.check(7);
// gameboard.check(8);

// gameboard.newGame()

// gameboard.check(7);
// gameboard.check(0);
// gameboard.check(1);
// gameboard.check(3);
// gameboard.check(5);
// gameboard.check(6);

// gameboard.newGame()

// gameboard.check(0);
// gameboard.check(1);
// gameboard.check(3);
// gameboard.check(5);
// gameboard.check(6);
// gameboard.check(7);

