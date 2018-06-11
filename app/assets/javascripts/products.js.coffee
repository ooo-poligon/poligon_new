# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$('document').ready ->
  $('img.xactive').on 'click', ->
  $('img.xactive').trigger 'click'

  $('#special').on 'shown.bs.modal', ->
    oldQuantity = $('input#modal-special-quantity').val()
    newQuantity = $('input#quantity.quantity-product').val()
    if newQuantity
      $('input#modal-special-quantity').val newQuantity
    else
      $('input#modal-special-quantity').val oldQuantity
  return
return