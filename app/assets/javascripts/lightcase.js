/*
 * Lightcase - jQuery Plugin
 * The smart and flexible Lightbox Plugin.
 *
 * @author		Cornel Boppart <cornel@bopp-art.com>
 * @copyright	Author
 *
 * @version		2.3.6 (20/12/2016)
 */

;(function ($) {

	'use strict';

	var _self = {
		cache: {},

		support: {},

		objects: {},

		/**
		 * Initializes the plugin
		 *
		 * @param	{object}	options
		 * @return	{object}
		 */
		init: function (options) {
			return this.each(function () {
				$(this).unbind('click.lightcase').bind('click.lightcase', function (event) {
					event.preventDefault();
					$(this).lightcase('start', options);
				});
			});
		},

		/**
		 * Starts the plugin
		 *
		 * @param	{object}	options
		 * @return	{void}
		 */
		start: function (options) {
			_self.origin = lightcase.origin = this;

			_self.settings = lightcase.settings = $.extend(true, {
				idPrefix: 'lightcase-',
				classPrefix: 'lightcase-',
				attrPrefix: 'lc-',
				transition: 'elastic',
				transitionIn: null,
				transitionOut: null,
				cssTransitions: true,
				speedIn: 250,
				speedOut: 250,
				maxWidth: 800,
				maxHeight: 500,
				forceWidth: false,
				forceHeight: false,
				liveResize: true,
				fullScreenModeForMobile: true,
				mobileMatchExpression: /(iphone|ipod|ipad|android|blackberry|symbian)/,
				disableShrink: false,
				shrinkFactor: .75,
				overlayOpacity: .9,
				slideshow: false,
				slideshowAutoStart: true,
				timeout: 5000,
				swipe: true,
				useKeys: true,
				useCategories: true,
				navigateEndless: true,
				closeOnOverlayClick: true,
				title: null,
				caption: null,
				showTitle: true,
				showCaption: true,
				showSequenceInfo: true,
				inline: {
					width: 'auto',
					height: 'auto'
				},
				ajax: {
					width: 'auto',
					height: 'auto',
					type: 'get',
					dataType: 'html',
					data: {}
				},
				iframe: {
					width: 800,
					height: 500,
					frameborder: 0
				},
				flash: {
					width: 400,
					height: 205,
					wmode: 'transparent'
				},
				video: {
					width: 400,
					height: 225,
					poster: '',
					preload: 'auto',
					controls: true,
					autobuffer: true,
					autoplay: true,
					loop: false
				},
				attr: 'data-rel',
				href: null,
				type: null,
				typeMapping: {
					'image': 'jpg,jpeg,gif,png,bmp',
					'flash': 'swf',
					'video': 'mp4,mov,ogv,ogg,webm',
					'iframe': 'html,php',
					'ajax': 'json,txt',
					'inline': '#'
				},
				errorMessage: function () {
					return '<p class="' + _self.settings.classPrefix + 'error">' + _self.settings.labels['errorMessage'] + '</p>';
				},
				labels: {
					'errorMessage': 'Source could not be found...',
					'sequenceInfo.of': ' of ',
					'close': 'Close',
					'navigator.prev': 'Prev',
					'navigator.next': 'Next',
 					'navigator.play': 'Play',
					'navigator.pause': 'Pause'
				},
				markup: function () {
					$('body').append(
						_self.objects.overlay = $('<div id="' + _self.settings.idPrefix + 'overlay"></div>'),
						_self.objects.loading = $('<div id="' + _self.settings.idPrefix + 'loading" class="' + _self.settings.classPrefix + 'icon-spin"></div>'),
						_self.objects.case = $('<div id="' + _self.settings.idPrefix + 'case" aria-hidden="true" role="dialog"></div>')
					);
					_self.objects.case.after(
						_self.objects.nav = $('<div id="' + _self.settings.idPrefix + 'nav"></div>')
					);
					_self.objects.nav.append(
						_self.objects.close = $('<a href="#" class="' + _self.settings.classPrefix + 'icon-close"><span>' + _self.settings.labels['close'] + '</span></a>'),
						_self.objects.prev = $('<a href="#" class="' + _self.settings.classPrefix + 'icon-prev"><span>' + _self.settings.labels['navigator.prev'] + '</span></a>').hide(),
						_self.objects.next = $('<a href="#" class="' + _self.settings.classPrefix + 'icon-next"><span>' + _self.settings.labels['navigator.next'] + '</span></a>').hide(),
						_self.objects.play = $('<a href="#" class="' + _self.settings.classPrefix + 'icon-play"><span>' + _self.settings.labels['navigator.play'] + '</span></a>').hide(),
						_self.objects.pause = $('<a href="#" class="' + _self.settings.classPrefix + 'icon-pause"><span>' + _self.settings.labels['navigator.pause'] + '</span></a>').hide()
					);
					_self.objects.case.append(
						_self.objects.content = $('<div id="' + _self.settings.idPrefix + 'content"></div>'),
						_self.objects.info = $('<div id="' + _self.settings.idPrefix + 'info"></div>')
					);
					_self.objects.content.append(
						_self.objects.contentInner = $('<div class="' + _self.settings.classPrefix + 'contentInner"></div>')
					);
					_self.objects.info.append(
						_self.objects.sequenceInfo = $('<div id="' + _self.settings.idPrefix + 'sequenceInfo"></div>'),
						_self.objects.title = $('<h4 id="' + _self.settings.idPrefix + 'title"></h4>'),
						_self.objects.caption = $('<p id="' + _self.settings.idPrefix + 'caption"></p>')
					);
				},
				onInit: {},
				onStart: {},
				onFinish: {},
				onClose: {},
				onCleanup: {}
			}, 
			options,
			// Load options from data-lc-options attribute
			_self.origin.data ? _self.origin.data('lc-options') : {});

			// Call onInit hook functions
			_self._callHooks(_self.settings.onInit);

			_self.objectData = _self._setObjectData(this);

			_self._cacheScrollPosition();
			_self._watchScrollInteraction();

			_self._addElements();
			_self._open();

			_self.dimensions = _self.getViewportDimensions();
		},

		/**
		 * Getter method for objects
		 *
		 * @param	{string}	name
		 * @return	{object}
		 */
		get: function (name) {
			return _self.objects[name];
		},

		/**
		 * Getter method for objectData
		 *
		 * @return	{object}
		 */
		getObjectData: function () {
			return _self.objectData;
		},

		/**
		 * Sets the object data
		 *
		 * @param	{object}	object
		 * @return	{object}	objectData
		 */
		_setObjectData: function (object) {
		 	var $object = $(object),
				objectData = {
				title: _self.settings.title || $object.attr(_self._prefixAttributeName('title')) || $object.attr('title'),
				caption: _self.settings.caption || $object.attr(_self._prefixAttributeName('caption')) || $object.children('img').attr('alt'),
				url: _self._determineUrl(),
				requestType: _self.settings.ajax.type,
				requestData: _self.settings.ajax.data,
				requestDataType: _self.settings.ajax.dataType,
				rel: $object.attr(_self._determineAttributeSelector()),
				type: _self.settings.type || _self._verifyDataType(_self._determineUrl()),
				isPartOfSequence: _self._isPartOfSequence($object.attr(_self.settings.attr), ':'),
				isPartOfSequenceWithSlideshow: _self._isPartOfSequence($object.attr(_self.settings.attr), ':slideshow'),
				currentIndex: $(_self._determineAttributeSelector()).index($object),
				sequenceLength: $(_self._determineAttributeSelector()).length
			};

			// Add sequence info to objectData
			objectData.sequenceInfo = (objectData.currentIndex + 1) + _self.settings.labels['sequenceInfo.of'] + objectData.sequenceLength;

			// Add next/prev index
			objectData.prevIndex = objectData.currentIndex - 1;
			objectData.nextIndex = objectData.currentIndex + 1;

			return objectData;
		},

		/**
		 * Prefixes a data attribute name with defined name from 'settings.attrPrefix'
		 * to ensure more uniqueness for all lightcase related/used attributes.
		 *
		 * @param	{string}	name
		 * @return	{string}
		 */
		_prefixAttributeName: function (name) {
			return 'data-' + _self.settings.attrPrefix + name;
		},

		/**
		 * Determines the link target considering 'settings.href' and data attributes
		 * but also with a fallback to the default 'href' value.
		 *
		 * @return	{string}
		 */
		_determineLinkTarget: function () {
			return _self.settings.href || $(_self.origin).attr(_self._prefixAttributeName('href')) || $(_self.origin).attr('href');
		},

		/**
		 * Determines the attribute selector to use, depending on
		 * whether categorized collections are beeing used or not.
		 *
		 * @return	{string}	selector
		 */
		_determineAttributeSelector: function () {
			var	$origin = $(_self.origin),
				selector = '';

			if (typeof _self.cache.selector !== 'undefined') {
				selector = _self.cache.selector;
			} else if (_self.settings.useCategories === true && $origin.attr(_self._prefixAttributeName('categories'))) {
				var	categories = $origin.attr(_self._prefixAttributeName('categories')).split(' ');

				$.each(categories, function (index, category) {
					if (index > 0) {
						selector += ',';
					}
					selector += '[' + _self._prefixAttributeName('categories') + '~="' + category + '"]';
				});
			} else {
				selector = '[' + _self.settings.attr + '="' + $origin.attr(_self.settings.attr) + '"]';
			}

			_self.cache.selector = selector;

			return selector;
		},

		/**
		 * Determines the correct resource according to the
		 * current viewport and density.
		 *
		 * @return	{string}	url
		 */
		_determineUrl: function () {
			var dataUrl = _self._verifyDataUrl(_self._determineLinkTarget()),
				width = 0,
				density = 0,
				url;

			$.each(dataUrl, function (index, src) {
				if (
					// Check density
					_self._devicePixelRatio() >= src.density &&
					src.density >= density &&
					// Check viewport width
					_self._matchMedia()('screen and (min-width:' + src.width + 'px)').matches &&
					src.width >= width
				) {
					width = src.width;
					density = src.density;
					url = src.url;
				}
			});

			return url;
		},

		/**
		 * Normalizes an url and returns information about the resource path,
		 * the viewport width as well as density if defined.
		 *
		 * @param	{string}	url	Path to resource in format of an url or srcset
		 * @return	{object}
		 */
		_normalizeUrl: function (url) {
			var srcExp = /^\d+$/;

			return url.split(',').map(function (str) {
				var src = {
					width: 0,
					density: 0
				};

				str.trim().split(/\s+/).forEach(function (url, i) {
					if (i === 0) {
						return src.url = url;
					}

					var value = url.substring(0, url.length - 1),
						lastChar = url[url.length - 1],
						intVal = parseInt(value, 10),
						floatVal = parseFloat(value);
					if (lastChar === 'w' && srcExp.test(value)) {
						src.width = intVal;
					} else if (lastChar === 'h' && srcExp.test(value)) {
						src.height = intVal;
					} else if (lastChar === 'x' && !isNaN(floatVal)) {
						src.density = floatVal;
					}
				});

				return src;
			});
		},

		/**
		 * Verifies if the link is part of a sequence
		 *
		 * @param	{string}	rel
		 * @param	{string}	expression
		 * @return	{boolean}
		 */
		_isPartOfSequence: function (rel, expression) {
			var getSimilarLinks = $('[' + _self.settings.attr + '="' + rel + '"]'),
				regexp = new RegExp(expression);

			return (regexp.test(rel) && getSimilarLinks.length > 1);
		},

		/**
		 * Verifies if the slideshow should be enabled
		 *
		 * @return	{boolean}
		 */
		isSlideshowEnabled: function () {
			return (_self.objectData.isPartOfSequence && (_self.settings.slideshow === true || _self.objectData.isPartOfSequenceWithSlideshow === true));
		},

		/**
		 * Loads the new content to show
		 *
		 * @return	{void}
		 */
		_loadContent: function () {
			if (_self.cache.originalObject) {
				_self._restoreObject();
			}

			_self._createObject();
		},

		/**
		 * Creates a new object
		 *
		 * @return	{void}
		 */
		_createObject: function () {
			var $object;

			// Create object
			switch (_self.objectData.type) {
				case 'image':
					$object = $(new Image());
					$object.attr({
						// The time expression is required to prevent the binding of an image load
						'src': _self.objectData.url,
						'alt': _self.objectData.title
					});
					break;
				case 'inline':
					$object = $('<div class="' + _self.settings.classPrefix + 'inlineWrap"></div>');
					$object.html(_self._cloneObject($(_self.objectData.url)));

					// Add custom attributes from _self.settings
					$.each(_self.settings.inline, function (name, value) {
						$object.attr(_self._prefixAttributeName(name), value);
					});
					break;
				case 'ajax':
					$object = $('<div class="' + _self.settings.classPrefix + 'inlineWrap"></div>');

					// Add custom attributes from _self.settings
					$.each(_self.settings.ajax, function (name, value) {
						if (name !== 'data') {
							$object.attr(_self._prefixAttributeName(name), value);
						}
					});
					break;
				case 'flash':
					$object = $('<embed src="' + _self.objectData.url + '" type="application/x-shockwave-flash"></embed>');

					// Add custom attributes from _self.settings
					$.each(_self.settings.flash, function (name, value) {
						$object.attr(name, value);
					});
					break;
				case 'video':
					$object = $('<video></video>');
					$object.attr('src', _self.objectData.url);

					// Add custom attributes from _self.settings
					$.each(_self.settings.video, function (name, value) {
						$object.attr(name, value);
					});
					break;
				default :
					$object = $('<iframe></iframe>');
					$object.attr({
						'src': _self.objectData.url
					});

					// Add custom attributes from _self.settings
					$.each(_self.settings.iframe, function (name, value) {
						$object.attr(name, value);
					});
					break;
			}

			_self._addObject($object);
			_self._loadObject($object);
		},

		/**
		 * Adds the new object to the markup
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		_addObject: function ($object) {
			// Add object to content holder
			_self.objects.contentInner.html($object);

			// Start loading
			_self._loading('start');

			// Call onStart hook functions
			_self._callHooks(_self.settings.onStart);

			// Add sequenceInfo to the content holder or hide if its empty
			if (_self.settings.showSequenceInfo === true && _self.objectData.isPartOfSequence) {
				_self.objects.sequenceInfo.html(_self.objectData.sequenceInfo);
				_self.objects.sequenceInfo.show();
			} else {
				_self.objects.sequenceInfo.empty();
				_self.objects.sequenceInfo.hide();
			}
			// Add title to the content holder or hide if its empty
			if (_self.settings.showTitle === true && _self.objectData.title !== undefined && _self.objectData.title !== '') {
				_self.objects.title.html(_self.objectData.title);
				_self.objects.title.show();
			} else {
				_self.objects.title.empty();
				_self.objects.title.hide();
			}
			// Add caption to the content holder or hide if its empty
			if (_self.settings.showCaption === true && _self.objectData.caption !== undefined && _self.objectData.caption !== '') {
				_self.objects.caption.html(_self.objectData.caption);
				_self.objects.caption.show();
			} else {
				_self.objects.caption.empty();
				_self.objects.caption.hide();
			}
		},

		/**
		 * Loads the new object
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		_loadObject: function ($object) {
			// Load the object
			switch (_self.objectData.type) {
				case 'inline':
					if ($(_self.objectData.url)) {
						_self._showContent($object);
					} else {
						_self.error();
					}
					break;
				case 'ajax':
					$.ajax(
						$.extend({}, _self.settings.ajax, {
							url: _self.objectData.url,
							type: _self.objectData.requestType,
							dataType: _self.objectData.requestDataType,
							data: _self.objectData.requestData,
							success: function (data, textStatus, jqXHR) {
								// Unserialize if data is transferred as json
								if (_self.objectData.requestDataType === 'json') {
									_self.objectData.data = data;
								} else {
									$object.html(data);
								}
								_self._showContent($object);
							},
							error: function (jqXHR, textStatus, errorThrown) {
								_self.error();
							}
						})
					);
					break;
				case 'flash':
					_self._showContent($object);
					break;
				case 'video':
					if (typeof($object.get(0).canPlayType) === 'function' || _self.objects.case.find('video').length === 0) {
						_self._showContent($object);
					} else {
						_self.error();
					}
					break;
				default:
					if (_self.objectData.url) {
						$object.on('load', function () {
							_self._showContent($object);
						});
						$object.on('error', function () {
							_self.error();
						});
					} else {
						_self.error();
					}
					break;
			}
		},

		/**
		 * Throws an error message if something went wrong
		 *
		 * @return	{void}
		 */
		error: function () {
			_self.objectData.type = 'error';
			var $object = $('<div class="' + _self.settings.classPrefix + 'inlineWrap"></div>');

			$object.html(_self.settings.errorMessage);
			_self.objects.contentInner.html($object);

			_self._showContent(_self.objects.contentInner);
		},

		/**
		 * Calculates the dimensions to fit content
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		_calculateDimensions: function ($object) {
			_self._cleanupDimensions();

			// Set default dimensions
			var dimensions = {
				objectWidth: $object.attr('width') ? $object.attr('width') : $object.attr(_self._prefixAttributeName('width')),
				objectHeight: $object.attr('height') ? $object.attr('height') : $object.attr(_self._prefixAttributeName('height'))
			};

			if (!_self.settings.disableShrink) {
				// Add calculated maximum width/height to dimensions
				dimensions.maxWidth = parseInt(_self.dimensions.windowWidth * _self.settings.shrinkFactor);
				dimensions.maxHeight = parseInt(_self.dimensions.windowHeight * _self.settings.shrinkFactor);

				// If the auto calculated maxWidth/maxHeight greather than the userdefined one, use that.
				if (dimensions.maxWidth > _self.settings.maxWidth) {
					dimensions.maxWidth = _self.settings.maxWidth;
				}
				if (dimensions.maxHeight > _self.settings.maxHeight) {
					dimensions.maxHeight = _self.settings.maxHeight;
				}

				// Calculate the difference between screen width/height and image width/height
				dimensions.differenceWidthAsPercent = parseInt(100 / dimensions.maxWidth * dimensions.objectWidth);
				dimensions.differenceHeightAsPercent = parseInt(100 / dimensions.maxHeight * dimensions.objectHeight);

				switch (_self.objectData.type) {
					case 'image':
					case 'flash':
					case 'video':
						if (dimensions.differenceWidthAsPercent > 100 && dimensions.differenceWidthAsPercent > dimensions.differenceHeightAsPercent) {
							dimensions.objectWidth = dimensions.maxWidth;
							dimensions.objectHeight = parseInt(dimensions.objectHeight / dimensions.differenceWidthAsPercent * 100);
						}
						if (dimensions.differenceHeightAsPercent > 100 && dimensions.differenceHeightAsPercent > dimensions.differenceWidthAsPercent) {
							dimensions.objectWidth = parseInt(dimensions.objectWidth / dimensions.differenceHeightAsPercent * 100);
							dimensions.objectHeight = dimensions.maxHeight;
						}
						if (dimensions.differenceHeightAsPercent > 100 && dimensions.differenceWidthAsPercent < dimensions.differenceHeightAsPercent) {
							dimensions.objectWidth = parseInt(dimensions.maxWidth / dimensions.differenceHeightAsPercent * dimensions.differenceWidthAsPercent);
							dimensions.objectHeight = dimensions.maxHeight;
						}
						break;
					case 'error':
						if (!isNaN(dimensions.objectWidth) && dimensions.objectWidth > dimensions.maxWidth) {
							dimensions.objectWidth = dimensions.maxWidth;
						}
						break;
					default:
						if ((isNaN(dimensions.objectWidth) || dimensions.objectWidth > dimensions.maxWidth) && !_self.settings.forceWidth) {
							dimensions.objectWidth = dimensions.maxWidth;
						}
						if (((isNaN(dimensions.objectHeight) && dimensions.objectHeight !== 'auto') || dimensions.objectHeight > dimensions.maxHeight) && !_self.settings.forceHeight) {
							dimensions.objectHeight = dimensions.maxHeight;
						}
						break;
				}
			}

			if (_self.settings.forceWidth) {
				dimensions.maxWidth = dimensions.objectWidth;
			} else if ($object.attr(_self._prefixAttributeName('max-width'))) {
				dimensions.maxWidth =  $object.attr(_self._prefixAttributeName('max-width'));
			}

			if (_self.settings.forceHeight) {
				dimensions.maxHeight = dimensions.objectHeight;
			} else if ($object.attr(_self._prefixAttributeName('max-height'))) {
				dimensions.maxHeight =  $object.attr(_self._prefixAttributeName('max-height'));
			}

			_self._adjustDimensions($object, dimensions);
		},

		/**
		 * Adjusts the dimensions
		 *
		 * @param	{object}	$object
		 * @param	{object}	dimensions
		 * @return	{void}
		 */
		_adjustDimensions: function ($object, dimensions) {
			// Adjust width and height
			$object.css({
				'width': dimensions.objectWidth,
				'height': dimensions.objectHeight,
				'max-width': dimensions.maxWidth,
				'max-height': dimensions.maxHeight
			});

			_self.objects.contentInner.css({
				'width': $object.outerWidth(),
				'height': $object.outerHeight(),
				'max-width': '100%'
			});

			_self.objects.case.css({
				'width': _self.objects.contentInner.outerWidth()
			});

			// Adjust margin
			_self.objects.case.css({
				'margin-top': parseInt(-(_self.objects.case.outerHeight() / 2)),
				'margin-left': parseInt(-(_self.objects.case.outerWidth() / 2))
			});
		},

		/**
		 * Handles the _loading
		 *
		 * @param	{string}	process
		 * @return	{void}
		 */
		_loading: function (process) {
			if (process === 'start') {
				_self.objects.case.addClass(_self.settings.classPrefix + 'loading');
				_self.objects.loading.show();
			} else if (process === 'end') {
				_self.objects.case.removeClass(_self.settings.classPrefix + 'loading');
				_self.objects.loading.hide();
			}
		},


		/**
		 * Gets the client screen dimensions
		 *
		 * @return	{object}	dimensions
		 */
		getViewportDimensions: function () {
			return {
				windowWidth: $(window).innerWidth(),
				windowHeight: $(window).innerHeight()
			};
		},

		/**
		 * Verifies the url
		 *
		 * @param	{string}	dataUrl
		 * @return	{object}	dataUrl	Clean url for processing content
		 */
		_verifyDataUrl: function (dataUrl) {
			if (!dataUrl || dataUrl === undefined || dataUrl === '') {
				return false;
			}

			if (dataUrl.indexOf('#') > -1) {
				dataUrl = dataUrl.split('#');
				dataUrl = '#' + dataUrl[dataUrl.length - 1];
			}

			return _self._normalizeUrl(dataUrl.toString());
		},

		/**
		 * Verifies the data type of the content to load
		 *
		 * @param	{string}			url
		 * @return	{string|boolean}	Array key if expression matched, else false
		 */
		_verifyDataType: function (url) {
			var typeMapping = _self.settings.typeMapping;

			// Early abort if dataUrl couldn't be verified
			if (!url) {
				return false;
			}

			// Verify the dataType of url according to typeMapping which
			// has been defined in settings.
			for (var key in typeMapping) {
				if (typeMapping.hasOwnProperty(key)) {
					var suffixArr = typeMapping[key].split(',');

					for (var i = 0; i < suffixArr.length; i++) {
						var suffix = suffixArr[i].toLowerCase(),
							regexp = new RegExp('\.(' + suffix + ')$', 'i'),
							// Verify only the last 5 characters of the string
							str = url.toLowerCase().split('?')[0].substr(-5);

						if (regexp.test(str) === true || (key === 'inline' && (url.indexOf(suffix) > -1))) {
							return key;
						}
					}
				}
			}

			// If no expression matched, return 'iframe'.
			return 'iframe';
		},

		/**
		 * Extends html markup with the essential tags
		 *
		 * @return	{void}
		 */
		_addElements: function () {
			if (typeof _self.objects.case !== 'undefined' && $('#' + _self.objects.case.attr('id')).length) {
				return;
			}

			_self.settings.markup();
		},

		/**
		 * Shows the loaded content
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		_showContent: function ($object) {
			// Add data attribute with the object type
			_self.objects.case.attr(_self._prefixAttributeName('type'), _self.objectData.type);

			_self.cache.object = $object;
			_self._calculateDimensions($object);

			// Call onFinish hook functions
			_self._callHooks(_self.settings.onFinish);

			switch (_self.settings.transitionIn) {
				case 'scrollTop':
				case 'scrollRight':
				case 'scrollBottom':
				case 'scrollLeft':
				case 'scrollHorizontal':
				case 'scrollVertical':
					_self.transition.scroll(_self.objects.case, 'in', _self.settings.speedIn);
					_self.transition.fade(_self.objects.contentInner, 'in', _self.settings.speedIn);
					break;
				case 'elastic':
					if (_self.objects.case.css('opacity') < 1) {
						_self.transition.zoom(_self.objects.case, 'in', _self.settings.speedIn);
						_self.transition.fade(_self.objects.contentInner, 'in', _self.settings.speedIn);
					}
				case 'fade':
				case 'fadeInline':
					_self.transition.fade(_self.objects.case, 'in', _self.settings.speedIn);
					_self.transition.fade(_self.objects.contentInner, 'in', _self.settings.speedIn);
					break;
				default:
					_self.transition.fade(_self.objects.case, 'in', 0);
					break;
			}

			// End loading.
			_self._loading('end');
			_self.isBusy = false;
		},

		/**
		 * Processes the content to show
		 *
		 * @return	{void}
		 */
		_processContent: function () {
			_self.isBusy = true;

			switch (_self.settings.transitionOut) {
				case 'scrollTop':
				case 'scrollRight':
				case 'scrollBottom':
				case 'scrollLeft':
				case 'scrollVertical':
				case 'scrollHorizontal':
					if (_self.objects.case.is(':hidden')) {
						_self.transition.fade(_self.objects.case, 'out', 0, 0, function () {
							_self._loadContent();
						});
						_self.transition.fade(_self.objects.contentInner, 'out', 0);
					} else {
						_self.transition.scroll(_self.objects.case, 'out', _self.settings.speedOut, function () {
							_self._loadContent();
						});
					}
					break;
				case 'fade':
					if (_self.objects.case.is(':hidden')) {
						_self.transition.fade(_self.objects.case, 'out', 0, 0, function () {
							_self._loadContent();
						});
					} else {
						_self.transition.fade(_self.objects.case, 'out', _self.settings.speedOut, 0, function () {
							_self._loadContent();
						});
					}
					break;
				case 'fadeInline':
				case 'elastic':
					if (_self.objects.case.is(':hidden')) {
						_self.transition.fade(_self.objects.case, 'out', 0, 0, function () {
							_self._loadContent();
						});
					} else {
						_self.transition.fade(_self.objects.contentInner, 'out', _self.settings.speedOut, 0, function () {
							_self._loadContent();
						});
					}
					break;
				default:
					_self.transition.fade(_self.objects.case, 'out', 0, 0, function () {
						_self._loadContent();
					});
					break;
			}
		},

		/**
		 * Handles events for gallery buttons
		 *
		 * @return	{void}
		 */
		_handleEvents: function () {
			_self._unbindEvents();

			_self.objects.nav.children().not(_self.objects.close).hide();

			// If slideshow is enabled, show play/pause and start timeout.
			if (_self.isSlideshowEnabled()) {
				// Only start the timeout if slideshow autostart is enabled and slideshow is not pausing
				if (
					(_self.settings.slideshowAutoStart === true || _self.isSlideshowStarted) &&
					!_self.objects.nav.hasClass(_self.settings.classPrefix + 'paused')
				) {
					_self._startTimeout();
				} else {
					_self._stopTimeout();
				}
			}

			if (_self.settings.liveResize) {
				_self._watchResizeInteraction();
			}

			_self.objects.close.click(function (event) {
				event.preventDefault();
				_self.close();
			});

			if (_self.settings.closeOnOverlayClick === true) {
				_self.objects.overlay.css('cursor', 'pointer').click(function (event) {
					event.preventDefault();

					_self.close();
				});
			}

			if (_self.settings.useKeys === true) {
				_self._addKeyEvents();
			}

			if (_self.objectData.isPartOfSequence) {
				_self.objects.nav.attr(_self._prefixAttributeName('ispartofsequence'), true);
				_self.objects.nav.data('items', _self._setNavigation());

				_self.objects.prev.click(function (event) {
					event.preventDefault();

					if (_self.settings.navigateEndless === true || !_self.item.isFirst()) {
						_self.objects.prev.unbind('click');
						_self.cache.action = 'prev';
						_self.objects.nav.data('items').prev.click();

						if (_self.isSlideshowEnabled()) {
							_self._stopTimeout();
						}
					}
				});

				_self.objects.next.click(function (event) {
					event.preventDefault();

					if (_self.settings.navigateEndless === true || !_self.item.isLast()) {
						_self.objects.next.unbind('click');
						_self.cache.action = 'next';
						_self.objects.nav.data('items').next.click();

						if (_self.isSlideshowEnabled()) {
							_self._stopTimeout();
						}
					}
				});

				if (_self.isSlideshowEnabled()) {
					_self.objects.play.click(function (event) {
						event.preventDefault();
						_self._startTimeout();
					});
					_self.objects.pause.click(function (event) {
						event.preventDefault();
						_self._stopTimeout();
					});
				}

				// Enable swiping if activated
				if (_self.settings.swipe === true) {
					if ($.isPlainObject($.event.special.swipeleft)) {
						_self.objects.case.on('swipeleft', function (event) {
							event.preventDefault();
							_self.objects.next.click();
							if (_self.isSlideshowEnabled()) {
								_self._stopTimeout();
							}
						});
					}
					if ($.isPlainObject($.event.special.swiperight)) {
						_self.objects.case.on('swiperight', function (event) {
							event.preventDefault();
							_self.objects.prev.click();
							if (_self.isSlideshowEnabled()) {
								_self._stopTimeout();
							}
						});
					}
				}
			}
		},

		/**
		 * Adds the key events
		 *
		 * @return	{void}
		 */
		_addKeyEvents: function () {
			$(document).bind('keyup.lightcase', function (event) {
				// Do nothing if lightcase is in process
				if (_self.isBusy) {
					return;
				}

				switch (event.keyCode) {
					// Escape key
					case 27:
						_self.objects.close.click();
						break;
					// Backward key
					case 37:
						if (_self.objectData.isPartOfSequence) {
							_self.objects.prev.click();
						}
						break;
					// Forward key
					case 39:
						if (_self.objectData.isPartOfSequence) {
							_self.objects.next.click();
						}
						break;
				}
			});
		},

		/**
		 * Starts the slideshow timeout
		 *
		 * @return	{void}
		 */
		_startTimeout: function () {
			_self.isSlideshowStarted = true;

			_self.objects.play.hide();
			_self.objects.pause.show();

			_self.cache.action = 'next';
			_self.objects.nav.removeClass(_self.settings.classPrefix + 'paused');

			_self.timeout = setTimeout(function () {
				_self.objects.nav.data('items').next.click();
			}, _self.settings.timeout);
		},

		/**
		 * Stops the slideshow timeout
		 *
		 * @return	{void}
		 */
		_stopTimeout: function () {
			_self.objects.play.show();
			_self.objects.pause.hide();

			_self.objects.nav.addClass(_self.settings.classPrefix + 'paused');

			clearTimeout(_self.timeout);
		},

		/**
		 * Sets the navigator buttons (prev/next)
		 *
		 * @return	{object}	items
		 */
		_setNavigation: function () {
			var $links = $((_self.cache.selector || _self.settings.attr)),
				sequenceLength = _self.objectData.sequenceLength - 1,
				items = {
					prev: $links.eq(_self.objectData.prevIndex),
					next: $links.eq(_self.objectData.nextIndex)
				};

			if (_self.objectData.currentIndex > 0) {
				_self.objects.prev.show();
			} else {
				items.prevItem = $links.eq(sequenceLength);
			}
			if (_self.objectData.nextIndex <= sequenceLength) {
				_self.objects.next.show();
			} else {
				items.next = $links.eq(0);
			}

			if (_self.settings.navigateEndless === true) {
				_self.objects.prev.show();
				_self.objects.next.show();
			}

			return items;
		},

		/**
		 * Item information/status
		 *
		 */
		item: {
			/**
			 * Verifies if the current item is first item.
			 *
			 * @return	{boolean}
			 */
			isFirst: function () {
				return (_self.objectData.currentIndex === 0);
			},

			/**
			 * Verifies if the current item is last item.
			 *
			 * @return	{boolean}
			 */
			isLast: function () {
				return (_self.objectData.currentIndex === (_self.objectData.sequenceLength - 1));
			}
		},

		/**
		 * Clones the object for inline elements
		 *
		 * @param	{object}	$object
		 * @return	{object}	$clone
		 */
		_cloneObject: function ($object) {
			var $clone = $object.clone(),
				objectId = $object.attr('id');

			// If element is hidden, cache the object and remove
			if ($object.is(':hidden')) {
				_self._cacheObjectData($object);
				$object.attr('id', _self.settings.idPrefix + 'temp-' + objectId).empty();
			} else {
				// Prevent duplicated id's
				$clone.removeAttr('id');
			}

			return $clone.show();
		},

		/**
		 * Verifies if it is a mobile device
		 *
		 * @return	{boolean}
		 */
		isMobileDevice: function () {
			var deviceAgent = navigator.userAgent.toLowerCase(),
				agentId = deviceAgent.match(_self.settings.mobileMatchExpression);

			return agentId ? true : false;
		},

		/**
		 * Verifies if css transitions are supported
		 *
		 * @return	{string|boolean}	The transition prefix if supported, else false.
		 */
		isTransitionSupported: function () {
			var body = $('body').get(0),
				isTransitionSupported = false,
				transitionMapping = {
					'transition': '',
					'WebkitTransition': '-webkit-',
					'MozTransition': '-moz-',
					'OTransition': '-o-',
					'MsTransition': '-ms-'
				};

			for (var key in transitionMapping) {
				if (transitionMapping.hasOwnProperty(key) && key in body.style) {
					_self.support.transition = transitionMapping[key];
					isTransitionSupported = true;
				}
			}

			return isTransitionSupported;
		},

		/**
		 * Transition types
		 *
		 */
		transition: {
			/**
			 * Fades in/out the object
			 *
			 * @param	{object}	$object
			 * @param	{string}	type
			 * @param	{number}	speed
			 * @param	{number}	opacity
			 * @param	{function}	callback
			 * @return	{void}		Animates an object
			 */
			fade: function ($object, type, speed, opacity, callback) {
				var isInTransition = type === 'in',
					startTransition = {},
					startOpacity = $object.css('opacity'),
					endTransition = {},
					endOpacity = opacity ? opacity: isInTransition ? 1 : 0;

				if (!_self.isOpen && isInTransition) return;

				startTransition['opacity'] = startOpacity;
				endTransition['opacity'] = endOpacity;

				$object.css(startTransition).show();

				// Css transition
				if (_self.support.transitions) {
					endTransition[_self.support.transition + 'transition'] = speed + 'ms ease';

					setTimeout(function () {
						$object.css(endTransition);

						setTimeout(function () {
							$object.css(_self.support.transition + 'transition', '');

							if (callback && (_self.isOpen || !isInTransition)) {
								callback();
							}
						}, speed);
					}, 15);
				} else {
					// Fallback to js transition
					$object.stop();
					$object.animate(endTransition, speed, callback);
				}
			},

			/**
			 * Scrolls in/out the object
			 *
			 * @param	{object}	$object
			 * @param	{string}	type
			 * @param	{number}	speed
			 * @param	{function}	callback
			 * @return	{void}		Animates an object
			 */
			scroll: function ($object, type, speed, callback) {
				var isInTransition = type === 'in',
					transition = isInTransition ? _self.settings.transitionIn : _self.settings.transitionOut,
					direction = 'left',
					startTransition = {},
					startOpacity = isInTransition ? 0 : 1,
					startOffset = isInTransition ? '-50%' : '50%',
					endTransition = {},
					endOpacity = isInTransition ? 1 : 0,
					endOffset = isInTransition ? '50%' : '-50%';

				if (!_self.isOpen && isInTransition) return;

				switch (transition) {
					case 'scrollTop':
						direction = 'top';
						break;
					case 'scrollRight':
						startOffset = isInTransition ? '150%' : '50%';
						endOffset = isInTransition ? '50%' : '150%';
						break;
					case 'scrollBottom':
						direction = 'top';
						startOffset = isInTransition ? '150%' : '50%';
						endOffset = isInTransition ? '50%' : '150%';
						break;
					case 'scrollHorizontal':
						startOffset = isInTransition ? '150%' : '50%';
						endOffset = isInTransition ? '50%' : '-50%';
						break;
					case 'scrollVertical':
						direction = 'top';
						startOffset = isInTransition ? '-50%' : '50%';
						endOffset = isInTransition ? '50%' : '150%';
						break;
				}

				if (_self.cache.action === 'prev') {
					switch (transition) {
						case 'scrollHorizontal':
							startOffset = isInTransition ? '-50%' : '50%';
							endOffset = isInTransition ? '50%' : '150%';
							break;
						case 'scrollVertical':
							startOffset = isInTransition ? '150%' : '50%';
							endOffset = isInTransition ? '50%' : '-50%';
							break;
					}
				}

				startTransition['opacity'] = startOpacity;
				startTransition[direction] = startOffset;

				endTransition['opacity'] = endOpacity;
				endTransition[direction] = endOffset;

				$object.css(startTransition).show();

				// Css transition
				if (_self.support.transitions) {
					endTransition[_self.support.transition + 'transition'] = speed + 'ms ease';

					setTimeout(function () {
						$object.css(endTransition);

						setTimeout(function () {
							$object.css(_self.support.transition + 'transition', '');

							if (callback && (_self.isOpen || !isInTransition)) {
								callback();
							}
						}, speed);
					}, 15);
				} else {
					// Fallback to js transition
					$object.stop();
					$object.animate(endTransition, speed, callback);
				}
			},

			/**
			 * Zooms in/out the object
			 *
			 * @param	{object}	$object
			 * @param	{string}	type
			 * @param	{number}	speed
			 * @param	{function}	callback
			 * @return	{void}		Animates an object
			 */
			zoom: function ($object, type, speed, callback) {
				var isInTransition = type === 'in',
					startTransition = {},
					startOpacity = $object.css('opacity'),
					startScale = isInTransition ? 'scale(0.75)' : 'scale(1)',
					endTransition = {},
					endOpacity = isInTransition ? 1 : 0,
					endScale = isInTransition ? 'scale(1)' : 'scale(0.75)';

				if (!_self.isOpen && isInTransition) return;

				startTransition['opacity'] = startOpacity;
				startTransition[_self.support.transition + 'transform'] = startScale;

				endTransition['opacity'] = endOpacity;

				$object.css(startTransition).show();

				// Css transition
				if (_self.support.transitions) {
					endTransition[_self.support.transition + 'transform'] = endScale;
					endTransition[_self.support.transition + 'transition'] = speed + 'ms ease';

					setTimeout(function () {
						$object.css(endTransition);

						setTimeout(function () {
							$object.css(_self.support.transition + 'transform', '');
							$object.css(_self.support.transition + 'transition', '');

							if (callback && (_self.isOpen || !isInTransition)) {
								callback();
							}
						}, speed);
					}, 15);
				} else {
					// Fallback to js transition
					$object.stop();
					$object.animate(endTransition, speed, callback);
				}
			}
		},

		/**
		 * Calls all the registered functions of a specific hook
		 *
		 * @param	{object}	hooks
		 * @return	{void}
		 */
		_callHooks: function (hooks) {
			if (typeof(hooks) === 'object') {
				$.each(hooks, function(index, hook) {
					if (typeof(hook) === 'function') {
						hook.call(_self.origin);
					}
				});
			}
		},

		/**
		 * Caches the object data
		 *
		 * @param	{object}	$object
		 * @return	{void}
		 */
		_cacheObjectData: function ($object) {
			$.data($object, 'cache', {
				id: $object.attr('id'),
				content: $object.html()
			});

			_self.cache.originalObject = $object;
		},

		/**
		 * Restores the object from cache
		 *
		 * @return	void
		 */
		_restoreObject: function () {
			var $object = $('[id^="' + _self.settings.idPrefix + 'temp-"]');

			$object.attr('id', $.data(_self.cache.originalObject, 'cache').id);
			$object.html($.data(_self.cache.originalObject, 'cache').content);
		},

		/**
		 * Executes functions for a window resize.
		 * It stops an eventual timeout and recalculates dimenstions.
		 *
		 * @return	{void}
		 */
		resize: function () {
			if (!_self.isOpen) return;

			if (_self.isSlideshowEnabled()) {
				_self._stopTimeout();
			}

			_self.dimensions = _self.getViewportDimensions();
			_self._calculateDimensions(_self.cache.object);
		},

		/**
		 * Caches the actual scroll coordinates.
		 *
		 * @return	{void}
		 */
		_cacheScrollPosition: function () {
			var	$window = $(window),
				$document = $(document),
				offset = {
					'top': $window.scrollTop(),
					'left':  $window.scrollLeft()
				};

			_self.cache.scrollPosition = _self.cache.scrollPosition || {};

			if (!_self._assertContentInvisible()) {
				_self.cache.cacheScrollPositionSkipped = true;
			}
			else if (_self.cache.cacheScrollPositionSkipped) {
				delete _self.cache.cacheScrollPositionSkipped;
				_self._restoreScrollPosition();
			}
			else {
				if ($document.width() > $window.width()) {
					_self.cache.scrollPosition.left = offset.left;
				}
				if ($document.height() > $window.height()) {
					_self.cache.scrollPosition.top = offset.top;
				}
			}
		},

		/**
		 * Watches for any resize interaction and caches the new sizes.
		 *
		 * @return	{void}
		 */
		_watchResizeInteraction: function () {
			$(window).resize(_self.resize);
		},

		/**
		 * Stop watching any resize interaction related to _self.
		 *
		 * @return	{void}
		 */
		_unwatchResizeInteraction: function () {
			$(window).off('resize', _self.resize);
		},

		/**
		 * Watches for any scroll interaction and caches the new position.
		 *
		 * @return	{void}
		 */
		_watchScrollInteraction: function () {
			$(window).scroll(_self._cacheScrollPosition);
			$(window).resize(_self._cacheScrollPosition);
		},

		/**
		 * Stop watching any scroll interaction related to _self.
		 *
		 * @return	{void}
		 */
		_unwatchScrollInteraction: function () {
			$(window).off('scroll', _self._cacheScrollPosition);
			$(window).off('resize', _self._cacheScrollPosition);
		},

		/**
		 * Ensures that site content is invisible or has not height.
		 *
		 * @return	{boolean}
		 */
		_assertContentInvisible: function () {
			return $($('body').children().not('[id*=' + _self.settings.idPrefix + ']').get(0)).height() > 0;
		},

		/**
		 * Restores to the original scoll position before
		 * lightcase got initialized.
		 *
		 * @return	{void}
		 */
		_restoreScrollPosition: function () {
			$(window)
				.scrollTop(parseInt(_self.cache.scrollPosition.top))
				.scrollLeft(parseInt(_self.cache.scrollPosition.left))
				.resize();
		},

		/**
		 * Switches to the fullscreen mode
		 *
		 * @return	{void}
		 */
		_switchToFullScreenMode: function () {
			_self.settings.shrinkFactor = 1;
			_self.settings.overlayOpacity = 1;

			$('html').addClass(_self.settings.classPrefix + 'fullScreenMode');
		},

		/**
		 * Enters into the lightcase view
		 *
		 * @return	{void}
		 */
		_open: function () {
			_self.isOpen = true;

			_self.support.transitions = _self.settings.cssTransitions ? _self.isTransitionSupported() : false;
			_self.support.mobileDevice = _self.isMobileDevice();

			if (_self.support.mobileDevice) {
				$('html').addClass(_self.settings.classPrefix + 'isMobileDevice');

				if (_self.settings.fullScreenModeForMobile) {
					_self._switchToFullScreenMode();
				}
			}
			if (!_self.settings.transitionIn) {
				_self.settings.transitionIn = _self.settings.transition;
			}
			if (!_self.settings.transitionOut) {
				_self.settings.transitionOut = _self.settings.transition;
			}

			switch (_self.settings.transitionIn) {
				case 'fade':
				case 'fadeInline':
				case 'elastic':
				case 'scrollTop':
				case 'scrollRight':
				case 'scrollBottom':
				case 'scrollLeft':
				case 'scrollVertical':
				case 'scrollHorizontal':
					if (_self.objects.case.is(':hidden')) {
						_self.objects.close.css('opacity', 0);
						_self.objects.overlay.css('opacity', 0);
						_self.objects.case.css('opacity', 0);
						_self.objects.contentInner.css('opacity', 0);
					}
					_self.transition.fade(_self.objects.overlay, 'in', _self.settings.speedIn, _self.settings.overlayOpacity, function () {
						_self.transition.fade(_self.objects.close, 'in', _self.settings.speedIn);
						_self._handleEvents();
						_self._processContent();
					});
					break;
				default:
					_self.transition.fade(_self.objects.overlay, 'in', 0, _self.settings.overlayOpacity, function () {
						_self.transition.fade(_self.objects.close, 'in', 0);
						_self._handleEvents();
						_self._processContent();
					});
					break;
			}

			$('html').addClass(_self.settings.classPrefix + 'open');
			_self.objects.case.attr('aria-hidden', 'false');
		},

		/**
		 * Escapes from the lightcase view
		 *
		 * @return	{void}
		 */
		close: function () {
			_self.isOpen = false;

			if (_self.isSlideshowEnabled()) {
				_self._stopTimeout();
				_self.isSlideshowStarted = false;
				_self.objects.nav.removeClass(_self.settings.classPrefix + 'paused');
			}

			_self.objects.loading.hide();

			_self._unbindEvents();

			_self._unwatchResizeInteraction();
			_self._unwatchScrollInteraction();

			$('html').removeClass(_self.settings.classPrefix + 'open');
			_self.objects.case.attr('aria-hidden', 'true');

			_self.objects.nav.children().hide();

			_self._restoreScrollPosition();

			// Call onClose hook functions
			_self._callHooks(_self.settings.onClose);

			switch (_self.settings.transitionOut) {
				case 'fade':
				case 'fadeInline':
				case 'scrollTop':
				case 'scrollRight':
				case 'scrollBottom':
				case 'scrollLeft':
				case 'scrollHorizontal':
				case 'scrollVertical':
					_self.transition.fade(_self.objects.case, 'out', _self.settings.speedOut, 0, function () {
						_self.transition.fade(_self.objects.overlay, 'out', _self.settings.speedOut, 0, function () {
							_self.cleanup();
						});
					});
					break;
				case 'elastic':
					_self.transition.zoom(_self.objects.case, 'out', _self.settings.speedOut, function () {
						_self.transition.fade(_self.objects.overlay, 'out', _self.settings.speedOut, 0, function () {
							_self.cleanup();
						});
					});
					break;
				default:
					_self.cleanup();
					break;
			}
		},

		/**
		 * Unbinds all given events
		 *
		 * @return	{void}
		 */
		_unbindEvents: function () {
			// Unbind overlay event
			_self.objects.overlay.unbind('click');

			// Unbind key events
			$(document).unbind('keyup.lightcase');

			// Unbind swipe events
			_self.objects.case.unbind('swipeleft').unbind('swiperight');

			// Unbind navigator events
			_self.objects.prev.unbind('click');
			_self.objects.next.unbind('click');
			_self.objects.play.unbind('click');
			_self.objects.pause.unbind('click');

			// Unbind close event
			_self.objects.close.unbind('click');
		},

		/**
		 * Cleans up the dimensions
		 *
		 * @return	{void}
		 */
		_cleanupDimensions: function () {
			var opacity = _self.objects.contentInner.css('opacity');

			_self.objects.case.css({
				'width': '',
				'height': '',
				'top': '',
				'left': '',
				'margin-top': '',
				'margin-left': ''
			});

			_self.objects.contentInner.removeAttr('style').css('opacity', opacity);
			_self.objects.contentInner.children().removeAttr('style');
		},

		/**
		 * Cleanup after aborting lightcase
		 *
		 * @return	{void}
		 */
		cleanup: function () {
			_self._cleanupDimensions();

			_self.objects.loading.hide();
			_self.objects.overlay.hide();
			_self.objects.case.hide();
			_self.objects.prev.hide();
			_self.objects.next.hide();
			_self.objects.play.hide();
			_self.objects.pause.hide();

			_self.objects.case.removeAttr(_self._prefixAttributeName('type'));
			_self.objects.nav.removeAttr(_self._prefixAttributeName('ispartofsequence'));

			_self.objects.contentInner.empty().hide();
			_self.objects.info.children().empty();

			if (_self.cache.originalObject) {
				_self._restoreObject();
			}

			// Call onCleanup hook functions
			_self._callHooks(_self.settings.onCleanup);

			// Restore cache
			_self.cache = {};
		},

		/**
		 * Returns the supported match media or undefined if the browser
		 * doesn't support match media.
		 *
		 * @return	{mixed}
		 */
		_matchMedia: function () {
			return window.matchMedia || window.msMatchMedia;
		},

		/**
		 * Returns the devicePixelRatio if supported. Else, it simply returns
		 * 1 as the default.
		 *
		 * @return	{number}
		 */
		_devicePixelRatio: function () {
			return window.devicePixelRatio || 1;
		},

		/**
		 * Checks if method is public
		 *
		 * @return	{boolean}
		 */
		_isPublicMethod: function (method) {
			return (typeof _self[method] === 'function' && method.charAt(0) !== '_');
		},

		/**
		 * Exports all public methods to be accessible, callable
		 * from global scope.
		 *
		 * @return	{void}
		 */
		_export: function () {
			window.lightcase = {};

			$.each(_self, function (property) {
				if (_self._isPublicMethod(property)) {
					lightcase[property] = _self[property];
				}
			});
		}
	};

	_self._export();

	$.fn.lightcase = function (method) {
		// Method calling logic (only public methods are applied)
		if (_self._isPublicMethod(method)) {
			return _self[method].apply(this, Array.prototype.slice.call(arguments, 1));
		} else if (typeof method === 'object' || !method) {
			return _self.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.lightcase');
		}
	};
})(jQuery);

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsaWdodGNhc2UuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLypcbiAqIExpZ2h0Y2FzZSAtIGpRdWVyeSBQbHVnaW5cbiAqIFRoZSBzbWFydCBhbmQgZmxleGlibGUgTGlnaHRib3ggUGx1Z2luLlxuICpcbiAqIEBhdXRob3JcdFx0Q29ybmVsIEJvcHBhcnQgPGNvcm5lbEBib3BwLWFydC5jb20+XG4gKiBAY29weXJpZ2h0XHRBdXRob3JcbiAqXG4gKiBAdmVyc2lvblx0XHQyLjMuNiAoMjAvMTIvMjAxNilcbiAqL1xuXG47KGZ1bmN0aW9uICgkKSB7XG5cblx0J3VzZSBzdHJpY3QnO1xuXG5cdHZhciBfc2VsZiA9IHtcblx0XHRjYWNoZToge30sXG5cblx0XHRzdXBwb3J0OiB7fSxcblxuXHRcdG9iamVjdHM6IHt9LFxuXG5cdFx0LyoqXG5cdFx0ICogSW5pdGlhbGl6ZXMgdGhlIHBsdWdpblxuXHRcdCAqXG5cdFx0ICogQHBhcmFtXHR7b2JqZWN0fVx0b3B0aW9uc1xuXHRcdCAqIEByZXR1cm5cdHtvYmplY3R9XG5cdFx0ICovXG5cdFx0aW5pdDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRcdHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuXHRcdFx0XHQkKHRoaXMpLnVuYmluZCgnY2xpY2subGlnaHRjYXNlJykuYmluZCgnY2xpY2subGlnaHRjYXNlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHQkKHRoaXMpLmxpZ2h0Y2FzZSgnc3RhcnQnLCBvcHRpb25zKTtcblx0XHRcdFx0fSk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogU3RhcnRzIHRoZSBwbHVnaW5cblx0XHQgKlxuXHRcdCAqIEBwYXJhbVx0e29iamVjdH1cdG9wdGlvbnNcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRzdGFydDogZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0XHRcdF9zZWxmLm9yaWdpbiA9IGxpZ2h0Y2FzZS5vcmlnaW4gPSB0aGlzO1xuXG5cdFx0XHRfc2VsZi5zZXR0aW5ncyA9IGxpZ2h0Y2FzZS5zZXR0aW5ncyA9ICQuZXh0ZW5kKHRydWUsIHtcblx0XHRcdFx0aWRQcmVmaXg6ICdsaWdodGNhc2UtJyxcblx0XHRcdFx0Y2xhc3NQcmVmaXg6ICdsaWdodGNhc2UtJyxcblx0XHRcdFx0YXR0clByZWZpeDogJ2xjLScsXG5cdFx0XHRcdHRyYW5zaXRpb246ICdlbGFzdGljJyxcblx0XHRcdFx0dHJhbnNpdGlvbkluOiBudWxsLFxuXHRcdFx0XHR0cmFuc2l0aW9uT3V0OiBudWxsLFxuXHRcdFx0XHRjc3NUcmFuc2l0aW9uczogdHJ1ZSxcblx0XHRcdFx0c3BlZWRJbjogMjUwLFxuXHRcdFx0XHRzcGVlZE91dDogMjUwLFxuXHRcdFx0XHRtYXhXaWR0aDogODAwLFxuXHRcdFx0XHRtYXhIZWlnaHQ6IDUwMCxcblx0XHRcdFx0Zm9yY2VXaWR0aDogZmFsc2UsXG5cdFx0XHRcdGZvcmNlSGVpZ2h0OiBmYWxzZSxcblx0XHRcdFx0bGl2ZVJlc2l6ZTogdHJ1ZSxcblx0XHRcdFx0ZnVsbFNjcmVlbk1vZGVGb3JNb2JpbGU6IHRydWUsXG5cdFx0XHRcdG1vYmlsZU1hdGNoRXhwcmVzc2lvbjogLyhpcGhvbmV8aXBvZHxpcGFkfGFuZHJvaWR8YmxhY2tiZXJyeXxzeW1iaWFuKS8sXG5cdFx0XHRcdGRpc2FibGVTaHJpbms6IGZhbHNlLFxuXHRcdFx0XHRzaHJpbmtGYWN0b3I6IC43NSxcblx0XHRcdFx0b3ZlcmxheU9wYWNpdHk6IC45LFxuXHRcdFx0XHRzbGlkZXNob3c6IGZhbHNlLFxuXHRcdFx0XHRzbGlkZXNob3dBdXRvU3RhcnQ6IHRydWUsXG5cdFx0XHRcdHRpbWVvdXQ6IDUwMDAsXG5cdFx0XHRcdHN3aXBlOiB0cnVlLFxuXHRcdFx0XHR1c2VLZXlzOiB0cnVlLFxuXHRcdFx0XHR1c2VDYXRlZ29yaWVzOiB0cnVlLFxuXHRcdFx0XHRuYXZpZ2F0ZUVuZGxlc3M6IHRydWUsXG5cdFx0XHRcdGNsb3NlT25PdmVybGF5Q2xpY2s6IHRydWUsXG5cdFx0XHRcdHRpdGxlOiBudWxsLFxuXHRcdFx0XHRjYXB0aW9uOiBudWxsLFxuXHRcdFx0XHRzaG93VGl0bGU6IHRydWUsXG5cdFx0XHRcdHNob3dDYXB0aW9uOiB0cnVlLFxuXHRcdFx0XHRzaG93U2VxdWVuY2VJbmZvOiB0cnVlLFxuXHRcdFx0XHRpbmxpbmU6IHtcblx0XHRcdFx0XHR3aWR0aDogJ2F1dG8nLFxuXHRcdFx0XHRcdGhlaWdodDogJ2F1dG8nXG5cdFx0XHRcdH0sXG5cdFx0XHRcdGFqYXg6IHtcblx0XHRcdFx0XHR3aWR0aDogJ2F1dG8nLFxuXHRcdFx0XHRcdGhlaWdodDogJ2F1dG8nLFxuXHRcdFx0XHRcdHR5cGU6ICdnZXQnLFxuXHRcdFx0XHRcdGRhdGFUeXBlOiAnaHRtbCcsXG5cdFx0XHRcdFx0ZGF0YToge31cblx0XHRcdFx0fSxcblx0XHRcdFx0aWZyYW1lOiB7XG5cdFx0XHRcdFx0d2lkdGg6IDgwMCxcblx0XHRcdFx0XHRoZWlnaHQ6IDUwMCxcblx0XHRcdFx0XHRmcmFtZWJvcmRlcjogMFxuXHRcdFx0XHR9LFxuXHRcdFx0XHRmbGFzaDoge1xuXHRcdFx0XHRcdHdpZHRoOiA0MDAsXG5cdFx0XHRcdFx0aGVpZ2h0OiAyMDUsXG5cdFx0XHRcdFx0d21vZGU6ICd0cmFuc3BhcmVudCdcblx0XHRcdFx0fSxcblx0XHRcdFx0dmlkZW86IHtcblx0XHRcdFx0XHR3aWR0aDogNDAwLFxuXHRcdFx0XHRcdGhlaWdodDogMjI1LFxuXHRcdFx0XHRcdHBvc3RlcjogJycsXG5cdFx0XHRcdFx0cHJlbG9hZDogJ2F1dG8nLFxuXHRcdFx0XHRcdGNvbnRyb2xzOiB0cnVlLFxuXHRcdFx0XHRcdGF1dG9idWZmZXI6IHRydWUsXG5cdFx0XHRcdFx0YXV0b3BsYXk6IHRydWUsXG5cdFx0XHRcdFx0bG9vcDogZmFsc2Vcblx0XHRcdFx0fSxcblx0XHRcdFx0YXR0cjogJ2RhdGEtcmVsJyxcblx0XHRcdFx0aHJlZjogbnVsbCxcblx0XHRcdFx0dHlwZTogbnVsbCxcblx0XHRcdFx0dHlwZU1hcHBpbmc6IHtcblx0XHRcdFx0XHQnaW1hZ2UnOiAnanBnLGpwZWcsZ2lmLHBuZyxibXAnLFxuXHRcdFx0XHRcdCdmbGFzaCc6ICdzd2YnLFxuXHRcdFx0XHRcdCd2aWRlbyc6ICdtcDQsbW92LG9ndixvZ2csd2VibScsXG5cdFx0XHRcdFx0J2lmcmFtZSc6ICdodG1sLHBocCcsXG5cdFx0XHRcdFx0J2FqYXgnOiAnanNvbix0eHQnLFxuXHRcdFx0XHRcdCdpbmxpbmUnOiAnIydcblx0XHRcdFx0fSxcblx0XHRcdFx0ZXJyb3JNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuICc8cCBjbGFzcz1cIicgKyBfc2VsZi5zZXR0aW5ncy5jbGFzc1ByZWZpeCArICdlcnJvclwiPicgKyBfc2VsZi5zZXR0aW5ncy5sYWJlbHNbJ2Vycm9yTWVzc2FnZSddICsgJzwvcD4nO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRsYWJlbHM6IHtcblx0XHRcdFx0XHQnZXJyb3JNZXNzYWdlJzogJ1NvdXJjZSBjb3VsZCBub3QgYmUgZm91bmQuLi4nLFxuXHRcdFx0XHRcdCdzZXF1ZW5jZUluZm8ub2YnOiAnIG9mICcsXG5cdFx0XHRcdFx0J2Nsb3NlJzogJ0Nsb3NlJyxcblx0XHRcdFx0XHQnbmF2aWdhdG9yLnByZXYnOiAnUHJldicsXG5cdFx0XHRcdFx0J25hdmlnYXRvci5uZXh0JzogJ05leHQnLFxuIFx0XHRcdFx0XHQnbmF2aWdhdG9yLnBsYXknOiAnUGxheScsXG5cdFx0XHRcdFx0J25hdmlnYXRvci5wYXVzZSc6ICdQYXVzZSdcblx0XHRcdFx0fSxcblx0XHRcdFx0bWFya3VwOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0JCgnYm9keScpLmFwcGVuZChcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMub3ZlcmxheSA9ICQoJzxkaXYgaWQ9XCInICsgX3NlbGYuc2V0dGluZ3MuaWRQcmVmaXggKyAnb3ZlcmxheVwiPjwvZGl2PicpLFxuXHRcdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5sb2FkaW5nID0gJCgnPGRpdiBpZD1cIicgKyBfc2VsZi5zZXR0aW5ncy5pZFByZWZpeCArICdsb2FkaW5nXCIgY2xhc3M9XCInICsgX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAnaWNvbi1zcGluXCI+PC9kaXY+JyksXG5cdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLmNhc2UgPSAkKCc8ZGl2IGlkPVwiJyArIF9zZWxmLnNldHRpbmdzLmlkUHJlZml4ICsgJ2Nhc2VcIiBhcmlhLWhpZGRlbj1cInRydWVcIiByb2xlPVwiZGlhbG9nXCI+PC9kaXY+Jylcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdF9zZWxmLm9iamVjdHMuY2FzZS5hZnRlcihcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMubmF2ID0gJCgnPGRpdiBpZD1cIicgKyBfc2VsZi5zZXR0aW5ncy5pZFByZWZpeCArICduYXZcIj48L2Rpdj4nKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5uYXYuYXBwZW5kKFxuXHRcdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5jbG9zZSA9ICQoJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCInICsgX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAnaWNvbi1jbG9zZVwiPjxzcGFuPicgKyBfc2VsZi5zZXR0aW5ncy5sYWJlbHNbJ2Nsb3NlJ10gKyAnPC9zcGFuPjwvYT4nKSxcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMucHJldiA9ICQoJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCInICsgX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAnaWNvbi1wcmV2XCI+PHNwYW4+JyArIF9zZWxmLnNldHRpbmdzLmxhYmVsc1snbmF2aWdhdG9yLnByZXYnXSArICc8L3NwYW4+PC9hPicpLmhpZGUoKSxcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMubmV4dCA9ICQoJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCInICsgX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAnaWNvbi1uZXh0XCI+PHNwYW4+JyArIF9zZWxmLnNldHRpbmdzLmxhYmVsc1snbmF2aWdhdG9yLm5leHQnXSArICc8L3NwYW4+PC9hPicpLmhpZGUoKSxcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMucGxheSA9ICQoJzxhIGhyZWY9XCIjXCIgY2xhc3M9XCInICsgX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAnaWNvbi1wbGF5XCI+PHNwYW4+JyArIF9zZWxmLnNldHRpbmdzLmxhYmVsc1snbmF2aWdhdG9yLnBsYXknXSArICc8L3NwYW4+PC9hPicpLmhpZGUoKSxcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMucGF1c2UgPSAkKCc8YSBocmVmPVwiI1wiIGNsYXNzPVwiJyArIF9zZWxmLnNldHRpbmdzLmNsYXNzUHJlZml4ICsgJ2ljb24tcGF1c2VcIj48c3Bhbj4nICsgX3NlbGYuc2V0dGluZ3MubGFiZWxzWyduYXZpZ2F0b3IucGF1c2UnXSArICc8L3NwYW4+PC9hPicpLmhpZGUoKVxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5jYXNlLmFwcGVuZChcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMuY29udGVudCA9ICQoJzxkaXYgaWQ9XCInICsgX3NlbGYuc2V0dGluZ3MuaWRQcmVmaXggKyAnY29udGVudFwiPjwvZGl2PicpLFxuXHRcdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5pbmZvID0gJCgnPGRpdiBpZD1cIicgKyBfc2VsZi5zZXR0aW5ncy5pZFByZWZpeCArICdpbmZvXCI+PC9kaXY+Jylcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdF9zZWxmLm9iamVjdHMuY29udGVudC5hcHBlbmQoXG5cdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLmNvbnRlbnRJbm5lciA9ICQoJzxkaXYgY2xhc3M9XCInICsgX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAnY29udGVudElubmVyXCI+PC9kaXY+Jylcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdF9zZWxmLm9iamVjdHMuaW5mby5hcHBlbmQoXG5cdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLnNlcXVlbmNlSW5mbyA9ICQoJzxkaXYgaWQ9XCInICsgX3NlbGYuc2V0dGluZ3MuaWRQcmVmaXggKyAnc2VxdWVuY2VJbmZvXCI+PC9kaXY+JyksXG5cdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLnRpdGxlID0gJCgnPGg0IGlkPVwiJyArIF9zZWxmLnNldHRpbmdzLmlkUHJlZml4ICsgJ3RpdGxlXCI+PC9oND4nKSxcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMuY2FwdGlvbiA9ICQoJzxwIGlkPVwiJyArIF9zZWxmLnNldHRpbmdzLmlkUHJlZml4ICsgJ2NhcHRpb25cIj48L3A+Jylcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHR9LFxuXHRcdFx0XHRvbkluaXQ6IHt9LFxuXHRcdFx0XHRvblN0YXJ0OiB7fSxcblx0XHRcdFx0b25GaW5pc2g6IHt9LFxuXHRcdFx0XHRvbkNsb3NlOiB7fSxcblx0XHRcdFx0b25DbGVhbnVwOiB7fVxuXHRcdFx0fSwgXG5cdFx0XHRvcHRpb25zLFxuXHRcdFx0Ly8gTG9hZCBvcHRpb25zIGZyb20gZGF0YS1sYy1vcHRpb25zIGF0dHJpYnV0ZVxuXHRcdFx0X3NlbGYub3JpZ2luLmRhdGEgPyBfc2VsZi5vcmlnaW4uZGF0YSgnbGMtb3B0aW9ucycpIDoge30pO1xuXG5cdFx0XHQvLyBDYWxsIG9uSW5pdCBob29rIGZ1bmN0aW9uc1xuXHRcdFx0X3NlbGYuX2NhbGxIb29rcyhfc2VsZi5zZXR0aW5ncy5vbkluaXQpO1xuXG5cdFx0XHRfc2VsZi5vYmplY3REYXRhID0gX3NlbGYuX3NldE9iamVjdERhdGEodGhpcyk7XG5cblx0XHRcdF9zZWxmLl9jYWNoZVNjcm9sbFBvc2l0aW9uKCk7XG5cdFx0XHRfc2VsZi5fd2F0Y2hTY3JvbGxJbnRlcmFjdGlvbigpO1xuXG5cdFx0XHRfc2VsZi5fYWRkRWxlbWVudHMoKTtcblx0XHRcdF9zZWxmLl9vcGVuKCk7XG5cblx0XHRcdF9zZWxmLmRpbWVuc2lvbnMgPSBfc2VsZi5nZXRWaWV3cG9ydERpbWVuc2lvbnMoKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogR2V0dGVyIG1ldGhvZCBmb3Igb2JqZWN0c1xuXHRcdCAqXG5cdFx0ICogQHBhcmFtXHR7c3RyaW5nfVx0bmFtZVxuXHRcdCAqIEByZXR1cm5cdHtvYmplY3R9XG5cdFx0ICovXG5cdFx0Z2V0OiBmdW5jdGlvbiAobmFtZSkge1xuXHRcdFx0cmV0dXJuIF9zZWxmLm9iamVjdHNbbmFtZV07XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEdldHRlciBtZXRob2QgZm9yIG9iamVjdERhdGFcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHtvYmplY3R9XG5cdFx0ICovXG5cdFx0Z2V0T2JqZWN0RGF0YTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuIF9zZWxmLm9iamVjdERhdGE7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFNldHMgdGhlIG9iamVjdCBkYXRhXG5cdFx0ICpcblx0XHQgKiBAcGFyYW1cdHtvYmplY3R9XHRvYmplY3Rcblx0XHQgKiBAcmV0dXJuXHR7b2JqZWN0fVx0b2JqZWN0RGF0YVxuXHRcdCAqL1xuXHRcdF9zZXRPYmplY3REYXRhOiBmdW5jdGlvbiAob2JqZWN0KSB7XG5cdFx0IFx0dmFyICRvYmplY3QgPSAkKG9iamVjdCksXG5cdFx0XHRcdG9iamVjdERhdGEgPSB7XG5cdFx0XHRcdHRpdGxlOiBfc2VsZi5zZXR0aW5ncy50aXRsZSB8fCAkb2JqZWN0LmF0dHIoX3NlbGYuX3ByZWZpeEF0dHJpYnV0ZU5hbWUoJ3RpdGxlJykpIHx8ICRvYmplY3QuYXR0cigndGl0bGUnKSxcblx0XHRcdFx0Y2FwdGlvbjogX3NlbGYuc2V0dGluZ3MuY2FwdGlvbiB8fCAkb2JqZWN0LmF0dHIoX3NlbGYuX3ByZWZpeEF0dHJpYnV0ZU5hbWUoJ2NhcHRpb24nKSkgfHwgJG9iamVjdC5jaGlsZHJlbignaW1nJykuYXR0cignYWx0JyksXG5cdFx0XHRcdHVybDogX3NlbGYuX2RldGVybWluZVVybCgpLFxuXHRcdFx0XHRyZXF1ZXN0VHlwZTogX3NlbGYuc2V0dGluZ3MuYWpheC50eXBlLFxuXHRcdFx0XHRyZXF1ZXN0RGF0YTogX3NlbGYuc2V0dGluZ3MuYWpheC5kYXRhLFxuXHRcdFx0XHRyZXF1ZXN0RGF0YVR5cGU6IF9zZWxmLnNldHRpbmdzLmFqYXguZGF0YVR5cGUsXG5cdFx0XHRcdHJlbDogJG9iamVjdC5hdHRyKF9zZWxmLl9kZXRlcm1pbmVBdHRyaWJ1dGVTZWxlY3RvcigpKSxcblx0XHRcdFx0dHlwZTogX3NlbGYuc2V0dGluZ3MudHlwZSB8fCBfc2VsZi5fdmVyaWZ5RGF0YVR5cGUoX3NlbGYuX2RldGVybWluZVVybCgpKSxcblx0XHRcdFx0aXNQYXJ0T2ZTZXF1ZW5jZTogX3NlbGYuX2lzUGFydE9mU2VxdWVuY2UoJG9iamVjdC5hdHRyKF9zZWxmLnNldHRpbmdzLmF0dHIpLCAnOicpLFxuXHRcdFx0XHRpc1BhcnRPZlNlcXVlbmNlV2l0aFNsaWRlc2hvdzogX3NlbGYuX2lzUGFydE9mU2VxdWVuY2UoJG9iamVjdC5hdHRyKF9zZWxmLnNldHRpbmdzLmF0dHIpLCAnOnNsaWRlc2hvdycpLFxuXHRcdFx0XHRjdXJyZW50SW5kZXg6ICQoX3NlbGYuX2RldGVybWluZUF0dHJpYnV0ZVNlbGVjdG9yKCkpLmluZGV4KCRvYmplY3QpLFxuXHRcdFx0XHRzZXF1ZW5jZUxlbmd0aDogJChfc2VsZi5fZGV0ZXJtaW5lQXR0cmlidXRlU2VsZWN0b3IoKSkubGVuZ3RoXG5cdFx0XHR9O1xuXG5cdFx0XHQvLyBBZGQgc2VxdWVuY2UgaW5mbyB0byBvYmplY3REYXRhXG5cdFx0XHRvYmplY3REYXRhLnNlcXVlbmNlSW5mbyA9IChvYmplY3REYXRhLmN1cnJlbnRJbmRleCArIDEpICsgX3NlbGYuc2V0dGluZ3MubGFiZWxzWydzZXF1ZW5jZUluZm8ub2YnXSArIG9iamVjdERhdGEuc2VxdWVuY2VMZW5ndGg7XG5cblx0XHRcdC8vIEFkZCBuZXh0L3ByZXYgaW5kZXhcblx0XHRcdG9iamVjdERhdGEucHJldkluZGV4ID0gb2JqZWN0RGF0YS5jdXJyZW50SW5kZXggLSAxO1xuXHRcdFx0b2JqZWN0RGF0YS5uZXh0SW5kZXggPSBvYmplY3REYXRhLmN1cnJlbnRJbmRleCArIDE7XG5cblx0XHRcdHJldHVybiBvYmplY3REYXRhO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBQcmVmaXhlcyBhIGRhdGEgYXR0cmlidXRlIG5hbWUgd2l0aCBkZWZpbmVkIG5hbWUgZnJvbSAnc2V0dGluZ3MuYXR0clByZWZpeCdcblx0XHQgKiB0byBlbnN1cmUgbW9yZSB1bmlxdWVuZXNzIGZvciBhbGwgbGlnaHRjYXNlIHJlbGF0ZWQvdXNlZCBhdHRyaWJ1dGVzLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtXHR7c3RyaW5nfVx0bmFtZVxuXHRcdCAqIEByZXR1cm5cdHtzdHJpbmd9XG5cdFx0ICovXG5cdFx0X3ByZWZpeEF0dHJpYnV0ZU5hbWU6IGZ1bmN0aW9uIChuYW1lKSB7XG5cdFx0XHRyZXR1cm4gJ2RhdGEtJyArIF9zZWxmLnNldHRpbmdzLmF0dHJQcmVmaXggKyBuYW1lO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZXRlcm1pbmVzIHRoZSBsaW5rIHRhcmdldCBjb25zaWRlcmluZyAnc2V0dGluZ3MuaHJlZicgYW5kIGRhdGEgYXR0cmlidXRlc1xuXHRcdCAqIGJ1dCBhbHNvIHdpdGggYSBmYWxsYmFjayB0byB0aGUgZGVmYXVsdCAnaHJlZicgdmFsdWUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7c3RyaW5nfVxuXHRcdCAqL1xuXHRcdF9kZXRlcm1pbmVMaW5rVGFyZ2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gX3NlbGYuc2V0dGluZ3MuaHJlZiB8fCAkKF9zZWxmLm9yaWdpbikuYXR0cihfc2VsZi5fcHJlZml4QXR0cmlidXRlTmFtZSgnaHJlZicpKSB8fCAkKF9zZWxmLm9yaWdpbikuYXR0cignaHJlZicpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBEZXRlcm1pbmVzIHRoZSBhdHRyaWJ1dGUgc2VsZWN0b3IgdG8gdXNlLCBkZXBlbmRpbmcgb25cblx0XHQgKiB3aGV0aGVyIGNhdGVnb3JpemVkIGNvbGxlY3Rpb25zIGFyZSBiZWVpbmcgdXNlZCBvciBub3QuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7c3RyaW5nfVx0c2VsZWN0b3Jcblx0XHQgKi9cblx0XHRfZGV0ZXJtaW5lQXR0cmlidXRlU2VsZWN0b3I6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhclx0JG9yaWdpbiA9ICQoX3NlbGYub3JpZ2luKSxcblx0XHRcdFx0c2VsZWN0b3IgPSAnJztcblxuXHRcdFx0aWYgKHR5cGVvZiBfc2VsZi5jYWNoZS5zZWxlY3RvciAhPT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRcdFx0c2VsZWN0b3IgPSBfc2VsZi5jYWNoZS5zZWxlY3Rvcjtcblx0XHRcdH0gZWxzZSBpZiAoX3NlbGYuc2V0dGluZ3MudXNlQ2F0ZWdvcmllcyA9PT0gdHJ1ZSAmJiAkb3JpZ2luLmF0dHIoX3NlbGYuX3ByZWZpeEF0dHJpYnV0ZU5hbWUoJ2NhdGVnb3JpZXMnKSkpIHtcblx0XHRcdFx0dmFyXHRjYXRlZ29yaWVzID0gJG9yaWdpbi5hdHRyKF9zZWxmLl9wcmVmaXhBdHRyaWJ1dGVOYW1lKCdjYXRlZ29yaWVzJykpLnNwbGl0KCcgJyk7XG5cblx0XHRcdFx0JC5lYWNoKGNhdGVnb3JpZXMsIGZ1bmN0aW9uIChpbmRleCwgY2F0ZWdvcnkpIHtcblx0XHRcdFx0XHRpZiAoaW5kZXggPiAwKSB7XG5cdFx0XHRcdFx0XHRzZWxlY3RvciArPSAnLCc7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdHNlbGVjdG9yICs9ICdbJyArIF9zZWxmLl9wcmVmaXhBdHRyaWJ1dGVOYW1lKCdjYXRlZ29yaWVzJykgKyAnfj1cIicgKyBjYXRlZ29yeSArICdcIl0nO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNlbGVjdG9yID0gJ1snICsgX3NlbGYuc2V0dGluZ3MuYXR0ciArICc9XCInICsgJG9yaWdpbi5hdHRyKF9zZWxmLnNldHRpbmdzLmF0dHIpICsgJ1wiXSc7XG5cdFx0XHR9XG5cblx0XHRcdF9zZWxmLmNhY2hlLnNlbGVjdG9yID0gc2VsZWN0b3I7XG5cblx0XHRcdHJldHVybiBzZWxlY3Rvcjtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRGV0ZXJtaW5lcyB0aGUgY29ycmVjdCByZXNvdXJjZSBhY2NvcmRpbmcgdG8gdGhlXG5cdFx0ICogY3VycmVudCB2aWV3cG9ydCBhbmQgZGVuc2l0eS5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHtzdHJpbmd9XHR1cmxcblx0XHQgKi9cblx0XHRfZGV0ZXJtaW5lVXJsOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgZGF0YVVybCA9IF9zZWxmLl92ZXJpZnlEYXRhVXJsKF9zZWxmLl9kZXRlcm1pbmVMaW5rVGFyZ2V0KCkpLFxuXHRcdFx0XHR3aWR0aCA9IDAsXG5cdFx0XHRcdGRlbnNpdHkgPSAwLFxuXHRcdFx0XHR1cmw7XG5cblx0XHRcdCQuZWFjaChkYXRhVXJsLCBmdW5jdGlvbiAoaW5kZXgsIHNyYykge1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgZGVuc2l0eVxuXHRcdFx0XHRcdF9zZWxmLl9kZXZpY2VQaXhlbFJhdGlvKCkgPj0gc3JjLmRlbnNpdHkgJiZcblx0XHRcdFx0XHRzcmMuZGVuc2l0eSA+PSBkZW5zaXR5ICYmXG5cdFx0XHRcdFx0Ly8gQ2hlY2sgdmlld3BvcnQgd2lkdGhcblx0XHRcdFx0XHRfc2VsZi5fbWF0Y2hNZWRpYSgpKCdzY3JlZW4gYW5kIChtaW4td2lkdGg6JyArIHNyYy53aWR0aCArICdweCknKS5tYXRjaGVzICYmXG5cdFx0XHRcdFx0c3JjLndpZHRoID49IHdpZHRoXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdHdpZHRoID0gc3JjLndpZHRoO1xuXHRcdFx0XHRcdGRlbnNpdHkgPSBzcmMuZGVuc2l0eTtcblx0XHRcdFx0XHR1cmwgPSBzcmMudXJsO1xuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblxuXHRcdFx0cmV0dXJuIHVybDtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTm9ybWFsaXplcyBhbiB1cmwgYW5kIHJldHVybnMgaW5mb3JtYXRpb24gYWJvdXQgdGhlIHJlc291cmNlIHBhdGgsXG5cdFx0ICogdGhlIHZpZXdwb3J0IHdpZHRoIGFzIHdlbGwgYXMgZGVuc2l0eSBpZiBkZWZpbmVkLlxuXHRcdCAqXG5cdFx0ICogQHBhcmFtXHR7c3RyaW5nfVx0dXJsXHRQYXRoIHRvIHJlc291cmNlIGluIGZvcm1hdCBvZiBhbiB1cmwgb3Igc3Jjc2V0XG5cdFx0ICogQHJldHVyblx0e29iamVjdH1cblx0XHQgKi9cblx0XHRfbm9ybWFsaXplVXJsOiBmdW5jdGlvbiAodXJsKSB7XG5cdFx0XHR2YXIgc3JjRXhwID0gL15cXGQrJC87XG5cblx0XHRcdHJldHVybiB1cmwuc3BsaXQoJywnKS5tYXAoZnVuY3Rpb24gKHN0cikge1xuXHRcdFx0XHR2YXIgc3JjID0ge1xuXHRcdFx0XHRcdHdpZHRoOiAwLFxuXHRcdFx0XHRcdGRlbnNpdHk6IDBcblx0XHRcdFx0fTtcblxuXHRcdFx0XHRzdHIudHJpbSgpLnNwbGl0KC9cXHMrLykuZm9yRWFjaChmdW5jdGlvbiAodXJsLCBpKSB7XG5cdFx0XHRcdFx0aWYgKGkgPT09IDApIHtcblx0XHRcdFx0XHRcdHJldHVybiBzcmMudXJsID0gdXJsO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHZhciB2YWx1ZSA9IHVybC5zdWJzdHJpbmcoMCwgdXJsLmxlbmd0aCAtIDEpLFxuXHRcdFx0XHRcdFx0bGFzdENoYXIgPSB1cmxbdXJsLmxlbmd0aCAtIDFdLFxuXHRcdFx0XHRcdFx0aW50VmFsID0gcGFyc2VJbnQodmFsdWUsIDEwKSxcblx0XHRcdFx0XHRcdGZsb2F0VmFsID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG5cdFx0XHRcdFx0aWYgKGxhc3RDaGFyID09PSAndycgJiYgc3JjRXhwLnRlc3QodmFsdWUpKSB7XG5cdFx0XHRcdFx0XHRzcmMud2lkdGggPSBpbnRWYWw7XG5cdFx0XHRcdFx0fSBlbHNlIGlmIChsYXN0Q2hhciA9PT0gJ2gnICYmIHNyY0V4cC50ZXN0KHZhbHVlKSkge1xuXHRcdFx0XHRcdFx0c3JjLmhlaWdodCA9IGludFZhbDtcblx0XHRcdFx0XHR9IGVsc2UgaWYgKGxhc3RDaGFyID09PSAneCcgJiYgIWlzTmFOKGZsb2F0VmFsKSkge1xuXHRcdFx0XHRcdFx0c3JjLmRlbnNpdHkgPSBmbG9hdFZhbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdHJldHVybiBzcmM7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogVmVyaWZpZXMgaWYgdGhlIGxpbmsgaXMgcGFydCBvZiBhIHNlcXVlbmNlXG5cdFx0ICpcblx0XHQgKiBAcGFyYW1cdHtzdHJpbmd9XHRyZWxcblx0XHQgKiBAcGFyYW1cdHtzdHJpbmd9XHRleHByZXNzaW9uXG5cdFx0ICogQHJldHVyblx0e2Jvb2xlYW59XG5cdFx0ICovXG5cdFx0X2lzUGFydE9mU2VxdWVuY2U6IGZ1bmN0aW9uIChyZWwsIGV4cHJlc3Npb24pIHtcblx0XHRcdHZhciBnZXRTaW1pbGFyTGlua3MgPSAkKCdbJyArIF9zZWxmLnNldHRpbmdzLmF0dHIgKyAnPVwiJyArIHJlbCArICdcIl0nKSxcblx0XHRcdFx0cmVnZXhwID0gbmV3IFJlZ0V4cChleHByZXNzaW9uKTtcblxuXHRcdFx0cmV0dXJuIChyZWdleHAudGVzdChyZWwpICYmIGdldFNpbWlsYXJMaW5rcy5sZW5ndGggPiAxKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogVmVyaWZpZXMgaWYgdGhlIHNsaWRlc2hvdyBzaG91bGQgYmUgZW5hYmxlZFxuXHRcdCAqXG5cdFx0ICogQHJldHVyblx0e2Jvb2xlYW59XG5cdFx0ICovXG5cdFx0aXNTbGlkZXNob3dFbmFibGVkOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gKF9zZWxmLm9iamVjdERhdGEuaXNQYXJ0T2ZTZXF1ZW5jZSAmJiAoX3NlbGYuc2V0dGluZ3Muc2xpZGVzaG93ID09PSB0cnVlIHx8IF9zZWxmLm9iamVjdERhdGEuaXNQYXJ0T2ZTZXF1ZW5jZVdpdGhTbGlkZXNob3cgPT09IHRydWUpKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogTG9hZHMgdGhlIG5ldyBjb250ZW50IHRvIHNob3dcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF9sb2FkQ29udGVudDogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKF9zZWxmLmNhY2hlLm9yaWdpbmFsT2JqZWN0KSB7XG5cdFx0XHRcdF9zZWxmLl9yZXN0b3JlT2JqZWN0KCk7XG5cdFx0XHR9XG5cblx0XHRcdF9zZWxmLl9jcmVhdGVPYmplY3QoKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQ3JlYXRlcyBhIG5ldyBvYmplY3Rcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF9jcmVhdGVPYmplY3Q6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciAkb2JqZWN0O1xuXG5cdFx0XHQvLyBDcmVhdGUgb2JqZWN0XG5cdFx0XHRzd2l0Y2ggKF9zZWxmLm9iamVjdERhdGEudHlwZSkge1xuXHRcdFx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRcdFx0JG9iamVjdCA9ICQobmV3IEltYWdlKCkpO1xuXHRcdFx0XHRcdCRvYmplY3QuYXR0cih7XG5cdFx0XHRcdFx0XHQvLyBUaGUgdGltZSBleHByZXNzaW9uIGlzIHJlcXVpcmVkIHRvIHByZXZlbnQgdGhlIGJpbmRpbmcgb2YgYW4gaW1hZ2UgbG9hZFxuXHRcdFx0XHRcdFx0J3NyYyc6IF9zZWxmLm9iamVjdERhdGEudXJsLFxuXHRcdFx0XHRcdFx0J2FsdCc6IF9zZWxmLm9iamVjdERhdGEudGl0bGVcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnaW5saW5lJzpcblx0XHRcdFx0XHQkb2JqZWN0ID0gJCgnPGRpdiBjbGFzcz1cIicgKyBfc2VsZi5zZXR0aW5ncy5jbGFzc1ByZWZpeCArICdpbmxpbmVXcmFwXCI+PC9kaXY+Jyk7XG5cdFx0XHRcdFx0JG9iamVjdC5odG1sKF9zZWxmLl9jbG9uZU9iamVjdCgkKF9zZWxmLm9iamVjdERhdGEudXJsKSkpO1xuXG5cdFx0XHRcdFx0Ly8gQWRkIGN1c3RvbSBhdHRyaWJ1dGVzIGZyb20gX3NlbGYuc2V0dGluZ3Ncblx0XHRcdFx0XHQkLmVhY2goX3NlbGYuc2V0dGluZ3MuaW5saW5lLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdFx0XHRcdCRvYmplY3QuYXR0cihfc2VsZi5fcHJlZml4QXR0cmlidXRlTmFtZShuYW1lKSwgdmFsdWUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdhamF4Jzpcblx0XHRcdFx0XHQkb2JqZWN0ID0gJCgnPGRpdiBjbGFzcz1cIicgKyBfc2VsZi5zZXR0aW5ncy5jbGFzc1ByZWZpeCArICdpbmxpbmVXcmFwXCI+PC9kaXY+Jyk7XG5cblx0XHRcdFx0XHQvLyBBZGQgY3VzdG9tIGF0dHJpYnV0ZXMgZnJvbSBfc2VsZi5zZXR0aW5nc1xuXHRcdFx0XHRcdCQuZWFjaChfc2VsZi5zZXR0aW5ncy5hamF4LCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdFx0XHRcdGlmIChuYW1lICE9PSAnZGF0YScpIHtcblx0XHRcdFx0XHRcdFx0JG9iamVjdC5hdHRyKF9zZWxmLl9wcmVmaXhBdHRyaWJ1dGVOYW1lKG5hbWUpLCB2YWx1ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2ZsYXNoJzpcblx0XHRcdFx0XHQkb2JqZWN0ID0gJCgnPGVtYmVkIHNyYz1cIicgKyBfc2VsZi5vYmplY3REYXRhLnVybCArICdcIiB0eXBlPVwiYXBwbGljYXRpb24veC1zaG9ja3dhdmUtZmxhc2hcIj48L2VtYmVkPicpO1xuXG5cdFx0XHRcdFx0Ly8gQWRkIGN1c3RvbSBhdHRyaWJ1dGVzIGZyb20gX3NlbGYuc2V0dGluZ3Ncblx0XHRcdFx0XHQkLmVhY2goX3NlbGYuc2V0dGluZ3MuZmxhc2gsIGZ1bmN0aW9uIChuYW1lLCB2YWx1ZSkge1xuXHRcdFx0XHRcdFx0JG9iamVjdC5hdHRyKG5hbWUsIHZhbHVlKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAndmlkZW8nOlxuXHRcdFx0XHRcdCRvYmplY3QgPSAkKCc8dmlkZW8+PC92aWRlbz4nKTtcblx0XHRcdFx0XHQkb2JqZWN0LmF0dHIoJ3NyYycsIF9zZWxmLm9iamVjdERhdGEudXJsKTtcblxuXHRcdFx0XHRcdC8vIEFkZCBjdXN0b20gYXR0cmlidXRlcyBmcm9tIF9zZWxmLnNldHRpbmdzXG5cdFx0XHRcdFx0JC5lYWNoKF9zZWxmLnNldHRpbmdzLnZpZGVvLCBmdW5jdGlvbiAobmFtZSwgdmFsdWUpIHtcblx0XHRcdFx0XHRcdCRvYmplY3QuYXR0cihuYW1lLCB2YWx1ZSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQgOlxuXHRcdFx0XHRcdCRvYmplY3QgPSAkKCc8aWZyYW1lPjwvaWZyYW1lPicpO1xuXHRcdFx0XHRcdCRvYmplY3QuYXR0cih7XG5cdFx0XHRcdFx0XHQnc3JjJzogX3NlbGYub2JqZWN0RGF0YS51cmxcblx0XHRcdFx0XHR9KTtcblxuXHRcdFx0XHRcdC8vIEFkZCBjdXN0b20gYXR0cmlidXRlcyBmcm9tIF9zZWxmLnNldHRpbmdzXG5cdFx0XHRcdFx0JC5lYWNoKF9zZWxmLnNldHRpbmdzLmlmcmFtZSwgZnVuY3Rpb24gKG5hbWUsIHZhbHVlKSB7XG5cdFx0XHRcdFx0XHQkb2JqZWN0LmF0dHIobmFtZSwgdmFsdWUpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXG5cdFx0XHRfc2VsZi5fYWRkT2JqZWN0KCRvYmplY3QpO1xuXHRcdFx0X3NlbGYuX2xvYWRPYmplY3QoJG9iamVjdCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEFkZHMgdGhlIG5ldyBvYmplY3QgdG8gdGhlIG1hcmt1cFxuXHRcdCAqXG5cdFx0ICogQHBhcmFtXHR7b2JqZWN0fVx0JG9iamVjdFxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF9hZGRPYmplY3Q6IGZ1bmN0aW9uICgkb2JqZWN0KSB7XG5cdFx0XHQvLyBBZGQgb2JqZWN0IHRvIGNvbnRlbnQgaG9sZGVyXG5cdFx0XHRfc2VsZi5vYmplY3RzLmNvbnRlbnRJbm5lci5odG1sKCRvYmplY3QpO1xuXG5cdFx0XHQvLyBTdGFydCBsb2FkaW5nXG5cdFx0XHRfc2VsZi5fbG9hZGluZygnc3RhcnQnKTtcblxuXHRcdFx0Ly8gQ2FsbCBvblN0YXJ0IGhvb2sgZnVuY3Rpb25zXG5cdFx0XHRfc2VsZi5fY2FsbEhvb2tzKF9zZWxmLnNldHRpbmdzLm9uU3RhcnQpO1xuXG5cdFx0XHQvLyBBZGQgc2VxdWVuY2VJbmZvIHRvIHRoZSBjb250ZW50IGhvbGRlciBvciBoaWRlIGlmIGl0cyBlbXB0eVxuXHRcdFx0aWYgKF9zZWxmLnNldHRpbmdzLnNob3dTZXF1ZW5jZUluZm8gPT09IHRydWUgJiYgX3NlbGYub2JqZWN0RGF0YS5pc1BhcnRPZlNlcXVlbmNlKSB7XG5cdFx0XHRcdF9zZWxmLm9iamVjdHMuc2VxdWVuY2VJbmZvLmh0bWwoX3NlbGYub2JqZWN0RGF0YS5zZXF1ZW5jZUluZm8pO1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLnNlcXVlbmNlSW5mby5zaG93KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLnNlcXVlbmNlSW5mby5lbXB0eSgpO1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLnNlcXVlbmNlSW5mby5oaWRlKCk7XG5cdFx0XHR9XG5cdFx0XHQvLyBBZGQgdGl0bGUgdG8gdGhlIGNvbnRlbnQgaG9sZGVyIG9yIGhpZGUgaWYgaXRzIGVtcHR5XG5cdFx0XHRpZiAoX3NlbGYuc2V0dGluZ3Muc2hvd1RpdGxlID09PSB0cnVlICYmIF9zZWxmLm9iamVjdERhdGEudGl0bGUgIT09IHVuZGVmaW5lZCAmJiBfc2VsZi5vYmplY3REYXRhLnRpdGxlICE9PSAnJykge1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLnRpdGxlLmh0bWwoX3NlbGYub2JqZWN0RGF0YS50aXRsZSk7XG5cdFx0XHRcdF9zZWxmLm9iamVjdHMudGl0bGUuc2hvdygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0X3NlbGYub2JqZWN0cy50aXRsZS5lbXB0eSgpO1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLnRpdGxlLmhpZGUoKTtcblx0XHRcdH1cblx0XHRcdC8vIEFkZCBjYXB0aW9uIHRvIHRoZSBjb250ZW50IGhvbGRlciBvciBoaWRlIGlmIGl0cyBlbXB0eVxuXHRcdFx0aWYgKF9zZWxmLnNldHRpbmdzLnNob3dDYXB0aW9uID09PSB0cnVlICYmIF9zZWxmLm9iamVjdERhdGEuY2FwdGlvbiAhPT0gdW5kZWZpbmVkICYmIF9zZWxmLm9iamVjdERhdGEuY2FwdGlvbiAhPT0gJycpIHtcblx0XHRcdFx0X3NlbGYub2JqZWN0cy5jYXB0aW9uLmh0bWwoX3NlbGYub2JqZWN0RGF0YS5jYXB0aW9uKTtcblx0XHRcdFx0X3NlbGYub2JqZWN0cy5jYXB0aW9uLnNob3coKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdF9zZWxmLm9iamVjdHMuY2FwdGlvbi5lbXB0eSgpO1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLmNhcHRpb24uaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBMb2FkcyB0aGUgbmV3IG9iamVjdFxuXHRcdCAqXG5cdFx0ICogQHBhcmFtXHR7b2JqZWN0fVx0JG9iamVjdFxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF9sb2FkT2JqZWN0OiBmdW5jdGlvbiAoJG9iamVjdCkge1xuXHRcdFx0Ly8gTG9hZCB0aGUgb2JqZWN0XG5cdFx0XHRzd2l0Y2ggKF9zZWxmLm9iamVjdERhdGEudHlwZSkge1xuXHRcdFx0XHRjYXNlICdpbmxpbmUnOlxuXHRcdFx0XHRcdGlmICgkKF9zZWxmLm9iamVjdERhdGEudXJsKSkge1xuXHRcdFx0XHRcdFx0X3NlbGYuX3Nob3dDb250ZW50KCRvYmplY3QpO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfc2VsZi5lcnJvcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnYWpheCc6XG5cdFx0XHRcdFx0JC5hamF4KFxuXHRcdFx0XHRcdFx0JC5leHRlbmQoe30sIF9zZWxmLnNldHRpbmdzLmFqYXgsIHtcblx0XHRcdFx0XHRcdFx0dXJsOiBfc2VsZi5vYmplY3REYXRhLnVybCxcblx0XHRcdFx0XHRcdFx0dHlwZTogX3NlbGYub2JqZWN0RGF0YS5yZXF1ZXN0VHlwZSxcblx0XHRcdFx0XHRcdFx0ZGF0YVR5cGU6IF9zZWxmLm9iamVjdERhdGEucmVxdWVzdERhdGFUeXBlLFxuXHRcdFx0XHRcdFx0XHRkYXRhOiBfc2VsZi5vYmplY3REYXRhLnJlcXVlc3REYXRhLFxuXHRcdFx0XHRcdFx0XHRzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSwgdGV4dFN0YXR1cywganFYSFIpIHtcblx0XHRcdFx0XHRcdFx0XHQvLyBVbnNlcmlhbGl6ZSBpZiBkYXRhIGlzIHRyYW5zZmVycmVkIGFzIGpzb25cblx0XHRcdFx0XHRcdFx0XHRpZiAoX3NlbGYub2JqZWN0RGF0YS5yZXF1ZXN0RGF0YVR5cGUgPT09ICdqc29uJykge1xuXHRcdFx0XHRcdFx0XHRcdFx0X3NlbGYub2JqZWN0RGF0YS5kYXRhID0gZGF0YTtcblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0JG9iamVjdC5odG1sKGRhdGEpO1xuXHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRfc2VsZi5fc2hvd0NvbnRlbnQoJG9iamVjdCk7XG5cdFx0XHRcdFx0XHRcdH0sXG5cdFx0XHRcdFx0XHRcdGVycm9yOiBmdW5jdGlvbiAoanFYSFIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3NlbGYuZXJyb3IoKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSlcblx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdmbGFzaCc6XG5cdFx0XHRcdFx0X3NlbGYuX3Nob3dDb250ZW50KCRvYmplY3QpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICd2aWRlbyc6XG5cdFx0XHRcdFx0aWYgKHR5cGVvZigkb2JqZWN0LmdldCgwKS5jYW5QbGF5VHlwZSkgPT09ICdmdW5jdGlvbicgfHwgX3NlbGYub2JqZWN0cy5jYXNlLmZpbmQoJ3ZpZGVvJykubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0XHRfc2VsZi5fc2hvd0NvbnRlbnQoJG9iamVjdCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF9zZWxmLmVycm9yKCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdGlmIChfc2VsZi5vYmplY3REYXRhLnVybCkge1xuXHRcdFx0XHRcdFx0JG9iamVjdC5vbignbG9hZCcsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0X3NlbGYuX3Nob3dDb250ZW50KCRvYmplY3QpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHQkb2JqZWN0Lm9uKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0X3NlbGYuZXJyb3IoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfc2VsZi5lcnJvcigpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogVGhyb3dzIGFuIGVycm9yIG1lc3NhZ2UgaWYgc29tZXRoaW5nIHdlbnQgd3Jvbmdcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdGVycm9yOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRfc2VsZi5vYmplY3REYXRhLnR5cGUgPSAnZXJyb3InO1xuXHRcdFx0dmFyICRvYmplY3QgPSAkKCc8ZGl2IGNsYXNzPVwiJyArIF9zZWxmLnNldHRpbmdzLmNsYXNzUHJlZml4ICsgJ2lubGluZVdyYXBcIj48L2Rpdj4nKTtcblxuXHRcdFx0JG9iamVjdC5odG1sKF9zZWxmLnNldHRpbmdzLmVycm9yTWVzc2FnZSk7XG5cdFx0XHRfc2VsZi5vYmplY3RzLmNvbnRlbnRJbm5lci5odG1sKCRvYmplY3QpO1xuXG5cdFx0XHRfc2VsZi5fc2hvd0NvbnRlbnQoX3NlbGYub2JqZWN0cy5jb250ZW50SW5uZXIpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBDYWxjdWxhdGVzIHRoZSBkaW1lbnNpb25zIHRvIGZpdCBjb250ZW50XG5cdFx0ICpcblx0XHQgKiBAcGFyYW1cdHtvYmplY3R9XHQkb2JqZWN0XG5cdFx0ICogQHJldHVyblx0e3ZvaWR9XG5cdFx0ICovXG5cdFx0X2NhbGN1bGF0ZURpbWVuc2lvbnM6IGZ1bmN0aW9uICgkb2JqZWN0KSB7XG5cdFx0XHRfc2VsZi5fY2xlYW51cERpbWVuc2lvbnMoKTtcblxuXHRcdFx0Ly8gU2V0IGRlZmF1bHQgZGltZW5zaW9uc1xuXHRcdFx0dmFyIGRpbWVuc2lvbnMgPSB7XG5cdFx0XHRcdG9iamVjdFdpZHRoOiAkb2JqZWN0LmF0dHIoJ3dpZHRoJykgPyAkb2JqZWN0LmF0dHIoJ3dpZHRoJykgOiAkb2JqZWN0LmF0dHIoX3NlbGYuX3ByZWZpeEF0dHJpYnV0ZU5hbWUoJ3dpZHRoJykpLFxuXHRcdFx0XHRvYmplY3RIZWlnaHQ6ICRvYmplY3QuYXR0cignaGVpZ2h0JykgPyAkb2JqZWN0LmF0dHIoJ2hlaWdodCcpIDogJG9iamVjdC5hdHRyKF9zZWxmLl9wcmVmaXhBdHRyaWJ1dGVOYW1lKCdoZWlnaHQnKSlcblx0XHRcdH07XG5cblx0XHRcdGlmICghX3NlbGYuc2V0dGluZ3MuZGlzYWJsZVNocmluaykge1xuXHRcdFx0XHQvLyBBZGQgY2FsY3VsYXRlZCBtYXhpbXVtIHdpZHRoL2hlaWdodCB0byBkaW1lbnNpb25zXG5cdFx0XHRcdGRpbWVuc2lvbnMubWF4V2lkdGggPSBwYXJzZUludChfc2VsZi5kaW1lbnNpb25zLndpbmRvd1dpZHRoICogX3NlbGYuc2V0dGluZ3Muc2hyaW5rRmFjdG9yKTtcblx0XHRcdFx0ZGltZW5zaW9ucy5tYXhIZWlnaHQgPSBwYXJzZUludChfc2VsZi5kaW1lbnNpb25zLndpbmRvd0hlaWdodCAqIF9zZWxmLnNldHRpbmdzLnNocmlua0ZhY3Rvcik7XG5cblx0XHRcdFx0Ly8gSWYgdGhlIGF1dG8gY2FsY3VsYXRlZCBtYXhXaWR0aC9tYXhIZWlnaHQgZ3JlYXRoZXIgdGhhbiB0aGUgdXNlcmRlZmluZWQgb25lLCB1c2UgdGhhdC5cblx0XHRcdFx0aWYgKGRpbWVuc2lvbnMubWF4V2lkdGggPiBfc2VsZi5zZXR0aW5ncy5tYXhXaWR0aCkge1xuXHRcdFx0XHRcdGRpbWVuc2lvbnMubWF4V2lkdGggPSBfc2VsZi5zZXR0aW5ncy5tYXhXaWR0aDtcblx0XHRcdFx0fVxuXHRcdFx0XHRpZiAoZGltZW5zaW9ucy5tYXhIZWlnaHQgPiBfc2VsZi5zZXR0aW5ncy5tYXhIZWlnaHQpIHtcblx0XHRcdFx0XHRkaW1lbnNpb25zLm1heEhlaWdodCA9IF9zZWxmLnNldHRpbmdzLm1heEhlaWdodDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENhbGN1bGF0ZSB0aGUgZGlmZmVyZW5jZSBiZXR3ZWVuIHNjcmVlbiB3aWR0aC9oZWlnaHQgYW5kIGltYWdlIHdpZHRoL2hlaWdodFxuXHRcdFx0XHRkaW1lbnNpb25zLmRpZmZlcmVuY2VXaWR0aEFzUGVyY2VudCA9IHBhcnNlSW50KDEwMCAvIGRpbWVuc2lvbnMubWF4V2lkdGggKiBkaW1lbnNpb25zLm9iamVjdFdpZHRoKTtcblx0XHRcdFx0ZGltZW5zaW9ucy5kaWZmZXJlbmNlSGVpZ2h0QXNQZXJjZW50ID0gcGFyc2VJbnQoMTAwIC8gZGltZW5zaW9ucy5tYXhIZWlnaHQgKiBkaW1lbnNpb25zLm9iamVjdEhlaWdodCk7XG5cblx0XHRcdFx0c3dpdGNoIChfc2VsZi5vYmplY3REYXRhLnR5cGUpIHtcblx0XHRcdFx0XHRjYXNlICdpbWFnZSc6XG5cdFx0XHRcdFx0Y2FzZSAnZmxhc2gnOlxuXHRcdFx0XHRcdGNhc2UgJ3ZpZGVvJzpcblx0XHRcdFx0XHRcdGlmIChkaW1lbnNpb25zLmRpZmZlcmVuY2VXaWR0aEFzUGVyY2VudCA+IDEwMCAmJiBkaW1lbnNpb25zLmRpZmZlcmVuY2VXaWR0aEFzUGVyY2VudCA+IGRpbWVuc2lvbnMuZGlmZmVyZW5jZUhlaWdodEFzUGVyY2VudCkge1xuXHRcdFx0XHRcdFx0XHRkaW1lbnNpb25zLm9iamVjdFdpZHRoID0gZGltZW5zaW9ucy5tYXhXaWR0aDtcblx0XHRcdFx0XHRcdFx0ZGltZW5zaW9ucy5vYmplY3RIZWlnaHQgPSBwYXJzZUludChkaW1lbnNpb25zLm9iamVjdEhlaWdodCAvIGRpbWVuc2lvbnMuZGlmZmVyZW5jZVdpZHRoQXNQZXJjZW50ICogMTAwKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChkaW1lbnNpb25zLmRpZmZlcmVuY2VIZWlnaHRBc1BlcmNlbnQgPiAxMDAgJiYgZGltZW5zaW9ucy5kaWZmZXJlbmNlSGVpZ2h0QXNQZXJjZW50ID4gZGltZW5zaW9ucy5kaWZmZXJlbmNlV2lkdGhBc1BlcmNlbnQpIHtcblx0XHRcdFx0XHRcdFx0ZGltZW5zaW9ucy5vYmplY3RXaWR0aCA9IHBhcnNlSW50KGRpbWVuc2lvbnMub2JqZWN0V2lkdGggLyBkaW1lbnNpb25zLmRpZmZlcmVuY2VIZWlnaHRBc1BlcmNlbnQgKiAxMDApO1xuXHRcdFx0XHRcdFx0XHRkaW1lbnNpb25zLm9iamVjdEhlaWdodCA9IGRpbWVuc2lvbnMubWF4SGVpZ2h0O1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGRpbWVuc2lvbnMuZGlmZmVyZW5jZUhlaWdodEFzUGVyY2VudCA+IDEwMCAmJiBkaW1lbnNpb25zLmRpZmZlcmVuY2VXaWR0aEFzUGVyY2VudCA8IGRpbWVuc2lvbnMuZGlmZmVyZW5jZUhlaWdodEFzUGVyY2VudCkge1xuXHRcdFx0XHRcdFx0XHRkaW1lbnNpb25zLm9iamVjdFdpZHRoID0gcGFyc2VJbnQoZGltZW5zaW9ucy5tYXhXaWR0aCAvIGRpbWVuc2lvbnMuZGlmZmVyZW5jZUhlaWdodEFzUGVyY2VudCAqIGRpbWVuc2lvbnMuZGlmZmVyZW5jZVdpZHRoQXNQZXJjZW50KTtcblx0XHRcdFx0XHRcdFx0ZGltZW5zaW9ucy5vYmplY3RIZWlnaHQgPSBkaW1lbnNpb25zLm1heEhlaWdodDtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ2Vycm9yJzpcblx0XHRcdFx0XHRcdGlmICghaXNOYU4oZGltZW5zaW9ucy5vYmplY3RXaWR0aCkgJiYgZGltZW5zaW9ucy5vYmplY3RXaWR0aCA+IGRpbWVuc2lvbnMubWF4V2lkdGgpIHtcblx0XHRcdFx0XHRcdFx0ZGltZW5zaW9ucy5vYmplY3RXaWR0aCA9IGRpbWVuc2lvbnMubWF4V2lkdGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdFx0aWYgKChpc05hTihkaW1lbnNpb25zLm9iamVjdFdpZHRoKSB8fCBkaW1lbnNpb25zLm9iamVjdFdpZHRoID4gZGltZW5zaW9ucy5tYXhXaWR0aCkgJiYgIV9zZWxmLnNldHRpbmdzLmZvcmNlV2lkdGgpIHtcblx0XHRcdFx0XHRcdFx0ZGltZW5zaW9ucy5vYmplY3RXaWR0aCA9IGRpbWVuc2lvbnMubWF4V2lkdGg7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRpZiAoKChpc05hTihkaW1lbnNpb25zLm9iamVjdEhlaWdodCkgJiYgZGltZW5zaW9ucy5vYmplY3RIZWlnaHQgIT09ICdhdXRvJykgfHwgZGltZW5zaW9ucy5vYmplY3RIZWlnaHQgPiBkaW1lbnNpb25zLm1heEhlaWdodCkgJiYgIV9zZWxmLnNldHRpbmdzLmZvcmNlSGVpZ2h0KSB7XG5cdFx0XHRcdFx0XHRcdGRpbWVuc2lvbnMub2JqZWN0SGVpZ2h0ID0gZGltZW5zaW9ucy5tYXhIZWlnaHQ7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX3NlbGYuc2V0dGluZ3MuZm9yY2VXaWR0aCkge1xuXHRcdFx0XHRkaW1lbnNpb25zLm1heFdpZHRoID0gZGltZW5zaW9ucy5vYmplY3RXaWR0aDtcblx0XHRcdH0gZWxzZSBpZiAoJG9iamVjdC5hdHRyKF9zZWxmLl9wcmVmaXhBdHRyaWJ1dGVOYW1lKCdtYXgtd2lkdGgnKSkpIHtcblx0XHRcdFx0ZGltZW5zaW9ucy5tYXhXaWR0aCA9ICAkb2JqZWN0LmF0dHIoX3NlbGYuX3ByZWZpeEF0dHJpYnV0ZU5hbWUoJ21heC13aWR0aCcpKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKF9zZWxmLnNldHRpbmdzLmZvcmNlSGVpZ2h0KSB7XG5cdFx0XHRcdGRpbWVuc2lvbnMubWF4SGVpZ2h0ID0gZGltZW5zaW9ucy5vYmplY3RIZWlnaHQ7XG5cdFx0XHR9IGVsc2UgaWYgKCRvYmplY3QuYXR0cihfc2VsZi5fcHJlZml4QXR0cmlidXRlTmFtZSgnbWF4LWhlaWdodCcpKSkge1xuXHRcdFx0XHRkaW1lbnNpb25zLm1heEhlaWdodCA9ICAkb2JqZWN0LmF0dHIoX3NlbGYuX3ByZWZpeEF0dHJpYnV0ZU5hbWUoJ21heC1oZWlnaHQnKSk7XG5cdFx0XHR9XG5cblx0XHRcdF9zZWxmLl9hZGp1c3REaW1lbnNpb25zKCRvYmplY3QsIGRpbWVuc2lvbnMpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBBZGp1c3RzIHRoZSBkaW1lbnNpb25zXG5cdFx0ICpcblx0XHQgKiBAcGFyYW1cdHtvYmplY3R9XHQkb2JqZWN0XG5cdFx0ICogQHBhcmFtXHR7b2JqZWN0fVx0ZGltZW5zaW9uc1xuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF9hZGp1c3REaW1lbnNpb25zOiBmdW5jdGlvbiAoJG9iamVjdCwgZGltZW5zaW9ucykge1xuXHRcdFx0Ly8gQWRqdXN0IHdpZHRoIGFuZCBoZWlnaHRcblx0XHRcdCRvYmplY3QuY3NzKHtcblx0XHRcdFx0J3dpZHRoJzogZGltZW5zaW9ucy5vYmplY3RXaWR0aCxcblx0XHRcdFx0J2hlaWdodCc6IGRpbWVuc2lvbnMub2JqZWN0SGVpZ2h0LFxuXHRcdFx0XHQnbWF4LXdpZHRoJzogZGltZW5zaW9ucy5tYXhXaWR0aCxcblx0XHRcdFx0J21heC1oZWlnaHQnOiBkaW1lbnNpb25zLm1heEhlaWdodFxuXHRcdFx0fSk7XG5cblx0XHRcdF9zZWxmLm9iamVjdHMuY29udGVudElubmVyLmNzcyh7XG5cdFx0XHRcdCd3aWR0aCc6ICRvYmplY3Qub3V0ZXJXaWR0aCgpLFxuXHRcdFx0XHQnaGVpZ2h0JzogJG9iamVjdC5vdXRlckhlaWdodCgpLFxuXHRcdFx0XHQnbWF4LXdpZHRoJzogJzEwMCUnXG5cdFx0XHR9KTtcblxuXHRcdFx0X3NlbGYub2JqZWN0cy5jYXNlLmNzcyh7XG5cdFx0XHRcdCd3aWR0aCc6IF9zZWxmLm9iamVjdHMuY29udGVudElubmVyLm91dGVyV2lkdGgoKVxuXHRcdFx0fSk7XG5cblx0XHRcdC8vIEFkanVzdCBtYXJnaW5cblx0XHRcdF9zZWxmLm9iamVjdHMuY2FzZS5jc3Moe1xuXHRcdFx0XHQnbWFyZ2luLXRvcCc6IHBhcnNlSW50KC0oX3NlbGYub2JqZWN0cy5jYXNlLm91dGVySGVpZ2h0KCkgLyAyKSksXG5cdFx0XHRcdCdtYXJnaW4tbGVmdCc6IHBhcnNlSW50KC0oX3NlbGYub2JqZWN0cy5jYXNlLm91dGVyV2lkdGgoKSAvIDIpKVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEhhbmRsZXMgdGhlIF9sb2FkaW5nXG5cdFx0ICpcblx0XHQgKiBAcGFyYW1cdHtzdHJpbmd9XHRwcm9jZXNzXG5cdFx0ICogQHJldHVyblx0e3ZvaWR9XG5cdFx0ICovXG5cdFx0X2xvYWRpbmc6IGZ1bmN0aW9uIChwcm9jZXNzKSB7XG5cdFx0XHRpZiAocHJvY2VzcyA9PT0gJ3N0YXJ0Jykge1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLmNhc2UuYWRkQ2xhc3MoX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAnbG9hZGluZycpO1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLmxvYWRpbmcuc2hvdygpO1xuXHRcdFx0fSBlbHNlIGlmIChwcm9jZXNzID09PSAnZW5kJykge1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLmNhc2UucmVtb3ZlQ2xhc3MoX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAnbG9hZGluZycpO1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLmxvYWRpbmcuaGlkZSgpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblxuXHRcdC8qKlxuXHRcdCAqIEdldHMgdGhlIGNsaWVudCBzY3JlZW4gZGltZW5zaW9uc1xuXHRcdCAqXG5cdFx0ICogQHJldHVyblx0e29iamVjdH1cdGRpbWVuc2lvbnNcblx0XHQgKi9cblx0XHRnZXRWaWV3cG9ydERpbWVuc2lvbnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdHdpbmRvd1dpZHRoOiAkKHdpbmRvdykuaW5uZXJXaWR0aCgpLFxuXHRcdFx0XHR3aW5kb3dIZWlnaHQ6ICQod2luZG93KS5pbm5lckhlaWdodCgpXG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBWZXJpZmllcyB0aGUgdXJsXG5cdFx0ICpcblx0XHQgKiBAcGFyYW1cdHtzdHJpbmd9XHRkYXRhVXJsXG5cdFx0ICogQHJldHVyblx0e29iamVjdH1cdGRhdGFVcmxcdENsZWFuIHVybCBmb3IgcHJvY2Vzc2luZyBjb250ZW50XG5cdFx0ICovXG5cdFx0X3ZlcmlmeURhdGFVcmw6IGZ1bmN0aW9uIChkYXRhVXJsKSB7XG5cdFx0XHRpZiAoIWRhdGFVcmwgfHwgZGF0YVVybCA9PT0gdW5kZWZpbmVkIHx8IGRhdGFVcmwgPT09ICcnKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGRhdGFVcmwuaW5kZXhPZignIycpID4gLTEpIHtcblx0XHRcdFx0ZGF0YVVybCA9IGRhdGFVcmwuc3BsaXQoJyMnKTtcblx0XHRcdFx0ZGF0YVVybCA9ICcjJyArIGRhdGFVcmxbZGF0YVVybC5sZW5ndGggLSAxXTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIF9zZWxmLl9ub3JtYWxpemVVcmwoZGF0YVVybC50b1N0cmluZygpKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogVmVyaWZpZXMgdGhlIGRhdGEgdHlwZSBvZiB0aGUgY29udGVudCB0byBsb2FkXG5cdFx0ICpcblx0XHQgKiBAcGFyYW1cdHtzdHJpbmd9XHRcdFx0dXJsXG5cdFx0ICogQHJldHVyblx0e3N0cmluZ3xib29sZWFufVx0QXJyYXkga2V5IGlmIGV4cHJlc3Npb24gbWF0Y2hlZCwgZWxzZSBmYWxzZVxuXHRcdCAqL1xuXHRcdF92ZXJpZnlEYXRhVHlwZTogZnVuY3Rpb24gKHVybCkge1xuXHRcdFx0dmFyIHR5cGVNYXBwaW5nID0gX3NlbGYuc2V0dGluZ3MudHlwZU1hcHBpbmc7XG5cblx0XHRcdC8vIEVhcmx5IGFib3J0IGlmIGRhdGFVcmwgY291bGRuJ3QgYmUgdmVyaWZpZWRcblx0XHRcdGlmICghdXJsKSB7XG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gVmVyaWZ5IHRoZSBkYXRhVHlwZSBvZiB1cmwgYWNjb3JkaW5nIHRvIHR5cGVNYXBwaW5nIHdoaWNoXG5cdFx0XHQvLyBoYXMgYmVlbiBkZWZpbmVkIGluIHNldHRpbmdzLlxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHR5cGVNYXBwaW5nKSB7XG5cdFx0XHRcdGlmICh0eXBlTWFwcGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG5cdFx0XHRcdFx0dmFyIHN1ZmZpeEFyciA9IHR5cGVNYXBwaW5nW2tleV0uc3BsaXQoJywnKTtcblxuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3VmZml4QXJyLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHR2YXIgc3VmZml4ID0gc3VmZml4QXJyW2ldLnRvTG93ZXJDYXNlKCksXG5cdFx0XHRcdFx0XHRcdHJlZ2V4cCA9IG5ldyBSZWdFeHAoJ1xcLignICsgc3VmZml4ICsgJykkJywgJ2knKSxcblx0XHRcdFx0XHRcdFx0Ly8gVmVyaWZ5IG9ubHkgdGhlIGxhc3QgNSBjaGFyYWN0ZXJzIG9mIHRoZSBzdHJpbmdcblx0XHRcdFx0XHRcdFx0c3RyID0gdXJsLnRvTG93ZXJDYXNlKCkuc3BsaXQoJz8nKVswXS5zdWJzdHIoLTUpO1xuXG5cdFx0XHRcdFx0XHRpZiAocmVnZXhwLnRlc3Qoc3RyKSA9PT0gdHJ1ZSB8fCAoa2V5ID09PSAnaW5saW5lJyAmJiAodXJsLmluZGV4T2Yoc3VmZml4KSA+IC0xKSkpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGtleTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgbm8gZXhwcmVzc2lvbiBtYXRjaGVkLCByZXR1cm4gJ2lmcmFtZScuXG5cdFx0XHRyZXR1cm4gJ2lmcmFtZSc7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEV4dGVuZHMgaHRtbCBtYXJrdXAgd2l0aCB0aGUgZXNzZW50aWFsIHRhZ3Ncblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF9hZGRFbGVtZW50czogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKHR5cGVvZiBfc2VsZi5vYmplY3RzLmNhc2UgIT09ICd1bmRlZmluZWQnICYmICQoJyMnICsgX3NlbGYub2JqZWN0cy5jYXNlLmF0dHIoJ2lkJykpLmxlbmd0aCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdF9zZWxmLnNldHRpbmdzLm1hcmt1cCgpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBTaG93cyB0aGUgbG9hZGVkIGNvbnRlbnRcblx0XHQgKlxuXHRcdCAqIEBwYXJhbVx0e29iamVjdH1cdCRvYmplY3Rcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRfc2hvd0NvbnRlbnQ6IGZ1bmN0aW9uICgkb2JqZWN0KSB7XG5cdFx0XHQvLyBBZGQgZGF0YSBhdHRyaWJ1dGUgd2l0aCB0aGUgb2JqZWN0IHR5cGVcblx0XHRcdF9zZWxmLm9iamVjdHMuY2FzZS5hdHRyKF9zZWxmLl9wcmVmaXhBdHRyaWJ1dGVOYW1lKCd0eXBlJyksIF9zZWxmLm9iamVjdERhdGEudHlwZSk7XG5cblx0XHRcdF9zZWxmLmNhY2hlLm9iamVjdCA9ICRvYmplY3Q7XG5cdFx0XHRfc2VsZi5fY2FsY3VsYXRlRGltZW5zaW9ucygkb2JqZWN0KTtcblxuXHRcdFx0Ly8gQ2FsbCBvbkZpbmlzaCBob29rIGZ1bmN0aW9uc1xuXHRcdFx0X3NlbGYuX2NhbGxIb29rcyhfc2VsZi5zZXR0aW5ncy5vbkZpbmlzaCk7XG5cblx0XHRcdHN3aXRjaCAoX3NlbGYuc2V0dGluZ3MudHJhbnNpdGlvbkluKSB7XG5cdFx0XHRcdGNhc2UgJ3Njcm9sbFRvcCc6XG5cdFx0XHRcdGNhc2UgJ3Njcm9sbFJpZ2h0Jzpcblx0XHRcdFx0Y2FzZSAnc2Nyb2xsQm90dG9tJzpcblx0XHRcdFx0Y2FzZSAnc2Nyb2xsTGVmdCc6XG5cdFx0XHRcdGNhc2UgJ3Njcm9sbEhvcml6b250YWwnOlxuXHRcdFx0XHRjYXNlICdzY3JvbGxWZXJ0aWNhbCc6XG5cdFx0XHRcdFx0X3NlbGYudHJhbnNpdGlvbi5zY3JvbGwoX3NlbGYub2JqZWN0cy5jYXNlLCAnaW4nLCBfc2VsZi5zZXR0aW5ncy5zcGVlZEluKTtcblx0XHRcdFx0XHRfc2VsZi50cmFuc2l0aW9uLmZhZGUoX3NlbGYub2JqZWN0cy5jb250ZW50SW5uZXIsICdpbicsIF9zZWxmLnNldHRpbmdzLnNwZWVkSW4pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlICdlbGFzdGljJzpcblx0XHRcdFx0XHRpZiAoX3NlbGYub2JqZWN0cy5jYXNlLmNzcygnb3BhY2l0eScpIDwgMSkge1xuXHRcdFx0XHRcdFx0X3NlbGYudHJhbnNpdGlvbi56b29tKF9zZWxmLm9iamVjdHMuY2FzZSwgJ2luJywgX3NlbGYuc2V0dGluZ3Muc3BlZWRJbik7XG5cdFx0XHRcdFx0XHRfc2VsZi50cmFuc2l0aW9uLmZhZGUoX3NlbGYub2JqZWN0cy5jb250ZW50SW5uZXIsICdpbicsIF9zZWxmLnNldHRpbmdzLnNwZWVkSW4pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0Y2FzZSAnZmFkZSc6XG5cdFx0XHRcdGNhc2UgJ2ZhZGVJbmxpbmUnOlxuXHRcdFx0XHRcdF9zZWxmLnRyYW5zaXRpb24uZmFkZShfc2VsZi5vYmplY3RzLmNhc2UsICdpbicsIF9zZWxmLnNldHRpbmdzLnNwZWVkSW4pO1xuXHRcdFx0XHRcdF9zZWxmLnRyYW5zaXRpb24uZmFkZShfc2VsZi5vYmplY3RzLmNvbnRlbnRJbm5lciwgJ2luJywgX3NlbGYuc2V0dGluZ3Muc3BlZWRJbik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0X3NlbGYudHJhbnNpdGlvbi5mYWRlKF9zZWxmLm9iamVjdHMuY2FzZSwgJ2luJywgMCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cblx0XHRcdC8vIEVuZCBsb2FkaW5nLlxuXHRcdFx0X3NlbGYuX2xvYWRpbmcoJ2VuZCcpO1xuXHRcdFx0X3NlbGYuaXNCdXN5ID0gZmFsc2U7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFByb2Nlc3NlcyB0aGUgY29udGVudCB0byBzaG93XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRfcHJvY2Vzc0NvbnRlbnQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdF9zZWxmLmlzQnVzeSA9IHRydWU7XG5cblx0XHRcdHN3aXRjaCAoX3NlbGYuc2V0dGluZ3MudHJhbnNpdGlvbk91dCkge1xuXHRcdFx0XHRjYXNlICdzY3JvbGxUb3AnOlxuXHRcdFx0XHRjYXNlICdzY3JvbGxSaWdodCc6XG5cdFx0XHRcdGNhc2UgJ3Njcm9sbEJvdHRvbSc6XG5cdFx0XHRcdGNhc2UgJ3Njcm9sbExlZnQnOlxuXHRcdFx0XHRjYXNlICdzY3JvbGxWZXJ0aWNhbCc6XG5cdFx0XHRcdGNhc2UgJ3Njcm9sbEhvcml6b250YWwnOlxuXHRcdFx0XHRcdGlmIChfc2VsZi5vYmplY3RzLmNhc2UuaXMoJzpoaWRkZW4nKSkge1xuXHRcdFx0XHRcdFx0X3NlbGYudHJhbnNpdGlvbi5mYWRlKF9zZWxmLm9iamVjdHMuY2FzZSwgJ291dCcsIDAsIDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0X3NlbGYuX2xvYWRDb250ZW50KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdF9zZWxmLnRyYW5zaXRpb24uZmFkZShfc2VsZi5vYmplY3RzLmNvbnRlbnRJbm5lciwgJ291dCcsIDApO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfc2VsZi50cmFuc2l0aW9uLnNjcm9sbChfc2VsZi5vYmplY3RzLmNhc2UsICdvdXQnLCBfc2VsZi5zZXR0aW5ncy5zcGVlZE91dCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRfc2VsZi5fbG9hZENvbnRlbnQoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnZmFkZSc6XG5cdFx0XHRcdFx0aWYgKF9zZWxmLm9iamVjdHMuY2FzZS5pcygnOmhpZGRlbicpKSB7XG5cdFx0XHRcdFx0XHRfc2VsZi50cmFuc2l0aW9uLmZhZGUoX3NlbGYub2JqZWN0cy5jYXNlLCAnb3V0JywgMCwgMCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRfc2VsZi5fbG9hZENvbnRlbnQoKTtcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRfc2VsZi50cmFuc2l0aW9uLmZhZGUoX3NlbGYub2JqZWN0cy5jYXNlLCAnb3V0JywgX3NlbGYuc2V0dGluZ3Muc3BlZWRPdXQsIDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0X3NlbGYuX2xvYWRDb250ZW50KCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgJ2ZhZGVJbmxpbmUnOlxuXHRcdFx0XHRjYXNlICdlbGFzdGljJzpcblx0XHRcdFx0XHRpZiAoX3NlbGYub2JqZWN0cy5jYXNlLmlzKCc6aGlkZGVuJykpIHtcblx0XHRcdFx0XHRcdF9zZWxmLnRyYW5zaXRpb24uZmFkZShfc2VsZi5vYmplY3RzLmNhc2UsICdvdXQnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdF9zZWxmLl9sb2FkQ29udGVudCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdF9zZWxmLnRyYW5zaXRpb24uZmFkZShfc2VsZi5vYmplY3RzLmNvbnRlbnRJbm5lciwgJ291dCcsIF9zZWxmLnNldHRpbmdzLnNwZWVkT3V0LCAwLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdF9zZWxmLl9sb2FkQ29udGVudCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdF9zZWxmLnRyYW5zaXRpb24uZmFkZShfc2VsZi5vYmplY3RzLmNhc2UsICdvdXQnLCAwLCAwLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRfc2VsZi5fbG9hZENvbnRlbnQoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSGFuZGxlcyBldmVudHMgZm9yIGdhbGxlcnkgYnV0dG9uc1xuXHRcdCAqXG5cdFx0ICogQHJldHVyblx0e3ZvaWR9XG5cdFx0ICovXG5cdFx0X2hhbmRsZUV2ZW50czogZnVuY3Rpb24gKCkge1xuXHRcdFx0X3NlbGYuX3VuYmluZEV2ZW50cygpO1xuXG5cdFx0XHRfc2VsZi5vYmplY3RzLm5hdi5jaGlsZHJlbigpLm5vdChfc2VsZi5vYmplY3RzLmNsb3NlKS5oaWRlKCk7XG5cblx0XHRcdC8vIElmIHNsaWRlc2hvdyBpcyBlbmFibGVkLCBzaG93IHBsYXkvcGF1c2UgYW5kIHN0YXJ0IHRpbWVvdXQuXG5cdFx0XHRpZiAoX3NlbGYuaXNTbGlkZXNob3dFbmFibGVkKCkpIHtcblx0XHRcdFx0Ly8gT25seSBzdGFydCB0aGUgdGltZW91dCBpZiBzbGlkZXNob3cgYXV0b3N0YXJ0IGlzIGVuYWJsZWQgYW5kIHNsaWRlc2hvdyBpcyBub3QgcGF1c2luZ1xuXHRcdFx0XHRpZiAoXG5cdFx0XHRcdFx0KF9zZWxmLnNldHRpbmdzLnNsaWRlc2hvd0F1dG9TdGFydCA9PT0gdHJ1ZSB8fCBfc2VsZi5pc1NsaWRlc2hvd1N0YXJ0ZWQpICYmXG5cdFx0XHRcdFx0IV9zZWxmLm9iamVjdHMubmF2Lmhhc0NsYXNzKF9zZWxmLnNldHRpbmdzLmNsYXNzUHJlZml4ICsgJ3BhdXNlZCcpXG5cdFx0XHRcdCkge1xuXHRcdFx0XHRcdF9zZWxmLl9zdGFydFRpbWVvdXQoKTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRfc2VsZi5fc3RvcFRpbWVvdXQoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX3NlbGYuc2V0dGluZ3MubGl2ZVJlc2l6ZSkge1xuXHRcdFx0XHRfc2VsZi5fd2F0Y2hSZXNpemVJbnRlcmFjdGlvbigpO1xuXHRcdFx0fVxuXG5cdFx0XHRfc2VsZi5vYmplY3RzLmNsb3NlLmNsaWNrKGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRfc2VsZi5jbG9zZSgpO1xuXHRcdFx0fSk7XG5cblx0XHRcdGlmIChfc2VsZi5zZXR0aW5ncy5jbG9zZU9uT3ZlcmxheUNsaWNrID09PSB0cnVlKSB7XG5cdFx0XHRcdF9zZWxmLm9iamVjdHMub3ZlcmxheS5jc3MoJ2N1cnNvcicsICdwb2ludGVyJykuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdF9zZWxmLmNsb3NlKCk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX3NlbGYuc2V0dGluZ3MudXNlS2V5cyA9PT0gdHJ1ZSkge1xuXHRcdFx0XHRfc2VsZi5fYWRkS2V5RXZlbnRzKCk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChfc2VsZi5vYmplY3REYXRhLmlzUGFydE9mU2VxdWVuY2UpIHtcblx0XHRcdFx0X3NlbGYub2JqZWN0cy5uYXYuYXR0cihfc2VsZi5fcHJlZml4QXR0cmlidXRlTmFtZSgnaXNwYXJ0b2ZzZXF1ZW5jZScpLCB0cnVlKTtcblx0XHRcdFx0X3NlbGYub2JqZWN0cy5uYXYuZGF0YSgnaXRlbXMnLCBfc2VsZi5fc2V0TmF2aWdhdGlvbigpKTtcblxuXHRcdFx0XHRfc2VsZi5vYmplY3RzLnByZXYuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuXHRcdFx0XHRcdGlmIChfc2VsZi5zZXR0aW5ncy5uYXZpZ2F0ZUVuZGxlc3MgPT09IHRydWUgfHwgIV9zZWxmLml0ZW0uaXNGaXJzdCgpKSB7XG5cdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLnByZXYudW5iaW5kKCdjbGljaycpO1xuXHRcdFx0XHRcdFx0X3NlbGYuY2FjaGUuYWN0aW9uID0gJ3ByZXYnO1xuXHRcdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5uYXYuZGF0YSgnaXRlbXMnKS5wcmV2LmNsaWNrKCk7XG5cblx0XHRcdFx0XHRcdGlmIChfc2VsZi5pc1NsaWRlc2hvd0VuYWJsZWQoKSkge1xuXHRcdFx0XHRcdFx0XHRfc2VsZi5fc3RvcFRpbWVvdXQoKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0pO1xuXG5cdFx0XHRcdF9zZWxmLm9iamVjdHMubmV4dC5jbGljayhmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG5cdFx0XHRcdFx0aWYgKF9zZWxmLnNldHRpbmdzLm5hdmlnYXRlRW5kbGVzcyA9PT0gdHJ1ZSB8fCAhX3NlbGYuaXRlbS5pc0xhc3QoKSkge1xuXHRcdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5uZXh0LnVuYmluZCgnY2xpY2snKTtcblx0XHRcdFx0XHRcdF9zZWxmLmNhY2hlLmFjdGlvbiA9ICduZXh0Jztcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMubmF2LmRhdGEoJ2l0ZW1zJykubmV4dC5jbGljaygpO1xuXG5cdFx0XHRcdFx0XHRpZiAoX3NlbGYuaXNTbGlkZXNob3dFbmFibGVkKCkpIHtcblx0XHRcdFx0XHRcdFx0X3NlbGYuX3N0b3BUaW1lb3V0KCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9KTtcblxuXHRcdFx0XHRpZiAoX3NlbGYuaXNTbGlkZXNob3dFbmFibGVkKCkpIHtcblx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLnBsYXkuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0X3NlbGYuX3N0YXJ0VGltZW91dCgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdF9zZWxmLm9iamVjdHMucGF1c2UuY2xpY2soZnVuY3Rpb24gKGV2ZW50KSB7XG5cdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0X3NlbGYuX3N0b3BUaW1lb3V0KCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBFbmFibGUgc3dpcGluZyBpZiBhY3RpdmF0ZWRcblx0XHRcdFx0aWYgKF9zZWxmLnNldHRpbmdzLnN3aXBlID09PSB0cnVlKSB7XG5cdFx0XHRcdFx0aWYgKCQuaXNQbGFpbk9iamVjdCgkLmV2ZW50LnNwZWNpYWwuc3dpcGVsZWZ0KSkge1xuXHRcdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5jYXNlLm9uKCdzd2lwZWxlZnQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0XHRcdFx0ZXZlbnQucHJldmVudERlZmF1bHQoKTtcblx0XHRcdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5uZXh0LmNsaWNrKCk7XG5cdFx0XHRcdFx0XHRcdGlmIChfc2VsZi5pc1NsaWRlc2hvd0VuYWJsZWQoKSkge1xuXHRcdFx0XHRcdFx0XHRcdF9zZWxmLl9zdG9wVGltZW91dCgpO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0aWYgKCQuaXNQbGFpbk9iamVjdCgkLmV2ZW50LnNwZWNpYWwuc3dpcGVyaWdodCkpIHtcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMuY2FzZS5vbignc3dpcGVyaWdodCcsIGZ1bmN0aW9uIChldmVudCkge1xuXHRcdFx0XHRcdFx0XHRldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXHRcdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLnByZXYuY2xpY2soKTtcblx0XHRcdFx0XHRcdFx0aWYgKF9zZWxmLmlzU2xpZGVzaG93RW5hYmxlZCgpKSB7XG5cdFx0XHRcdFx0XHRcdFx0X3NlbGYuX3N0b3BUaW1lb3V0KCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBBZGRzIHRoZSBrZXkgZXZlbnRzXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRfYWRkS2V5RXZlbnRzOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKGRvY3VtZW50KS5iaW5kKCdrZXl1cC5saWdodGNhc2UnLCBmdW5jdGlvbiAoZXZlbnQpIHtcblx0XHRcdFx0Ly8gRG8gbm90aGluZyBpZiBsaWdodGNhc2UgaXMgaW4gcHJvY2Vzc1xuXHRcdFx0XHRpZiAoX3NlbGYuaXNCdXN5KSB7XG5cdFx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0c3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG5cdFx0XHRcdFx0Ly8gRXNjYXBlIGtleVxuXHRcdFx0XHRcdGNhc2UgMjc6XG5cdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLmNsb3NlLmNsaWNrKCk7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHQvLyBCYWNrd2FyZCBrZXlcblx0XHRcdFx0XHRjYXNlIDM3OlxuXHRcdFx0XHRcdFx0aWYgKF9zZWxmLm9iamVjdERhdGEuaXNQYXJ0T2ZTZXF1ZW5jZSkge1xuXHRcdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLnByZXYuY2xpY2soKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdC8vIEZvcndhcmQga2V5XG5cdFx0XHRcdFx0Y2FzZSAzOTpcblx0XHRcdFx0XHRcdGlmIChfc2VsZi5vYmplY3REYXRhLmlzUGFydE9mU2VxdWVuY2UpIHtcblx0XHRcdFx0XHRcdFx0X3NlbGYub2JqZWN0cy5uZXh0LmNsaWNrKCk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFN0YXJ0cyB0aGUgc2xpZGVzaG93IHRpbWVvdXRcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF9zdGFydFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdF9zZWxmLmlzU2xpZGVzaG93U3RhcnRlZCA9IHRydWU7XG5cblx0XHRcdF9zZWxmLm9iamVjdHMucGxheS5oaWRlKCk7XG5cdFx0XHRfc2VsZi5vYmplY3RzLnBhdXNlLnNob3coKTtcblxuXHRcdFx0X3NlbGYuY2FjaGUuYWN0aW9uID0gJ25leHQnO1xuXHRcdFx0X3NlbGYub2JqZWN0cy5uYXYucmVtb3ZlQ2xhc3MoX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAncGF1c2VkJyk7XG5cblx0XHRcdF9zZWxmLnRpbWVvdXQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0X3NlbGYub2JqZWN0cy5uYXYuZGF0YSgnaXRlbXMnKS5uZXh0LmNsaWNrKCk7XG5cdFx0XHR9LCBfc2VsZi5zZXR0aW5ncy50aW1lb3V0KTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogU3RvcHMgdGhlIHNsaWRlc2hvdyB0aW1lb3V0XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRfc3RvcFRpbWVvdXQ6IGZ1bmN0aW9uICgpIHtcblx0XHRcdF9zZWxmLm9iamVjdHMucGxheS5zaG93KCk7XG5cdFx0XHRfc2VsZi5vYmplY3RzLnBhdXNlLmhpZGUoKTtcblxuXHRcdFx0X3NlbGYub2JqZWN0cy5uYXYuYWRkQ2xhc3MoX3NlbGYuc2V0dGluZ3MuY2xhc3NQcmVmaXggKyAncGF1c2VkJyk7XG5cblx0XHRcdGNsZWFyVGltZW91dChfc2VsZi50aW1lb3V0KTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogU2V0cyB0aGUgbmF2aWdhdG9yIGJ1dHRvbnMgKHByZXYvbmV4dClcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHtvYmplY3R9XHRpdGVtc1xuXHRcdCAqL1xuXHRcdF9zZXROYXZpZ2F0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgJGxpbmtzID0gJCgoX3NlbGYuY2FjaGUuc2VsZWN0b3IgfHwgX3NlbGYuc2V0dGluZ3MuYXR0cikpLFxuXHRcdFx0XHRzZXF1ZW5jZUxlbmd0aCA9IF9zZWxmLm9iamVjdERhdGEuc2VxdWVuY2VMZW5ndGggLSAxLFxuXHRcdFx0XHRpdGVtcyA9IHtcblx0XHRcdFx0XHRwcmV2OiAkbGlua3MuZXEoX3NlbGYub2JqZWN0RGF0YS5wcmV2SW5kZXgpLFxuXHRcdFx0XHRcdG5leHQ6ICRsaW5rcy5lcShfc2VsZi5vYmplY3REYXRhLm5leHRJbmRleClcblx0XHRcdFx0fTtcblxuXHRcdFx0aWYgKF9zZWxmLm9iamVjdERhdGEuY3VycmVudEluZGV4ID4gMCkge1xuXHRcdFx0XHRfc2VsZi5vYmplY3RzLnByZXYuc2hvdygpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aXRlbXMucHJldkl0ZW0gPSAkbGlua3MuZXEoc2VxdWVuY2VMZW5ndGgpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKF9zZWxmLm9iamVjdERhdGEubmV4dEluZGV4IDw9IHNlcXVlbmNlTGVuZ3RoKSB7XG5cdFx0XHRcdF9zZWxmLm9iamVjdHMubmV4dC5zaG93KCk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRpdGVtcy5uZXh0ID0gJGxpbmtzLmVxKDApO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoX3NlbGYuc2V0dGluZ3MubmF2aWdhdGVFbmRsZXNzID09PSB0cnVlKSB7XG5cdFx0XHRcdF9zZWxmLm9iamVjdHMucHJldi5zaG93KCk7XG5cdFx0XHRcdF9zZWxmLm9iamVjdHMubmV4dC5zaG93KCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpdGVtcztcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogSXRlbSBpbmZvcm1hdGlvbi9zdGF0dXNcblx0XHQgKlxuXHRcdCAqL1xuXHRcdGl0ZW06IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogVmVyaWZpZXMgaWYgdGhlIGN1cnJlbnQgaXRlbSBpcyBmaXJzdCBpdGVtLlxuXHRcdFx0ICpcblx0XHRcdCAqIEByZXR1cm5cdHtib29sZWFufVxuXHRcdFx0ICovXG5cdFx0XHRpc0ZpcnN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiAoX3NlbGYub2JqZWN0RGF0YS5jdXJyZW50SW5kZXggPT09IDApO1xuXHRcdFx0fSxcblxuXHRcdFx0LyoqXG5cdFx0XHQgKiBWZXJpZmllcyBpZiB0aGUgY3VycmVudCBpdGVtIGlzIGxhc3QgaXRlbS5cblx0XHRcdCAqXG5cdFx0XHQgKiBAcmV0dXJuXHR7Ym9vbGVhbn1cblx0XHRcdCAqL1xuXHRcdFx0aXNMYXN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiAoX3NlbGYub2JqZWN0RGF0YS5jdXJyZW50SW5kZXggPT09IChfc2VsZi5vYmplY3REYXRhLnNlcXVlbmNlTGVuZ3RoIC0gMSkpO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBDbG9uZXMgdGhlIG9iamVjdCBmb3IgaW5saW5lIGVsZW1lbnRzXG5cdFx0ICpcblx0XHQgKiBAcGFyYW1cdHtvYmplY3R9XHQkb2JqZWN0XG5cdFx0ICogQHJldHVyblx0e29iamVjdH1cdCRjbG9uZVxuXHRcdCAqL1xuXHRcdF9jbG9uZU9iamVjdDogZnVuY3Rpb24gKCRvYmplY3QpIHtcblx0XHRcdHZhciAkY2xvbmUgPSAkb2JqZWN0LmNsb25lKCksXG5cdFx0XHRcdG9iamVjdElkID0gJG9iamVjdC5hdHRyKCdpZCcpO1xuXG5cdFx0XHQvLyBJZiBlbGVtZW50IGlzIGhpZGRlbiwgY2FjaGUgdGhlIG9iamVjdCBhbmQgcmVtb3ZlXG5cdFx0XHRpZiAoJG9iamVjdC5pcygnOmhpZGRlbicpKSB7XG5cdFx0XHRcdF9zZWxmLl9jYWNoZU9iamVjdERhdGEoJG9iamVjdCk7XG5cdFx0XHRcdCRvYmplY3QuYXR0cignaWQnLCBfc2VsZi5zZXR0aW5ncy5pZFByZWZpeCArICd0ZW1wLScgKyBvYmplY3RJZCkuZW1wdHkoKTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdC8vIFByZXZlbnQgZHVwbGljYXRlZCBpZCdzXG5cdFx0XHRcdCRjbG9uZS5yZW1vdmVBdHRyKCdpZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gJGNsb25lLnNob3coKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogVmVyaWZpZXMgaWYgaXQgaXMgYSBtb2JpbGUgZGV2aWNlXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7Ym9vbGVhbn1cblx0XHQgKi9cblx0XHRpc01vYmlsZURldmljZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGRldmljZUFnZW50ID0gbmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLFxuXHRcdFx0XHRhZ2VudElkID0gZGV2aWNlQWdlbnQubWF0Y2goX3NlbGYuc2V0dGluZ3MubW9iaWxlTWF0Y2hFeHByZXNzaW9uKTtcblxuXHRcdFx0cmV0dXJuIGFnZW50SWQgPyB0cnVlIDogZmFsc2U7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFZlcmlmaWVzIGlmIGNzcyB0cmFuc2l0aW9ucyBhcmUgc3VwcG9ydGVkXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7c3RyaW5nfGJvb2xlYW59XHRUaGUgdHJhbnNpdGlvbiBwcmVmaXggaWYgc3VwcG9ydGVkLCBlbHNlIGZhbHNlLlxuXHRcdCAqL1xuXHRcdGlzVHJhbnNpdGlvblN1cHBvcnRlZDogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyIGJvZHkgPSAkKCdib2R5JykuZ2V0KDApLFxuXHRcdFx0XHRpc1RyYW5zaXRpb25TdXBwb3J0ZWQgPSBmYWxzZSxcblx0XHRcdFx0dHJhbnNpdGlvbk1hcHBpbmcgPSB7XG5cdFx0XHRcdFx0J3RyYW5zaXRpb24nOiAnJyxcblx0XHRcdFx0XHQnV2Via2l0VHJhbnNpdGlvbic6ICctd2Via2l0LScsXG5cdFx0XHRcdFx0J01velRyYW5zaXRpb24nOiAnLW1vei0nLFxuXHRcdFx0XHRcdCdPVHJhbnNpdGlvbic6ICctby0nLFxuXHRcdFx0XHRcdCdNc1RyYW5zaXRpb24nOiAnLW1zLSdcblx0XHRcdFx0fTtcblxuXHRcdFx0Zm9yICh2YXIga2V5IGluIHRyYW5zaXRpb25NYXBwaW5nKSB7XG5cdFx0XHRcdGlmICh0cmFuc2l0aW9uTWFwcGluZy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIGtleSBpbiBib2R5LnN0eWxlKSB7XG5cdFx0XHRcdFx0X3NlbGYuc3VwcG9ydC50cmFuc2l0aW9uID0gdHJhbnNpdGlvbk1hcHBpbmdba2V5XTtcblx0XHRcdFx0XHRpc1RyYW5zaXRpb25TdXBwb3J0ZWQgPSB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBpc1RyYW5zaXRpb25TdXBwb3J0ZWQ7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFRyYW5zaXRpb24gdHlwZXNcblx0XHQgKlxuXHRcdCAqL1xuXHRcdHRyYW5zaXRpb246IHtcblx0XHRcdC8qKlxuXHRcdFx0ICogRmFkZXMgaW4vb3V0IHRoZSBvYmplY3Rcblx0XHRcdCAqXG5cdFx0XHQgKiBAcGFyYW1cdHtvYmplY3R9XHQkb2JqZWN0XG5cdFx0XHQgKiBAcGFyYW1cdHtzdHJpbmd9XHR0eXBlXG5cdFx0XHQgKiBAcGFyYW1cdHtudW1iZXJ9XHRzcGVlZFxuXHRcdFx0ICogQHBhcmFtXHR7bnVtYmVyfVx0b3BhY2l0eVxuXHRcdFx0ICogQHBhcmFtXHR7ZnVuY3Rpb259XHRjYWxsYmFja1xuXHRcdFx0ICogQHJldHVyblx0e3ZvaWR9XHRcdEFuaW1hdGVzIGFuIG9iamVjdFxuXHRcdFx0ICovXG5cdFx0XHRmYWRlOiBmdW5jdGlvbiAoJG9iamVjdCwgdHlwZSwgc3BlZWQsIG9wYWNpdHksIGNhbGxiYWNrKSB7XG5cdFx0XHRcdHZhciBpc0luVHJhbnNpdGlvbiA9IHR5cGUgPT09ICdpbicsXG5cdFx0XHRcdFx0c3RhcnRUcmFuc2l0aW9uID0ge30sXG5cdFx0XHRcdFx0c3RhcnRPcGFjaXR5ID0gJG9iamVjdC5jc3MoJ29wYWNpdHknKSxcblx0XHRcdFx0XHRlbmRUcmFuc2l0aW9uID0ge30sXG5cdFx0XHRcdFx0ZW5kT3BhY2l0eSA9IG9wYWNpdHkgPyBvcGFjaXR5OiBpc0luVHJhbnNpdGlvbiA/IDEgOiAwO1xuXG5cdFx0XHRcdGlmICghX3NlbGYuaXNPcGVuICYmIGlzSW5UcmFuc2l0aW9uKSByZXR1cm47XG5cblx0XHRcdFx0c3RhcnRUcmFuc2l0aW9uWydvcGFjaXR5J10gPSBzdGFydE9wYWNpdHk7XG5cdFx0XHRcdGVuZFRyYW5zaXRpb25bJ29wYWNpdHknXSA9IGVuZE9wYWNpdHk7XG5cblx0XHRcdFx0JG9iamVjdC5jc3Moc3RhcnRUcmFuc2l0aW9uKS5zaG93KCk7XG5cblx0XHRcdFx0Ly8gQ3NzIHRyYW5zaXRpb25cblx0XHRcdFx0aWYgKF9zZWxmLnN1cHBvcnQudHJhbnNpdGlvbnMpIHtcblx0XHRcdFx0XHRlbmRUcmFuc2l0aW9uW19zZWxmLnN1cHBvcnQudHJhbnNpdGlvbiArICd0cmFuc2l0aW9uJ10gPSBzcGVlZCArICdtcyBlYXNlJztcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0JG9iamVjdC5jc3MoZW5kVHJhbnNpdGlvbik7XG5cblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHQkb2JqZWN0LmNzcyhfc2VsZi5zdXBwb3J0LnRyYW5zaXRpb24gKyAndHJhbnNpdGlvbicsICcnKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgJiYgKF9zZWxmLmlzT3BlbiB8fCAhaXNJblRyYW5zaXRpb24pKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSwgc3BlZWQpO1xuXHRcdFx0XHRcdH0sIDE1KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBGYWxsYmFjayB0byBqcyB0cmFuc2l0aW9uXG5cdFx0XHRcdFx0JG9iamVjdC5zdG9wKCk7XG5cdFx0XHRcdFx0JG9iamVjdC5hbmltYXRlKGVuZFRyYW5zaXRpb24sIHNwZWVkLCBjYWxsYmFjayk7XG5cdFx0XHRcdH1cblx0XHRcdH0sXG5cblx0XHRcdC8qKlxuXHRcdFx0ICogU2Nyb2xscyBpbi9vdXQgdGhlIG9iamVjdFxuXHRcdFx0ICpcblx0XHRcdCAqIEBwYXJhbVx0e29iamVjdH1cdCRvYmplY3Rcblx0XHRcdCAqIEBwYXJhbVx0e3N0cmluZ31cdHR5cGVcblx0XHRcdCAqIEBwYXJhbVx0e251bWJlcn1cdHNwZWVkXG5cdFx0XHQgKiBAcGFyYW1cdHtmdW5jdGlvbn1cdGNhbGxiYWNrXG5cdFx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cdFx0QW5pbWF0ZXMgYW4gb2JqZWN0XG5cdFx0XHQgKi9cblx0XHRcdHNjcm9sbDogZnVuY3Rpb24gKCRvYmplY3QsIHR5cGUsIHNwZWVkLCBjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgaXNJblRyYW5zaXRpb24gPSB0eXBlID09PSAnaW4nLFxuXHRcdFx0XHRcdHRyYW5zaXRpb24gPSBpc0luVHJhbnNpdGlvbiA/IF9zZWxmLnNldHRpbmdzLnRyYW5zaXRpb25JbiA6IF9zZWxmLnNldHRpbmdzLnRyYW5zaXRpb25PdXQsXG5cdFx0XHRcdFx0ZGlyZWN0aW9uID0gJ2xlZnQnLFxuXHRcdFx0XHRcdHN0YXJ0VHJhbnNpdGlvbiA9IHt9LFxuXHRcdFx0XHRcdHN0YXJ0T3BhY2l0eSA9IGlzSW5UcmFuc2l0aW9uID8gMCA6IDEsXG5cdFx0XHRcdFx0c3RhcnRPZmZzZXQgPSBpc0luVHJhbnNpdGlvbiA/ICctNTAlJyA6ICc1MCUnLFxuXHRcdFx0XHRcdGVuZFRyYW5zaXRpb24gPSB7fSxcblx0XHRcdFx0XHRlbmRPcGFjaXR5ID0gaXNJblRyYW5zaXRpb24gPyAxIDogMCxcblx0XHRcdFx0XHRlbmRPZmZzZXQgPSBpc0luVHJhbnNpdGlvbiA/ICc1MCUnIDogJy01MCUnO1xuXG5cdFx0XHRcdGlmICghX3NlbGYuaXNPcGVuICYmIGlzSW5UcmFuc2l0aW9uKSByZXR1cm47XG5cblx0XHRcdFx0c3dpdGNoICh0cmFuc2l0aW9uKSB7XG5cdFx0XHRcdFx0Y2FzZSAnc2Nyb2xsVG9wJzpcblx0XHRcdFx0XHRcdGRpcmVjdGlvbiA9ICd0b3AnO1xuXHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0Y2FzZSAnc2Nyb2xsUmlnaHQnOlxuXHRcdFx0XHRcdFx0c3RhcnRPZmZzZXQgPSBpc0luVHJhbnNpdGlvbiA/ICcxNTAlJyA6ICc1MCUnO1xuXHRcdFx0XHRcdFx0ZW5kT2Zmc2V0ID0gaXNJblRyYW5zaXRpb24gPyAnNTAlJyA6ICcxNTAlJztcblx0XHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRcdGNhc2UgJ3Njcm9sbEJvdHRvbSc6XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb24gPSAndG9wJztcblx0XHRcdFx0XHRcdHN0YXJ0T2Zmc2V0ID0gaXNJblRyYW5zaXRpb24gPyAnMTUwJScgOiAnNTAlJztcblx0XHRcdFx0XHRcdGVuZE9mZnNldCA9IGlzSW5UcmFuc2l0aW9uID8gJzUwJScgOiAnMTUwJSc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdzY3JvbGxIb3Jpem9udGFsJzpcblx0XHRcdFx0XHRcdHN0YXJ0T2Zmc2V0ID0gaXNJblRyYW5zaXRpb24gPyAnMTUwJScgOiAnNTAlJztcblx0XHRcdFx0XHRcdGVuZE9mZnNldCA9IGlzSW5UcmFuc2l0aW9uID8gJzUwJScgOiAnLTUwJSc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0XHRjYXNlICdzY3JvbGxWZXJ0aWNhbCc6XG5cdFx0XHRcdFx0XHRkaXJlY3Rpb24gPSAndG9wJztcblx0XHRcdFx0XHRcdHN0YXJ0T2Zmc2V0ID0gaXNJblRyYW5zaXRpb24gPyAnLTUwJScgOiAnNTAlJztcblx0XHRcdFx0XHRcdGVuZE9mZnNldCA9IGlzSW5UcmFuc2l0aW9uID8gJzUwJScgOiAnMTUwJSc7XG5cdFx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmIChfc2VsZi5jYWNoZS5hY3Rpb24gPT09ICdwcmV2Jykge1xuXHRcdFx0XHRcdHN3aXRjaCAodHJhbnNpdGlvbikge1xuXHRcdFx0XHRcdFx0Y2FzZSAnc2Nyb2xsSG9yaXpvbnRhbCc6XG5cdFx0XHRcdFx0XHRcdHN0YXJ0T2Zmc2V0ID0gaXNJblRyYW5zaXRpb24gPyAnLTUwJScgOiAnNTAlJztcblx0XHRcdFx0XHRcdFx0ZW5kT2Zmc2V0ID0gaXNJblRyYW5zaXRpb24gPyAnNTAlJyA6ICcxNTAlJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0XHRjYXNlICdzY3JvbGxWZXJ0aWNhbCc6XG5cdFx0XHRcdFx0XHRcdHN0YXJ0T2Zmc2V0ID0gaXNJblRyYW5zaXRpb24gPyAnMTUwJScgOiAnNTAlJztcblx0XHRcdFx0XHRcdFx0ZW5kT2Zmc2V0ID0gaXNJblRyYW5zaXRpb24gPyAnNTAlJyA6ICctNTAlJztcblx0XHRcdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0c3RhcnRUcmFuc2l0aW9uWydvcGFjaXR5J10gPSBzdGFydE9wYWNpdHk7XG5cdFx0XHRcdHN0YXJ0VHJhbnNpdGlvbltkaXJlY3Rpb25dID0gc3RhcnRPZmZzZXQ7XG5cblx0XHRcdFx0ZW5kVHJhbnNpdGlvblsnb3BhY2l0eSddID0gZW5kT3BhY2l0eTtcblx0XHRcdFx0ZW5kVHJhbnNpdGlvbltkaXJlY3Rpb25dID0gZW5kT2Zmc2V0O1xuXG5cdFx0XHRcdCRvYmplY3QuY3NzKHN0YXJ0VHJhbnNpdGlvbikuc2hvdygpO1xuXG5cdFx0XHRcdC8vIENzcyB0cmFuc2l0aW9uXG5cdFx0XHRcdGlmIChfc2VsZi5zdXBwb3J0LnRyYW5zaXRpb25zKSB7XG5cdFx0XHRcdFx0ZW5kVHJhbnNpdGlvbltfc2VsZi5zdXBwb3J0LnRyYW5zaXRpb24gKyAndHJhbnNpdGlvbiddID0gc3BlZWQgKyAnbXMgZWFzZSc7XG5cblx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdCRvYmplY3QuY3NzKGVuZFRyYW5zaXRpb24pO1xuXG5cdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0JG9iamVjdC5jc3MoX3NlbGYuc3VwcG9ydC50cmFuc2l0aW9uICsgJ3RyYW5zaXRpb24nLCAnJyk7XG5cblx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrICYmIChfc2VsZi5pc09wZW4gfHwgIWlzSW5UcmFuc2l0aW9uKSkge1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrKCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0sIHNwZWVkKTtcblx0XHRcdFx0XHR9LCAxNSk7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Ly8gRmFsbGJhY2sgdG8ganMgdHJhbnNpdGlvblxuXHRcdFx0XHRcdCRvYmplY3Quc3RvcCgpO1xuXHRcdFx0XHRcdCRvYmplY3QuYW5pbWF0ZShlbmRUcmFuc2l0aW9uLCBzcGVlZCwgY2FsbGJhY2spO1xuXHRcdFx0XHR9XG5cdFx0XHR9LFxuXG5cdFx0XHQvKipcblx0XHRcdCAqIFpvb21zIGluL291dCB0aGUgb2JqZWN0XG5cdFx0XHQgKlxuXHRcdFx0ICogQHBhcmFtXHR7b2JqZWN0fVx0JG9iamVjdFxuXHRcdFx0ICogQHBhcmFtXHR7c3RyaW5nfVx0dHlwZVxuXHRcdFx0ICogQHBhcmFtXHR7bnVtYmVyfVx0c3BlZWRcblx0XHRcdCAqIEBwYXJhbVx0e2Z1bmN0aW9ufVx0Y2FsbGJhY2tcblx0XHRcdCAqIEByZXR1cm5cdHt2b2lkfVx0XHRBbmltYXRlcyBhbiBvYmplY3Rcblx0XHRcdCAqL1xuXHRcdFx0em9vbTogZnVuY3Rpb24gKCRvYmplY3QsIHR5cGUsIHNwZWVkLCBjYWxsYmFjaykge1xuXHRcdFx0XHR2YXIgaXNJblRyYW5zaXRpb24gPSB0eXBlID09PSAnaW4nLFxuXHRcdFx0XHRcdHN0YXJ0VHJhbnNpdGlvbiA9IHt9LFxuXHRcdFx0XHRcdHN0YXJ0T3BhY2l0eSA9ICRvYmplY3QuY3NzKCdvcGFjaXR5JyksXG5cdFx0XHRcdFx0c3RhcnRTY2FsZSA9IGlzSW5UcmFuc2l0aW9uID8gJ3NjYWxlKDAuNzUpJyA6ICdzY2FsZSgxKScsXG5cdFx0XHRcdFx0ZW5kVHJhbnNpdGlvbiA9IHt9LFxuXHRcdFx0XHRcdGVuZE9wYWNpdHkgPSBpc0luVHJhbnNpdGlvbiA/IDEgOiAwLFxuXHRcdFx0XHRcdGVuZFNjYWxlID0gaXNJblRyYW5zaXRpb24gPyAnc2NhbGUoMSknIDogJ3NjYWxlKDAuNzUpJztcblxuXHRcdFx0XHRpZiAoIV9zZWxmLmlzT3BlbiAmJiBpc0luVHJhbnNpdGlvbikgcmV0dXJuO1xuXG5cdFx0XHRcdHN0YXJ0VHJhbnNpdGlvblsnb3BhY2l0eSddID0gc3RhcnRPcGFjaXR5O1xuXHRcdFx0XHRzdGFydFRyYW5zaXRpb25bX3NlbGYuc3VwcG9ydC50cmFuc2l0aW9uICsgJ3RyYW5zZm9ybSddID0gc3RhcnRTY2FsZTtcblxuXHRcdFx0XHRlbmRUcmFuc2l0aW9uWydvcGFjaXR5J10gPSBlbmRPcGFjaXR5O1xuXG5cdFx0XHRcdCRvYmplY3QuY3NzKHN0YXJ0VHJhbnNpdGlvbikuc2hvdygpO1xuXG5cdFx0XHRcdC8vIENzcyB0cmFuc2l0aW9uXG5cdFx0XHRcdGlmIChfc2VsZi5zdXBwb3J0LnRyYW5zaXRpb25zKSB7XG5cdFx0XHRcdFx0ZW5kVHJhbnNpdGlvbltfc2VsZi5zdXBwb3J0LnRyYW5zaXRpb24gKyAndHJhbnNmb3JtJ10gPSBlbmRTY2FsZTtcblx0XHRcdFx0XHRlbmRUcmFuc2l0aW9uW19zZWxmLnN1cHBvcnQudHJhbnNpdGlvbiArICd0cmFuc2l0aW9uJ10gPSBzcGVlZCArICdtcyBlYXNlJztcblxuXHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0JG9iamVjdC5jc3MoZW5kVHJhbnNpdGlvbik7XG5cblx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHQkb2JqZWN0LmNzcyhfc2VsZi5zdXBwb3J0LnRyYW5zaXRpb24gKyAndHJhbnNmb3JtJywgJycpO1xuXHRcdFx0XHRcdFx0XHQkb2JqZWN0LmNzcyhfc2VsZi5zdXBwb3J0LnRyYW5zaXRpb24gKyAndHJhbnNpdGlvbicsICcnKTtcblxuXHRcdFx0XHRcdFx0XHRpZiAoY2FsbGJhY2sgJiYgKF9zZWxmLmlzT3BlbiB8fCAhaXNJblRyYW5zaXRpb24pKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y2FsbGJhY2soKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fSwgc3BlZWQpO1xuXHRcdFx0XHRcdH0sIDE1KTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHQvLyBGYWxsYmFjayB0byBqcyB0cmFuc2l0aW9uXG5cdFx0XHRcdFx0JG9iamVjdC5zdG9wKCk7XG5cdFx0XHRcdFx0JG9iamVjdC5hbmltYXRlKGVuZFRyYW5zaXRpb24sIHNwZWVkLCBjYWxsYmFjayk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQ2FsbHMgYWxsIHRoZSByZWdpc3RlcmVkIGZ1bmN0aW9ucyBvZiBhIHNwZWNpZmljIGhvb2tcblx0XHQgKlxuXHRcdCAqIEBwYXJhbVx0e29iamVjdH1cdGhvb2tzXG5cdFx0ICogQHJldHVyblx0e3ZvaWR9XG5cdFx0ICovXG5cdFx0X2NhbGxIb29rczogZnVuY3Rpb24gKGhvb2tzKSB7XG5cdFx0XHRpZiAodHlwZW9mKGhvb2tzKSA9PT0gJ29iamVjdCcpIHtcblx0XHRcdFx0JC5lYWNoKGhvb2tzLCBmdW5jdGlvbihpbmRleCwgaG9vaykge1xuXHRcdFx0XHRcdGlmICh0eXBlb2YoaG9vaykgPT09ICdmdW5jdGlvbicpIHtcblx0XHRcdFx0XHRcdGhvb2suY2FsbChfc2VsZi5vcmlnaW4pO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIENhY2hlcyB0aGUgb2JqZWN0IGRhdGFcblx0XHQgKlxuXHRcdCAqIEBwYXJhbVx0e29iamVjdH1cdCRvYmplY3Rcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRfY2FjaGVPYmplY3REYXRhOiBmdW5jdGlvbiAoJG9iamVjdCkge1xuXHRcdFx0JC5kYXRhKCRvYmplY3QsICdjYWNoZScsIHtcblx0XHRcdFx0aWQ6ICRvYmplY3QuYXR0cignaWQnKSxcblx0XHRcdFx0Y29udGVudDogJG9iamVjdC5odG1sKClcblx0XHRcdH0pO1xuXG5cdFx0XHRfc2VsZi5jYWNoZS5vcmlnaW5hbE9iamVjdCA9ICRvYmplY3Q7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJlc3RvcmVzIHRoZSBvYmplY3QgZnJvbSBjYWNoZVxuXHRcdCAqXG5cdFx0ICogQHJldHVyblx0dm9pZFxuXHRcdCAqL1xuXHRcdF9yZXN0b3JlT2JqZWN0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR2YXIgJG9iamVjdCA9ICQoJ1tpZF49XCInICsgX3NlbGYuc2V0dGluZ3MuaWRQcmVmaXggKyAndGVtcC1cIl0nKTtcblxuXHRcdFx0JG9iamVjdC5hdHRyKCdpZCcsICQuZGF0YShfc2VsZi5jYWNoZS5vcmlnaW5hbE9iamVjdCwgJ2NhY2hlJykuaWQpO1xuXHRcdFx0JG9iamVjdC5odG1sKCQuZGF0YShfc2VsZi5jYWNoZS5vcmlnaW5hbE9iamVjdCwgJ2NhY2hlJykuY29udGVudCk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEV4ZWN1dGVzIGZ1bmN0aW9ucyBmb3IgYSB3aW5kb3cgcmVzaXplLlxuXHRcdCAqIEl0IHN0b3BzIGFuIGV2ZW50dWFsIHRpbWVvdXQgYW5kIHJlY2FsY3VsYXRlcyBkaW1lbnN0aW9ucy5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdHJlc2l6ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKCFfc2VsZi5pc09wZW4pIHJldHVybjtcblxuXHRcdFx0aWYgKF9zZWxmLmlzU2xpZGVzaG93RW5hYmxlZCgpKSB7XG5cdFx0XHRcdF9zZWxmLl9zdG9wVGltZW91dCgpO1xuXHRcdFx0fVxuXG5cdFx0XHRfc2VsZi5kaW1lbnNpb25zID0gX3NlbGYuZ2V0Vmlld3BvcnREaW1lbnNpb25zKCk7XG5cdFx0XHRfc2VsZi5fY2FsY3VsYXRlRGltZW5zaW9ucyhfc2VsZi5jYWNoZS5vYmplY3QpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBDYWNoZXMgdGhlIGFjdHVhbCBzY3JvbGwgY29vcmRpbmF0ZXMuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRfY2FjaGVTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuXHRcdFx0dmFyXHQkd2luZG93ID0gJCh3aW5kb3cpLFxuXHRcdFx0XHQkZG9jdW1lbnQgPSAkKGRvY3VtZW50KSxcblx0XHRcdFx0b2Zmc2V0ID0ge1xuXHRcdFx0XHRcdCd0b3AnOiAkd2luZG93LnNjcm9sbFRvcCgpLFxuXHRcdFx0XHRcdCdsZWZ0JzogICR3aW5kb3cuc2Nyb2xsTGVmdCgpXG5cdFx0XHRcdH07XG5cblx0XHRcdF9zZWxmLmNhY2hlLnNjcm9sbFBvc2l0aW9uID0gX3NlbGYuY2FjaGUuc2Nyb2xsUG9zaXRpb24gfHwge307XG5cblx0XHRcdGlmICghX3NlbGYuX2Fzc2VydENvbnRlbnRJbnZpc2libGUoKSkge1xuXHRcdFx0XHRfc2VsZi5jYWNoZS5jYWNoZVNjcm9sbFBvc2l0aW9uU2tpcHBlZCA9IHRydWU7XG5cdFx0XHR9XG5cdFx0XHRlbHNlIGlmIChfc2VsZi5jYWNoZS5jYWNoZVNjcm9sbFBvc2l0aW9uU2tpcHBlZCkge1xuXHRcdFx0XHRkZWxldGUgX3NlbGYuY2FjaGUuY2FjaGVTY3JvbGxQb3NpdGlvblNraXBwZWQ7XG5cdFx0XHRcdF9zZWxmLl9yZXN0b3JlU2Nyb2xsUG9zaXRpb24oKTtcblx0XHRcdH1cblx0XHRcdGVsc2Uge1xuXHRcdFx0XHRpZiAoJGRvY3VtZW50LndpZHRoKCkgPiAkd2luZG93LndpZHRoKCkpIHtcblx0XHRcdFx0XHRfc2VsZi5jYWNoZS5zY3JvbGxQb3NpdGlvbi5sZWZ0ID0gb2Zmc2V0LmxlZnQ7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKCRkb2N1bWVudC5oZWlnaHQoKSA+ICR3aW5kb3cuaGVpZ2h0KCkpIHtcblx0XHRcdFx0XHRfc2VsZi5jYWNoZS5zY3JvbGxQb3NpdGlvbi50b3AgPSBvZmZzZXQudG9wO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFdhdGNoZXMgZm9yIGFueSByZXNpemUgaW50ZXJhY3Rpb24gYW5kIGNhY2hlcyB0aGUgbmV3IHNpemVzLlxuXHRcdCAqXG5cdFx0ICogQHJldHVyblx0e3ZvaWR9XG5cdFx0ICovXG5cdFx0X3dhdGNoUmVzaXplSW50ZXJhY3Rpb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdCQod2luZG93KS5yZXNpemUoX3NlbGYucmVzaXplKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogU3RvcCB3YXRjaGluZyBhbnkgcmVzaXplIGludGVyYWN0aW9uIHJlbGF0ZWQgdG8gX3NlbGYuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRfdW53YXRjaFJlc2l6ZUludGVyYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKHdpbmRvdykub2ZmKCdyZXNpemUnLCBfc2VsZi5yZXNpemUpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBXYXRjaGVzIGZvciBhbnkgc2Nyb2xsIGludGVyYWN0aW9uIGFuZCBjYWNoZXMgdGhlIG5ldyBwb3NpdGlvbi5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF93YXRjaFNjcm9sbEludGVyYWN0aW9uOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHQkKHdpbmRvdykuc2Nyb2xsKF9zZWxmLl9jYWNoZVNjcm9sbFBvc2l0aW9uKTtcblx0XHRcdCQod2luZG93KS5yZXNpemUoX3NlbGYuX2NhY2hlU2Nyb2xsUG9zaXRpb24pO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBTdG9wIHdhdGNoaW5nIGFueSBzY3JvbGwgaW50ZXJhY3Rpb24gcmVsYXRlZCB0byBfc2VsZi5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF91bndhdGNoU2Nyb2xsSW50ZXJhY3Rpb246IGZ1bmN0aW9uICgpIHtcblx0XHRcdCQod2luZG93KS5vZmYoJ3Njcm9sbCcsIF9zZWxmLl9jYWNoZVNjcm9sbFBvc2l0aW9uKTtcblx0XHRcdCQod2luZG93KS5vZmYoJ3Jlc2l6ZScsIF9zZWxmLl9jYWNoZVNjcm9sbFBvc2l0aW9uKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogRW5zdXJlcyB0aGF0IHNpdGUgY29udGVudCBpcyBpbnZpc2libGUgb3IgaGFzIG5vdCBoZWlnaHQuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7Ym9vbGVhbn1cblx0XHQgKi9cblx0XHRfYXNzZXJ0Q29udGVudEludmlzaWJsZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0cmV0dXJuICQoJCgnYm9keScpLmNoaWxkcmVuKCkubm90KCdbaWQqPScgKyBfc2VsZi5zZXR0aW5ncy5pZFByZWZpeCArICddJykuZ2V0KDApKS5oZWlnaHQoKSA+IDA7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIFJlc3RvcmVzIHRvIHRoZSBvcmlnaW5hbCBzY29sbCBwb3NpdGlvbiBiZWZvcmVcblx0XHQgKiBsaWdodGNhc2UgZ290IGluaXRpYWxpemVkLlxuXHRcdCAqXG5cdFx0ICogQHJldHVyblx0e3ZvaWR9XG5cdFx0ICovXG5cdFx0X3Jlc3RvcmVTY3JvbGxQb3NpdGlvbjogZnVuY3Rpb24gKCkge1xuXHRcdFx0JCh3aW5kb3cpXG5cdFx0XHRcdC5zY3JvbGxUb3AocGFyc2VJbnQoX3NlbGYuY2FjaGUuc2Nyb2xsUG9zaXRpb24udG9wKSlcblx0XHRcdFx0LnNjcm9sbExlZnQocGFyc2VJbnQoX3NlbGYuY2FjaGUuc2Nyb2xsUG9zaXRpb24ubGVmdCkpXG5cdFx0XHRcdC5yZXNpemUoKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogU3dpdGNoZXMgdG8gdGhlIGZ1bGxzY3JlZW4gbW9kZVxuXHRcdCAqXG5cdFx0ICogQHJldHVyblx0e3ZvaWR9XG5cdFx0ICovXG5cdFx0X3N3aXRjaFRvRnVsbFNjcmVlbk1vZGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdF9zZWxmLnNldHRpbmdzLnNocmlua0ZhY3RvciA9IDE7XG5cdFx0XHRfc2VsZi5zZXR0aW5ncy5vdmVybGF5T3BhY2l0eSA9IDE7XG5cblx0XHRcdCQoJ2h0bWwnKS5hZGRDbGFzcyhfc2VsZi5zZXR0aW5ncy5jbGFzc1ByZWZpeCArICdmdWxsU2NyZWVuTW9kZScpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBFbnRlcnMgaW50byB0aGUgbGlnaHRjYXNlIHZpZXdcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF9vcGVuOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRfc2VsZi5pc09wZW4gPSB0cnVlO1xuXG5cdFx0XHRfc2VsZi5zdXBwb3J0LnRyYW5zaXRpb25zID0gX3NlbGYuc2V0dGluZ3MuY3NzVHJhbnNpdGlvbnMgPyBfc2VsZi5pc1RyYW5zaXRpb25TdXBwb3J0ZWQoKSA6IGZhbHNlO1xuXHRcdFx0X3NlbGYuc3VwcG9ydC5tb2JpbGVEZXZpY2UgPSBfc2VsZi5pc01vYmlsZURldmljZSgpO1xuXG5cdFx0XHRpZiAoX3NlbGYuc3VwcG9ydC5tb2JpbGVEZXZpY2UpIHtcblx0XHRcdFx0JCgnaHRtbCcpLmFkZENsYXNzKF9zZWxmLnNldHRpbmdzLmNsYXNzUHJlZml4ICsgJ2lzTW9iaWxlRGV2aWNlJyk7XG5cblx0XHRcdFx0aWYgKF9zZWxmLnNldHRpbmdzLmZ1bGxTY3JlZW5Nb2RlRm9yTW9iaWxlKSB7XG5cdFx0XHRcdFx0X3NlbGYuX3N3aXRjaFRvRnVsbFNjcmVlbk1vZGUoKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKCFfc2VsZi5zZXR0aW5ncy50cmFuc2l0aW9uSW4pIHtcblx0XHRcdFx0X3NlbGYuc2V0dGluZ3MudHJhbnNpdGlvbkluID0gX3NlbGYuc2V0dGluZ3MudHJhbnNpdGlvbjtcblx0XHRcdH1cblx0XHRcdGlmICghX3NlbGYuc2V0dGluZ3MudHJhbnNpdGlvbk91dCkge1xuXHRcdFx0XHRfc2VsZi5zZXR0aW5ncy50cmFuc2l0aW9uT3V0ID0gX3NlbGYuc2V0dGluZ3MudHJhbnNpdGlvbjtcblx0XHRcdH1cblxuXHRcdFx0c3dpdGNoIChfc2VsZi5zZXR0aW5ncy50cmFuc2l0aW9uSW4pIHtcblx0XHRcdFx0Y2FzZSAnZmFkZSc6XG5cdFx0XHRcdGNhc2UgJ2ZhZGVJbmxpbmUnOlxuXHRcdFx0XHRjYXNlICdlbGFzdGljJzpcblx0XHRcdFx0Y2FzZSAnc2Nyb2xsVG9wJzpcblx0XHRcdFx0Y2FzZSAnc2Nyb2xsUmlnaHQnOlxuXHRcdFx0XHRjYXNlICdzY3JvbGxCb3R0b20nOlxuXHRcdFx0XHRjYXNlICdzY3JvbGxMZWZ0Jzpcblx0XHRcdFx0Y2FzZSAnc2Nyb2xsVmVydGljYWwnOlxuXHRcdFx0XHRjYXNlICdzY3JvbGxIb3Jpem9udGFsJzpcblx0XHRcdFx0XHRpZiAoX3NlbGYub2JqZWN0cy5jYXNlLmlzKCc6aGlkZGVuJykpIHtcblx0XHRcdFx0XHRcdF9zZWxmLm9iamVjdHMuY2xvc2UuY3NzKCdvcGFjaXR5JywgMCk7XG5cdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLm92ZXJsYXkuY3NzKCdvcGFjaXR5JywgMCk7XG5cdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLmNhc2UuY3NzKCdvcGFjaXR5JywgMCk7XG5cdFx0XHRcdFx0XHRfc2VsZi5vYmplY3RzLmNvbnRlbnRJbm5lci5jc3MoJ29wYWNpdHknLCAwKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0X3NlbGYudHJhbnNpdGlvbi5mYWRlKF9zZWxmLm9iamVjdHMub3ZlcmxheSwgJ2luJywgX3NlbGYuc2V0dGluZ3Muc3BlZWRJbiwgX3NlbGYuc2V0dGluZ3Mub3ZlcmxheU9wYWNpdHksIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdF9zZWxmLnRyYW5zaXRpb24uZmFkZShfc2VsZi5vYmplY3RzLmNsb3NlLCAnaW4nLCBfc2VsZi5zZXR0aW5ncy5zcGVlZEluKTtcblx0XHRcdFx0XHRcdF9zZWxmLl9oYW5kbGVFdmVudHMoKTtcblx0XHRcdFx0XHRcdF9zZWxmLl9wcm9jZXNzQ29udGVudCgpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRkZWZhdWx0OlxuXHRcdFx0XHRcdF9zZWxmLnRyYW5zaXRpb24uZmFkZShfc2VsZi5vYmplY3RzLm92ZXJsYXksICdpbicsIDAsIF9zZWxmLnNldHRpbmdzLm92ZXJsYXlPcGFjaXR5LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRfc2VsZi50cmFuc2l0aW9uLmZhZGUoX3NlbGYub2JqZWN0cy5jbG9zZSwgJ2luJywgMCk7XG5cdFx0XHRcdFx0XHRfc2VsZi5faGFuZGxlRXZlbnRzKCk7XG5cdFx0XHRcdFx0XHRfc2VsZi5fcHJvY2Vzc0NvbnRlbnQoKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdH1cblxuXHRcdFx0JCgnaHRtbCcpLmFkZENsYXNzKF9zZWxmLnNldHRpbmdzLmNsYXNzUHJlZml4ICsgJ29wZW4nKTtcblx0XHRcdF9zZWxmLm9iamVjdHMuY2FzZS5hdHRyKCdhcmlhLWhpZGRlbicsICdmYWxzZScpO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBFc2NhcGVzIGZyb20gdGhlIGxpZ2h0Y2FzZSB2aWV3XG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRjbG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0X3NlbGYuaXNPcGVuID0gZmFsc2U7XG5cblx0XHRcdGlmIChfc2VsZi5pc1NsaWRlc2hvd0VuYWJsZWQoKSkge1xuXHRcdFx0XHRfc2VsZi5fc3RvcFRpbWVvdXQoKTtcblx0XHRcdFx0X3NlbGYuaXNTbGlkZXNob3dTdGFydGVkID0gZmFsc2U7XG5cdFx0XHRcdF9zZWxmLm9iamVjdHMubmF2LnJlbW92ZUNsYXNzKF9zZWxmLnNldHRpbmdzLmNsYXNzUHJlZml4ICsgJ3BhdXNlZCcpO1xuXHRcdFx0fVxuXG5cdFx0XHRfc2VsZi5vYmplY3RzLmxvYWRpbmcuaGlkZSgpO1xuXG5cdFx0XHRfc2VsZi5fdW5iaW5kRXZlbnRzKCk7XG5cblx0XHRcdF9zZWxmLl91bndhdGNoUmVzaXplSW50ZXJhY3Rpb24oKTtcblx0XHRcdF9zZWxmLl91bndhdGNoU2Nyb2xsSW50ZXJhY3Rpb24oKTtcblxuXHRcdFx0JCgnaHRtbCcpLnJlbW92ZUNsYXNzKF9zZWxmLnNldHRpbmdzLmNsYXNzUHJlZml4ICsgJ29wZW4nKTtcblx0XHRcdF9zZWxmLm9iamVjdHMuY2FzZS5hdHRyKCdhcmlhLWhpZGRlbicsICd0cnVlJyk7XG5cblx0XHRcdF9zZWxmLm9iamVjdHMubmF2LmNoaWxkcmVuKCkuaGlkZSgpO1xuXG5cdFx0XHRfc2VsZi5fcmVzdG9yZVNjcm9sbFBvc2l0aW9uKCk7XG5cblx0XHRcdC8vIENhbGwgb25DbG9zZSBob29rIGZ1bmN0aW9uc1xuXHRcdFx0X3NlbGYuX2NhbGxIb29rcyhfc2VsZi5zZXR0aW5ncy5vbkNsb3NlKTtcblxuXHRcdFx0c3dpdGNoIChfc2VsZi5zZXR0aW5ncy50cmFuc2l0aW9uT3V0KSB7XG5cdFx0XHRcdGNhc2UgJ2ZhZGUnOlxuXHRcdFx0XHRjYXNlICdmYWRlSW5saW5lJzpcblx0XHRcdFx0Y2FzZSAnc2Nyb2xsVG9wJzpcblx0XHRcdFx0Y2FzZSAnc2Nyb2xsUmlnaHQnOlxuXHRcdFx0XHRjYXNlICdzY3JvbGxCb3R0b20nOlxuXHRcdFx0XHRjYXNlICdzY3JvbGxMZWZ0Jzpcblx0XHRcdFx0Y2FzZSAnc2Nyb2xsSG9yaXpvbnRhbCc6XG5cdFx0XHRcdGNhc2UgJ3Njcm9sbFZlcnRpY2FsJzpcblx0XHRcdFx0XHRfc2VsZi50cmFuc2l0aW9uLmZhZGUoX3NlbGYub2JqZWN0cy5jYXNlLCAnb3V0JywgX3NlbGYuc2V0dGluZ3Muc3BlZWRPdXQsIDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdF9zZWxmLnRyYW5zaXRpb24uZmFkZShfc2VsZi5vYmplY3RzLm92ZXJsYXksICdvdXQnLCBfc2VsZi5zZXR0aW5ncy5zcGVlZE91dCwgMCwgZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0XHRfc2VsZi5jbGVhbnVwKCk7XG5cdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSAnZWxhc3RpYyc6XG5cdFx0XHRcdFx0X3NlbGYudHJhbnNpdGlvbi56b29tKF9zZWxmLm9iamVjdHMuY2FzZSwgJ291dCcsIF9zZWxmLnNldHRpbmdzLnNwZWVkT3V0LCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRfc2VsZi50cmFuc2l0aW9uLmZhZGUoX3NlbGYub2JqZWN0cy5vdmVybGF5LCAnb3V0JywgX3NlbGYuc2V0dGluZ3Muc3BlZWRPdXQsIDAsIGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0X3NlbGYuY2xlYW51cCgpO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0X3NlbGYuY2xlYW51cCgpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBVbmJpbmRzIGFsbCBnaXZlbiBldmVudHNcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdF91bmJpbmRFdmVudHM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIFVuYmluZCBvdmVybGF5IGV2ZW50XG5cdFx0XHRfc2VsZi5vYmplY3RzLm92ZXJsYXkudW5iaW5kKCdjbGljaycpO1xuXG5cdFx0XHQvLyBVbmJpbmQga2V5IGV2ZW50c1xuXHRcdFx0JChkb2N1bWVudCkudW5iaW5kKCdrZXl1cC5saWdodGNhc2UnKTtcblxuXHRcdFx0Ly8gVW5iaW5kIHN3aXBlIGV2ZW50c1xuXHRcdFx0X3NlbGYub2JqZWN0cy5jYXNlLnVuYmluZCgnc3dpcGVsZWZ0JykudW5iaW5kKCdzd2lwZXJpZ2h0Jyk7XG5cblx0XHRcdC8vIFVuYmluZCBuYXZpZ2F0b3IgZXZlbnRzXG5cdFx0XHRfc2VsZi5vYmplY3RzLnByZXYudW5iaW5kKCdjbGljaycpO1xuXHRcdFx0X3NlbGYub2JqZWN0cy5uZXh0LnVuYmluZCgnY2xpY2snKTtcblx0XHRcdF9zZWxmLm9iamVjdHMucGxheS51bmJpbmQoJ2NsaWNrJyk7XG5cdFx0XHRfc2VsZi5vYmplY3RzLnBhdXNlLnVuYmluZCgnY2xpY2snKTtcblxuXHRcdFx0Ly8gVW5iaW5kIGNsb3NlIGV2ZW50XG5cdFx0XHRfc2VsZi5vYmplY3RzLmNsb3NlLnVuYmluZCgnY2xpY2snKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQ2xlYW5zIHVwIHRoZSBkaW1lbnNpb25zXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRfY2xlYW51cERpbWVuc2lvbnM6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHZhciBvcGFjaXR5ID0gX3NlbGYub2JqZWN0cy5jb250ZW50SW5uZXIuY3NzKCdvcGFjaXR5Jyk7XG5cblx0XHRcdF9zZWxmLm9iamVjdHMuY2FzZS5jc3Moe1xuXHRcdFx0XHQnd2lkdGgnOiAnJyxcblx0XHRcdFx0J2hlaWdodCc6ICcnLFxuXHRcdFx0XHQndG9wJzogJycsXG5cdFx0XHRcdCdsZWZ0JzogJycsXG5cdFx0XHRcdCdtYXJnaW4tdG9wJzogJycsXG5cdFx0XHRcdCdtYXJnaW4tbGVmdCc6ICcnXG5cdFx0XHR9KTtcblxuXHRcdFx0X3NlbGYub2JqZWN0cy5jb250ZW50SW5uZXIucmVtb3ZlQXR0cignc3R5bGUnKS5jc3MoJ29wYWNpdHknLCBvcGFjaXR5KTtcblx0XHRcdF9zZWxmLm9iamVjdHMuY29udGVudElubmVyLmNoaWxkcmVuKCkucmVtb3ZlQXR0cignc3R5bGUnKTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogQ2xlYW51cCBhZnRlciBhYm9ydGluZyBsaWdodGNhc2Vcblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHt2b2lkfVxuXHRcdCAqL1xuXHRcdGNsZWFudXA6IGZ1bmN0aW9uICgpIHtcblx0XHRcdF9zZWxmLl9jbGVhbnVwRGltZW5zaW9ucygpO1xuXG5cdFx0XHRfc2VsZi5vYmplY3RzLmxvYWRpbmcuaGlkZSgpO1xuXHRcdFx0X3NlbGYub2JqZWN0cy5vdmVybGF5LmhpZGUoKTtcblx0XHRcdF9zZWxmLm9iamVjdHMuY2FzZS5oaWRlKCk7XG5cdFx0XHRfc2VsZi5vYmplY3RzLnByZXYuaGlkZSgpO1xuXHRcdFx0X3NlbGYub2JqZWN0cy5uZXh0LmhpZGUoKTtcblx0XHRcdF9zZWxmLm9iamVjdHMucGxheS5oaWRlKCk7XG5cdFx0XHRfc2VsZi5vYmplY3RzLnBhdXNlLmhpZGUoKTtcblxuXHRcdFx0X3NlbGYub2JqZWN0cy5jYXNlLnJlbW92ZUF0dHIoX3NlbGYuX3ByZWZpeEF0dHJpYnV0ZU5hbWUoJ3R5cGUnKSk7XG5cdFx0XHRfc2VsZi5vYmplY3RzLm5hdi5yZW1vdmVBdHRyKF9zZWxmLl9wcmVmaXhBdHRyaWJ1dGVOYW1lKCdpc3BhcnRvZnNlcXVlbmNlJykpO1xuXG5cdFx0XHRfc2VsZi5vYmplY3RzLmNvbnRlbnRJbm5lci5lbXB0eSgpLmhpZGUoKTtcblx0XHRcdF9zZWxmLm9iamVjdHMuaW5mby5jaGlsZHJlbigpLmVtcHR5KCk7XG5cblx0XHRcdGlmIChfc2VsZi5jYWNoZS5vcmlnaW5hbE9iamVjdCkge1xuXHRcdFx0XHRfc2VsZi5fcmVzdG9yZU9iamVjdCgpO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBDYWxsIG9uQ2xlYW51cCBob29rIGZ1bmN0aW9uc1xuXHRcdFx0X3NlbGYuX2NhbGxIb29rcyhfc2VsZi5zZXR0aW5ncy5vbkNsZWFudXApO1xuXG5cdFx0XHQvLyBSZXN0b3JlIGNhY2hlXG5cdFx0XHRfc2VsZi5jYWNoZSA9IHt9O1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBSZXR1cm5zIHRoZSBzdXBwb3J0ZWQgbWF0Y2ggbWVkaWEgb3IgdW5kZWZpbmVkIGlmIHRoZSBicm93c2VyXG5cdFx0ICogZG9lc24ndCBzdXBwb3J0IG1hdGNoIG1lZGlhLlxuXHRcdCAqXG5cdFx0ICogQHJldHVyblx0e21peGVkfVxuXHRcdCAqL1xuXHRcdF9tYXRjaE1lZGlhOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEgfHwgd2luZG93Lm1zTWF0Y2hNZWRpYTtcblx0XHR9LFxuXG5cdFx0LyoqXG5cdFx0ICogUmV0dXJucyB0aGUgZGV2aWNlUGl4ZWxSYXRpbyBpZiBzdXBwb3J0ZWQuIEVsc2UsIGl0IHNpbXBseSByZXR1cm5zXG5cdFx0ICogMSBhcyB0aGUgZGVmYXVsdC5cblx0XHQgKlxuXHRcdCAqIEByZXR1cm5cdHtudW1iZXJ9XG5cdFx0ICovXG5cdFx0X2RldmljZVBpeGVsUmF0aW86IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbyB8fCAxO1xuXHRcdH0sXG5cblx0XHQvKipcblx0XHQgKiBDaGVja3MgaWYgbWV0aG9kIGlzIHB1YmxpY1xuXHRcdCAqXG5cdFx0ICogQHJldHVyblx0e2Jvb2xlYW59XG5cdFx0ICovXG5cdFx0X2lzUHVibGljTWV0aG9kOiBmdW5jdGlvbiAobWV0aG9kKSB7XG5cdFx0XHRyZXR1cm4gKHR5cGVvZiBfc2VsZlttZXRob2RdID09PSAnZnVuY3Rpb24nICYmIG1ldGhvZC5jaGFyQXQoMCkgIT09ICdfJyk7XG5cdFx0fSxcblxuXHRcdC8qKlxuXHRcdCAqIEV4cG9ydHMgYWxsIHB1YmxpYyBtZXRob2RzIHRvIGJlIGFjY2Vzc2libGUsIGNhbGxhYmxlXG5cdFx0ICogZnJvbSBnbG9iYWwgc2NvcGUuXG5cdFx0ICpcblx0XHQgKiBAcmV0dXJuXHR7dm9pZH1cblx0XHQgKi9cblx0XHRfZXhwb3J0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHR3aW5kb3cubGlnaHRjYXNlID0ge307XG5cblx0XHRcdCQuZWFjaChfc2VsZiwgZnVuY3Rpb24gKHByb3BlcnR5KSB7XG5cdFx0XHRcdGlmIChfc2VsZi5faXNQdWJsaWNNZXRob2QocHJvcGVydHkpKSB7XG5cdFx0XHRcdFx0bGlnaHRjYXNlW3Byb3BlcnR5XSA9IF9zZWxmW3Byb3BlcnR5XTtcblx0XHRcdFx0fVxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xuXG5cdF9zZWxmLl9leHBvcnQoKTtcblxuXHQkLmZuLmxpZ2h0Y2FzZSA9IGZ1bmN0aW9uIChtZXRob2QpIHtcblx0XHQvLyBNZXRob2QgY2FsbGluZyBsb2dpYyAob25seSBwdWJsaWMgbWV0aG9kcyBhcmUgYXBwbGllZClcblx0XHRpZiAoX3NlbGYuX2lzUHVibGljTWV0aG9kKG1ldGhvZCkpIHtcblx0XHRcdHJldHVybiBfc2VsZlttZXRob2RdLmFwcGx5KHRoaXMsIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSkpO1xuXHRcdH0gZWxzZSBpZiAodHlwZW9mIG1ldGhvZCA9PT0gJ29iamVjdCcgfHwgIW1ldGhvZCkge1xuXHRcdFx0cmV0dXJuIF9zZWxmLmluaXQuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0JC5lcnJvcignTWV0aG9kICcgKyBtZXRob2QgKyAnIGRvZXMgbm90IGV4aXN0IG9uIGpRdWVyeS5saWdodGNhc2UnKTtcblx0XHR9XG5cdH07XG59KShqUXVlcnkpO1xuIl0sImZpbGUiOiJsaWdodGNhc2UuanMifQ==
