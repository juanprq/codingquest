import readLine from 'readline';
import path from 'node:path';

const int = readLine.createInterface({
  input: process.stdin,
});

const data = new Map();
let currentFolder;
int.on('line', (line) => {
  if (line.startsWith('Folder')) {
    const [folder, index] = line.split(': ');
    currentFolder = parseInt(index, 10);
    data.set(currentFolder, []);
  } else {
    // - temporary_023 [FOLDER 1]
    const test = /^\s-\s(?<name>\S+)\s(?<rest>.+)$/.exec(line);
    const { name, rest } = test.groups;

    const size = parseInt(rest, 10);
    if (Number.isNaN(size)) {
      const ref = parseInt(/\d+/.exec(rest)[0], 10);
      data.get(currentFolder).push({ name, ref, isFolder: true, });
    } else {
      data.get(currentFolder).push({ name, size });
    }
  }
});

function checkForDeletion(name) {
  const lc = name.trim().toLowerCase();
  return lc.includes('delete') || lc.includes('temporary');
}

int.on('close', () => {
  let sum = 0;
  const visited = new Set();

  function dfs(item, route, isForDelete = false) {
    const { name, ref, isFolder, size } = item;
    const key = path.join(route, name);
    if (visited.has(key)) return;

    visited.add(key);
    const shouldDelete = isForDelete || checkForDeletion(name);

    if (!isFolder && shouldDelete) {
      sum += size;
    } else if (isFolder) {
      for (let newItem of data.get(ref)) {
        dfs(newItem, key, shouldDelete);
      }
    }
  }
  dfs({ name: '[FOLDER 0]', ref: 0, isFolder: true }, '/', false);

  console.log({ sum });
});
