import readLine from 'readline';

const int = readLine.createInterface({
  input: process.stdin,
});

function determineIp(ip) {
  const first = ip.slice(0, 4).toUpperCase();
  if (first === 'C0A8') return 'internal';
  return 'other';
}

let internalCount = 0;
let otherCount = 0;
int.on('line', (line) => {
  const size = parseInt(line.slice(2 * 2, 4 * 2), 16);
  const source = line.slice(12 * 2, 16 * 2);

  const sourceType = determineIp(source);
  console.log({ source, sourceType })
  if (sourceType === 'internal') {
    internalCount += size;
  } else {
    otherCount += size;
  }
});

int.on('close', () => {
  console.log(`${internalCount}/${otherCount}`);
});
