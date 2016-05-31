// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
//
//= require tablehover
//= require column-table-char-align

$(document).ready(function(){
  $('.modCont').columnTableCharAlign({cols: 1, left_offset: 6, right_offset: 0});
  $('.modCont').columnTableCharAlign({cols: 2, left_offset: 2});
  $('.modCont').columnTableCharAlign({cols: 3, left_offset: 4});
  $('.modCont').columnTableCharAlign({cols: 4, left_offset: 3, right_offset: 0});
  $('.modCont').columnTableCharAlign({cols: 5, left_offset: 3, right_offset: 0});
  $('.modCont').columnTableCharAlign({cols: 6, left_offset: 3, right_offset: 0});
  $('.modCont').columnTableCharAlign({cols: 7, left_offset: 3, right_offset: 0});
  $('.backlight').tableHover({
    colClass: 'hover',
    rowClass: 'hover',
    headCols: true,
    ignoreCols: [1]
  });
});

$(document).ready(function(){
  $('.benedict-FLC').columnTableCharAlign({cols: 1, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 2, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 3, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 4, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 6, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 7, left_offset: 4});
  $('.benedict-FLC').columnTableCharAlign({cols: 8, left_offset: 4});
  $('.benedict-FLC').columnTableCharAlign({cols: 9, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 10, left_offset: 4});
  $('.benedict-FLC').columnTableCharAlign({cols: 11, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 12, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 13, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 14, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 15, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 16, left_offset: 3});
  $('.benedict-FLC').columnTableCharAlign({cols: 17, left_offset: 3});

  $('.backlight').tableHover({
    colClass: 'hover',
    rowClass: 'hover',
    headCols: true,
    spanRows: false,
    spanCols: false,
    ignoreRows: [1,2]
  });
});
