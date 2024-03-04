const input = `
3a 3d 3c 40 41 3a 3c 46 42 3d 85 98 66 4f 48 
3f 5a 6b 6d 68 8f b9 c6 c6 a8 91 7b 5a 49 47 
44 8a 98 a5 c9 cc c7 c7 cd d7 e2 9a 51 44 41 
4d 8a 9c ba bc b9 b6 b8 c0 c4 c8 d2 7b 47 45 
48 89 b3 af 94 a1 b3 b0 87 85 a7 c3 b0 4f 45 
4b 8c b4 95 86 88 af a7 6c 41 6d bc b6 62 47 
51 92 ae 9d 94 92 a2 a0 6d 34 60 b4 ae 6f 4a 
36 72 9c a0 a2 96 76 8e 6e 36 5c aa a4 66 50 
2a 36 4e 6a 94 90 60 98 6a 38 5a a2 9c 6a 6a 
32 34 38 3e 4a 5e 62 a0 6c 3c 5a 9c 98 8c 74 
2e 30 36 36 2e 2e 5e a6 6e 42 5a 7a 88 74 68 
26 24 26 2a 2e 30 42 74 66 3e 5c 68 82 5a 66 
2e 24 22 22 2a 36 36 2c 2e 28 48 66 7c 5e 66 
2a 28 24 22 26 2e 38 38 36 32 2e 26 44 58 6c 
26 2c 2e 2a 24 2c 2e 32 38 36 34 2c 24 26 38 
`;

let data = input
  .trim()
  .split(' ')
  .map(v => parseInt(v.trim(), 16));

data = data
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
