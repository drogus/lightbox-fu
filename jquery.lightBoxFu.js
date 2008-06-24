/*
 * lightboxFu
 *
 * Copyright (c) 2008 Piotr Sarnacki (drogomir.com)
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 */

var test;

(function($) {
  $.extend($, {lightBoxFu: {}});
  $.extend($.lightBoxFu, {
    initialize: function () {
      if($('#lightboxfu').length == 0) {
        element = $.create(
          'div', { 'id':"lightboxfu" }, [
            'div', { 'id':"lOverlay" }, [
              'div', {'id':'lWindow'}, [
                 'div', {'id':'lInner'}, ["jakis tekst"]
              ]
            ]
          ]
        );
        $(element).appendTo(document.body);
        $('#lOverlay').click(function() {
          $.lightBoxFu.close();
        });
      }
      
      $('a[@rel=lightboxfu]').lightBoxFu({image:true});
    },
    open: function(html,options) {
      options = options || {};
      if(html.length>0) {
        $('#lInner').html(html);
      }
      $('#lightboxfu').show();
      width = options.width || $('#lighBoxFuImage').width() || '250';
      $('#lInner').css({'width': width});
      
      
    },
    close: function() {
      $('#lightboxfu').hide();
    }
  });
  
  $.extend($.fn, {
	  lightBoxFu: function(options){
		  return this.each(function() {
        $(this).click(function() {
          $.lightBoxFu.open(options.html);
          return false;
        });
      });
  }});
})(jQuery);
