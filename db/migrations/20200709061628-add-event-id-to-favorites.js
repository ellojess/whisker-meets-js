// migration

'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addColumn('Favorites', 'DogId', Sequelize.INTEGER).then(() => {
      return queryInterface.addConstraint('Favorites', ['DogId'], {
        type: 'foreign key',
        name: 'dog_favorites',
        references: { //Required field
          table: 'Dogs',
          field: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Favorites', 'DogId');  
  }
};