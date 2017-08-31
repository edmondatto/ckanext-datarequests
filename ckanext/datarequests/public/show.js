var up_voted = false;
var down_voted = false;

$(document).ready(function() {
  var up_vote_counter = $("#up_votes_count").text();
  var down_vote_counter = $("#down_votes_count").text();
  $("#thumbs_up").click(function () {
    up_voted = !up_voted;
    $('#thumbs_up').toggleClass('fa-thumbs-up fa-thumbs-o-up');
    
    if (up_voted) {
      $('#thumbs_down').addClass('disabled');
      up_vote_counter ++;
      $("#up_votes_count").text(up_vote_counter);
    } else {
      $('#thumbs_down').removeClass('disabled');
      up_vote_counter --;
      $("#up_votes_count").text(up_vote_counter);
    }
  });
  
  $("#thumbs_down").click(function () {
    down_voted = !down_voted;
    $('#thumbs_down').toggleClass('fa-thumbs-down fa-thumbs-o-down');
    
    if (down_voted) {
      $('#thumbs_up').addClass('disabled');
      down_vote_counter ++;
      $("#down_votes_count").text(down_vote_counter);
    } else {
      $('#thumbs_up').removeClass('disabled');
      down_vote_counter --;
      $("#down_votes_count").text(down_vote_counter);
    }
  });
});
