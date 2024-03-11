import readLine from 'readline';

const int = readLine.createInterface({
  input: process.stdin,
});

const columnMapping = new Map();
const journeys = [];
const distances = [];

let header = true;
let journey = false;
int.on('line', (line) => {
  if (header) {
    const headers = line.trim().split(/\s+/);
    for (let i = 0; i < headers.length; i++) {
      columnMapping.set(headers[i], i);

    }
    header = false;
  } else if (journey) {
    const [rover, rest] = line.split(': ');
    const places = rest.split(' -> ');
    journeys.push(places);
  } else if (line === '') {
    journey = true;
  } else {
    const [header, ...rest] = line.split(/\s+/);
    distances.push(
      rest.map(v => parseInt(v, 10)),
    );
  }
});

int.on('close', () => {
  let sum = 0;

  for (let journey of journeys) {
    for (let i = 1; i < journey.length; i++) {
      const beforeIndex = columnMapping.get(journey[i - 1]);
      const currentIndex = columnMapping.get(journey[i]);

      sum += distances[beforeIndex][currentIndex];
    }
  }

  console.log(sum);
});
