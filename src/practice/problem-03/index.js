import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

const data = [];
int.on('line', (line) => {
  data.push(line.split(' ').map(v => parseInt(v, 10)));
});

int.once('close', () => {
  const n = data.length;
  const visited = Array.from(new Array(n), () => Array.from(new Array(n), () => false));

  const dfs = (r, c) => {
    const stack = [[r, c]];
    visited[r][c] = true;

    let sum = 0;
    while (stack.length) {
      const [cR, cC] = stack.pop();

      [
        [cR - 1, cC],
        [cR, cC + 1],
        [cR + 1, cC],
        [cR, cC - 1],
      ].forEach(([newR, newC]) => {
          if (Math.min(newR, newC) < 0) return;
          if (Math.max(newR, newC) >= n) return;
          if (data[newR][newC] === 0) return;
          if (visited[newR][newC]) return;

          visited[newR][newC] = true;
          stack.push([newR, newC]);
      });

      sum += data[cR][cC];
    }

    return sum;
  };

  const results = [];
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      if (data[r][c] !== 0 && !visited[r][c]) {
        const result = dfs(r, c);
        results.push(result);
      }
    }
  }

  console.log({ n });
  console.log(results);
  console.log(Math.floor(results.reduce((a, b) => a + b) / results.length));
});
