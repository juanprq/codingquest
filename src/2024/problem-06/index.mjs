import readLine from 'readline';

const int = readLine.createInterface({
  input: process.stdin,
});

const N = 5;

let key;
let message;
int.on('line', (line) => {
  if (line === '') return;

  if (key === undefined) {
    key = line.split(': ')[1];
    return;
  }

  message = line.split(': ')[1];
});

int.on('close', () => {
  const data = Array.from({ length: N }, () => Array.from({ length: N }));

  const added = new Set();
  added.add('j');

  let pos = 0;
  for (let i = 0; i < key.length; i++) {
    if (added.has(key[i])) continue;

    added.add(key[i]);
    data[Math.floor(pos / N)][pos % N] = key[i];
    pos++;
  }

  let value = 'a'.charCodeAt(0);
  for (; pos < N * N; pos++) {
    while (added.has(String.fromCharCode(value))) {
      value++;
    }

    added.add(String.fromCharCode(value));
    data[Math.floor(pos / N)][pos % N] = String.fromCharCode(value);
  }


  const code = message
    .replaceAll(/\s/g, '')
    .split('')
    .reduce((accum, c) => {
      if (
        accum[accum.length - 1] === undefined
        || accum[accum.length - 1].length === 2
      ) {
        accum.push(c);
        return accum;
      }

      accum[accum.length - 1] += c;
      return accum;
    }, []);


  function findPos(char) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (data[r][c] === char) return [r, c];
      }
    }

    return [-1, -1];
  }

  function replace(chars) {
    const [a, b] = chars;

    const [ra, ca] = findPos(a);
    const [rb, cb] = findPos(b);

    if (ca === cb) {
      let nra = ra - 1;
      let nrb = rb - 1;

      if (nra < 0) nra = N - 1;
      if (nrb < 0) nrb = N - 1;

      return data[nra][ca] + data[nrb][cb];
    } else if (ra === rb) {
      let nca = ca - 1;
      let ncb = cb - 1;

      if (nca < 0) nca = N - 1;
      if (ncb < 0) ncb = N - 1;

      return data[ra][nca] + data[rb][ncb];
    }

    return data[ra][cb] + data[rb][ca];
  }

  const decoded = code.map(replace).join('');
  let result = '';
  let pointer = 0;
  for (let i = 0; i < message.length; i++) {
    if (message[i] === ' ') {
      result += ' ';
    } else {
      result += decoded[pointer];
      pointer++;
    }
  }

  console.log(result);
});
