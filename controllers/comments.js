const Dog = require('../models/dog');
const Comment = require('../models/comment');

// CREATE Comment
app.post("/dogs/:dogId/comments", function(req, res) {
  // INSTANTIATE INSTANCE OF MODEL
  const comment = new Comment(req.body);

  // SAVE INSTANCE OF Comment MODEL TO DB
  comment
    .save()
    .then(comment => {
      return Dog.findById(req.params.dogId);
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