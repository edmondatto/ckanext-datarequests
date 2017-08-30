var up_voted = false;
var down_voted = false;

function up_vote() {
  up_voted = !up_voted;
  $('#up').toggleClass('fa-thumbs-up fa-thumbs-o-up');
  
  if(up_voted){
    $('#down').addClass('disabled');
  } else {
    $('#down').removeClass('disabled');
  }
}

function down_vote() {
  down_voted = !down_voted;
  $('#down').toggleClass('fa-thumbs-down fa-thumbs-o-down');
  
  if(down_voted){
    $('#up').addClass('disabled');
  } else {
    $('#up').removeClass('disabled');
  }
}

