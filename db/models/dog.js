'use strict';
module.exports = (sequelize, DataTypes) => {
  const Dog = sequelize.define('Dog', {
    title: DataTypes.STRING,
    desc: DataTypes.TEXT,
    imgUrl: DataTypes.STRING
  }, {});
  Dog.associate = function(models) {
    Dog.hasMany(models.Favorite);
  };
  return Dog;
}; 