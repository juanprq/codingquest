import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

const tickets = [];
int.on('line', (line) => {
  const nums = line
    .split(' ')
    .map(v => parseInt(v, 10))
    .reduce((accum, v) => {
      let value = accum.get(v) || 0;
      accum.set(v, value + 1);

      return accum;
    }, new Map());

  tickets.push(nums);
});

int.once('close', () => {
  const winningNumbers = [12, 48, 30, 95, 15, 55, 97];

  let booty = 0;
  tickets.forEach((ticket) => {
    const n = winningNumbers
      .reduce((accum, v) => accum + (ticket.get(v) || 0), 0);

    if (n >= 3) {
      console.log('por aqui!', { n });
      booty += 1 * Math.pow(10, n - 3);
    }
  });

  console.log(booty);
});
