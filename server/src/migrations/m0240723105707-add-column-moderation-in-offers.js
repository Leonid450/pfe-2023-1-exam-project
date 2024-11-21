module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Offers', 'moderation', {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: 'on moderation',
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Offers', 'moderation');
  },
};
