$(window).scroll(function(){
if($(window).scrollTop()>300){
$('.bot-line').slideDown()
}
else {
$('.bot-line').slideUp()	
}
})

$(function(){
$(document).on('mouseenter', '.nav-list li:not(.op)', function(e){
			if($(window).width() <= 1024) return false;
			var $this = $(this);

			$this.addClass('op');

			if($this.siblings('.op').length){
				$this.siblings('.op').removeClass('op').find('.nav-widget').hide();
				$this.find('.nav-widget').show();
			} else {
				$this.find('.nav-widget').finish().slideDown(400)
			}
			return false;
		})

		.on('mouseleave', '.top-nav', function(){
			if($(window).width() <= 1024) return false;
		
			var $this = $(this);

			$this.find('.op').find('.nav-widget').finish().slideUp(300, function(){
				$this.find('.op').removeClass('op');
			})
		})
		.on('click', '.nav-list > li.parent', function(e){
			if($(window).width() <= 1024) {
				var $this = $(this),
					acc = $this.parent();

				acc.toggleClass('op');
				if(acc.hasClass('op')) {
					if(acc.siblings('.op').length){
						acc.siblings('.op').removeClass('op').find('.op').slideUp(400)
					}
					acc.find('.nav-widget').slideDown(400)
				} else {
					acc.find('.nav-widget').slideUp(400)
				}

				return false;
			}
		})
});

$(function(){
$(document).on('mouseenter', '.top-menu > div[class*="col-"]:not(.op)', function(e){
			if($(window).width() <= 1024) return false;
			var $this = $(this);

			$this.addClass('op');

			if($this.siblings('.op').length){
				$this.siblings('.op').removeClass('op').find('.widget').hide();
				$this.find('.widget').show();
			} else {
				$this.find('.widget').finish().slideDown(400)
			}
			return false;
		})
		.on('mouseleave', '.top-menu', function(){
			if($(window).width() <= 1024) return false;
			var $this = $(this);

			$this.find('.op').find('.widget').finish().slideUp(300, function(){
				$this.find('.op').removeClass('op');
			})
		})
		.on('click', '.top-menu div[class*="col-"]', function(e){
			if($(window).width() <= 1024) {
				var $this = $(this),
					acc = $this.parent();

				$this.toggleClass('op');
				if($this.hasClass('op')) {
					if($this.siblings('.op').length){
						$this.siblings('.op').removeClass('op').find('.op').slideUp(400)
					}
					$this.find('.widget').slideDown(400)
				} else {
					$this.find('.widget').slideUp(400)
				}

				return false;
			}
		})
});

jQuery(document).ready(function(){
	jQuery('.search-widget').hide()
	jQuery('.mobile-search-button').click(function(){
	jQuery(this).toggleClass('touched').next().slideToggle(300)
	})
})
jQuery(document).ready(function(){
	jQuery('.sub-category').hide()
	jQuery('.show-sub').click(function(){
	jQuery(this).toggleClass('show')
	jQuery('.sub-category').slideToggle(300)
	})
})
jQuery(document).ready(function(){
	jQuery('.category-filter-bottom').hide()
	jQuery('.filter-status span').click(function(){
	jQuery('.filter-status span').toggleClass('active')
	jQuery('.category-filter-bottom').slideToggle(300)
	})
})
jQuery(document).ready(function(){
	jQuery('.hid-text').hide()
	jQuery('.product-list li a').click(function(){
	jQuery(this).next().slideToggle(300)
	})
	jQuery('.hide-hid-text').click(function(){
	jQuery('.hid-text').slideToggle(300)
	})
})

jQuery(document).ready(function ($) {
	$('a[data-rel^=lightcase]').lightcase({ swipe: true, maxWidth: 1000, maxHeight: 800 });
});

function recall_form() {
	var e = $("#recall-form").serialize();
	$.ajax({
		type: "POST",
		url: "/feedback/send_project_conditions",
		data: e,
		success: function(e) {
			$("#close-recall").click(),
			$("#thx").click()
		},
		error: function(e, c) {
			alert("Возникла ошибка: " + e.responseCode)
		}
	})
};
$(document).ready(function(){
$('.phone-send').mask('+7 ( 999 ) 999-99-99');
});

$('#main-slider').owlCarousel({
    loop: true,
    nav: false,
    margin:0,
    responsive:{
        0:{
            nav: false,
			dots: true,
            items:1,
			autoplay:true,
			autoplayTimeout:5000
        }
    }
});

$('#footer-carousel').owlCarousel({
    loop: true,
    nav: true,
    margin:2,
    responsive:{
		0:{
            nav: true,
			loop: true,
            items:2
        },
        768:{
            nav: true,
            items:4,
        }
    }
});


$(function() {
  $(".mp__button-main, .mp__overlay").on("click", function(e) {
    $("body").toggleClass("freeze");
  });
  $(document).on("click", function(e) {
    if ($(e.target).is("body") === false) {
      $("body").removeClass("freeze");
    }
  });
});

function checkParams() {
    var name = $('#name').val();
    var phone = $('#phone').val();
    var email = $('#email').val();
    
    if(name.length != 0 && email.length != 0 && phone.length != 0) {
        $('#send').removeAttr('disabled');
    } else {
        $('#send').attr('disabled', 'disabled');
    }
}

jQuery(document).ready(function(){
	jQuery('.apply-tags li').click(function(){
	jQuery(this).toggleClass("active")
	})
});



/*
	By Osvaldas Valutis, www.osvaldas.info
	Available for use under the MIT License
*/

'use strict';

;( function ( document, window, index )
{
	var inputs = document.querySelectorAll( '.inputfile' );
	Array.prototype.forEach.call( inputs, function( input )
	{
		var label	 = input.nextElementSibling,
			labelVal = label.innerHTML;

		input.addEventListener( 'change', function( e )
		{
			var fileName = '';
			if( this.files && this.files.length > 1 )
				fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
			else
				fileName = e.target.value.split( '\\' ).pop();

			if( fileName )
				label.querySelector( 'span' ).innerHTML = fileName;
			else
				label.innerHTML = labelVal;
		});

		// Firefox bug fix
		input.addEventListener( 'focus', function(){ input.classList.add( 'has-focus' ); });
		input.addEventListener( 'blur', function(){ input.classList.remove( 'has-focus' ); });
	});
}( document, window, 0 ));

