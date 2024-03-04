import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

let log = [];
int.on('line', (line) => {
  log.push(parseInt(line, 10));
});

int.once('close', () => {
  let result = 0;
  for (let i = 0; i < log.length - 60; i++) {
    const start = i;
    const end = start + 60;

    const data = log.slice(start, end);
    const avg = data.reduce((a, b) => a + b) / data.length;
    if (avg < 1500 || avg > 1600) {
      result++;
    }
  }

  console.log(result);
});
