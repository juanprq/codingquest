import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

let n;
let i = 0;
let board;
const moves = [];

int.on('line', (line) => {
  const numbers = line.split(' ').map(v => parseInt(v, 10));
  if (!n) {
    n = numbers.length;
    board = new Array(n).fill(0);
  }

  if (i < n) {
    board[i] = numbers;
  } else {
    moves.push(numbers)
  }

  i++;
});

int.once('close', () => {
  // convert the board in a simple representation
  const simpleBoard = [];

  for (let i = n - 1; i >= 0; i--) {
    if (i % 2 === 1) {
      for (let j = 0; j < n; j++) {
        simpleBoard.push(board[i][j]);
      }
    } else {
      for (let j = n - 1; j >= 0; j--) {
        simpleBoard.push(board[i][j]);
      }
    }
  }

  let aPosition = 0;
  let bPosition = 0;
  moves.forEach(([a, b], move) => {
    aPosition += a;

    while (simpleBoard[aPosition] !== 0 && simpleBoard[aPosition] !== undefined) {
      aPosition += simpleBoard[aPosition];
    }

    if (aPosition >= simpleBoard.length) {
      console.log(`solution at ${move + 1} for player 1`, move + 1);
      return;
    }

    bPosition += b;

    while (simpleBoard[bPosition] !== 0 && simpleBoard[bPosition] !== undefined) {
      bPosition += simpleBoard[bPosition];
    }

    if (bPosition >= simpleBoard.length) {
      console.log(`solution at ${move + 1} for player 2`, (move + 1) * 2);
      return;
    }

  });
});
