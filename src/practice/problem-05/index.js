import readline from 'readline';
import fs from 'node:fs';

let table = Object.fromEntries(
    fs
      .readFileSync('./table.txt', { encoding: 'utf-8' })
      .trim()
      .split('\n')
      .map(row => row.split(' ')),
  );

const findInTable = (data) => {
  const result = Object
    .entries(table)
    .find(([char, bytes]) => {
      if (bytes.length === data.length) {
        return bytes === data;
      }

      // return bytes.includes(data);
      return false;
    });

  return result && result[0];
};

const int = readline.createInterface({
  input: process.stdin,
});

let data;
let buffer;
int.on('line', (line) => {
  buffer = Buffer.from(line, 'hex');
  data = parseInt(line, 16);
  data = data.toString(2);
});

int.once('close', () => {
  let cursor = 0;
  let result = '';

  data = '';
  for (let i = 0; i < buffer.length; i++) {
    let n = buffer[i].toString(2);
    n = '00000000'.substr(n.length) + n;
    data += n;
  }
  // data = '11000110101010110001111101010001001011000011111111111111';
  while (cursor < data.length) {
    const slice4 = data.slice(cursor, cursor + 4);
    const slice5 = data.slice(cursor, cursor + 5);
    const slice7 = data.slice(cursor, cursor + 7);

    const char4 = findInTable(slice4);
    const char5 = findInTable(slice5);
    const char7 = findInTable(slice7);

    // console.log({ 4: { slice4, char4 }, 5: { slice5, char5 }, 7: { slice7, char7 } });

    if (char4) {
      result += char4;
      cursor += 4;
    } else if (char5) {
      result += char5;
      cursor += 5;
    } else if (char7) {
      result += char7;
      cursor += 7;
    } else {
      console.log({ cursor, result });
      throw new Error('Ummm?')
    }
  }

  console.log(result);
});
