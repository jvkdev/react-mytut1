import React from 'react';
import ReactDOM from 'react-dom';
import Switch from './components/ToggleSwitch';

import 'bootstrap/dist/css/bootstrap.min.css';
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

    // Outer loop to create rows
    for (let row = 0; row < 3; row++) {
      let columns = [];
      
      //Inner loop to create columns
      for (let col = 0; col < 3; col++) {
        
        if (this.props.hiliteSquares) {
          hilite = (cnt === a || cnt === b || cnt === c) ? true : false;
        }

        columns.push(this.renderSquare(cnt, hilite));
        hilite = false;
        cnt++;
      }
      //Create the row and add the columns
      board.push(<div className="board-row">{columns}</div>);
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
        locations: []
      }],
      stepNumber: 0,     
      turn: 'X',
      sort: false // sort toggle state
    }  
  }
  
  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    const locations = current.locations.slice();
    
    // calculate this square's position
    const row = Math.floor(i / 3);
    const col = i % 3;
    const location = (col + 1) + ',' + (row + 1);

    if (this.calculateWinner(squares)[0] || squares[i]) {
      return;
    }    
    squares[i] = this.state.turn;
    // calculate next turn:
    const turn = this.state.turn === "X" ? "O" : "X";

    locations.push(location);
    
    // setState tells react that component + it's children need to be re-rendered with 
    // updated state:
    this.setState({
      history: history.concat([{
        squares: squares,
        locations: locations
      }]),
      stepNumber: history.length,
      turn: turn,
    }); 
  }
  
  toggleSort = () => {
    // update state, re-renders component
    this.setState({ 
        sort: this.state.sort ? false : true
    });
  }

  jumpTo(step) {
    // update state, re-renders component
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  compileHistoryList = (step, move) => {
    let desc = (move) ? '(' + step.locations[move-1] + ')' : 'Game start';
    
    return (
      <li key={move}>
        <button 
          onClick={() => this.jumpTo(move)}
        >
          {desc} {(move === this.state.stepNumber ? '<' : '')}
        </button>
      </li>
    );
  }

  sortMoves(moves) {
    let arr1 = moves.shift(); // keep game start at the top
    moves.reverse();
    return [arr1, moves]; // join first element and sorted rest
  }

  getStatusText(winner, gameOver) {
    let status;
    if (winner[0]) {
      status = 'Winner! ' + winner[0];
    } else if (gameOver) {
      status = 'Draw!';
    } else {
      status = 'Player: ' + this.state.turn;
    }
    return status;
  }

  isGameOver(squares) {
    let gameOver = true;
    // game is over when all squares have noughts or crosses, ie not NULL
    for (var i=0; i<9; i++) {
      gameOver = (squares[i] == null) ? false : true;
      if (!gameOver) break;
    }
    return gameOver;
  }
  
  calculateWinner(squares) {
    // all winning combinations
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
  
    // iterate through each winning combo
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      // if all 3 square positions of combo exist in squares array, then win
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return [
          squares[a],
          [a,b,c]
        ];
      }
    }
    // else false
    return [
      null, 
      null
    ];
  }

  render() {
    let history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = this.calculateWinner(current.squares);
    const gameOver = this.isGameOver(current.squares);

    const { sort } = this.state;
    
    // Display the location for each move in the format (col, row) in the move history list.
    let moves = history.map(this.compileHistoryList);

    // sort history of moves according to toggle state
    moves = (sort) ? this.sortMoves(moves) : moves;
    
    let status = this.getStatusText(winner, gameOver);
    
    return (
      <div className="game p-3 border rounded" >
        {/* Board */}
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            hiliteSquares={winner[1]}
          />
        </div>
        { /* Status panel */ }
        <div className="game-info d-flexs p-3 border rounded">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
        { /* Sort control */ }
        <div className="d-flex p-4 ml-4 border rounded align-items-center">
          <span>Sort ↕&nbsp; </span>
           <Switch theme="default" className="d-flex" enabled={sort} onStateChanged={this.toggleSort} />
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
