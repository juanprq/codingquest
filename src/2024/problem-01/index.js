import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

const data = new Map();
int.on('line', (line) => {
  const [key, rest] = line.split(': ');
  const [item, rawCost] = rest.split(' ');
  const cost = parseInt(rawCost, 10);

  if (!data.has(key)) data.set(key, 0);
  if (['Discount', 'Rebate'].includes(item)) {
    data.set(key, data.get(key) - cost);
  } else {
    data.set(key, data.get(key) + cost);
  }
});

int.once('close', () => {
  let min = Infinity;
  for (let value of data.values()) {
    min = Math.min(min, value);
  }

  console.log(min);
});
