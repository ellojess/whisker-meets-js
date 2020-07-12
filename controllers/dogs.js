//dogs.js
const Dog = require("../models/dogs")
const moment = require('moment');


module.exports = function (app) {

    // INDEX
    app.get('/', (req, res) => {
      var currentUser = req.user;
        // //Dog.find({ order: [['createdAt', 'DESC']] }).then(dogs => {
      Dog.find({}).lean()
      .then(dogs => {
        res.render('dogs-index', { dogs, currentUser});
      })
      .catch(err => {
        console.log(err.message);
      });
    }) 

    // NEW
    app.get('/dogs/new', (req, res) => {
    res.render('dogs-new', {});
  })
  
  // CREATE
  // app.post('/dogs/new', (req, res) => {

  //   const dog = new Dog(req.body)
  //   dog.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
  //   dog.save().then(dog => {
  //     // Redirect to dogs/:id
  //     res.redirect(`/dogs/${dog.id}`)
  //   }).catch((err) => {
  //     console.log(err)
  //   });

    // CREATE
    app.post("/dogs/new", (req, res) => {
      if (req.user) {
        var dog = new Dog(req.body);

        dog.save(function(err, dog) {
          return res.redirect(`/`);
        });
      } else {
        return res.status(401); // UNAUTHORIZED
      }
    });

  //  Dog.create(req.body).then(dog => {
      // Redirect to dogs/:id
    //   res.redirect(`/dogs/${dog.id}`)
    // }).catch((err) => {
    //   console.log(err)
    // });
  // })
  
// SHOW
app.get('/dogs/:id', (req, res) => {
  // Dog.findByPk(req.params.id, { include: [{ model: models.Favorite }] }).then(dog => {

    Dog.findById(req.params.id)
      .populate('comments')
      .then((dog) => {
      // let createdAt = dog.createdAt;
      //let createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
      //console.log(`Created at: ${createdAt}`)
      // dog.createdAtFormatted = createdAt;
        res.render('dogs-show', { dog });
      })
      .catch((err) => {
          console.log(err.message);
      })
});

  
  // EDIT
  app.get('/dogs/:id/edit', (req, res) => {
    Dog.findByPk(req.params.id).then((dog) => {
      res.render('dogs-edit', { dog: dog });
    }).catch((err) => {
      console.log(err.message);
    })
  });
  
  
  // UPDATE
  app.put('/dogs/:id', (req, res) => {
    Dog.findByPk(req.params.id).then(dog => {
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
    Dog.findByPk(req.params.id).then(dog => {
      dog.destroy();
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
  })

}
