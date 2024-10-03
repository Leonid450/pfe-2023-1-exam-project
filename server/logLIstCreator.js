const fs = require('fs/promises');

const cron = require('node-cron');

function logList() {
  cron.schedule('1 15 * * *', () => {
    logListCreator();
  });
}

async function logListCreator() {
  const allText = await fs.readFile(
    `${__dirname}/logs/currentDay.json`,
    'utf-8'
  );
  const logsFull = JSON.parse(allText);
  const logsShort = await logsFull.map((log) => {
    delete log.stack;
    return log;
  });

  await fs.appendFile(
    `${__dirname}/logs/${Date.now()}.json`,
    `${JSON.stringify(logsShort)}`
  );
  await fs.writeFile(`${__dirname}/logs/currentDay.json`, '[]');
}
module.exports = logList;
