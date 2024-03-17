const target = 856;
// const target = 5;

const options = [40, 12, 2, 1];
// const options = [3, 2, 1];

const results = new Array(856 + 1);
results[target] = BigInt(1);

for (let i = target - 1; i >= 0; i--) {
  let sum = BigInt(0);

  for (let option of options) {
    const ti = i + option;
    if (ti <= target) {
      sum += BigInt(results[ti]);
    }
  }

  results[i] = sum;
}

console.log(results[0]);
