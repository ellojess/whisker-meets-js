//dogs.js
const Dog = require("../models/dogs")
const moment = require('moment');


module.exports = function (app) {

    // INDEX
    app.get('/', (req, res) => {
        // //Dog.find({ order: [['createdAt', 'DESC']] }).then(dogs => {
          Dog.find({}).lean().then(dogs => {
        res.render('dogs-index', { dogs: dogs });
        })
    }) 

    // NEW
    app.get('/dogs/new', (req, res) => {
    res.render('dogs-new', {});
  })
  
  // CREATE
  app.post('/dogs/new', (req, res) => {

    console.log("Im in dogs/new")

    const dog = new Dog(req.body)
    dog.createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
    dog.save().then(dog => {
      // Redirect to dogs/:id
      res.redirect(`/dogs/${dog.id}`)
    }).catch((err) => {
      console.log(err)
    });
//
  //  Dog.create(req.body).then(dog => {
      // Redirect to dogs/:id
    //   res.redirect(`/dogs/${dog.id}`)
    // }).catch((err) => {
    //   console.log(err)
    // });
  })
  
// SHOW
app.get('/dogs/:id', (req, res) => {
  // Dog.findByPk(req.params.id, { include: [{ model: models.Favorite }] }).then(dog => {

  console.log("Im in dogs/:id")


    Dog.findById(req.params.id).then(dog => {
      // let createdAt = dog.createdAt;
      //let createdAt = moment().format('MMMM Do YYYY, h:mm:ss a');
      //console.log(`Created at: ${createdAt}`)
      // dog.createdAtFormatted = createdAt;
      res.render('dogs-show', { dog: dog });
  }).catch((err) => {
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
