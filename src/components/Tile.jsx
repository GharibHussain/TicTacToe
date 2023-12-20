
function Tile({ onTileClick, value, className, playerTurn }) {

    let hoverClass = null;
    if (value == null && playerTurn != null) {
        hoverClass = playerTurn.toLowerCase() + "-hover";
    }

    return <div onClick={onTileClick} className={'tile ' + className + " " + hoverClass} >{value}</div>;
}


export default Tile;