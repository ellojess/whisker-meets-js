var Dog = require("../models/dogs");
var Comment = require("../models/comment");
var User = require("../models/users");

module.exports = app => {
  // NEW REPLY
  app.get("/dogs/:dogId/comments/:commentId/replies/new", (req, res) => {
    let dog
    Dog.findById(req.params.dogId)
      .then(dog => {
        return Comment.findById(req.params.commentId);
      })
      .then(comment => {
        console.log(comment)
        res.render("replies-new", { dog, comment });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

    // CREATE REPLY
    app.post("/dogs/:dogId/comments/:commentId/replies/new", (req, res) => {
        // TURN REPLY INTO A COMMENT OBJECT
        const reply = new Comment(req.body);
        reply.author = req.user._id
        // LOOKUP THE PARENT POST
        Dog.findById(req.params.dogId)
            .then(dog => {
                // FIND THE CHILD COMMENT
                Promise.all([
                    reply.save(),
                    Comment.findById(req.params.commentId),
                ])
                    .then(([reply, comment]) => {
                        // ADD THE REPLY
                        comment.comments.unshift(reply._id);

                        return Promise.all([
                            comment.save(),
                        ]);
                    })
                    .then(() => {
                        res.redirect(`/dogs/${req.params.dogId}`);
                    })
                    .catch(console.error);
                // SAVE THE CHANGE TO THE PARENT DOCUMENT
                return dog.save();
            })
    });
};