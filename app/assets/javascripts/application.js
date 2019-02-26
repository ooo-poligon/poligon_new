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
//= require cocoon

//= require jquery-ui

//= require will_paginate_infinite

//= require chosen


function submitRecaptcha() {
  
};

$(document).ready(function() {


  $("a").on('click', function(event) {
    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if 
  });


  function requestExamples(scope_id = null){

    if (scope_id == null) {
      $.ajax({
        url: "/examples",
        type: "GET",
        processData: false,
        contentType: false,
        dataType: 'script'
      }); 
    } else {
      $.ajax({
        url: "/examples?scope="+scope_id,
        type: "GET",
        processData: false,
        contentType: false,
        dataType: 'script'
      }); 
    } 
  }

  $("#examples-reset").click(function(e){
    var new_url = document.location.protocol +"//"+ document.location.hostname + document.location.pathname;
    window.history.replaceState(null, null, new_url);
    $(".apply-menu li").removeClass("active");
    requestExamples()
  });

  $(".apply-menu li").click(function(e){

    var scope_id = $(this).attr('data-id');
    var search = document.location.search;
    $(".apply-menu li").removeClass("active");
    $(this).addClass("active");

    if(search.match("scope") && search.match('scope').length > 0) {
      var new_url = document.location.protocol +"//"+ document.location.hostname + document.location.pathname;
      var url = new_url+"?scope="+scope_id;
      window.history.replaceState(null, null, url);
    } else {
      var url = document.location.href+"?scope="+scope_id;
      window.history.replaceState(null, null, url);
    }

    requestExamples(scope_id);
    
  });



  if ($(".ckeditor").length > 0) {
      CKEDITOR.replaceClass = 'ckeditor';
  } else {
    console.log("ckeditor not find");
  }

  $(".chosen").chosen({
    allow_single_deselect: true,
    no_results_text: 'Нет результатов по запросу',
    width: '100%'
  });

  var queriesInProcess = 0;

  $('.chosen-search input').autocomplete({
      minLength: 0,
      delay: 1000,
      source: function( request, response ) {
          if ($(".chosen-search-input").val().length > 0){
            queriesInProcess--;
          }
          if (queriesInProcess > 0){
            
          } else {
            queriesInProcess++;
            $.ajax({
                url: "/products/autocomplete_product_title?term="+request.term,
                dataType: "json",
                beforeSend: function(){ $('ul.chosen-results').empty(); $("#example_product_id").empty(); }
            }).done(function( data ) {
                    $("#example_product_id").prepend("<option value='' selected='selected'></option>");
                    response( $.map( data, function( item ) {
                      console.log(item);
                        $('#example_product_id').append('<option value="'+item.id+'">' + item.title + '</option>');
                    }));

                   $("#example_product_id").trigger("chosen:updated");
            });
          }

      }
  });



  var availableTags = [
      {product_id: 1, label: "ActionScript"},
      {product_id: 2, label: "Ruby"},
      {product_id: 3, label: "Scala"},
      {product_id: 4, label: "Scheme"}
    ];

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


