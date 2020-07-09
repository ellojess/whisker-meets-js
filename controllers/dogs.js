//dogs.js

module.exports = function (app, models) {
  var moment = require('moment');

    // INDEX
    app.get('/', (req, res) => {
        models.Dog.findAll({ order: [['createdAt', 'DESC']] }).then(dogs => {
        res.render('dogs-index', { dogs: dogs });
        })
    }) 

    // NEW
    app.get('/dogs/new', (req, res) => {
    res.render('dogs-new', {});
  })
  
  // CREATE
  app.post('/dogs', (req, res) => {
    models.Dog.create(req.body).then(dog => {
      // Redirect to dogs/:id
      res.redirect(`/dogs/${dog.id}`)
    }).catch((err) => {
      console.log(err)
    });
  })
  
// SHOW
app.get('/dogs/:id', (req, res) => {
  models.Dog.findByPk(req.params.id, { include: [{ model: models.Favorite }] }).then(dog => {
      let createdAt = dog.createdAt;
      createdAt = moment(createdAt).format('MMMM Do YYYY, h:mm:ss a');
      dog.createdAtFormatted = createdAt;
      res.render('dogs-show', { dog: dog });
  }).catch((err) => {
      console.log(err.message);
  })
});

  
  // EDIT
  app.get('/dogs/:id/edit', (req, res) => {
    models.Dog.findByPk(req.params.id).then((dog) => {
      res.render('dogs-edit', { dog: dog });
    }).catch((err) => {
      console.log(err.message);
    })
  });
  
  
  // UPDATE
  app.put('/dogs/:id', (req, res) => {
    models.Dog.findByPk(req.params.id).then(dog => {
      dog.update(req.body).then(dog => {
        res.redirect(`/dogs/${req.params.id}`);
      }).catch((err) => {
        console.log(err);
      });
    }).catch((err) => {
      console.log(err);
    });
  });
  
  // DELETE
  app.delete('/dogs/:id', (req, res) => {
    models.Dog.findByPk(req.params.id).then(dog => {
      dog.destroy();
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
  })

}
