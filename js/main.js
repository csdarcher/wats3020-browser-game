/* WATS 3020 Browser Game project */
/* Build a tic tac toe game for two players. */


class Player {
  constructor(token){
   this.token = token; 
  }
}

// Tic Tac Toe Game Class
class TicTacToe {
    constructor(){
        // Code for the different player classes that also assigns them identifying icons.
        this.player1 = new Player ('heart');
        this.player2 = new Player ('star');

        // Properties that will be used to track game progress.
        this.currentPlayer = null;
        this.gameStatus = null;
        this.winner = null;
        this.moveCount = 0;
        
        // Below are the DOM elements used in the game.
        this.startPrompt = document.querySelector('#start-prompt');
        this.movePrompt = document.querySelector('#move-prompt');
        this.currentPLayerToken = document.querySelector('#player-token');   
        this.gameboard = document.querySelector('#gameboard');
        this.winScreen = document.querySelector('#win-screen');  
        this.winnerToken = document.querySelector('#winner-token');  
        this.drawScreen = document.querySelector('#draw-screen'); 
      
      
        // Initialize an Array representing the starting state of the game board.
        // This is provided for you. We can access the spaces on the board using
        // (X, Y) coordinates as `this.gameState[x][y]`, which is how the game
        // will check to see if the winner is known.
        this.gameState = [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ];

        // Array of Win States
        // This is provided for you. Each of these arrays represents the ways
        // a player can win Tic Tac Toe. Each item in the array is another
        // array. Each of those arrays contains a set of (X, Y) coordinates.
        // If a player has claimed the tile at each of the coordinates listed in
        // one of the win states, then they have won the game.
        this.winStates = [
          [[0,0],[0,1],[0,2]],
          [[1,0],[1,1],[1,2]],
          [[2,0],[2,1],[2,2]],
          [[0,0],[1,0],[2,0]],
          [[0,1],[1,1],[2,1]],
          [[0,2],[1,2],[2,2]],
          [[0,0],[1,1],[2,2]],
          [[0,2],[1,1],[2,0]]
        ];
    }

    // This `checkForWinner()` method is provided for you, but you must fill in
    // the event dispatch lines that cause the end game screens to show.
    checkForWinner(){
        console.log('Checking for winner.');
        for (let condition of this.winStates){
            let winningCondition = true;
            for (let position of condition){
                if (this.gameState[position[0]][position[1]] != this.currentPlayer.token) {
                    winningCondition = false;
                }
            }
            if (winningCondition) {
                console.log('We have a winner!');
                console.log(`Condition is: ${condition}`);
                this.gameStatus = 'won';
                this.winner = this.currentPlayer;

                // If we've gotten here, then we need to create a  `win` event and
                // dispatch it.

                // Dispatches the signal "win".
                let winEvent = new Event ('win');
                document.dispatchEvent(winEvent);
              
                return true; // Return a value to stop processing the additional move count check.
            }
        }
        this.moveCount++;
        console.log(`Reviewed move ${this.moveCount}.`);
        if (this.moveCount >= 9) {
            console.log(`This game is a draw at ${this.moveCount} moves.`);
            this.gameStatus = 'draw';

            // Dispatches the signal "draw".
            let drawEvent = new Event ('draw');
            document.dispatchEvent(drawEvent);
        }
    }

