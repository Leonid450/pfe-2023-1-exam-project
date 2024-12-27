const CONSTANTS = require('../../constants');
const fs = require('fs/promises');
const { existsSync } = require('node:fs');

async function logger(message, code, stack) {
  const log = { message: message, time: Date.now(), code: code, stack: stack };
  if (!existsSync(CONSTANTS.LOG_CURRENT_DAY_FILES_PATH)) {
    await fs.appendFile(CONSTANTS.LOG_CURRENT_DAY_FILES_PATH, '[]');
  }

  let oldText = await fs.readFile(
    CONSTANTS.LOG_CURRENT_DAY_FILES_PATH,
    'utf-8'
  );
  if (oldText.length < 2) {
    oldText = '[]';
  }
  const oldArr = JSON.parse(oldText);
  await oldArr.push(log);

  await fs.writeFile(
    CONSTANTS.LOG_CURRENT_DAY_FILES_PATH,
    `${JSON.stringify(oldArr)}`
  );
}

module.exports = logger;
