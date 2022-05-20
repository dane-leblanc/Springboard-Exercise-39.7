import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
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

function Board({ nrows = 5, ncols = 5, chanceLightStartsOn = 0.5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = [];
    // TODO: create array-of-arrays of true/false values
    for (let height = 0; height < nrows; height++) {
      let row = [];
      for (let width = 0; width < ncols; width++) {
        let randomNum = Math.random();
        randomNum < chanceLightStartsOn ? row.push(true) : row.push(false);
      }
      initialBoard.push(row);
    }
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    for (let row of board) {
      for (let cell of row) {
        if (cell === true) return false;
      }
    }
    return true;
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          // flip this cell from true to false or false to true
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map((row) => [...row]);

      // TODO: in the copy, flip this cell and the cells around it
      flipCell(y, x, newBoard);
      flipCell(y, x - 1, newBoard);
      flipCell(y, x + 1, newBoard);
      flipCell(y - 1, x, newBoard);
      flipCell(y + 1, x, newBoard);
      // TODO: return the copy
      return newBoard;
    });
  }

  // if the game is won, just show a winning msg & render nothing else

  // TODO
  if (hasWon()) {
    return <div>WINNER!!!</div>;
  }

  // make table board

  // TODO
  let tableBoard = [];

  for (let y = 0; y < nrows; y++) {
    let row = [];
    for (let x = 0; x < ncols; x++) {
      let coord = `${y}-${x}`;
      row.push(
        <Cell
          key={coord}
          isLit={board[y][x]}
          flipCellsAroundMe={() => flipCellsAround(coord)}
        />
      );
    }
    tableBoard.push(<tr key={y}>{row}</tr>);
  }
  return (
    <table className="Board">
      <tbody>{tableBoard}</tbody>
    </table>
  );
}

export default Board;
