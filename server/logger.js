const fs = require('fs/promises');
const existsSync = require('node:fs');

async function logger(message, code, stack) {
  const log = { message: message, time: Date.now(), code: code, stack: stack };
  if (!existsSync.existsSync(`${__dirname}/logs/currentDay.json`)) {
    await fs.appendFile(`${__dirname}/logs/currentDay.json`, '[]');
  }

  let oldText = await fs.readFile(`${__dirname}/logs/currentDay.json`, 'utf-8');
  if (oldText.length < 2) {
    oldText = '[]';
  }
  const oldArr = JSON.parse(oldText);
  await oldArr.push(log);

  await fs.writeFile(
    `${__dirname}/logs/currentDay.json`,
    `${JSON.stringify(oldArr)}`
  );
}

module.exports = logger;
