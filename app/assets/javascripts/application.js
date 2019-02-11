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
//= require jquery.slicknav.min
//= require lightcase
//= require owl.carousel.min
//= require spotlight
//= require script
//= require fancybox
//= require magnific-popup
//= require bootstrap-sprockets
//= require search
//= require zeroclipboard
//= require tablehover
//= require images
//= require products
//= require orders
//= require categories
//= require clipboard
//= require feedback
//= require jquery.minicolors

//= require jquery-ui
//= require jquery-ui/widgets/autocomplete
//= require autocomplete-rails

//= require will_paginate_infinite

function submitRecaptcha() {
  console.log("callback");
  $(".captcha-form").find(".alert").remove();
};

$(document).ready(function() {

  var availableTags = [
      {product_id: 1, label: "ActionScript"},
      {product_id: 2, label: "Ruby"},
      {product_id: 3, label: "Scala"},
      {product_id: 4, label: "Scheme"}
    ];

  $( "#product_title" ).autocomplete({
      source: function(request, response){
        $.ajax({
            url: "/products/autocomplete_product_title",
            data: { term: request.term },
            success: function (data) {
                var transformed = $.map(data, function (el) {
                    return {
                        label: el.label,
                        id: el.id
                    };
                });
                response(transformed);
            },
            error: function () {
                response([]);
            }
        });
      },
      select: function( event, ui ) {
        $('#example_product_id').val(ui.item.id);
      }
    });

  $(".portfolio").click(function(e){
    var checkSelected = $(this).find(".wrap-border").hasClass("blue-selection");
    if (checkSelected){
      $(".about-brand").hide();
      $(".wrap-border").removeClass("blue-selection");
    } else {
      $(".about-brand").hide();
      $(".wrap-border").removeClass("blue-selection");
      $(this).next().fadeIn();
      $(this).find(".wrap-border").addClass("blue-selection");
    }

  });

  $( ".production-widget .container" ).mouseleave(function() {
    $(".production-widget").hide();
  });

  $(".brands-widget .container").mouseleave(function() {
    $(".brands-widget").hide();
  });

  $(".tab-image").error(function () { 
    $(this).hide();
    console.log("one");
  });

  $(".captcha-form").submit(function(event) {
    var recaptcha = $(this).find(".g-recaptcha-response").val();
    $("#g-recaptcha-response").val(recaptcha);
    console.log(recaptcha);
    if (recaptcha === "") {
      event.preventDefault();
      if ($(this).find(".captcha").parent().find(".alert").length == 0){
        $(this).find(".captcha").before('<div class="alert alert-danger" role="alert">Подтвердите, что вы не робот!</div>');
      } else {
        
      }
    }
  });


  var clipboard = new Clipboard('.clipboard-btn');
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
      if(offset)$('html,body').scrollTop(offset.top - 300);
    });
  });

  $(function () {
    $('#message-modal').modal('show');
  });

  $("button#send-order-button").click(function() {
    $('html,body').animate({
      scrollTop: $("div#send-order").offset().top
      },
      'slow'
    );
  });
});

function no_pdf() {
    alert("ÐÐ»Ñ ÑÑÐ¾Ð³Ð¾ ÑÑÑÑÐ¾Ð¹ÑÑÐ²Ð° Ð´Ð°ÑÐ°ÑÐ¸Ñ Ð½Ðµ Ð¾Ð±Ð½Ð°ÑÑÐ¶ÐµÐ½.");
}

$('div.modal').on('hidden.bs.modal', function () {
    $.ajax({
        url: "/carts/update_cart_quantity",
        method: "post"
    }).done(function(html) {
        $("div.top-cart a").html;
        $("div.bot-cart a").html;
    });

    $.ajax({
        url: "/carts/update_cart_sum",
        method: "post"
    }).done(function(html) {
        $("div.bot-sum").html;
    });

    $(".modal-backdrop.in").not(".fade").remove();
});


