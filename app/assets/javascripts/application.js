// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require fancybox
//= require bootstrap-sprockets
//= require search
//= require zeroclipboard
//= require tablehover

$(document).ready(function() {
  var clip = new ZeroClipboard($(".copy-btn"));
  $("a.fancybox").fancybox();
  $('.backlight').tableHover({
    colClass: 'hover',
    rowClass: 'hover',
    headCols: true,
    spanRows: false,
    spanCols: false,
    ignoreRows: [1,2]
  });


  $(function () {
    $('#accordion').on('shown.bs.collapse', function (e) {
    var offset = $('.panel.panel-default > .panel-collapse.in').offset();
    if(offset)$('html,body').scrollTop(offset.top - 300); });
  });
});

function no_pdf() {
  alert("Для этого устройства даташит не обнаружен.");
}
