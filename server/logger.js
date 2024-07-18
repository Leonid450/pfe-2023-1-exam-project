const fs = require('fs/promises');

async function logger(message, code, stack) {
  const log = { message: message, time: Date.now(), code: code, stack: stack };
  const oldText = await fs.readFile(
    `${__dirname}/logs/currentDay.json`,
    'utf-8'
  );
  const oldArr = JSON.parse(oldText);
  await oldArr.push(log);

  await fs.writeFile(
    `${__dirname}/logs/currentDay.json`,
    `${JSON.stringify(oldArr)}`
  );
}

module.exports = logger;

// async function logList() {
//   const allText = await fs.readFile(
//     `${__dirname}/logs/currentDay.json`,
//     'utf-8'
//   );
//   const logsFull = JSON.parse(allText);
//   // const logsShort = logsFull.map((log) => {
//   //   delete log.stackTrace;
//   // });
//   await fs.appendFile(`${__dirname}/logs/${Date.now()}.json`, `${logsFull}`);
// }
// module.exports = logList;
