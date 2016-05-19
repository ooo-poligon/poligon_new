// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$(function(){
  $('ul#swf-index li a').bind('click', function(){
    var value = this.hash.substr(1)
    $('div#player div').hide();
    $('div #swf-description p').hide();
    $('div#'+value).show();
    $('div #swf-description p.'+value).show('slow');
    $('ul#swf-index li a').removeClass('currentSwf');
    $(this).addClass('currentSwf');
    return false;
  });
});
