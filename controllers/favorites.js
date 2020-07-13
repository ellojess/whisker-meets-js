// controllers/favorites.js

module.exports = (app) => {
    // NEW
    app.get('/dogs/:dogId/favorites/new', (req, res) => {
      models.Dog.findById(req.params.dogId).then(dog => {
        res.render('favorites-new', { dog: dog });
      });
    });
  
    // CREATE
    app.post('/dogs/:dogId/favorites', (req, res) => {
        req.body.DogId = req.params.dogId;
        models.Favorite.create(req.body).then(favorite => {
          res.redirect(`/dogs/${req.params.dogId}`);
        }).catch((err) => {
            console.log(err)
        });
      });
  
    // DELETE
    app.delete('/dogs/:dogId/favorites/:id', (req, res) => {
      models.Favorite.findById(req.params.id).then(favorite => {
          favorite.destroy();
          res.redirect(`/dogs/${req.params.dogId}`);
      }).catch((err) => {
          console.log(err);
      });
  });
  }