db = new Mongo().getDB('examChat');
db.messages.aggregate([
  {
    $match: { body: { $regex: '.*паровоз.*', $options: 'i' } },
  },
  {
    $count: 'countWord',
  },
]);
