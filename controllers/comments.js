const Dog = require('../models/dogs');
const Comment = require('../models/comment');

module.exports = function (app) {
  // CREATE Comment
  app.post("/dogs/:dogId/comments", function(req, res) {
    // INSTANTIATE INSTANCE OF MODEL
    const comment = new Comment(req.body);
    comment.author = req.user._id;
    // SAVE INSTANCE OF Comment MODEL TO DB
    comment
      .save()
      .then(comment => {
        return Dog.findById(req.params.postId);
      })
      .then(dog => {
        dog.comments.unshift(comment);
        return dog.save();
      })
      .then(dog => {
        res.redirect(`/`);
      })
      .catch(err => {
        console.log(err);
      });
  });
}