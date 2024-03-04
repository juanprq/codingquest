import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

const maze = [];
int.on('line', (line) => {
  maze.push(line.trim().split(''));
});

int.once('close', () => {

  const rows = maze.length;
  const cols = maze[0].length;

  let startingCol = 0
  let endingCol = 0;
  const endingRow = rows - 1

  for (let c = 0; c < cols; c++) {
    if (maze[0][c] === ' ') {
      startingCol = c;
    }

    if (maze[endingRow][c] === ' ') {
      endingCol = c;
    }
  }

  const bfs = (r, c) => {
    let levels = 0;
    let queue = [[r, c]];
    maze[r][c] = '.';

    while (queue.length > 0) {
      const auxQueue = [];
      levels++;

      while (queue.length > 0) {
        const [cR, cC] = queue.shift();

        if (cR === endingRow && cC === endingCol) {
          return levels;
        }

        [
          [cR - 1, cC],
          [cR, cC + 1],
          [cR + 1, cC],
          [cR, cC - 1],
        ].forEach(([nR, nC]) => {
            if (nR < 0 || nR >= rows) return;
            if (nC < 0 || nC >= cols) return;
            if (maze[nR][nC] !== ' ') return;

            maze[nR][nC] = '.';
            auxQueue.push([nR, nC]);
        });
      }

      queue = auxQueue;
    }

    return levels;
    // if (r === endingRow && c === endingCol) {
    //   return 1;
    // };
    //
    // maze[r][c] = '.';
    // const results = [
    //   [r - 1, c],
    //   [r, c + 1],
    //   [r + 1, c],
    //   [r, c - 1],
    // ].map(([newR, newC]) => {
    //   if (newR > rows || newR < 0) return null;
    //   if (newC > cols || newC < 0) return null;
    //   if (maze[newR][newC] !== ' ') return null;
    //
    //   return 1 + dfs(newR, newC);
    // }).filter(a => a);
    // maze[r][c] = ' ';
    //
    //
    // return Math.min(...results);
  };

  const min = bfs(0, startingCol);
  console.log({ min });
});
