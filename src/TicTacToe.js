import React from "react";
import Board from "./Board";

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const hasWon = function (tiles) {
  let hasWon = false;
  winningCombinations.forEach(([c1, c2, c3]) => {
    const isMatched =
      tiles[c1] && tiles[c1] === tiles[c2] && tiles[c1] === tiles[c3];
    hasWon = hasWon || isMatched;
  });
  return hasWon;
};

class TicTacToe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardDetails: ["", "", "", "", "", "", "", "", ""],
      currentPlayer: { name: "A", symbol: "X" },
      nextPlayer: { name: "B", symbol: "O" },
      isGameOver: false,
      movesCount: 0,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(tileId) {
    const { boardDetails, currentPlayer } = this.state;
    if (boardDetails[tileId] === "") {
      const updatedDetails = boardDetails.slice();
      updatedDetails[tileId] = currentPlayer.symbol;
      const hasOver = hasWon(updatedDetails);
      this.setState((state) => ({
        movesCount: state.movesCount + 1,
        boardDetails: updatedDetails,
        currentPlayer: state.nextPlayer,
        nextPlayer: state.currentPlayer,
        isGameOver: hasOver,
      }));
    }
  }

  render() {
    if (this.state.isGameOver) {
      return (
        <h1 style={{ textAlign: "center" }}>
          <br />
          Congratulations {this.state.nextPlayer.name}
          <br />
          <br />
          You Won!!!!
        </h1>
      );
    }
    if (this.state.movesCount === 9) {
      return (
        <h1 style={{ textAlign: "center" }}>
          <br />
          <br />
          <br />
          Game Draw
        </h1>
      );
    }
    return (
      <div>
        <h3 style={{ textAlign: "center" }}>
          Player {this.state.currentPlayer.name}'s turn
        </h3>
        <Board
          boardDetails={this.state.boardDetails}
          onClick={this.handleClick}
        />
      </div>
    );
  }
}

export default TicTacToe;