/*
    jQuery Masked Input Plugin
    Copyright (c) 2007 - 2015 Josh Bush (digitalbush.com)
    Licensed under the MIT license (http://digitalbush.com/projects/masked-input-plugin/#license)
    Version: 1.4.1
*/
!function(factory) {
    "function" == typeof define && define.amd ? define([ "jquery" ], factory) : factory("object" == typeof exports ? require("jquery") : jQuery);
}(function($) {
    var caretTimeoutId, ua = navigator.userAgent, iPhone = /iphone/i.test(ua), chrome = /chrome/i.test(ua), android = /android/i.test(ua);
    $.mask = {
        definitions: {
            "9": "[0-9]",
            a: "[A-Za-z]",
            "*": "[A-Za-z0-9]"
        },
        autoclear: !0,
        dataName: "rawMaskFn",
        placeholder: "_"
    }, $.fn.extend({
        caret: function(begin, end) {
            var range;
            if (0 !== this.length && !this.is(":hidden")) return "number" == typeof begin ? (end = "number" == typeof end ? end : begin, 
            this.each(function() {
                this.setSelectionRange ? this.setSelectionRange(begin, end) : this.createTextRange && (range = this.createTextRange(), 
                range.collapse(!0), range.moveEnd("character", end), range.moveStart("character", begin), 
                range.select());
            })) : (this[0].setSelectionRange ? (begin = this[0].selectionStart, end = this[0].selectionEnd) : document.selection && document.selection.createRange && (range = document.selection.createRange(), 
            begin = 0 - range.duplicate().moveStart("character", -1e5), end = begin + range.text.length), 
            {
                begin: begin,
                end: end
            });
        },
        unmask: function() {
            return this.trigger("unmask");
        },
        mask: function(mask, settings) {
            var input, defs, tests, partialPosition, firstNonMaskPos, lastRequiredNonMaskPos, len, oldVal;
            if (!mask && this.length > 0) {
                input = $(this[0]);
                var fn = input.data($.mask.dataName);
                return fn ? fn() : void 0;
            }
            return settings = $.extend({
                autoclear: $.mask.autoclear,
                placeholder: $.mask.placeholder,
                completed: null
            }, settings), defs = $.mask.definitions, tests = [], partialPosition = len = mask.length, 
            firstNonMaskPos = null, $.each(mask.split(""), function(i, c) {
                "?" == c ? (len--, partialPosition = i) : defs[c] ? (tests.push(new RegExp(defs[c])), 
                null === firstNonMaskPos && (firstNonMaskPos = tests.length - 1), partialPosition > i && (lastRequiredNonMaskPos = tests.length - 1)) : tests.push(null);
            }), this.trigger("unmask").each(function() {
                function tryFireCompleted() {
                    if (settings.completed) {
                        for (var i = firstNonMaskPos; lastRequiredNonMaskPos >= i; i++) if (tests[i] && buffer[i] === getPlaceholder(i)) return;
                        settings.completed.call(input);
                    }
                }
                function getPlaceholder(i) {
                    return settings.placeholder.charAt(i < settings.placeholder.length ? i : 0);
                }
                function seekNext(pos) {
                    for (;++pos < len && !tests[pos]; ) ;
                    return pos;
                }
                function seekPrev(pos) {
                    for (;--pos >= 0 && !tests[pos]; ) ;
                    return pos;
                }
                function shiftL(begin, end) {
                    var i, j;
                    if (!(0 > begin)) {
                        for (i = begin, j = seekNext(end); len > i; i++) if (tests[i]) {
                            if (!(len > j && tests[i].test(buffer[j]))) break;
                            buffer[i] = buffer[j], buffer[j] = getPlaceholder(j), j = seekNext(j);
                        }
                        writeBuffer(), input.caret(Math.max(firstNonMaskPos, begin));
                    }
                }
                function shiftR(pos) {
                    var i, c, j, t;
                    for (i = pos, c = getPlaceholder(pos); len > i; i++) if (tests[i]) {
                        if (j = seekNext(i), t = buffer[i], buffer[i] = c, !(len > j && tests[j].test(t))) break;
                        c = t;
                    }
                }
                function androidInputEvent() {
                    var curVal = input.val(), pos = input.caret();
                    if (oldVal && oldVal.length && oldVal.length > curVal.length) {
                        for (checkVal(!0); pos.begin > 0 && !tests[pos.begin - 1]; ) pos.begin--;
                        if (0 === pos.begin) for (;pos.begin < firstNonMaskPos && !tests[pos.begin]; ) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    } else {
                        for (checkVal(!0); pos.begin < len && !tests[pos.begin]; ) pos.begin++;
                        input.caret(pos.begin, pos.begin);
                    }
                    tryFireCompleted();
                }
                function blurEvent() {
                    checkVal(), input.val() != focusText && input.change();
                }
                function keydownEvent(e) {
                    if (!input.prop("readonly")) {
                        var pos, begin, end, k = e.which || e.keyCode;
                        oldVal = input.val(), 8 === k || 46 === k || iPhone && 127 === k ? (pos = input.caret(), 
                        begin = pos.begin, end = pos.end, end - begin === 0 && (begin = 46 !== k ? seekPrev(begin) : end = seekNext(begin - 1), 
                        end = 46 === k ? seekNext(end) : end), clearBuffer(begin, end), shiftL(begin, end - 1), 
                        e.preventDefault()) : 13 === k ? blurEvent.call(this, e) : 27 === k && (input.val(focusText), 
                        input.caret(0, checkVal()), e.preventDefault());
                    }
                }
                function keypressEvent(e) {
                    if (!input.prop("readonly")) {
                        var p, c, next, k = e.which || e.keyCode, pos = input.caret();
                        if (!(e.ctrlKey || e.altKey || e.metaKey || 32 > k) && k && 13 !== k) {
                            if (pos.end - pos.begin !== 0 && (clearBuffer(pos.begin, pos.end), shiftL(pos.begin, pos.end - 1)), 
                            p = seekNext(pos.begin - 1), len > p && (c = String.fromCharCode(k), tests[p].test(c))) {
                                if (shiftR(p), buffer[p] = c, writeBuffer(), next = seekNext(p), android) {
                                    var proxy = function() {
                                        $.proxy($.fn.caret, input, next)();
                                    };
                                    setTimeout(proxy, 0);
                                } else input.caret(next);
                                pos.begin <= lastRequiredNonMaskPos && tryFireCompleted();
                            }
                            e.preventDefault();
                        }
                    }
                }
                function clearBuffer(start, end) {
                    var i;
                    for (i = start; end > i && len > i; i++) tests[i] && (buffer[i] = getPlaceholder(i));
                }
                function writeBuffer() {
                    input.val(buffer.join(""));
                }
                function checkVal(allow) {
                    var i, c, pos, test = input.val(), lastMatch = -1;
                    for (i = 0, pos = 0; len > i; i++) if (tests[i]) {
                        for (buffer[i] = getPlaceholder(i); pos++ < test.length; ) if (c = test.charAt(pos - 1), 
                        tests[i].test(c)) {
                            buffer[i] = c, lastMatch = i;
                            break;
                        }
                        if (pos > test.length) {
                            clearBuffer(i + 1, len);
                            break;
                        }
                    } else buffer[i] === test.charAt(pos) && pos++, partialPosition > i && (lastMatch = i);
                    return allow ? writeBuffer() : partialPosition > lastMatch + 1 ? settings.autoclear || buffer.join("") === defaultBuffer ? (input.val() && input.val(""), 
                    clearBuffer(0, len)) : writeBuffer() : (writeBuffer(), input.val(input.val().substring(0, lastMatch + 1))), 
                    partialPosition ? i : firstNonMaskPos;
                }
                var input = $(this), buffer = $.map(mask.split(""), function(c, i) {
                    return "?" != c ? defs[c] ? getPlaceholder(i) : c : void 0;
                }), defaultBuffer = buffer.join(""), focusText = input.val();
                input.data($.mask.dataName, function() {
                    return $.map(buffer, function(c, i) {
                        return tests[i] && c != getPlaceholder(i) ? c : null;
                    }).join("");
                }), input.one("unmask", function() {
                    input.off(".mask").removeData($.mask.dataName);
                }).on("focus.mask", function() {
                    if (!input.prop("readonly")) {
                        clearTimeout(caretTimeoutId);
                        var pos;
                        focusText = input.val(), pos = checkVal(), caretTimeoutId = setTimeout(function() {
                            input.get(0) === document.activeElement && (writeBuffer(), pos == mask.replace("?", "").length ? input.caret(0, pos) : input.caret(pos));
                        }, 10);
                    }
                }).on("blur.mask", blurEvent).on("keydown.mask", keydownEvent).on("keypress.mask", keypressEvent).on("input.mask paste.mask", function() {
                    input.prop("readonly") || setTimeout(function() {
                        var pos = checkVal(!0);
                        input.caret(pos), tryFireCompleted();
                    }, 0);
                }), chrome && android && input.off("input.mask").on("input.mask", androidInputEvent), 
                checkVal();
            });
        }
    });
});

