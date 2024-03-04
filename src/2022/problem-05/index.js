import readline from 'node:readline';
import { createHash } from 'node:crypto';

const int = readline.createInterface({
  input: process.stdin,
});

const sha256 = (value) => createHash('sha256')
      .update(value)
      .digest('hex');

const buildStringValue = (array) => array.slice(0, 3).join('|');
const buildEmptyHash = () => new Array(64).fill(0).join('');
const buildZeroItem = (itemName) => {
  return [
    itemName,
    0,
    buildEmptyHash(),
    buildEmptyHash(),
  ];
};
const calculateNextHash = (item) => {
  let newHash;
  let minedNumber = -1;
  do {
    minedNumber++;
    const value = buildStringValue([item[0], minedNumber, item[3]]);
    newHash = sha256(value);
  } while (newHash.slice(0, 6) !== new Array(6).fill(0).join(''))

  return [
    item[0],
    minedNumber,
    item[3],
    newHash,
  ];
};

const data = [];
int.on('line', (line) => {
  data.push(line.split('|'));
});

int.once('close', () => {
  let indexToFix;
  for (let i = 0; i < data.length; i++) {
    const item = data[i];

    const rest = item.slice(0, 3);
    const hash = item[3];

    const realHash = sha256(buildStringValue(item));

    if (realHash !== hash) {
      indexToFix = i;
    }
  }

  const itemToFix = data[indexToFix];
  const newItem = calculateNextHash([
    itemToFix[0],
    0,
    null,
    itemToFix[2],
  ]);

  console.log('corrected value');
  console.log(data[indexToFix - 1]);
  console.log(newItem);

  console.log('----> starting with others');

  const newItems = [newItem];
  for (let i = indexToFix + 1; i < data.length; i++) {
    const prev = newItems[newItems.length - 1];
    const item = data[i];
    const other = calculateNextHash([
      item[0],
      0,
      null,
      prev[3],
    ]);

    console.log(other);
    newItems.push(other);
  }

  console.log('finished');
  console.log('the last item is:');
  console.log(newItems[newItems.length - 1]);
});
