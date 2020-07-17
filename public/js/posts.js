$(document).ready(function() {
    $(".favorites").submit(function(e) {
      e.preventDefault();
  
      var postId = $(this).data("id");
      $.ajax({
        type: "PUT",
        url: "dogs/" + postId + "/favorites",
        success: function(data) {
          console.log("favorites!");
        },
        error: function(err) {
          console.log(err.messsage);
        }
      });
    });
  });