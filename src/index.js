import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) {
  return (
    <button 
      className={props.className}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  );
}

class Board extends React.Component {

  renderSquare = (i, hilite) => {
    return (
      <Square
        value={this.props.squares[i]}
        className={hilite ? 'square hilite' : 'square'}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  createBoard = () => {
    let board = [];
    let cnt = 0;
    
    let hilite = false;
    let [a, b, c] = [null, null, null];
    
    if (this.props.hiliteSquares) {
      [a, b, c] = this.props.hiliteSquares;
    }   

    // Outer loop to create parent
    for (let i = 0; i < 3; i++) {
      let children = [];
      //Inner loop to create children
      for (let j = 0; j < 3; j++) {
        if (this.props.hiliteSquares) {
          hilite = (cnt === a || cnt === b || cnt === c) ? true : false;
        }
        children.push(this.renderSquare(cnt, hilite));
        hilite = false;
        cnt++;
      }
      //Create the parent and add the children
      board.push(<div className="board-row">{children}</div>);
    }
    return board;
  }

  render() {
    return (
      <div>
        {this.createBoard()}
      </div>
    );
  }
}

class Game extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,     
      turn: 'X'
    }  
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }    
    squares[i] = this.state.turn;
    // calculate next turn:
    const turn = this.state.turn === "X" ? "O" : "X";
    
    // setState tells react that component + it's children need to be re-rendered with 
    // updated state:
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      turn: turn
    }); 
  }
  
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);
    const gameOver = isGameOver(current.squares);

    const moves = history.map((step, move) => {
      let desc = move ?
        'Move #' + move :
        'Game start';
      
      return (
        <li key={move}>
          <button 
            onClick={() => this.jumpTo(move)}
          >
            {desc} {(move === this.state.stepNumber ? '<' : '')}
          </button>
        </li>
      );
    });

    let status;
    if (winner[0]) {
      status = 'Winner! ' + winner[0];
    } else if (gameOver) {
      status = 'Draw!';
    } else {  
      status = 'Player: ' + this.state.turn;
    }
    
    return (
      <div className="game">
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            hiliteSquares={winner[1]}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

function isGameOver(squares) {
  let gameOver = true;
  for (var i=0; i<9; i++) {
    gameOver = (squares[i] == null) ? false : true;
    if (!gameOver) break;
  }
  return gameOver;
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [
        squares[a],
        [a,b,c]
      ];
    }
  }
  return [
    null, 
    null
  ];
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
