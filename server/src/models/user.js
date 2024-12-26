'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const CONSTANTS = require('../constants');

async function hashPassword(user, options) {
  if (user.changed('password')) {
    const passwordHash = await bcrypt.hash(
      user.password,
      CONSTANTS.SALT_ROUNDS
    );
    user.password = passwordHash;
  }
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({
      Offer,
      Contest,
      Rating,
      Message,
      Conversation,
      Catalog,
    }) {
      User.hasMany(Offer, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Catalog, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Contest, { foreignKey: 'userId', targetKey: 'id' });
      hashPassword;
      User.hasMany(Rating, { foreignKey: 'userId', targetKey: 'id' });
      User.hasMany(Message, { foreignKey: 'userId', targetKey: 'id' });
      User.belongsToMany(Conversation, {
        through: 'users_to_conversation',
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      });
    }

    async passwordCompare(plaintextPassword) {
      return bcrypt.compare(plaintextPassword, this.getDataValue('password'));
    }
  }

  User.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      displayName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'anon.png',
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      balance: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
          min: 0,
        },
      },
      refreshToken: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      rating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    }
  );

  User.beforeCreate(hashPassword);
  User.beforeUpdate(hashPassword);

  return User;
};
