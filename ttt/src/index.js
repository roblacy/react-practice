import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function getWinningValue(history) {
  const squares = history[history.length - 1].squares;
  const winningSquares = getWinningSquares(squares);
  if (winningSquares) {
    return squares[winningSquares[0]];
  }
  return null;
}

function getWinningSquares(squares) {
  const possibleWins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let row of possibleWins) {
    if (squares[row[0]] && squares[row[0]] === squares[row[1]] && squares[row[0]] === squares[row[2]]) {
      return row;
    }
  }
  return null;
}

class Square extends React.Component {
  render() {
    const classNames = `square ${this.props.isWinner ? 'winner' : ''}`;
    return (
      <button className={classNames} onClick={() => {
        this.props.onClick();
      }}>
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    const winningSquares = getWinningSquares(this.props.squares);
    const isWinner = winningSquares && winningSquares.indexOf(i) > -1;
    return <Square onClick={() => this.props.onClick(i)} value={this.props.squares[i]} key={i} isWinner={isWinner} />;
  }

  renderRow(rowNum) {
    return <div className="board-row" key={rowNum}>
      {[0, 1, 2].map(colNum => this.renderSquare(rowNum * 3 + colNum))}
    </div>
  }

  render() {
    return (
      <div>
        {[0, 1, 2].map(rowNum => this.renderRow(rowNum))}
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          nextPlayer: 'X',
        }
      ],
    };
  }

  get nextPlayer() {
    const history = this.state.history;
    return history[history.length - 1].nextPlayer;
  }

  calculateWinner() {
    return getWinningValue(this.state.history);
  }

  handleClick(i) {
    const history = this.state.history;
    const squares = history[history.length - 1].squares;
    if (this.calculateWinner() || squares[i]) {
      return;
    }

    const newSquares = [...squares];
    const newHistory = [...this.state.history];
    newSquares[i] = this.nextPlayer;
    const newNext = this.nextPlayer === 'X' ? 'O' : 'X';
    newHistory.push({
      squares: newSquares,
      nextPlayer: newNext,
    });
    this.setState({
      history: newHistory,
    });
  }

  goToHistory(index) {
    const newHistory = this.state.history.slice(0, index + 1)
    const newSquares = this.state.history[index];
    this.setState({
      squares: newSquares,
      history: newHistory,
    });
  }

  renderMove(moveNum) {
    const history = this.state.history;
    const move = history[moveNum];
    const prevMove = moveNum > 0 ? history[moveNum - 1] : null;
    const changed = prevMove ? move.squares.findIndex((player, index) => move.squares[index] !== prevMove.squares[index]) : null;

    return prevMove ?
      <div className={moveNum === history.length - 1 ? 'current-move' : null} >Move: Player {move.squares[changed]} at position {Math.floor(changed / 3)}, {changed % 3}</div>
      : <div className={moveNum === history.length - 1 ? 'current-move' : null}>game start</div>
  }

  render() {
    const history = this.state.history;
    const current = history[history.length - 1];

    let winner = this.calculateWinner();
    if (winner && winner === 'O') {
      winner = <span className="keaton">Keaton!</span>;
    } else if(winner) {
      winner = <span>{winner}</span>
    }

    let status;
    if (winner) {
      status = <span>Winner: {winner}</span>
    } else if (history.length === 10) {
      status = <span className="draw">Nobody wins!</span>
    } else {
      status = `Next player: ${this.nextPlayer}`;
    }

    const moves = history.map((move, moveNum) => {
      return <li key={moveNum}>
        {this.renderMove(moveNum)}
        <button onClick={() => this.goToHistory(moveNum)} >go here</button>
      </li>;
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div className="status">{status}</div>
          <div>previous moves</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
