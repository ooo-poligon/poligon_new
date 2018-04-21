// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.


$("input.quantity").change(function () {
    $.ajax({
        url: "/line_items/update_quantity",
        method: "post",
        data: {"quantity": $(this).val(), "line_item_id": $(this).attr("id")}
    }).done(function(response) {
        $(this).val(response);
        location.reload();
    });
});