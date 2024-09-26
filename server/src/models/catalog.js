'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    static associate({ User, Conversation }) {
      Catalog.belongsTo(User, {
        foreignKey: 'userId',
        sourceKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Catalog.belongsToMany(Conversation, {
        through: 'catalogs_to_conversations',
        foreignKey: 'catalogId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Catalog.init(
    {
      catalogName: { type: DataTypes.STRING, allowNull: false },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Catalog',
      tableName: 'catalogs',
    }
  );
  return Catalog;
};
