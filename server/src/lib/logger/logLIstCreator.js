const CONSTANTS = require('../../constants');
const fs = require('fs/promises');

const cron = require('node-cron');

function logList() {
  cron.schedule('9 15 * * *', () => {
    logListCreator();
  });
}

async function logListCreator() {
  const allText = await fs.readFile(
    CONSTANTS.LOG_CURRENT_DAY_FILES_PATH,
    'utf-8'
  );
  const logsFull = JSON.parse(allText);
  const logsShort = await logsFull.map((log) => {
    delete log.stack;
    return log;
  });

  await fs.appendFile(
    `${__dirname}/../../../logs/${Date.now()}.json`,
    `${JSON.stringify(logsShort)}`
  );
  await fs.writeFile(CONSTANTS.LOG_CURRENT_DAY_FILES_PATH, '[]');
}
module.exports = logList;
