import fs from 'node:fs'
import { PNG } from 'pngjs';

// const url = './test.png';
const url = './input.png';

const imageBuffer = fs.readFileSync(url);
new PNG({ inputColorType: 0 }).parse(imageBuffer, (error, result) => {
  const rawData = result.data;

  const redData = [];
  for (let i = 0; i < rawData.length; i += 4) {
    redData.push(rawData[i]); // grab only the red part of the pixel
  }

  let data = redData
    .map(v => v % 2)

  let newData = [];
  for (let i = 0; i < data.length - 8; i += 8) {
    let num = '';
    for (let j = 0; j < 8; j++) {
      num += data[i + j];
    }

    const result = parseInt(num, 2);
    if (result === 0) break;
    newData.push(parseInt(num, 2));
  }

  console.log(
    newData.map(v => String.fromCharCode(v)).join('')
  );
});
