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
        dog.author = req.user._id;

        dog
            .save()
            .then(dog => {
                return User.findById(req.user._id);
            })
            .then(user => {
                user.dogs.unshift(post);
                user.save();
                // REDIRECT TO THE NEW POST
                res.redirect(`/dogs/${dog._id}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    } else {
        return res.status(401); // UNAUTHORIZED
    }
  });
  
// SHOW
app.get('/dogs/:id', (req, res) => {
  var currentUser = req.user;
    Dog.findById(req.params.id)
      .populate('comments').lean()
      .populate('author')
      .then((dog) => {
        res.render('dogs-show', { dog, currentUser });
      })
      .catch((err) => {
          console.log(err.message);
      })
});

  
  // EDIT
  app.get('/dogs/:id/edit', (req, res) => {
    Dog.findById(req.params.id).then((dog) => {
      res.render('dogs-edit', { dog: dog });
    }).catch((err) => {
      console.log(err.message);
    })
  });
  
  
  // UPDATE
  app.put('/dogs/:id', (req, res) => {
    Dog.findById(req.params.id).then(dog => {
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
    Dog.findById(req.params.id).then(dog => {
      dog.destroy();
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
  })

}
