import { Queue } from '@datastructures-js/queue';
import readLine from 'node:readline';

const int = readLine.createInterface({
  input: process.stdin,
});

const data = [[], []];

let layer = 0;
int.on('line', (line) => {
  if (line === '') {
    layer++;
  } else {
    data[layer].push(line.split(''));
  }
});

int.on('close', () => {
  const rows = data[0].length;
  const cols = data[0][0].length;
  const layers = 2;

  const visited = Array
    .from({ length: layers }, () =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => false)
      )
    );

  const startPosition = [0, 1, 0];
  const target = [0, rows - 2, cols - 1];

  const queue = new Queue();
  queue.enqueue([startPosition, 0]);
  visited[startPosition[0]][startPosition[1]][startPosition[2]] = true;

  while (!queue.isEmpty()) {
    const [point, steps] = queue.dequeue();

    const [layer, row, col] = point;
    if (layer === target[0] && row === target[1] && col === target[2]) {
      console.log('Bingo!', steps);
      return;
    }

    const directions = [
      [layer, row - 1, col],
      [layer, row, col + 1],
      [layer, row + 1, col],
      [layer, row, col - 1],
      ...(data[layer][row][col] === '$' ? [[layer === 0 ? 1 : 0, row, col]] : []),
    ];
    for (let dir of directions) {
      const [nl, nr, nc] = dir;
      if (visited[nl][nr][nc]) continue;
      if (nr < 0 || nr >= rows) continue;
      if (nc < 0 || nc >= cols) continue;
      if (data[nl][nr][nc] === '#') continue;

      const newSteps = data[nl][nr][nc] === '$' && data[layer][row][col] === '$' ? steps : steps + 1;
      queue.enqueue([[nl, nr, nc], newSteps]);
      visited[nl][nr][nc] = true;
    }
  }

  console.log('bad luck!');
});
