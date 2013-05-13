/**
 * @author ivazquez
 * @version: 0.1
 */
(function( $ ){
  
	
	$.fn.inlineEditor = function(options) {


		
		function generate_random_char(){
			var chars, newchar, rand;
			chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZ";
			rand = Math.floor(Math.random() * chars.length);
			return newchar = chars.substring(rand, rand + 1);
		}
		
		function generate_random_id(){
			var string;
			string = "sel" + generate_random_char() + generate_random_char() + generate_random_char();
			while ($("#" + string).length > 0) {
				string += generate_random_char();
			}
			return string;
		}
		
		function toggleEdit(btn, editor, viewId, settings) {
			if (!viewId) return ;
			var view = $("#"+viewId);
			if (editor.is(":visible")) {
				$(editor).hide();
				view.show().css('visibility', 'visible');
				btn.show();
				
				if (settings.endEditing && typeof settings.endEditing == 'function') {	
					settings.endEditing(btn, editor, view);
				}else{
					view.find('.inline-editor-view').text($(editor).val());
				}
			}else{
				editor.show()
					.css('font',    view.css('font'))
					.css('border',  view.css('border'))
					.css('padding', view.css('padding'))
					.css('margin',  view.css('margin'))
					.css('height',  view.css('height'))
					.css('width',   view.css('width'))
					.css('background',  view.css('background'))
					.css('position','absolute')
					.offset(view.offset())
					.focus()
					
				if (settings.startEditing && typeof settings.startEditing == 'function') {	
					settings.startEditing(btn, editor, view);
				}else{
					editor.val(view.find('.inline-editor-view').text());
				}
				view.css('visibility', 'hidden');
				editor.focus().val(editor.val());
			}
		}
		
		
	    var settings = $.extend( {
	    	'editor' : '',
	    	'startEditing' : '',
	    	'endEditing' : '',
	    }, options);
	
	    return this.each(function() {
	    	$this = $(this) ;
			if ( $this.size() && ! $this.hasClass('inline-editor-wrapper') ) {
				var $editor = $(options.editor, $this.parent()); 
				$editor.hide();
				var content = $this.html() ;
				$this.addClass('inline-editor-wrapper');
				$this.html('<span class="inline-editor-view">'+content+'</span>');
				$btn = $('<span class="inline-editor-btn"><i class="icon-pencil" /></span> ') ;
				
				if (!$this.attr('id')){
					$this.attr('id', generate_random_id()) ;
				}
				var viewId = $this.attr('id');
				$btn.css('cursor', 'pointer').click(function() {
					toggleEdit( $(this), $editor, viewId ,settings ) ; 
				});
				
				$editor.blur( function(){ 
					toggleEdit($btn,  $(this), viewId, settings);
				}).keypress(function (e) {
					if (e.which == 13) {
						toggleEdit($btn,  $(this), viewId, settings);
					}
				});
				$this.append($btn);
			}
	    });
	};
})( jQuery );
