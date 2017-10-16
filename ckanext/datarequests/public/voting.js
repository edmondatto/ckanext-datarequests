var up_voted = false;
var down_voted = false;

$(document).ready(function() {
  var rating = $("#rating").text();
  var datarequest_id = document.getElementById("datarequest_vote_section").dataset.datarequestId;
  var user_option = document.getElementById("datarequest_vote_section").dataset.userOption;

  $("#arrow_up").click(function () {
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
          $("#arrow_up").css("color", "orange");
          rating ++;
          up_voted = true;
          user_option = "True";
          $("#rating").text(rating);
          $("#user_option").text("True");
          $('#arrow_down').addClass('disabled');
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
          $("#arrow_up").css("color", "");
          rating --;
          user_option = "None";
          up_voted = false;
          $("#rating").text(rating);
          $("#user_option").text("None");
          $('#arrow_down').removeClass('disabled');
        },
        error: function(result){
          // Error unvoting
          up_voted = !up_voted;
        }
      });

    }
  });
  
  $("#arrow_down").click(function () {
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
          $("#arrow_down").css("color", "orange");
          rating --;
          user_option = "False";
          down_voted = true;
          $("#rating").text(rating);
          $("#user_option").text("False");
          $('#arrow_up').addClass('disabled');
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
          $("#arrow_down").css("color", "");
          rating ++;
          down_voted = false;
          user_option = "None";
          $("#rating").text(rating);
          $("#user_option").text("None");
          $('#arrow_up').removeClass('disabled');
        },
        error: function(result){
          // Error unvoting
          down_voted = !down_voted;
        }
      });

    }
  });

});
