import React, { useState } from "react";
import BoardBox from "./BoardBox";
import "./PlayBoard.css";

const PlayBoard = () => {
  const [box, setBox] = useState(Array(9).fill(null)); //first of all,all box values will bw null
  const [isXTurn, setXTurn] = useState(true); //it will decide whose turn next
  const [nextTurn, setNextTurn] = useState("X"); //this state showing next player: x or o
  const handleNextTurn = () => {
    {
      isXTurn ? setNextTurn("O") : setNextTurn("X");
    }
  };
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (box[index] != null || winner) {
      return;
    } //in this conditional statement->
    //the part box[index] != null ensures that if a box is filled with any value then user cannot change it again untill the game is finish
    //and the second part || winner -> defines that once a winner is found then no onace can do further moves
    console.log(index, "clicked");

    const newBox = [...box]; //here we make a copy of box

    newBox[index] = isXTurn ? "X" : "O"; //it will decide whose turn next if isXTurn is true then print X otherwise print O
    handleNextTurn();

    setBox(newBox);
    setXTurn(!isXTurn); //if isxturn is false then in this line that will be true and vice-versa

    const winnerCombination = checkWinner();
    if (winnerCombination) {
      setWinner(newBox[winnerCombination[0]]);
      setNextTurn(null); //if someone wins then it nevershows next player:
    }
  };
  const checkWinner = () => {
    const winningCombinantions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winningCombinantions.length; i++) {
      const [a, b, c] = winningCombinantions[i]; //destructuring a=1,b=1,c=2
      if (box[a] && box[a] === box[b] && box[b] === box[c]) {
        return winningCombinantions[i];
      }
    }
    return null;
  };
  const handleReset = () => {
    setBox(Array(9).fill(null));
    setWinner(null);
    setNextTurn("X");
  };
  return (
    <div className="main">
      <div className="board-row">
        <BoardBox index="0" handleClick={handleClick} box={box} />
        <BoardBox index="1" handleClick={handleClick} box={box} />
        <BoardBox index="2" handleClick={handleClick} box={box} />
      </div>
      <div className="board-row">
        <BoardBox index="3" handleClick={handleClick} box={box} />
        <BoardBox index="4" handleClick={handleClick} box={box} />
        <BoardBox index="5" handleClick={handleClick} box={box} />
      </div>
      <div className="board-row">
        <BoardBox index="6" handleClick={handleClick} box={box} />
        <BoardBox index="7" handleClick={handleClick} box={box} />
        <BoardBox index="8" handleClick={handleClick} box={box} />
      </div>
      <button className="resetButton" onClick={handleReset}>
        RESET
      </button>

      {nextTurn && <div className="NextPlayer-statement">Next player : {nextTurn}</div>}

      {winner && (
        <div className="win-statement">
          <span>{winner}</span> is winner of this game
        </div>
      )}
    </div>
  );
};

export default PlayBoard;