    recordMove(event){
        console.log('Recording move.');
        // This method handles recording a move in the `this.gameState` property.

      
        let tileX = event.target.dataset.x;
        let tileY = event.target.dataset.y;
        this.gameState[tileX][tileY] = this.currentPlayer.token;
        event.target.setAttribute('class', `tile played glyphicon glyphicon-${this.currentPlayer.token}`);
      
    }
    switchPlayer(){
        console.log('Switching player.');
        // This method handles switching between players after each move.
        // It must determine who the current player is, and then switch to the
        // other player. After that, it must set the class on the
        // `this.currentPlayerToken` property to show the proper class.

        if (this.currentPlayer === this.player1){
          this.currentPlayer = this.player2;
        } else {
            this.currentPlayer = this.player1;
        }
      
        this.currentPLayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPlayer.token}`);
    }
  
    setUpTileListeners(){
        console.log('Setting Up Tile Listeners.');
        // This method sets up event listeners for tiles. It is called when we
        // start a new game. It must find all the tiles and apply event listeners
        // to them.
        

        let tileElements = document.querySelectorAll('.tile');
        for (let tile of tileElements){
          tile.addEventListener('click', handleMove);
        }
    }
    showWinScreen(){
        // This method displays the end game screen for a Win.
        console.log('Showing win screen.');
        this.winScreen.setAttribute('class', 'show');

        this.winnerToken.setAttribute('class', `glyphicon ${this.winner.token}`);
    }
  
    showDrawScreen(){
        // This method displays the end game screen for a Draw.

        this.drawScreen.setAttribute('class', 'show');
    }
  
    setUpBoard(){
        console.log('Gameboard is working.');
        this.gameboard.innerHTML = '';
        // We must draw the game board by using a loop to create rows with
        // tiles in them. We want to create the same structure as we see in the
        // index.html file.


        for (let i=0; i<3; i++){    
            let newRow = document.createElement('div');
            newRow.setAttribute('class', 'row');
           
          for (let j=0; j<3; j++){  
                let newCol = document.createElement('div');
                newCol.setAttribute('class', 'col-xs-3');
                let newTile = document.createElement('span');
                newTile.setAttribute('class', 'tile glyphicon glyphicon-question-sign');
                newTile.dataset.x = i;
                newTile.dataset.y = j;

                newCol.appendChild(newTile);
                newRow.appendChild(newCol);

            }// End of second 'for' loop.

            // Append the 'newRow' element to the 'this.gameboard' as a child element.
            this.gameboard.appendChild(newRow);  
         
          
        }// End of first 'for" loop.

        // Calls `this.setUpTileListeners()` to add event listeners to the
        // `.tile` elements.
        this.setUpTileListeners();
    }
  
    initializeMovePrompt(){
        // This method initializes the `this.movePrompt` element.
        console.log('Initializing Move Prompt.');
        // TODO: Hide the `this.startPrompt` element by setting the `class`
        // attribute to "hidden".
        this.startPrompt.setAttribute('class', 'hidden');

        // TODO: Remove the "hidden" class from the `this.movePrompt` element.
        this.movePrompt.setAttribute('class', '');
        // TODO: Set `this.currentPlayer` equal to `this.player1`.
        this.currentPlayer = this.player1;
        
        // TODO: Set `this.currentPlayerToken` class equal to `glyphicon glyphicon-${this.currentPlayer.token}`
        this.currentPLayerToken.setAttribute('class', `glyphicon glyphicon-${this.currentPLayerToken}`);
    }
      
    start(){
        // This method handles the logic to create a new game. It primarily has
        // two duties in the basic version of the game:
        console.log('Starting game.');
        this.setUpBoard(); // Creates a new gameboard by calling `this.setUpBoard`
        this.initializeMovePrompt();
    }
} // End of the Tic Tac Toe Class definition.

// Outside of the Class definitions, we need a few items to control the game
// so our players can successfull play.

let game;
console.log('Start of game code.');
document.addEventListener('DOMContentLoaded', function(event){

    let startButton = document.querySelector('#start-button');
    startButton.addEventListener('click', function(event){

        game = new TicTacToe();
        game.start();// Calls the `start()` method of the `game` object.  
   
    }); // End of the `startButton` event listener.                      
                          
 }); // End of the "DOMContentLoaded" event listener.


  document.addEventListener('win', function(event){
    console.log('Detected win even.');
    game.showWinScreen();
  }); // NOTE: End of the "win" event listener.


  document.addEventListener('draw', function(event){
    console.log('Detected draw even.');
    game.showDrawScreen();
  }); // NOTE: End of the "draw" event listener.

// External function for event listeners provided for you.
function handleMove(event){
    console.log('Handling player move.');
    // Record the move for the current player.
    game.recordMove(event);

    // Check to see if the last move was a winning move.
    game.checkForWinner();

    // Rotate players.
    game.switchPlayer();
}
