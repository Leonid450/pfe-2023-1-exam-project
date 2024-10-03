'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users_to_conversation extends Model {}
  Users_to_conversation.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      conversationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'conversations',
          key: 'id',
        },

        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      blackList: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      favoriteList: {
        type: DataTypes.BOOLEAN,
        defaultValue: 'false',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    },
    {
      sequelize,
      modelName: 'Users_to_conversation',
      tableName: 'users_to_conversation',
    }
  );
  return Users_to_conversation;
};
