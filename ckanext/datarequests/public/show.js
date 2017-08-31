var up_voted = false;
var down_voted = false;

// initialize upvote and downvote counter

$(document).ready(function() {
  
  $("#thumbs_up").click(function () {
    up_voted = !up_voted;
    $('#thumbs_up').toggleClass('fa-thumbs-up fa-thumbs-o-up');
    
    // insert code for calculating new upvote counter
    
    if (up_voted) {
      $('#thumbs_down').addClass('disabled');
    } else {
      $('#thumbs_down').removeClass('disabled');
    }
  });
  
  $("#thumbs_down").click(function () {
    down_voted = !down_voted;
    $('#thumbs_down').toggleClass('fa-thumbs-down fa-thumbs-o-down');
    
    // insert code for calculating new down vote counter
    if (up_voted) {
      $('#thumbs_up').addClass('disabled');
    } else {
      $('#thumbs_up').removeClass('disabled');
    }
  });
});
