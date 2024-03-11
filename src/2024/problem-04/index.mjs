import readLine from 'readline';

const int = readLine.createInterface({
  input: process.stdin,
});

function calculateDistance(a, b) {
  let sum = 0;
  for (let i = 0; i < a.length; i++) {
    sum += (a[i] - b[i]) ** 2;
  }

  return Math
    .sqrt(sum)
    .toFixed(3);
}

const data = [];
let headers = true;
int.on('line', (line) => {
  if (headers) {
    headers = false;
    return;
  }

  const coordinates = line
    .split(/\s\s+/)
    .slice(2)
    .map(v => parseFloat(v));

  data.push(coordinates);
});

int.on('close', () => {
  let min = Infinity;

  for (let i = 0; i < data.length; i++) {
    for (let j = i + 1; j < data.length; j++) {
      min = Math.min(
        min,
        calculateDistance(data[i], data[j]),
      );
    }
  }

  console.log(min);
});
