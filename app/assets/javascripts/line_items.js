// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$("input.quantity").change(function () {
    $.ajax({
        url: "/line_items/update_quantity",
        method: "post",
        data: {"quantity": $(this).val(), "line_item_id": $(this).attr("id")}
    }).done(function(response) {
        $("td#cart-cost-" + response.line_item_id).html(response.price + " Руб.");
        $("div.cart-total-price").html("<span>Общая стоимость:</span> " + response.total + " Руб.");
    });
});