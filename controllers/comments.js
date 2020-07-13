const Dog = require('../models/dogs');
const Comment = require('../models/comment');

module.exports = function (app) {

  // CREATE Comment
  app.post("/dogs/:dogId/comments", function (req, res) {

    if (req.user) {
      const comment = new Comment(req.body);
      console.log(req.params.dogId)
      comment.author = req.user._id;
      comment
          .save()
          .then(comment => {
              return Promise.all([
                  Dog.findById(req.params.dogId)
              ]);
              
          })
          .then(([dog]) => {
            console.log(`Dog name: ${dog.name}`)
            dog.comments.unshift(comment._id);
              return Promise.all([
                dog.save()
              ]);
          })
          .then(dog => {
              res.redirect(`/dogs/${req.params.dogId}`);
          })
          .catch(err => {
              console.log(err);
          });
      } else {
        res.redirect('/login')
      }
  });
};