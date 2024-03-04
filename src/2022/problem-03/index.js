import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

const coordinates = [];
int.on('line', (line) => {
  coordinates.push(line.split(' ').map(v => parseInt(v, 10)));
});

const calculateDistance = (a, b) => {
  return Math.floor(
    Math.sqrt(
      Math.pow(a[0] - b[0], 2)
      + Math.pow(a[1] - b[1], 2)
      + Math.pow(a[2] - b[2], 2)
    ),
  );
};

int.once('close', () => {
  let totalDistance = 0;

  for (let i = 1; i < coordinates.length; i++) {
    const a = coordinates[i - 1];
    const b = coordinates[i];

    totalDistance += calculateDistance(a, b);
  }

  console.log(totalDistance);
});