/* jQuery Form Styler v2.0.2 | (c) Dimox | https://github.com/Dimox/jQueryFormStyler */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):"object"==typeof exports?module.exports=e($||require("jquery")):e(jQuery)}(function(e){"use strict";function t(t,s){this.element=t,this.options=e.extend({},l,s);var i=this.options.locale;void 0!==this.options.locales[i]&&e.extend(this.options,this.options.locales[i]),this.init()}function s(t){if(!e(t.target).parents().hasClass("jq-selectbox")&&"OPTION"!=t.target.nodeName&&e("div.jq-selectbox.opened").length){var s=e("div.jq-selectbox.opened"),l=e("div.jq-selectbox__search input",s),o=e("div.jq-selectbox__dropdown",s);s.find("select").data("_"+i).options.onSelectClosed.call(s),l.length&&l.val("").keyup(),o.hide().find("li.sel").addClass("selected"),s.removeClass("focused opened dropup dropdown")}}var i="styler",l={idSuffix:"-styler",filePlaceholder:"Файл не выбран",fileBrowse:"Обзор...",fileNumber:"Выбрано файлов: %s",selectPlaceholder:"Выберите...",selectSearch:!1,selectSearchLimit:10,selectSearchNotFound:"Совпадений не найдено",selectSearchPlaceholder:"Поиск...",selectVisibleOptions:0,selectSmartPositioning:!0,locale:"ru",locales:{en:{filePlaceholder:"No file selected",fileBrowse:"Browse...",fileNumber:"Selected files: %s",selectPlaceholder:"Select...",selectSearchNotFound:"No matches found",selectSearchPlaceholder:"Search..."}},onSelectOpened:function(){},onSelectClosed:function(){},onFormStyled:function(){}};t.prototype={init:function(){function t(){void 0!==i.attr("id")&&""!==i.attr("id")&&(this.id=i.attr("id")+l.idSuffix),this.title=i.attr("title"),this.classes=i.attr("class"),this.data=i.data()}var i=e(this.element),l=this.options,o=!(!navigator.userAgent.match(/(iPad|iPhone|iPod)/i)||navigator.userAgent.match(/(Windows\sPhone)/i)),a=!(!navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/(Windows\sPhone)/i));if(i.is(":checkbox")){var d=function(){var s=new t,l=e('<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>').attr({id:s.id,title:s.title}).addClass(s.classes).data(s.data);i.after(l).prependTo(l),i.is(":checked")&&l.addClass("checked"),i.is(":disabled")&&l.addClass("disabled"),l.click(function(e){e.preventDefault(),i.triggerHandler("click"),l.is(".disabled")||(i.is(":checked")?(i.prop("checked",!1),l.removeClass("checked")):(i.prop("checked",!0),l.addClass("checked")),i.focus().change())}),i.closest("label").add('label[for="'+i.attr("id")+'"]').on("click.styler",function(t){e(t.target).is("a")||e(t.target).closest(l).length||(l.triggerHandler("click"),t.preventDefault())}),i.on("change.styler",function(){i.is(":checked")?l.addClass("checked"):l.removeClass("checked")}).on("keydown.styler",function(e){32==e.which&&l.click()}).on("focus.styler",function(){l.is(".disabled")||l.addClass("focused")}).on("blur.styler",function(){l.removeClass("focused")})};d(),i.on("refresh",function(){i.closest("label").add('label[for="'+i.attr("id")+'"]').off(".styler"),i.off(".styler").parent().before(i).remove(),d()})}else if(i.is(":radio")){var r=function(){var s=new t,l=e('<div class="jq-radio"><div class="jq-radio__div"></div></div>').attr({id:s.id,title:s.title}).addClass(s.classes).data(s.data);i.after(l).prependTo(l),i.is(":checked")&&l.addClass("checked"),i.is(":disabled")&&l.addClass("disabled"),e.fn.commonParents=function(){var t=this;return t.first().parents().filter(function(){return e(this).find(t).length===t.length})},e.fn.commonParent=function(){return e(this).commonParents().first()},l.click(function(t){if(t.preventDefault(),i.triggerHandler("click"),!l.is(".disabled")){var s=e('input[name="'+i.attr("name")+'"]');s.commonParent().find(s).prop("checked",!1).parent().removeClass("checked"),i.prop("checked",!0).parent().addClass("checked"),i.focus().change()}}),i.closest("label").add('label[for="'+i.attr("id")+'"]').on("click.styler",function(t){e(t.target).is("a")||e(t.target).closest(l).length||(l.triggerHandler("click"),t.preventDefault())}),i.on("change.styler",function(){i.parent().addClass("checked")}).on("focus.styler",function(){l.is(".disabled")||l.addClass("focused")}).on("blur.styler",function(){l.removeClass("focused")})};r(),i.on("refresh",function(){i.closest("label").add('label[for="'+i.attr("id")+'"]').off(".styler"),i.off(".styler").parent().before(i).remove(),r()})}else if(i.is(":file")){var c=function(){var s=new t,o=i.data("placeholder");void 0===o&&(o=l.filePlaceholder);var a=i.data("browse");void 0!==a&&""!==a||(a=l.fileBrowse);var d=e('<div class="jq-file"><div class="jq-file__name">'+o+'</div><div class="jq-file__browse">'+a+"</div></div>").attr({id:s.id,title:s.title}).addClass(s.classes).data(s.data);i.after(d).appendTo(d),i.is(":disabled")&&d.addClass("disabled");var r=i.val(),c=e("div.jq-file__name",d);r&&c.text(r.replace(/.+[\\\/]/,"")),i.on("change.styler",function(){var e=i.val();if(i.is("[multiple]")){e="";var t=i[0].files.length;if(t>0){var s=i.data("number");void 0===s&&(s=l.fileNumber),s=s.replace("%s",t),e=s}}c.text(e.replace(/.+[\\\/]/,"")),""===e?(c.text(o),d.removeClass("changed")):d.addClass("changed")}).on("focus.styler",function(){d.addClass("focused")}).on("blur.styler",function(){d.removeClass("focused")}).on("click.styler",function(){d.removeClass("focused")})};c(),i.on("refresh",function(){i.off(".styler").parent().before(i).remove(),c()})}else if(i.is('input[type="number"]')){var n=function(){var s=new t,l=e('<div class="jq-number"><div class="jq-number__spin minus"></div><div class="jq-number__spin plus"></div></div>').attr({id:s.id,title:s.title}).addClass(s.classes).data(s.data);i.after(l).prependTo(l).wrap('<div class="jq-number__field"></div>'),i.is(":disabled")&&l.addClass("disabled");var o,a,d,r=null,c=null;void 0!==i.attr("min")&&(o=i.attr("min")),void 0!==i.attr("max")&&(a=i.attr("max")),d=void 0!==i.attr("step")&&e.isNumeric(i.attr("step"))?Number(i.attr("step")):Number(1);var n=function(t){var s,l=i.val();e.isNumeric(l)||(l=0,i.val("0")),t.is(".minus")?s=Number(l)-d:t.is(".plus")&&(s=Number(l)+d);var r=(d.toString().split(".")[1]||[]).length;if(r>0){for(var c="1";c.length<=r;)c+="0";s=Math.round(s*c)/c}e.isNumeric(o)&&e.isNumeric(a)?s>=o&&s<=a&&i.val(s):e.isNumeric(o)&&!e.isNumeric(a)?s>=o&&i.val(s):!e.isNumeric(o)&&e.isNumeric(a)?s<=a&&i.val(s):i.val(s)};l.is(".disabled")||(l.on("mousedown","div.jq-number__spin",function(){var t=e(this);n(t),r=setTimeout(function(){c=setInterval(function(){n(t)},40)},350)}).on("mouseup mouseout","div.jq-number__spin",function(){clearTimeout(r),clearInterval(c)}).on("mouseup","div.jq-number__spin",function(){i.change().trigger("input")}),i.on("focus.styler",function(){l.addClass("focused")}).on("blur.styler",function(){l.removeClass("focused")}))};n(),i.on("refresh",function(){i.off(".styler").closest(".jq-number").before(i).remove(),n()})}else if(i.is("select")){var f=function(){function d(e){var t=e.prop("scrollHeight")-e.outerHeight(),s=null,i=null;e.off("mousewheel DOMMouseScroll").on("mousewheel DOMMouseScroll",function(l){s=l.originalEvent.detail<0||l.originalEvent.wheelDelta>0?1:-1,((i=e.scrollTop())>=t&&s<0||i<=0&&s>0)&&(l.stopPropagation(),l.preventDefault())})}function r(){for(var e=0;e<c.length;e++){var t=c.eq(e),s="",i="",o="",a="",d="",r="",f="",h="",u="";t.prop("selected")&&(i="selected sel"),t.is(":disabled")&&(i="disabled"),t.is(":selected:disabled")&&(i="selected sel disabled"),void 0!==t.attr("id")&&""!==t.attr("id")&&(a=' id="'+t.attr("id")+l.idSuffix+'"'),void 0!==t.attr("title")&&""!==c.attr("title")&&(d=' title="'+t.attr("title")+'"'),void 0!==t.attr("class")&&(f=" "+t.attr("class"),u=' data-jqfs-class="'+t.attr("class")+'"');var p=t.data();for(var v in p)""!==p[v]&&(r+=" data-"+v+'="'+p[v]+'"');i+f!==""&&(o=' class="'+i+f+'"'),s="<li"+u+r+o+d+a+">"+t.html()+"</li>",t.parent().is("optgroup")&&(void 0!==t.parent().attr("class")&&(h=" "+t.parent().attr("class")),s="<li"+u+r+' class="'+i+f+" option"+h+'"'+d+a+">"+t.html()+"</li>",t.is(":first-child")&&(s='<li class="optgroup'+h+'">'+t.parent().attr("label")+"</li>"+s)),n+=s}}var c=e("option",i),n="";if(i.is("[multiple]")){if(a||o)return;!function(){var s=new t,l=e('<div class="jq-select-multiple jqselect"></div>').attr({id:s.id,title:s.title}).addClass(s.classes).data(s.data);i.after(l),r(),l.append("<ul>"+n+"</ul>");var o=e("ul",l),a=e("li",l),f=i.attr("size"),h=o.outerHeight(),u=a.outerHeight();void 0!==f&&f>0?o.css({height:u*f}):o.css({height:4*u}),h>l.height()&&(o.css("overflowY","scroll"),d(o),a.filter(".selected").length&&o.scrollTop(o.scrollTop()+a.filter(".selected").position().top)),i.prependTo(l),i.is(":disabled")?(l.addClass("disabled"),c.each(function(){e(this).is(":selected")&&a.eq(e(this).index()).addClass("selected")})):(a.filter(":not(.disabled):not(.optgroup)").click(function(t){i.focus();var s=e(this);if(t.ctrlKey||t.metaKey||s.addClass("selected"),t.shiftKey||s.addClass("first"),t.ctrlKey||t.metaKey||t.shiftKey||s.siblings().removeClass("selected first"),(t.ctrlKey||t.metaKey)&&(s.is(".selected")?s.removeClass("selected first"):s.addClass("selected first"),s.siblings().removeClass("first")),t.shiftKey){var l=!1,o=!1;s.siblings().removeClass("selected").siblings(".first").addClass("selected"),s.prevAll().each(function(){e(this).is(".first")&&(l=!0)}),s.nextAll().each(function(){e(this).is(".first")&&(o=!0)}),l&&s.prevAll().each(function(){if(e(this).is(".selected"))return!1;e(this).not(".disabled, .optgroup").addClass("selected")}),o&&s.nextAll().each(function(){if(e(this).is(".selected"))return!1;e(this).not(".disabled, .optgroup").addClass("selected")}),1==a.filter(".selected").length&&s.addClass("first")}c.prop("selected",!1),a.filter(".selected").each(function(){var t=e(this),s=t.index();t.is(".option")&&(s-=t.prevAll(".optgroup").length),c.eq(s).prop("selected",!0)}),i.change()}),c.each(function(t){e(this).data("optionIndex",t)}),i.on("change.styler",function(){a.removeClass("selected");var t=[];c.filter(":selected").each(function(){t.push(e(this).data("optionIndex"))}),a.not(".optgroup").filter(function(s){return e.inArray(s,t)>-1}).addClass("selected")}).on("focus.styler",function(){l.addClass("focused")}).on("blur.styler",function(){l.removeClass("focused")}),h>l.height()&&i.on("keydown.styler",function(e){38!=e.which&&37!=e.which&&33!=e.which||o.scrollTop(o.scrollTop()+a.filter(".selected").position().top-u),40!=e.which&&39!=e.which&&34!=e.which||o.scrollTop(o.scrollTop()+a.filter(".selected:last").position().top-o.innerHeight()+2*u)}))}()}else!function(){var a=new t,f="",h=i.data("placeholder"),u=i.data("search"),p=i.data("search-limit"),v=i.data("search-not-found"),m=i.data("search-placeholder"),g=i.data("smart-positioning");void 0===h&&(h=l.selectPlaceholder),void 0!==u&&""!==u||(u=l.selectSearch),void 0!==p&&""!==p||(p=l.selectSearchLimit),void 0!==v&&""!==v||(v=l.selectSearchNotFound),void 0===m&&(m=l.selectSearchPlaceholder),void 0!==g&&""!==g||(g=l.selectSmartPositioning);var b=e('<div class="jq-selectbox jqselect"><div class="jq-selectbox__select"><div class="jq-selectbox__select-text"></div><div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div></div></div>').attr({id:a.id,title:a.title}).addClass(a.classes).data(a.data);i.after(b).prependTo(b);var C=b.css("z-index");C=C>0?C:1;var x=e("div.jq-selectbox__select",b),y=e("div.jq-selectbox__select-text",b),w=c.filter(":selected");r(),u&&(f='<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="'+m+'"></div><div class="jq-selectbox__not-found">'+v+"</div>");var q=e('<div class="jq-selectbox__dropdown">'+f+"<ul>"+n+"</ul></div>");b.append(q);var _=e("ul",q),j=e("li",q),k=e("input",q),S=e("div.jq-selectbox__not-found",q).hide();j.length<p&&k.parent().hide(),""===c.first().text()&&c.first().is(":selected")&&!1!==h?y.text(h).addClass("placeholder"):y.text(w.text());var T=0,N=0;if(j.css({display:"inline-block"}),j.each(function(){var t=e(this);t.innerWidth()>T&&(T=t.innerWidth(),N=t.width())}),j.css({display:""}),y.is(".placeholder")&&y.width()>T)y.width(y.width());else{var P=b.clone().appendTo("body").width("auto"),H=P.outerWidth();P.remove(),H==b.outerWidth()&&y.width(N)}T>b.width()&&q.width(T),""===c.first().text()&&""!==i.data("placeholder")&&j.first().hide();var A=b.outerHeight(!0),D=k.parent().outerHeight(!0)||0,I=_.css("max-height"),K=j.filter(".selected");if(K.length<1&&j.first().addClass("selected sel"),void 0===j.data("li-height")){var O=j.outerHeight();!1!==h&&(O=j.eq(1).outerHeight()),j.data("li-height",O)}var M=q.css("top");if("auto"==q.css("left")&&q.css({left:0}),"auto"==q.css("top")&&(q.css({top:A}),M=A),q.hide(),K.length&&(c.first().text()!=w.text()&&b.addClass("changed"),b.data("jqfs-class",K.data("jqfs-class")),b.addClass(K.data("jqfs-class"))),i.is(":disabled"))return b.addClass("disabled"),!1;x.click(function(){if(e("div.jq-selectbox").filter(".opened").length&&l.onSelectClosed.call(e("div.jq-selectbox").filter(".opened")),i.focus(),!o){var t=e(window),s=j.data("li-height"),a=b.offset().top,r=t.height()-A-(a-t.scrollTop()),n=i.data("visible-options");void 0!==n&&""!==n||(n=l.selectVisibleOptions);var f=5*s,h=s*n;n>0&&n<6&&(f=h),0===n&&(h="auto");var u=function(){q.height("auto").css({bottom:"auto",top:M});var e=function(){_.css("max-height",Math.floor((r-20-D)/s)*s)};e(),_.css("max-height",h),"none"!=I&&_.css("max-height",I),r<q.outerHeight()+20&&e()};!0===g||1===g?r>f+D+20?(u(),b.removeClass("dropup").addClass("dropdown")):(function(){q.height("auto").css({top:"auto",bottom:M});var e=function(){_.css("max-height",Math.floor((a-t.scrollTop()-20-D)/s)*s)};e(),_.css("max-height",h),"none"!=I&&_.css("max-height",I),a-t.scrollTop()-20<q.outerHeight()+20&&e()}(),b.removeClass("dropdown").addClass("dropup")):!1===g||0===g?r>f+D+20&&(u(),b.removeClass("dropup").addClass("dropdown")):(q.height("auto").css({bottom:"auto",top:M}),_.css("max-height",h),"none"!=I&&_.css("max-height",I)),b.offset().left+q.outerWidth()>t.width()&&q.css({left:"auto",right:0}),e("div.jqselect").css({zIndex:C-1}).removeClass("opened"),b.css({zIndex:C}),q.is(":hidden")?(e("div.jq-selectbox__dropdown:visible").hide(),q.show(),b.addClass("opened focused"),l.onSelectOpened.call(b)):(q.hide(),b.removeClass("opened dropup dropdown"),e("div.jq-selectbox").filter(".opened").length&&l.onSelectClosed.call(b)),k.length&&(k.val("").keyup(),S.hide(),k.keyup(function(){var t=e(this).val();j.each(function(){e(this).html().match(new RegExp(".*?"+t+".*?","i"))?e(this).show():e(this).hide()}),""===c.first().text()&&""!==i.data("placeholder")&&j.first().hide(),j.filter(":visible").length<1?S.show():S.hide()})),j.filter(".selected").length&&(""===i.val()?_.scrollTop(0):(_.innerHeight()/s%2!=0&&(s/=2),_.scrollTop(_.scrollTop()+j.filter(".selected").position().top-_.innerHeight()/2+s))),d(_)}}),j.hover(function(){e(this).siblings().removeClass("selected")});var W=j.filter(".selected").text();j.filter(":not(.disabled):not(.optgroup)").click(function(){i.focus();var t=e(this),s=t.text();if(!t.is(".selected")){var o=t.index();o-=t.prevAll(".optgroup").length,t.addClass("selected sel").siblings().removeClass("selected sel"),c.prop("selected",!1).eq(o).prop("selected",!0),W=s,y.text(s),b.data("jqfs-class")&&b.removeClass(b.data("jqfs-class")),b.data("jqfs-class",t.data("jqfs-class")),b.addClass(t.data("jqfs-class")),i.change()}q.hide(),b.removeClass("opened dropup dropdown"),l.onSelectClosed.call(b)}),q.mouseout(function(){e("li.sel",q).addClass("selected")}),i.on("change.styler",function(){y.text(c.filter(":selected").text()).removeClass("placeholder"),j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"),c.first().text()!=j.filter(".selected").text()?b.addClass("changed"):b.removeClass("changed")}).on("focus.styler",function(){b.addClass("focused"),e("div.jqselect").not(".focused").removeClass("opened dropup dropdown").find("div.jq-selectbox__dropdown").hide()}).on("blur.styler",function(){b.removeClass("focused")}).on("keydown.styler keyup.styler",function(e){var t=j.data("li-height");""===i.val()?y.text(h).addClass("placeholder"):y.text(c.filter(":selected").text()),j.removeClass("selected sel").not(".optgroup").eq(i[0].selectedIndex).addClass("selected sel"),38!=e.which&&37!=e.which&&33!=e.which&&36!=e.which||(""===i.val()?_.scrollTop(0):_.scrollTop(_.scrollTop()+j.filter(".selected").position().top)),40!=e.which&&39!=e.which&&34!=e.which&&35!=e.which||_.scrollTop(_.scrollTop()+j.filter(".selected").position().top-_.innerHeight()+t),13==e.which&&(e.preventDefault(),q.hide(),b.removeClass("opened dropup dropdown"),l.onSelectClosed.call(b))}).on("keydown.styler",function(e){32==e.which&&(e.preventDefault(),x.click())}),s.registered||(e(document).on("click",s),s.registered=!0)}()};f(),i.on("refresh",function(){i.off(".styler").parent().before(i).remove(),f()})}else i.is(":reset")&&i.on("click",function(){setTimeout(function(){i.closest("form").find("input, select").trigger("refresh")},1)})},destroy:function(){var t=e(this.element);t.is(":checkbox")||t.is(":radio")?(t.removeData("_"+i).off(".styler refresh").removeAttr("style").parent().before(t).remove(),t.closest("label").add('label[for="'+t.attr("id")+'"]').off(".styler")):t.is('input[type="number"]')?t.removeData("_"+i).off(".styler refresh").closest(".jq-number").before(t).remove():(t.is(":file")||t.is("select"))&&t.removeData("_"+i).off(".styler refresh").removeAttr("style").parent().before(t).remove()}},e.fn[i]=function(s){var l=arguments;if(void 0===s||"object"==typeof s)return this.each(function(){e.data(this,"_"+i)||e.data(this,"_"+i,new t(this,s))}).promise().done(function(){var t=e(this[0]).data("_"+i);t&&t.options.onFormStyled.call()}),this;if("string"==typeof s&&"_"!==s[0]&&"init"!==s){var o;return this.each(function(){var a=e.data(this,"_"+i);a instanceof t&&"function"==typeof a[s]&&(o=a[s].apply(a,Array.prototype.slice.call(l,1)))}),void 0!==o?o:this}},s.registered=!1});

!function(n){var t={buttons:0,init:function(t){n("body").append('<div class="mp__panel"><div class="mp__wr"><button class="mp__button mp__button-main"><span class="mp__line"></span></button></div></div><div class="mp__overlay"></div>'),t.navbar&&(n(t.navbar).addClass("mp__nav-panel mp__nav-panel_main"),n(".mp__button-main").on("click",function(){return n(this).toggleClass("mp--on"),n(t.navbar).toggleClass("mp--on"),n(".mp__overlay").toggleClass("mp--on"),!1})),n(".mp__overlay").click(function(){return n(this).removeClass("mp--on"),n(".mp__button").removeClass("mp--on"),n(t.navbar).removeClass("mp--on"),!1})},show:function(){n(".mp__panel").show()},hide:function(){n(".mp__panel").hide()},button:function(o){var a=n('<button class="mp__button mp__button-text mp__button-'+ ++t.buttons+(o.center?" mp__button-text--center":"")+'">'+o.text+"</button>");return n(".mp__wr").append(a),o.navbar&&(n(o.navbar).addClass("mp__nav-panel mp__nav-panel_second mp__nav-panel_second-"+t.buttons),n(".mp__button-"+t.buttons).on("click",function(){return n(this).toggleClass("mp--on"),n(o.navbar).toggleClass("mp--on"),n(".mp__overlay").toggleClass("mp--on"),!1})),n(".mp__overlay").click(function(){return n(o.navbar).removeClass("mp--on"),!1}),a},notification:function(t){n(".mp__notification",t.button).length?n(".mp__notification",t.button).html(t.value):t.button.append('<div class="mp__notification">'+t.value+"</div>")}};n.mobilePanel=function(o){return t[o]?t[o].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof o&&o?void n.error("Метод с именем "+o+" не существует"):t.init.apply(this,arguments)}}(jQuery);

$.mobilePanel({'navbar':'.mobile-menu'}); 
(function($) {
	$(function() {
		$('input, select').styler();
	});
})(jQuery);


/* gallery */

;window.requestAnimFrame=(function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,20)}})();function detect_old_ie(){if(/MSIE (\d+\.\d+);/.test(navigator.userAgent)){var a=new Number(RegExp.$1);if(a>=9){return false}else{if(a>=8){return true}else{if(a>=7){return true}else{if(a>=6){return true}else{if(a>=5){return true}}}}}}else{return false}}(function(b){b.fn.xon=b.fn.on||b.fn.bind;b.fn.xoff=b.fn.off||b.fn.bind;function a(ax,aG){this.xzoom=true;var E=this;var M;var aD={};var ad,ak,aa,aj,ac,ai,am,R,aF,x,ao,Z,X;var ay,o,P,T,S,ab,p=new Array();var F=new Array(),aC=0,y=0;var I,Q,l,k;var aq,aB,aw,au,O,n,aL,aJ,aA,az,W,U,ap,al=0;var h,ah;var aK,B=0,z=0,ag=0,ae=0,s=0,r=0,at=0,ar=0,H=0,G=0;var D=detect_old_ie(),A=/MSIE (\d+\.\d+);/.test(navigator.userAgent),Y,V;var K,j="",J,t;var aI,f,m,q,g,i,an,d;this.adaptive=function(){if(m==0||q==0){ax.css("width","");ax.css("height","");m=ax.width();q=ax.height()}aH();aI=b(window).width();f=b(window).height();g=ax.width();i=ax.height();var u=false;if(m>aI||q>f){u=true}if(g>m){g=m}if(i>q){i=q}if(u){ax.width("100%")}else{if(m!=0){ax.width(m)}}if(an!="fullscreen"){if(aE()){E.options.position=an}else{E.options.position=E.options.mposition}}if(!E.options.lensReverse){d=E.options.adaptiveReverse&&E.options.position==E.options.mposition}};function av(){var aM=document.documentElement;var v=(window.pageXOffset||aM.scrollLeft)-(aM.clientLeft||0);var u=(window.pageYOffset||aM.scrollTop)-(aM.clientTop||0);return{left:v,top:u}}function aE(){var u=ax.offset();if(E.options.zoomWidth=="auto"){aa=g}else{aa=E.options.zoomWidth}if(E.options.zoomHeight=="auto"){aj=i}else{aj=E.options.zoomHeight}if(E.options.position.substr(0,1)=="#"){aD=b(E.options.position)}else{aD.length=0}if(aD.length!=0){return true}switch(an){case"lens":case"inside":return true;break;case"top":ai=u.top;am=u.left;R=ai-aj;aF=am;break;case"left":ai=u.top;am=u.left;R=ai;aF=am-aa;break;case"bottom":ai=u.top;am=u.left;R=ai+i;aF=am;break;case"right":default:ai=u.top;am=u.left;R=ai;aF=am+g}if(aF+aa>aI||aF<0){return false}return true}this.xscroll=function(v){Z=v.pageX||v.originalEvent.pageX;X=v.pageY||v.originalEvent.pageY;v.preventDefault();if(v.xscale){al=v.xscale;L(Z,X)}else{var aN=-v.originalEvent.detail||v.originalEvent.wheelDelta||v.xdelta;var u=Z;var aM=X;if(D){u=Y;aM=V}if(aN>0){aN=-0.05}else{aN=0.05}al+=aN;L(u,aM)}};function w(){if(E.options.lensShape=="circle"&&E.options.position=="lens"){aq=aB=Math.max(aq,aB);var u=(aq+Math.max(n,O)*2)/2;l.css({"-moz-border-radius":u,"-webkit-border-radius":u,"border-radius":u})}}function C(u,aN,aM,v){if(E.options.position=="lens"){Q.css({top:-(aN-ai)*az+(aB/2),left:-(u-am)*aA+(aq/2)});if(E.options.bg){l.css({"background-image":"url("+Q.attr("src")+")","background-repeat":"no-repeat","background-position":(-(u-am)*aA+(aq/2))+"px "+(-(aN-ai)*az+(aB/2))+"px"});if(aM&&v){l.css({"background-size":aM+"px "+v+"px"})}}}else{Q.css({top:-au*az,left:-aw*aA})}}function L(u,aO){if(al<-1){al=-1}if(al>1){al=1}if(W<U){var aN=W-(W-1)*al;var v=aa*aN;var aM=v/ap}else{var aN=U-(U-1)*al;var aM=aj*aN;var v=aM*ap}if(aK){B=u;z=aO;ag=v;ae=aM}else{if(!aK){s=ag=v;r=ae=aM}aA=v/ad;az=aM/ak;aq=aa/aA;aB=aj/az;w();e(u,aO);Q.width(v);Q.height(aM);l.width(aq);l.height(aB);l.css({top:au-n,left:aw-O});k.css({top:-au,left:-aw});C(u,aO,v,aM)}}function c(){var u=at;var aP=ar;var v=H;var aM=G;var aO=s;var aN=r;u+=(B-u)/E.options.smoothLensMove;aP+=(z-aP)/E.options.smoothLensMove;v+=(B-v)/E.options.smoothZoomMove;aM+=(z-aM)/E.options.smoothZoomMove;aO+=(ag-aO)/E.options.smoothScale;aN+=(ae-aN)/E.options.smoothScale;aA=aO/ad;az=aN/ak;aq=aa/aA;aB=aj/az;w();e(u,aP);Q.width(aO);Q.height(aN);l.width(aq);l.height(aB);l.css({top:au-n,left:aw-O});k.css({top:-au,left:-aw});e(v,aM);C(u,aP,aO,aN);at=u;ar=aP;H=v;G=aM;s=aO;r=aN;if(aK){requestAnimFrame(c)}}function e(u,v){u-=am;v-=ai;aw=u-(aq/2);au=v-(aB/2);if(E.options.position!="lens"&&E.options.lensCollision){if(aw<0){aw=0}if(aw>ad-aq){aw=ad-aq}if(au<0){au=0}if(au>ak-aB){au=ak-aB}}}function aH(){if(typeof ay!="undefined"){ay.remove()}if(typeof P!="undefined"){P.remove()}if(typeof t!="undefined"){t.remove()}}function N(u,aM){if(E.options.position=="fullscreen"){ad=b(window).width();ak=b(window).height()}else{ad=ax.width();ak=ax.height()}T.css({top:ak/2-T.height()/2,left:ad/2-T.width()/2});if(E.options.rootOutput||E.options.position=="fullscreen"){ac=ax.offset()}else{ac=ax.position()}ac.top=Math.round(ac.top);ac.left=Math.round(ac.left);switch(E.options.position){case"fullscreen":ai=av().top;am=av().left;R=0;aF=0;break;case"inside":ai=ac.top;am=ac.left;R=0;aF=0;break;case"top":ai=ac.top;am=ac.left;R=ai-aj;aF=am;break;case"left":ai=ac.top;am=ac.left;R=ai;aF=am-aa;break;case"bottom":ai=ac.top;am=ac.left;R=ai+ak;aF=am;break;case"right":default:ai=ac.top;am=ac.left;R=ai;aF=am+ad}ai-=ay.outerHeight()/2;am-=ay.outerWidth()/2;if(E.options.position.substr(0,1)=="#"){aD=b(E.options.position)}else{aD.length=0}if(aD.length==0&&E.options.position!="inside"&&E.options.position!="fullscreen"){if(!E.options.adaptive||!m||!q){m=ad;q=ak}if(E.options.zoomWidth=="auto"){aa=ad}else{aa=E.options.zoomWidth}if(E.options.zoomHeight=="auto"){aj=ak}else{aj=E.options.zoomHeight}R+=E.options.Yoffset;aF+=E.options.Xoffset;P.css({width:aa+"px",height:aj+"px",top:R,left:aF});if(E.options.position!="lens"){M.append(P)}}else{if(E.options.position=="inside"||E.options.position=="fullscreen"){aa=ad;aj=ak;P.css({width:aa+"px",height:aj+"px"});ay.append(P)}else{aa=aD.width();aj=aD.height();if(E.options.rootOutput){R=aD.offset().top;aF=aD.offset().left;M.append(P)}else{R=aD.position().top;aF=aD.position().left;aD.parent().append(P)}R+=(aD.outerHeight()-aj-P.outerHeight())/2;aF+=(aD.outerWidth()-aa-P.outerWidth())/2;P.css({width:aa+"px",height:aj+"px",top:R,left:aF})}}if(E.options.title&&j!=""){if(E.options.position=="inside"||E.options.position=="lens"||E.options.position=="fullscreen"){x=R;ao=aF;ay.append(t)}else{x=R+(P.outerHeight()-aj)/2;ao=aF+(P.outerWidth()-aa)/2;M.append(t)}t.css({width:aa+"px",height:aj+"px",top:x,left:ao})}ay.css({width:ad+"px",height:ak+"px",top:ai,left:am});o.css({width:ad+"px",height:ak+"px"});if(E.options.tint&&(E.options.position!="inside"&&E.options.position!="fullscreen")){o.css("background-color",E.options.tint)}else{if(D){o.css({"background-image":"url("+ax.attr("src")+")","background-color":"#fff"})}}I=new Image();var v="";if(A){v="?r="+(new Date()).getTime()}I.src=ax.attr("xoriginal")+v;Q=b(I);Q.css("position","absolute");I=new Image();I.src=ax.attr("src");k=b(I);k.css("position","absolute");k.width(ad);switch(E.options.position){case"fullscreen":case"inside":P.append(Q);break;case"lens":l.append(Q);if(E.options.bg){Q.css({display:"none"})}break;default:P.append(Q);l.append(k)}}this.openzoom=function(u){Z=u.pageX;X=u.pageY;if(E.options.adaptive){E.adaptive()}al=E.options.defaultScale;aK=false;ay=b("<div></div>");if(E.options.sourceClass!=""){ay.addClass(E.options.sourceClass)}ay.css("position","absolute");T=b("<div></div>");if(E.options.loadingClass!=""){T.addClass(E.options.loadingClass)}T.css("position","absolute");o=b('<div style="position: absolute; top: 0; left: 0;"></div>');ay.append(T);P=b("<div></div>");if(E.options.zoomClass!=""&&E.options.position!="fullscreen"){P.addClass(E.options.zoomClass)}P.css({position:"absolute",overflow:"hidden",opacity:1});if(E.options.title&&j!=""){t=b("<div></div>");J=b("<div></div>");t.css({position:"absolute",opacity:1});if(E.options.titleClass){J.addClass(E.options.titleClass)}J.html("<span>"+j+"</span>");t.append(J);if(E.options.fadeIn){t.css({opacity:0})}}l=b("<div></div>");if(E.options.lensClass!=""){l.addClass(E.options.lensClass)}l.css({position:"absolute",overflow:"hidden"});if(E.options.lens){lenstint=b("<div></div>");lenstint.css({position:"absolute",background:E.options.lens,opacity:E.options.lensOpacity,width:"100%",height:"100%",top:0,left:0,"z-index":9999});l.append(lenstint)}N(Z,X);if(E.options.position!="inside"&&E.options.position!="fullscreen"){if(E.options.tint||D){ay.append(o)}if(E.options.fadeIn){o.css({opacity:0});l.css({opacity:0});P.css({opacity:0})}M.append(ay)}else{if(E.options.fadeIn){P.css({opacity:0})}M.append(ay)}E.eventmove(ay);E.eventleave(ay);switch(E.options.position){case"inside":R-=(P.outerHeight()-P.height())/2;aF-=(P.outerWidth()-P.width())/2;break;case"top":R-=P.outerHeight()-P.height();aF-=(P.outerWidth()-P.width())/2;break;case"left":R-=(P.outerHeight()-P.height())/2;aF-=P.outerWidth()-P.width();break;case"bottom":aF-=(P.outerWidth()-P.width())/2;break;case"right":R-=(P.outerHeight()-P.height())/2}P.css({top:R,left:aF});Q.xon("load",function(){T.remove();if(E.options.scroll){E.eventscroll(ay)}if(E.options.position!="inside"&&E.options.position!="fullscreen"){ay.append(l);if(E.options.fadeIn){o.fadeTo(300,E.options.tintOpacity);l.fadeTo(300,1);P.fadeTo(300,1)}else{o.css({opacity:E.options.tintOpacity});l.css({opacity:1});P.css({opacity:1})}}else{if(E.options.fadeIn){P.fadeTo(300,1)}else{P.css({opacity:1})}}if(E.options.title&&j!=""){if(E.options.fadeIn){t.fadeTo(300,1)}else{t.css({opacity:1})}}h=Q.width();ah=Q.height();if(E.options.adaptive){if(ad<m||ak<q){k.width(ad);k.height(ak);h=ad/m*h;ah=ak/q*ah;Q.width(h);Q.height(ah)}}s=ag=h;r=ae=ah;ap=h/ah;W=h/aa;U=ah/aj;var aM,aN=["padding-","border-"];n=O=0;for(var v=0;v<aN.length;v++){aM=parseFloat(l.css(aN[v]+"top-width"));n+=aM!==aM?0:aM;aM=parseFloat(l.css(aN[v]+"bottom-width"));n+=aM!==aM?0:aM;aM=parseFloat(l.css(aN[v]+"left-width"));O+=aM!==aM?0:aM;aM=parseFloat(l.css(aN[v]+"right-width"));O+=aM!==aM?0:aM}n/=2;O/=2;H=at=B=Z;G=ar=z=X;L(Z,X);if(E.options.smooth){aK=true;requestAnimFrame(c)}E.eventclick(ay)})};this.movezoom=function(v){Z=v.pageX;X=v.pageY;if(D){Y=Z;V=X}var u=Z-am;var aM=X-ai;if(d){v.pageX-=(u-ad/2)*2;v.pageY-=(aM-ak/2)*2}if(u<0||u>ad||aM<0||aM>ak){ay.trigger("mouseleave")}if(E.options.smooth){B=v.pageX;z=v.pageY}else{w();e(v.pageX,v.pageY);l.css({top:au-n,left:aw-O});k.css({top:-au,left:-aw});C(v.pageX,v.pageY,0,0)}};this.eventdefault=function(){E.eventopen=function(u){u.xon("mouseenter",E.openzoom)};E.eventleave=function(u){u.xon("mouseleave",E.closezoom)};E.eventmove=function(u){u.xon("mousemove",E.movezoom)};E.eventscroll=function(u){u.xon("mousewheel DOMMouseScroll",E.xscroll)};E.eventclick=function(u){u.xon("click",function(v){ax.trigger("click")})}};this.eventunbind=function(){ax.xoff("mouseenter");E.eventopen=function(u){};E.eventleave=function(u){};E.eventmove=function(u){};E.eventscroll=function(u){};E.eventclick=function(u){}};this.init=function(u){E.options=b.extend({},b.fn.xzoom.defaults,u);if(E.options.rootOutput){M=b("body")}else{M=ax.parent()}an=E.options.position;d=E.options.lensReverse&&E.options.position=="inside";if(E.options.smoothZoomMove<1){E.options.smoothZoomMove=1}if(E.options.smoothLensMove<1){E.options.smoothLensMove=1}if(E.options.smoothScale<1){E.options.smoothScale=1}if(E.options.adaptive){b(window).xon("load",function(){m=ax.width();q=ax.height();E.adaptive();b(window).resize(E.adaptive)})}E.eventdefault();E.eventopen(ax)};this.destroy=function(){E.eventunbind()};this.closezoom=function(){aK=false;if(E.options.fadeOut){if(E.options.title&&j!=""){t.fadeOut(299)}if(E.options.position!="inside"||E.options.position!="fullscreen"){P.fadeOut(299);ay.fadeOut(300,function(){aH()})}else{ay.fadeOut(300,function(){aH()})}}else{aH()}};this.gallery=function(){var aM=new Array();var v,u=0;for(v=y;v<F.length;v++){aM[u]=F[v];u++}for(v=0;v<y;v++){aM[u]=F[v];u++}return{index:y,ogallery:F,cgallery:aM}};function af(u){var aM=u.attr("title");var v=u.attr("xtitle");if(v){return v}else{if(aM){return aM}else{return""}}}this.xappend=function(u){var v=u.parent();F[aC]=v.attr("href");v.data("xindex",aC);if(aC==0&&E.options.activeClass){K=u;K.addClass(E.options.activeClass)}if(aC==0&&E.options.title){j=af(u)}aC++;function aM(aO){aH();aO.preventDefault();if(E.options.activeClass){K.removeClass(E.options.activeClass);K=u;K.addClass(E.options.activeClass)}y=b(this).data("xindex");if(E.options.fadeTrans){ab=new Image();ab.src=ax.attr("src");S=b(ab);S.css({position:"absolute",top:ax.offset().top,left:ax.offset().left,width:ax.width(),height:ax.height()});b(document.body).append(S);S.fadeOut(200,function(){S.remove()})}var aP=v.attr("href");var aN=u.attr("xpreview")||u.attr("src");j=af(u);if(u.attr("title")){ax.attr("title",u.attr("title"))}ax.attr("xoriginal",aP);ax.removeAttr("style");ax.attr("src",aN);if(E.options.adaptive){m=ax.width();q=ax.height()}}if(E.options.hover){v.xon("mouseenter",v,aM)}v.xon("click",v,aM)};this.init(aG)}b.fn.xzoom=function(e){var c;var d;if(this.selector){var g=this.selector.split(",");for(var f in g){g[f]=b.trim(g[f])}this.each(function(h){if(g.length==1){if(h==0){c=b(this);if(typeof(c.data("xzoom"))!=="undefined"){return c.data("xzoom")}c.x=new a(c,e)}else{if(typeof(c.x)!=="undefined"){d=b(this);c.x.xappend(d)}}}else{if(b(this).is(g[0])&&h==0){c=b(this);if(typeof(c.data("xzoom"))!=="undefined"){return c.data("xzoom")}c.x=new a(c,e)}else{if(typeof(c.x)!=="undefined"&&!b(this).is(g[0])){d=b(this);c.x.xappend(d)}}}})}else{this.each(function(h){if(h==0){c=b(this);if(typeof(c.data("xzoom"))!=="undefined"){return c.data("xzoom")}c.x=new a(c,e)}else{if(typeof(c.x)!=="undefined"){d=b(this);c.x.xappend(d)}}})}if(typeof(c)==="undefined"){return false}c.data("xzoom",c.x);b(c).trigger("xzoom_ready");return c.x};b.fn.xzoom.defaults={position:"right",mposition:"inside",rootOutput:true,Xoffset:0,Yoffset:0,fadeIn:true,fadeTrans:true,fadeOut:false,smooth:true,smoothZoomMove:3,smoothLensMove:1,smoothScale:6,defaultScale:0,scroll:true,tint:false,tintOpacity:0.5,lens:false,lensOpacity:0.5,lensShape:"box",lensCollision:true,lensReverse:false,zoomWidth:"auto",zoomHeight:"auto",sourceClass:"xzoom-source",loadingClass:"xzoom-loading",lensClass:"xzoom-lens",zoomClass:"xzoom-preview",activeClass:"xactive",hover:false,adaptive:true,adaptiveReverse:false,title:false,titleClass:"xzoom-caption",bg:false}})(jQuery);

(function ($) {
    $(document).ready(function() {
        $('.xzoom5, .xzoom-gallery').xzoom({tint: '#fff', Xoffset: 15, position: 'inside'});

        //Integration with hammer.js
        var isTouchSupported = 'ontouchstart' in window;

        if (isTouchSupported) {
            //If touch device
            $('.xzoom, .xzoom2, .xzoom3, .xzoom4, .xzoom5').each(function(){
                var xzoom = $(this).data('xzoom');
                xzoom.eventunbind();
            });
            
            $('.xzoom, .xzoom2, .xzoom3').each(function() {
                var xzoom = $(this).data('xzoom');
                $(this).hammer().on("tap", function(event) {
                    event.pageX = event.gesture.center.pageX;
                    event.pageY = event.gesture.center.pageY;
                    var s = 1, ls;
    
                    xzoom.eventmove = function(element) {
                        element.hammer().on('drag', function(event) {
                            event.pageX = event.gesture.center.pageX;
                            event.pageY = event.gesture.center.pageY;
                            xzoom.movezoom(event);
                            event.gesture.preventDefault();
                        });
                    }
    
                    xzoom.eventleave = function(element) {
                        element.hammer().on('tap', function(event) {
                            xzoom.closezoom();
                        });
                    }
                    xzoom.openzoom(event);
                });
            });

        $('.xzoom4').each(function() {
            var xzoom = $(this).data('xzoom');
            $(this).hammer().on("tap", function(event) {
                event.pageX = event.gesture.center.pageX;
                event.pageY = event.gesture.center.pageY;
                var s = 1, ls;

                xzoom.eventmove = function(element) {
                    element.hammer().on('drag', function(event) {
                        event.pageX = event.gesture.center.pageX;
                        event.pageY = event.gesture.center.pageY;
                        xzoom.movezoom(event);
                        event.gesture.preventDefault();
                    });
                }

                var counter = 0;
                xzoom.eventclick = function(element) {
                    element.hammer().on('tap', function() {
                        counter++;
                        if (counter == 1) setTimeout(openfancy,300);
                        event.gesture.preventDefault();
                    });
                }

                function openfancy() {
                    if (counter == 2) {
                        xzoom.closezoom();
                        $.fancybox.open(xzoom.gallery().cgallery);
                    } else {
                        xzoom.closezoom();
                    }
                    counter = 0;
                }
            xzoom.openzoom(event);
            });
        });
        
        $('.xzoom5').each(function() {
            var xzoom = $(this).data('xzoom');
            $(this).hammer().on("tap", function(event) {
                event.pageX = event.gesture.center.pageX;
                event.pageY = event.gesture.center.pageY;
                var s = 1, ls;

                xzoom.eventmove = function(element) {
                    element.hammer().on('drag', function(event) {
                        event.pageX = event.gesture.center.pageX;
                        event.pageY = event.gesture.center.pageY;
                        xzoom.movezoom(event);
                        event.gesture.preventDefault();
                    });
                }

                var counter = 0;
                xzoom.eventclick = function(element) {
                    element.hammer().on('tap', function() {
                        counter++;
                        if (counter == 1) setTimeout(openmagnific,300);
                        event.gesture.preventDefault();
                    });
                }

                function openmagnific() {
                    if (counter == 2) {
                        xzoom.closezoom();
                        var gallery = xzoom.gallery().cgallery;
                        var i, images = new Array();
                        for (i in gallery) {
                            images[i] = {src: gallery[i]};
                        }
                        $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
                    } else {
                        xzoom.closezoom();
                    }
                    counter = 0;
                }
                xzoom.openzoom(event);
            });
        });

        } else {
            //If not touch device

            //Integration with fancybox plugin
            $('#xzoom-fancy').bind('click', function(event) {
                var xzoom = $(this).data('xzoom');
                xzoom.closezoom();
                $.fancybox.open(xzoom.gallery().cgallery, {padding: 0, helpers: {overlay: {locked: false}}});
                event.preventDefault();
            });
           
            //Integration with magnific popup plugin
            $('#xzoom-magnific').bind('click', function(event) {
                var xzoom = $(this).data('xzoom');
                xzoom.closezoom();
                var gallery = xzoom.gallery().cgallery;
                var i, images = new Array();
                for (i in gallery) {
                    images[i] = {src: gallery[i]};
                }
                $.magnificPopup.open({items: images, type:'image', gallery: {enabled: true}});
                event.preventDefault();
            });
        }
    });
})(jQuery);

$(document).ready(function() {

	$('a.zoom-ik').on('click', function(event) {
		event.preventDefault();
		
		var gallery = $(this).attr('href');
    
		$(gallery).magnificPopup({
			delegate: 'a',
			type:'image',
			gallery: {
				enabled: true
			}
		}).magnificPopup('open');
	});
	
});

(function($) {
$(function() {

	$('ul.tabs').each(function(i) {
		var storage = localStorage.getItem('tab'+i);
		if (storage) $(this).find('li').eq(storage).addClass('current').siblings().removeClass('current')
			.parents('div').find('div.card-box').hide().eq(storage).show();
	})

	$('ul.tabs').on('click', 'li:not(.current)', function() {
		$(this).addClass('current').siblings().removeClass('current')
			.parents('div').find('div.card-box').eq($(this).index()).fadeIn(150).siblings('div.card-box').hide();
		var ulIndex = $('ul.tabs').index($(this).parents('ul.tabs'));
		localStorage.removeItem('tab'+ulIndex);
		localStorage.setItem('tab'+ulIndex, $(this).index());
	})
	
	$('.apply-menu').each(function(i) {
		var storage = localStorage.getItem('tab'+i);
		if (storage) $(this).find('li').eq(storage).addClass('current').siblings().removeClass('current')
	})

	$('.apply-menu').on('click', 'li:not(.current)', function() {
		$(this).addClass('current').siblings().removeClass('current')
		var ulIndex = $('.apply-menu').index($(this).parents('.apply-menu'));
		localStorage.removeItem('tab'+ulIndex);
		localStorage.setItem('tab'+ulIndex, $(this).index());
	})

	
})
})(jQuery)

jQuery(document).ready(function(){  
	$('.to-advant').click(function() {
	  jQuery('.tabs li').removeClass('current')
	  jQuery('.card-box').hide()
	  jQuery('li#tab-advant').addClass('current')
	  jQuery('#advant.card-box').show()
  });
    var jump=function(e)
    {
       if (e){
           e.preventDefault();
           var target = $(this).attr("href");
       }else{
           var target = location.hash;
       }

       $('html,body').animate(
       {
           scrollTop: $(target).offset().top - 100
       },1000,function()
       {
           location.hash = target;
       });

    }

    $('html, body').hide()

    $(document).ready(function()
    {
        $('a[href^="#"]').bind("click", jump);

        if (location.hash){
            setTimeout(function(){
                $('html, body').scrollTop(0).show()
                jump()
            }, 0);
        }else{
          $('html, body').show()
        }
    });
  
})


