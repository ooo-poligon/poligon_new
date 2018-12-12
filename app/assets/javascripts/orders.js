// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.

$("input.quantity-in-cart").change(function() {
    $.ajax({
        url: "/line_items/update_quantity",
        method: "post",
        data: {"quantity": $(this).val(), "line_item_id": $(this).attr("id")}
    }).done(function(response) {
        if (response.overflow > 0 && response.stock !== 0) {
            $("td#cart-status-" + response.line_item_id).html('<span><img src='+image_path("yellow.gif")+'></span> <span>Ð§Ð°ÑÑÐ¸ÑÐ½Ð¾ Ð² Ð½Ð°Ð»Ð¸ÑÐ¸Ð¸</span>');
        } else if (response.stock === 0) {
            $("td#cart-status-" + response.line_item_id).html('<span><img src='+image_path("grey.gif")  +'></span> <span>ÐÐ¾Ð´ Ð·Ð°ÐºÐ°Ð·</span>');
        } else {
            $("td#cart-status-" + response.line_item_id).html('<span><img src='+image_path("green.gif") +'></span> <span>ÐÐ° ÑÐºÐ»Ð°Ð´Ðµ</span>');
        }
        $("td#cart-cost-" + response.line_item_id).html(response.price + " Ð ÑÐ±.");
        $("div.cart-total-price").html("<span>ÐÐ±ÑÐ°Ñ ÑÑÐ¾Ð¸Ð¼Ð¾ÑÑÑ:</span> " + response.total + " Ð ÑÐ±.");
    });
});