import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

const data = [];
int.on('line', (line) => {
  data.push(
    line.split(' ').map(v => parseInt(v, 16))
  );
});

int.once('close', () => {
  const modulus = parseInt('100', 16);

  const rowsCheckSum = [];
  const columnsCheckSum = [];

  // calculate row checksum
  for (let r = 0; r < data.length - 1; r++) {
    const sum = data[r]
      .slice(0, data[0].length - 1)
      .reduce((a, b) => a + b);
    rowsCheckSum.push(sum % modulus);
  }

  // calculate cols checksum
  for (let c = 0; c < data[0].length - 1; c++) {
    let sum = 0;
    for (let r = 0; r < data.length - 1; r++) {
      sum += data[r][c];
    }

    columnsCheckSum.push(sum % modulus);
  }

  let badRow;
  let badCol;

  for (let r = 0; r < data.length - 1; r++) {
    if (data[r][data[0].length - 1] !== rowsCheckSum[r]) {
      badRow = r;
    }
  }

  for (let c = 0; c < data[0].length - 1; c++) {
    if (data[data.length - 1][c] !== columnsCheckSum[c]) {
      badCol = c;
    }
  }

  let diffRow = rowsCheckSum[badRow] - data[badRow][data[0].length - 1]
  if (diffRow < 0) diffRow += modulus;

  let diffCol = columnsCheckSum[badCol] - data[data.length - 1][badCol]
  if (diffCol < 0) diffCol += modulus;

  const badValue = data[badRow][badCol];
  const correctedValue = badValue - diffRow;

  console.log({ badValue, correctedValue, result: badValue * correctedValue });

});
