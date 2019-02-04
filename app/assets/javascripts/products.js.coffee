# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://jashkenas.github.com/coffee-script/

$('document').ready ->
  $('img.xactive').on 'click', ->
  $('img.xactive').trigger 'click'

  $('#special').on 'shown.bs.modal', ->
    oldQuantity = 0
    newQuantity = $('input#quantity.quantity-product').val()
    if ($('input.quantity-changed').length && ($('input.quantity-changed').val() > 1))
      newQuantity = $('input.quantity-changed').val()
      $("input.quantity-changed").removeClass("quantity-changed")
    if newQuantity
      $('input#modal-special-quantity').val newQuantity
    else
      $('input#modal-special-quantity').val oldQuantity
  return
return