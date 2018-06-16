// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$("input.quantity-in-cart").change(function() {
    $.ajax({
        url: "/line_items/update_quantity",
        method: "post",
        data: {"quantity": $(this).val(), "line_item_id": $(this).attr("id")}
    }).done(function(response) {
        if (response.overflow > 0) {
            $("td#cart-status-" + response.line_item_id).html('<span><%= image_tag("grey.gif") %></span> <span>Частично в наличии</span>');
        } else {
            $("td#cart-status-" + response.line_item_id).html('<span><%= image_tag("green.gif") %></span> <span>На складе</span>');
        }
        $("td#cart-cost-" + response.line_item_id).html(response.price + " Руб.");
        $("div.cart-total-price").html("<span>Общая стоимость:</span> " + response.total + " Руб.");
    });
});