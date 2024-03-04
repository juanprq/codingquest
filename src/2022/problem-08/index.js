


// Real data
const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,;:?! '()"
const secret = "Roads? Where We're Going, We Don't Need Roads."

const message = `ftmpH.:lemGubTDmMb'YtfsublbnkKlMmOoKywmmOIpa.,3mNeEbl?(bVtkUy?xtoNtCkAg:;n)OlInqp2rjap6JwiG)9H'jHm: pjok'9njQbtOxusdql'b'VtkrBb5j!aMWGieIjOHfrw,j,ubsbm,xrufoKljGdob8q,APzqI:0fpi:.Jsipk6lueD):!wrwbd?j(LbmODCCz7:vjbANCsqp2ts);Of,?p; lulx,tXGbLmbTflKBbYlCCdle1bnYtGrCl1bnw:PrphBeYFviLoZD.7pb!)nrztr0lCvl8n'tqIHn8`

//

// const secret = 'With great power comes great responsibility';
// const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,;:?! '()"
// const message = 'lfwwrsvbvMbmIEnK:wDjutpzoxfwowypDDHxB(rzfwKXBMd'
//
// To encrypt
// const secret = 'With great power comes great responsibility';
// const charSet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,;:?! '()";
// const message = 'Are you enjoying coding quest?';

let newMessage = '';
for (let i = 0; i < message.length; i++) {
  const currentChar = message[i];
  const secretChar = secret[i % secret.length];

  const secretIndex = charSet.indexOf(secretChar);
  const charIndex = charSet.indexOf(currentChar);

  // const newIndex = (charIndex + secretIndex + 1) % charSet.length;
  // const newChar = charSet[newIndex];
  //
  // // console.log({ currentChar, charIndex, secretChar, secretIndex, newChar, newIndex });
  //
  // if (charIndex === -1) {
  //   newMessage += currentChar;
  // } else {
  //   newMessage += newChar;
  // }

  let newIndex = (charIndex - (secretIndex + 1)) % charSet.length;
  if (newIndex < 0) {
    newIndex += charSet.length;
  }
  const newChar = charSet[newIndex];

  // console.log({ currentChar, charIndex, secretChar, secretIndex, newIndex, newChar });
  if (charIndex === -1) {
    newMessage += currentChar;
  } else {
    newMessage += newChar;
  }
}

console.log({ newMessage });
