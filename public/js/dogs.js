$(document).ready(function() {
  $(".favorites").submit(function(e) {
    e.preventDefault();

    var dogId = $(this).data("id");
    location.reload
    $.ajax({
      type: "POST",
      url: dogId + "/favorites",
      success: function(data) {
        console.log("favorites!");
      },
      error: function(err) {
        console.log(err.messsage);
      }
    });
  });
});