import GameState
 from "./GameState";
function GameOver({ gameState }) {
    switch (gameState) {
        case GameState.inProgress: // 3
            return <></>;

        case GameState.playerXWins: // 0
            return (
                <div className='game-over'>X Wins</div>
            );

        case GameState.playerOWins: // 1
            return (
                <div className='game-over'>O Wins</div>
            );

        case GameState.draw: // 2
            return (
                <div className='game-over'>Draw</div>
            );
        
        default:
            return (
                <></>
            );

    }
}

export default GameOver;