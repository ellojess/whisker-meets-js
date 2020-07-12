const Dog = require('../models/dogs');
const Comment = require('../models/comment');

module.exports = function (app) {
  // CREATE Comment
  app.post("/dogs/:dogId/comments", function (req, res) {
      const comment = new Comment(req.body);
      comment.author = req.user._id;
      comment
          .save()
          .then(comment => {
              return Promise.all([
                  Dog.findById(req.params.dogId)
              ]);
          })
          .then(([dog, user]) => {
            dog.comments.unshift(comment);
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
  });
};