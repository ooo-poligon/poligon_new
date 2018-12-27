// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(document).ready(function() {

  $(".hidden-submit").hide();

  $(".booklet-checkbox").click(function(e){
    var selected = [];

    $('.booklet-checkbox input:checked').each(function() {
        selected.push($(this).attr('value'));
    });

    if (selected.length == 0){
      $(".request-booklets-modal").hide();
    } else {
      $(".request-booklets-modal").show();
    }

  });

});