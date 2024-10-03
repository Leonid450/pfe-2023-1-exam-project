const fs = require('fs/promises');

async function createFile () {
  const oldText = await fs.readFile(`${__dirname}/magicFile.txt`, 'utf-8');
  // const oldText2 = await fs.readFile(`${__dirname}/magicFile.txt`, {
  //   encoding: 'utf-8'
  // });

  await fs.writeFile(`${__dirname}/magicFile.txt`, `${oldText}\nNew text` );
}

createFile();