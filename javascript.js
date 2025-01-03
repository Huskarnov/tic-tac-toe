let gameboard = (function GameBoard(){ //data manager object

        let gameboardArray = ['n','n','n','n','n','n','n','n','n'];

        // 0 1 2    
        // 3 4 5
        // 6 7 8

        let multiPlayer = false;
        let player = 1;

        let playerOneScore = 0;
        let playerTwoScore = 0;

        let gameOn = true;

        const getArray = ()=>{return gameboardArray};

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
            console.log('Player 1 score:',playerOneScore);
            console.log('Player 2 score:',playerTwoScore);
        }


        const newGame = function(){
            for(let i = 8; i >=0; i-- ){
            gameboardArray[i] = 'n';

            }
            gameOn = true; 
            player = 1;

        }

        return {getArray, check, gameOver, newGame};
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

let domManager = function(){

    

}





gameboard.check(6);
gameboard.check(0);
gameboard.check(1);
gameboard.check(2);
gameboard.check(3);
gameboard.check(4);
gameboard.check(5);
gameboard.check(7);
gameboard.check(8);

gameboard.newGame()

gameboard.check(7);
gameboard.check(0);
gameboard.check(1);
gameboard.check(3);
gameboard.check(5);
gameboard.check(6);

gameboard.newGame()

gameboard.check(0);
gameboard.check(1);
gameboard.check(3);
gameboard.check(5);
gameboard.check(6);
gameboard.check(7);

