import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

const games = [];
int.on('line', (line) => {
  games.push(line.split('').map(v => parseInt(v, 10)));
});

const simulate = (game) => {
  const board = Array
    .from(new Array(7), () => (
      Array
        .from(new Array(7), () => 0)
    ));

  const checkWinner = (r, c) => { 
    // from  the row and col, I will expand, horizontally
    // vertically and diagonally

    const currentPlayer = board[r][c];
    let count = 1;
    let i = c + 1;
    while (board[r][i] === currentPlayer) {
      count++;
      i++;
    };
    i = c - 1;
    while (board[r][i] === currentPlayer) {
      count++;
      i--;
    };

    if (count >= 4) return currentPlayer;

    count = 1;
    i = r + 1;
    while (board[i] && board[i][c] === currentPlayer) {
      count++;
      i++;
    }

    i = r - 1;
    while (board[i] && board[i][c] === currentPlayer) {
      count++;
      i--;
    }

    if (count >= 4) return currentPlayer;

    count = 1;
    i = r + 1;
    let j = c + 1;
    while (board[i] && board[i][j] === currentPlayer) {
      count++;
      i++;
      j++;
    }

    i = r - 1;
    j = c - 1;
    while (board[i] && board[i][j] === currentPlayer) {
      count++;
      i--;
      j--;
    }
    if (count >= 4) return currentPlayer;

    // the other diagonal
    count = 1;
    i = r - 1;
    j = c + 1;
    while (board[i] && board[i][j] === currentPlayer) {
      count++;
      i--;
      j++;
    }

    i = r + 1;
    j = c - 1;
    while (board[i] && board[i][j] === currentPlayer) {
      count++;
      i++;
      j--;
    }
    if (count >= 4) return currentPlayer;

    return null;
  };

  let cycle = 0;
  for (let i = 0; i < game.length; i++) {
    const c = game[i] - 1;

    let r = 0;
    while (r < 7 && board[r][c] === 0) {
      r++;
    }

    board[r - 1][c] = cycle + 1;

    const winner = checkWinner(r - 1, c);
    if (winner !== null) {
      return winner;
    }

    cycle++;
    cycle = cycle % 3;
  }

  return null;
};

int.once('close', () => { 
  const wins = new Array(3).fill(0);

  games.forEach((game, i) => {
    const winner = simulate(game);
    console.log({ i, winner });
    if (winner) {
      wins[winner - 1]++;
    }
  });

  const result = wins.reduce((a, b) => a * b);
  console.log({ wins });
  console.log(result);
});
