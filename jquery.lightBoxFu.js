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
        $(html).appendTo(document.body);
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

