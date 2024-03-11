import readLine from 'readline';

const int = readLine.createInterface({
  input: process.stdin,
});

const ROWS = 80;
const COLS = 100;

let data;
int.on('line', (line) => {
  data = line.split(' ').map(v => parseInt(v, 10));
});

int.on('close', () => {
  let current = '.';
  let pointer = 0;
  let count = 0;

  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      process.stdout.write(current);

      count++;
      if (count >= data[pointer]) {
        count = 0;
        current = current === '.' ? '#' : '.';
        pointer++;
      }
    }

    console.log('');
  }
});
