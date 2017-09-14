var up_voted = false;
var down_voted = false;

$(document).ready(function() {
  var up_vote_counter = $("#up_votes_count").text();
  var down_vote_counter = $("#down_votes_count").text();
  var datarequest_id = document.getElementById("datarequest_vote_section").dataset.datarequestId;
  var user_option = document.getElementById("datarequest_vote_section").dataset.userOption;

  $("#thumbs_up").click(function () {
    if (user_option === "True"){
      up_voted = true;
    } 
    
    if (up_voted === false) {
      // Upvote a post
      $.ajax({
        url: "/api/3/action/datarequest_vote",
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          "id": datarequest_id,
          "vote": "True"
        }),
        success: function(result){
          // Up vote was successful
          $('#thumbs_up').toggleClass('fa-thumbs-up fa-thumbs-o-up');
          up_vote_counter ++;
          up_voted = true;
          user_option = "True";
          $("#up_votes_count").text(up_vote_counter);
          $("#user_option").text("True");
          $('.down_vote').addClass('disabled');
        },
        error: function(result){
          // Error voting
          up_voted = !up_voted;
        }
      });

    } else {
      // Unvote before voting again
      $.ajax({
        url: "/api/3/action/datarequest_unvote",
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          "id": datarequest_id
        }),
        success: function(result){
          // Successfully unvoting
          $('#thumbs_up').toggleClass('fa-thumbs-o-up fa-thumbs-up');
          up_vote_counter --;
          user_option = "None";
          up_voted = false;
          $("#up_votes_count").text(up_vote_counter);
          $("#user_option").text("None");
          $('.down_vote').removeClass('disabled');
        },
        error: function(result){
          // Error unvoting
          up_voted = !up_voted;
        }
      });

    }
  });
  
  $("#thumbs_down").click(function () {
    if (user_option === "False"){
      down_voted = true;
    } 
    
    if (down_voted === false) {
      // Downvote
      $.ajax({
        url: "/api/3/action/datarequest_vote",
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          "id": datarequest_id,
          "vote": "False"
        }),
        success: function(result){
          // Down vote successfully
          $('#thumbs_down').toggleClass('fa-thumbs-down fa-thumbs-o-down');
          down_vote_counter ++;
          user_option = "False";
          down_voted = true;
          $("#down_votes_count").text(down_vote_counter);
          $("#user_option").text("False");
          $('.up_vote').addClass('disabled');
        },
        error: function(result){
          // Error voting
          down_voted = !down_voted;
        }
      });

    } else {
      // Unvote before voting again
      $.ajax({
        url: "/api/3/action/datarequest_unvote",
        type: "post",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify({
          "id": datarequest_id
        }),
        success: function(result){
          // Successfully unvoting
          $('#thumbs_down').toggleClass('fa-thumbs-o-down fa-thumbs-down');
          down_vote_counter --;
          down_voted = false;
          user_option = "None";
          $("#down_votes_count").text(down_vote_counter);
          $("#user_option").text("None");
          $('.up_vote').removeClass('disabled');
        },
        error: function(result){
          // Error unvoting
          down_voted = !down_voted;
        }
      });

    }
  });

});
