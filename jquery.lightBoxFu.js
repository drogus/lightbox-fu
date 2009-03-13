/*
 * lightboxFu
 *
 * Copyright (c) 2008 Piotr Sarnacki (drogomir.com)
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 */

/*
 * 1. API lightBoxFu:
 *    $.lightBoxFu("jakis tekst", {skin: 'red'});
 *    $.lightBoxFu("jakis tekst"); // skin default
 *    $.lightBoxFu.close();
 *
 * 2. 
 *
 */

(function($) {
  $.lightBoxFu = function(data, options) {
    var self = this;
    // dobre do pokazania na czytelność ??
    options = $.extend({}, $.lightBoxFu.defaultOptions, options);

    $.lightBoxFu.loading(options);
    $.lightBoxFu.open(data, options);
  };

  $.extend($.lightBoxFu, {
    loading: function (options) {
      options = options || {};
      options.skin = options.skin || 'default';
      var lightbox = $(".lightboxfu." + options.skin);

      if(lightbox.length != 0) return 0;

      html = this.skins[options.skin];

      if(!$.data(document.body, "lightboxfu.initialized")) {
        if ($.browser.msie && $.browser.version == '6.0') {
          html += '<link rel="stylesheet" type="text/css" href="'+options.stylesheetsPath+'lightbox-fu-ie6.css" />';
          $('body').css('background', 'url('+options.imagesPath+'blank.gif) fixed');
        } else if($.browser.msie && $.browser.version == '7.0') {
          html += '<link rel="stylesheet" type="text/css" href="'+options.stylesheetsPath+'lightbox-fu-ie7.css" />';
        }
      }

      $.data(document.body, "lightboxfu.initialized", true)

      $('body').append(html);
     	
      $.lightBoxFu.appendStyle(options);
    },
    setDefaults: function(options) {
      $.extend($.lightBoxFu.defaultOptions, options);
    },
    defaultOptions: {
      skin: 'default',
      stylesheetsPath: '/stylesheets/', 
      imagesPath: '/images/'
    },
    open: function(data, options) {
      options = options || {};
      options.skin = options.skin || 'default';
      var lightbox = $(".lightboxfu." + options.skin);

      $('.lInner .content', lightbox).html(data);
      lightbox.show();
      var width = options.width || '250';
      $('.lInner', lightbox).css({'width': width});
      
      if(options.closeOnClick != false) {
        $('.lOverlay', lightbox).one('click', $.lightBoxFu.close);
      }
    },
    close: function() {
      $('.lightboxfu').hide();
    },
    appendStyle: function(options) {
      options = options || {};
      options.skin = options.skin || "default";
      var lightbox = $(".lightboxfu." + options.skin);
		  if(!$.browser.msie) {
			  $('.lOverlay', lightbox).css('background', 'url('+options.imagesPath+'overlay.png) fixed');
		  }
    },
    skins: {
      default: '<div class="lightboxfu default" style="display: none"> \
                  <div class="lOverlay"> \
                    <div class="lWindow"> \
                      <div class="lInner"> \
                        <div class="content"> \
                        </div> \
                      </div> \
                    </div> \
                  </div> \
                </div>',
      red: '<div class="lightboxfu red" style="display: none"> \
                  <div class="lOverlay"> \
                    <div class="lWindow"> \
                      <div class="lInner"> \
                        <div class="header">aaa</div> \
                        <div class="content"> \
                        </div> \
                      </div> \
                    </div> \
                  </div> \
                </div>'
    }
  });
  
  $.extend($.fn, {
	  lightBoxFu: function(data, options){
		  return this.each(function() {
        $(this).click(function() {
			$.lightBoxFu(data, options);
          return false;
        });
      });
  }});
})(jQuery);

