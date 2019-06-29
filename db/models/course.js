'use strict';

module.exports = (sequelize, DataTypes) => {
  const Course = sequelize.define('Course', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    
    description: DataTypes.TEXT,
    
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
