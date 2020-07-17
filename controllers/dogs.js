//dogs.js
const Dog = require("../models/dogs")
const User = require("../models/users")
const moment = require('moment');


module.exports = app => {

    // INDEX
    app.get('/', (req, res) => {
      var currentUser = req.user;
        // //Dog.find({ order: [['createdAt', 'DESC']] }).then(dogs => {
      Dog.find({}).lean()
      .then(dogs => {
        for (let item of dogs) {
          console.log(item.author)
        }
        res.render('dogs-index', { dogs, currentUser});
      })
      .catch(err => {
        console.log(err.message);
      });
    }) 

    // NEW
    app.get('/dogs/new', (req, res) => {
      let currentUser = req.user;
      res.render('dogs-new', {currentUser});
    })

  // CREATE
  app.post("/dogs/new", (req, res) => {
    if (req.user) {
        console.log("user is there")
        var dog = new Dog(req.body);
        dog.author = req.user._id;
        dog.favorites = [];
        dog.favoriteScore = 0;

        dog
            .save()
            .then(dog => {
                return Promise.all(User.findById(req.user._id));
            })
            .then(user => {
                console.log(`Username: ${user}`)
                user.dogs.unshift(dog);
                user.save();
                // REDIRECT TO THE NEW POST
                res.redirect(`/dogs/${dog._id}`);
            })
            .catch(err => {
                console.log(err.message);
            });
    } else {
        console.log("user is not")
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
    var currentUser = req.user;
    Dog.findById(req.params.id).lean().then((dog) => {
      console.log(`Dog id: ${dog._id}`)
      res.render('dogs-edit', { dog, currentUser});
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
    Dog.deleteOne({_id: req.params.id}).then(dog => {
      res.redirect(`/`);
    }).catch((err) => {
      console.log(err);
    });
  })

  //FAVORITE 
  app.post("/dogs/:id/favorites", function(req, res) {
    Dog.findById(req.params.id).exec(function(err, dog) {
      dog.favorites.push(req.user._id);
      dog.favoriteScore = dog.favoriteScore + 1;
      dog.save();
  
      res.status(200);
    });
  });
}
