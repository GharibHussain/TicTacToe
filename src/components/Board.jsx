
import Strike from "./Strike.jsx";
import Tile from "./Tile.jsx"

function Board({ tiles, onTileClick, playerTurn, strikeClass}) {
    return (
        <div className="board">
            <Tile onTileClick={()=> onTileClick(0)} value={tiles[0]} className="right-border bottom-border" playerTurn={playerTurn} />
            <Tile onTileClick={()=> onTileClick(1)} value={tiles[1]} className="right-border bottom-border" playerTurn={playerTurn} />
            <Tile onTileClick={()=> onTileClick(2)} value={tiles[2]} className="bottom-border" playerTurn={playerTurn} />

            <Tile onTileClick={()=> onTileClick(3)} value={tiles[3]} className="right-border bottom-border" playerTurn={playerTurn} />
            <Tile onTileClick={()=> onTileClick(4)} value={tiles[4]} className="right-border bottom-border" playerTurn={playerTurn} />
            <Tile onTileClick={()=> onTileClick(5)} value={tiles[5]} className="bottom-border" playerTurn={playerTurn} />

            <Tile onTileClick={()=> onTileClick(6)} value={tiles[6]} className="right-border" playerTurn={playerTurn} />
            <Tile onTileClick={()=> onTileClick(7)} value={tiles[7]} className="right-border" playerTurn={playerTurn} />
            <Tile onTileClick={()=> onTileClick(8)} value={tiles[8]} playerTurn={playerTurn} />
            <Strike strikeClass={strikeClass} />
    </div>
    
    )
}

export default Board;