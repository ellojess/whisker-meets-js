'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    name: DataTypes.STRING,
    email: DataTypes.STRING
  }, {});
  Favorite.associate = function(models) {
    Favorite.belongsTo(models.Dog); 
  };
  return Favorite;
};