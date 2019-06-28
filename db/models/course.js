'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    estimatedTime: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    materialsNeeded: {
        type: DataTypes.STRING,
        allowNull: true,
    },
  });

  Course.associate = (models) => {
    // TODO Add associations.
    Course.belongsTo(models.User , { 
      foreignKey: {
        fieldName : 'UserId',
        allowNull: false,
      }
    });
  };

  return Course;
};
