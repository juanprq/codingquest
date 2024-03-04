import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

const heatShields = [];
int.on('line', (line) => {
  heatShields.push(
    line.split(' ').map(v => parseInt(v, 10)),
  );
});

int.once('close', () => {
  const ROWS = 100000;
  const COLS = 20000;

  // const ROWS = 100;
  // const COLS = 100;

  // lets use the approach naively
  // lets cound the area by rows

  let area = 0;
  for (let r = 0; r < ROWS; r++) {
    const row = new Array(COLS).fill(false);

    heatShields
      .filter(([x, y, width, height]) => {
        if (r >= y && r < y + height) return true;
        return false;
      })
      .forEach(([x, y, width, height]) => {
          for (let c = x; c < x + width; c++) {
            row[c] = true;
          }
        });

      const rowArea = row.reduce((accum, v) => {
        if (v === true) return accum;
        return accum + 1;
      }, 0);

      area += rowArea;
    }

  const isNot = 1640554900
  console.log({ area, test: isNot === area });

  // const data = Array.from(new Array(ROWS), () => new Array(COLS).fill(false));
  //
  // // the memory blows
  // // what I can do ?
  // // I will need to represent this in memory in a different way
  // // Like in ranges?
  //
  // heatShields.forEach((shield) => {
  //   const [x, y, width, height] = shield;
  //
  //   for (let r = y; r < y + height; r++) {
  //     for (let c = x; c < x + width; c++ ) {
  //       data[r][c] = true;
  //     }
  //   }
  // });
  //
  // // count the number of falses
  // let count = 0;
  // for (let i = 0; i < ROWS; i++) {
  //   for (let j = 0; j < COLS; j++) {
  //     if (data[i][j] === false) {
  //       count++;
  //     }
  //   }
  // }
  //
  // console.log(count);
});
