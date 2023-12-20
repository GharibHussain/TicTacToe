import Board from "./Board.jsx";
import { useEffect, useState } from 'react'
import GameOver from "./GameOver.jsx";
import GameState from "./GameState.js";
import Reset from "./Reset.jsx";

import gameOverSoundAsset from '../sounds/game_over.wav';
import clickSoundAsset from '../sounds/tile_click.wav';

const PLAYER_X = 'X';
const PLAYER_O = 'O';

const WINNING_COMBINATIONS = [
    //rowa
    {combo: [0, 1, 2], strikeClass: 'strike-row-1'},
    {combo: [3, 4, 5], strikeClass: 'strike-row-2'},
    {combo: [6, 7, 8], strikeClass: 'strike-row-3'},

    //columns
    {combo: [0, 3, 6], strikeClass: 'strike-column-1'},
    {combo: [1, 4, 7], strikeClass: 'strike-column-2'},
    {combo: [2, 5, 8], strikeClass: 'strike-column-3'},

    //diagonals
    {combo: [0, 4, 8], strikeClass: 'strike-diagonal-1'},
    {combo: [2, 4, 6], strikeClass: 'strike-diagonal-2'},
]

function checkWinner(tiles, setStrikeClass, setGameState) {
    for (const { combo, strikeClass } of WINNING_COMBINATIONS){
        const tileVaue1 = tiles[combo[0]]; // the 1st element (X or O)
        const tileVaue2 = tiles[combo[1]]; // the 2nd element (X or O)
        const tileVaue3 = tiles[combo[2]]; // the 3rd element (X or O)

        if (tileVaue1 !== null && tileVaue1 === tileVaue2 && tileVaue1 === tileVaue3) { 
            setStrikeClass(strikeClass);
            if (tileVaue1 === PLAYER_X) {
                setGameState(GameState.playerXWins);
            } else {
                setGameState(GameState.playerOWins);
            }
            return; // this return will prevent 2 winners at the same time
        }
    }

    const allTilesClicked = tiles.every((tile)=> tile !== null);
    if (allTilesClicked) {
        setGameState(GameState.draw);
    }
}


function TicTacToe() {

    const [tiles, setTiles] = useState(Array(9).fill(null));
    const [playerTurn, setPlayerTurn] = useState(PLAYER_X);
    const [strikeClass, setStrikeClass] = useState(null); 
    const [gameState, setGameState] = useState(GameState.inProgress);

    
    
    useEffect(() => { checkWinner(tiles, setStrikeClass, setGameState)}, [tiles]);

    const handleTileClick = (index) => {
        // don't allow a tile to be clicked if the game is over
        if (gameState !== GameState.inProgress) {
            return;
        }

        if (tiles[index] !== null) {
            return;
        }
        const newTiles = [...tiles];    // create a copy of the tiles array
        newTiles[index] = playerTurn;   // set the value of the clicked tile to the current player's turn
        setTiles(newTiles);             // update the tiles array

        if (playerTurn === PLAYER_X) {
            setPlayerTurn(PLAYER_O);    // set the next player's turn
        } else {
            setPlayerTurn(PLAYER_X);
        }
    }

    // play a sound when a tile is clicked
    useEffect( () => {
        if (tiles.some((tile) => tile !== null)) {
            const audio = new Audio(clickSoundAsset);
            audio.play();
        }
    } , [tiles]);

    // play a sound when the game is over
    useEffect( () => {
        if (gameState !== GameState.inProgress) {
            const audio = new Audio(gameOverSoundAsset);
            audio.play();
        }
    } , [gameState]);

    const handleReset = () => {
        setGameState(GameState.inProgress);
        setTiles(Array(9).fill(null));
        setPlayerTurn(PLAYER_X);
        setStrikeClass(null);
    }

    return (
        <div>
            <h1>Tic Tac Toe</h1>
            <Board tiles={tiles} onTileClick={handleTileClick} playerTurn={playerTurn} strikeClass={strikeClass} />  
            <GameOver gameState={gameState} />
            <Reset gameState={gameState} onReset={handleReset} />
        </div>        
    )
}

export default TicTacToe;