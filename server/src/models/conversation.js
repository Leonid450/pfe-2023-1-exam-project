'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Conversation extends Model {
    static associate({ User, Catalog, Message }) {
      Conversation.belongsToMany(Catalog, {
        through: 'catalogs_to_conversations',
        foreignKey: 'conversationId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Conversation.belongsToMany(User, {
        through: 'users_to_conversation',
        foreignKey: 'conversationId',

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
      Conversation.hasMany(Message, {
        foreignKey: 'conversationId',
        targetKey: 'id',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }
  }
  Conversation.init(
    {},
    {
      sequelize,
      modelName: 'Conversation',
      tableName: 'conversations',
    }
  );
  return Conversation;
};
