import React, {useState} from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Intro to game: " 5 × 5 board of buttons, each of which can be lit
or unlit."
 * 
 * Properties:
 *
 * - nrows: number of rows of board
 *    nrows = 5 => y (height)
 * - ncols: number of cols of board
 *    ncols = 5 => x (width)
 * - chanceLightStartsOn: float, chance any cell is lit at start of game 50:50?
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({nrows=5, ncols=5, chanceLightStartsOn=0.5}) {
    const [board,setBoard]=useState(createBoard());

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        let initialBoard=[];
        // DONE: create array-of-arrays of true/false values
        for(let y=0; y <nrows; y++) {
            let row=[];
            for(let x=0; x <ncols; x++) {
                row.push(Math.random() <chanceLightStartsOn);
            }
            initialBoard.push(row);
        }
        return initialBoard;
    }

    function hasWon() {
        // DONE: check the board in state to determine whether the player has won.
        return board.every(row => row.every(cell => !cell));
    }

    function flipCellsAround(coord) {
        setBoard(oldBoard => {
            const [y,x]=coord.split("-").map(Number);

            const flipCell=(y,x,boardCopy) => {
                // if this coord is actually on board, flip it

                if(x >= 0 && x <ncols && y >= 0 && y<nrows) {
                    boardCopy[y][x]=!boardCopy[y][x];
                }
            };

            // DONE: Make a (deep) copy of the oldBoard
            let boardCopy = oldBoard.map(row => [row]);

            // DONE: in the copy, flip this cell and the cells around it
            flipCell(y, x, boardCopy);
            flipCell(y, x+1, boardCopy);
            flipCell(y, x-1, boardCopy);
            flipCell(y+1, x, boardCopy);
            flipCell(y-1, x, boardCopy);

            // DONE: return the copy
            return boardCopy;
        });
    }

    // if the game is won, just show a winning msg & render nothing else

    // TODO
    if(hasWon()) {
        return (
            <div>You Won!</div>
        );
    }

    // make table board
    // let {tBoard,row}=[];
    let tBoard = [];
    let row =[];
    for(let y = 0; y <nrows; y++) {
        for(let x = 0; x <ncols; x++) {
            let coord=`${y}-${x}`;
            row.push(
                <Cell
                    key={coord}
                    isLit={board[y][x]}
                    flipCellsAroundMe={() => flipCellsAround(coord)}
                />
            );
        }
        tBoard.push(<tr key={y}>{row}</tr>)
    }

    // TODO
    return (
        <div className="Board">
        <tbody>{tBoard}</tbody>
        </div>
    );
}

export default Board;