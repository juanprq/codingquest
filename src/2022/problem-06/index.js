import readline from 'readline';

const int = readline.createInterface({
  input: process.stdin,
});

const instructions = [];
int.on('line', (line) => {
  instructions.push(
    line.split(' '),
  );
});

const translateVariable = (char) => {
  return char.charCodeAt(0) - 65;
}


int.once('close', () => {
  let currentInstruction = 0;
  let recentCmp = false;
  const memmory = new Array(12).fill(0);

  const getMemValue = (idt) => {
    const memIndex = translateVariable(idt);
    return memmory[memIndex];
  };
  const getValue = (idt) => {
    if (!isNaN(parseInt(idt, 10))) return parseInt(idt, 10);
    return getMemValue(idt);
  };
  const exec = {
    ADD: (target, source) => {
      source = getValue(source);
      const memIndex = translateVariable(target);
      memmory[memIndex] += source;
      currentInstruction++;
    }, // target source - Take the value of source and add it to target
    MOD: (target, source) => {
      source = getValue(source);
      const memIndex = translateVariable(target);
      memmory[memIndex] %= source;
      currentInstruction++;
    }, // target source - Calculate the modulus target % source, and save to target
    DIV: (target, source) => {
      source = getValue(source);
      const memIndex = translateVariable(target);
      memmory[memIndex] = Math.floor(memmory[memIndex] / source);
      currentInstruction++;
    }, // target source - Perform integer division of target // source, and save to target
    MOV: (target, source) => {
      source = getValue(source);
      const memIndex = translateVariable(target);
      memmory[memIndex] = source;
      currentInstruction++;
    }, // target source - Take the value of source and copy it into target (replacing whatever was there)
    JMP: (source) => {
      source = getValue(source);
      currentInstruction += source;
    }, // source - Jump source number of instructions within the code
    JIF: (source) => {
      source = getValue(source);

      if (recentCmp === true) {
        currentInstruction += source;
      } else {
        currentInstruction++;
      }
    }, // source - Jump source number of instructions within the code IF the most recent CEQ or CGE operation was TRUE
    CEQ: (source1, source2) => {
      source1 = getValue(source1);
      source2 = getValue(source2);

      recentCmp = source1 === source2;
      currentInstruction++;
    }, // source1 source2 - Compare the values in source1 and source2, are they equal?
    CGE: (source1, source2) => {
      source1 = getValue(source1);
      source2 = getValue(source2);

      recentCmp = source1 >= source2;
      currentInstruction++;
    }, // source1 source2 - Compare the values in source1 and source2. Is source1 greater than or equal to source2?
    OUT: (source) => {
      source = getValue(source);
      console.log(source);
      currentInstruction++;
    }, // source - Output the value of source to the terminal
    END: () => {
      process.exit();
    },
  };

  while (true) {
    const [inst, param1, param2] = instructions[currentInstruction];
    exec[inst](param1, param2);
  }
});
