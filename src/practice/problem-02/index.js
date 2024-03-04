import readline from 'readline';
import fs from 'node:fs';

const data = [];

const int = readline.createInterface({
  input: process.stdin,
});

int.on('line', (line) => {
  data.push(line.split(' '));
});

int.once('close', () => {
  const greens = [];
  const yellows = []; // words should contain all of these letters
  const blacks = []; // 

  const words = fs.readFileSync('./words.txt', { encoding: 'utf-8' }).trim().split('\n');

  data.forEach(([word, result]) => {
    for (let i = 0; i < word.length; i++) {
      const r = result[i];
      switch (r) {
        case 'G':
          greens.push([word[i], i]);
          break;
        case 'Y':
          yellows.push(word[i]);
          break;
        default:
          blacks.push(word[i]);
      }
    }
  });

  // filter all words that only have greens in their position
  let newWords = words
    .filter((word) => {
      return greens.every(([char, i]) => {
        return char === word[i];
      });
    });

  // filter all words that contains all of the yellows
  newWords = newWords
    .filter((word) => {
      return yellows.every(char => word.includes(char));
    });

  console.log(newWords);
  console.log(newWords.length);
});
