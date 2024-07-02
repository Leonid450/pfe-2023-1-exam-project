db.messages.aggregate([
  {
    $match: { body: { $regex: '.*паровоз.*' } },
  },
  {
    $unset: ['sender', 'conversation', 'createdAt', 'updatedAt', '__v'],
  },
  {
    $group: {
      _id: 'null',
      countOfMessage: {
        $count: {},
      },
    },
  },
]);
