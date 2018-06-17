$('input#quantity').on('change', function () {
    var elem = $(this);
    $.ajax({
        url: "/categories/quantity_cash",
        method: "post",
        data: {"quantity": $("input#quantity").val()}
    }).done(function(response) {
        $("input.quantity-changed").removeClass("quantity-changed");
        elem.addClass("quantity-changed");
    });
});
