/*
 * lightboxFu
 *
 * Copyright (c) 2008 Piotr Sarnacki (drogomir.com)
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 */

(function($) {
  $.extend($, {lightBoxFu: {}});
  $.extend($.lightBoxFu, {
    initialize: function () {
      if($('#lightboxfu').length == 0) {
        html = '<div id="lightboxfu"><div id="lOverlay"><div id="lWindow"><div id="lInner"></div></div></div></div>';
		html += '<link href="../stylesheets/lightbox-fu.css" media="screen" rel="Stylesheet" type="text/css" />';
		if ($.browser.msie && $.browser.version == '6.0') {
			html += '<link rel="stylesheet" type="text/css" href="../stylesheets/lightbox-fu-ie6.css" />';
		} else if($.browser.msie && $.browser.version == '7.0') {
			html += '<link rel="stylesheet" type="text/css" href="../stylesheets/lightbox-fu-ie7.css" />';
		}
        $(document.body).append(html);
      }
    },
    open: function(options) {
      options = options || {};
      if(options.html.length>0) {
        $('#lInner').html(options.html);
      }
      $('#lightboxfu').show();
      width = options.width || $('#lighBoxFuImage').width() || '250';
      $('#lInner').css({'width': width});
      
      if(options.closeOnClick != false) {
		$('#lOverlay').one('click', $.lightBoxFu.close);
	  }
    },
    close: function() {
      $('#lightboxfu').hide();
    }
  });
  
  $.extend($.fn, {
	  lightBoxFu: function(options){
		  return this.each(function() {
        $(this).click(function() {
			$.lightBoxFu.open(options);
          return false;
        });
      });
  }});
  
  $(function() {$.lightBoxFu.initialize();});
})(jQuery);

