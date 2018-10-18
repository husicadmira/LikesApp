module.exports = {
  primaryKey: 'id',
  attributes: {
    id: {
      type: 'number',
      autoIncrement: true
    },
    likedUser: {
      model: 'user'
    },
    likedByUser: {
      model: 'user'
    }
  }
};
