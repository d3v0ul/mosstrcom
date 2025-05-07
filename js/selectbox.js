(function($) {
$(function() {

  $(document).bind('click', function(e) {
		var clicked = $(e.target);
		if (!clicked.parents().hasClass('dropdown')) {
			$('span.selectbox ul.dropdown').hide().find('li.sel').addClass('selected');
			$('span.selectbox').removeClass('focused');
		}
	});

	$('select.selectBlock').each(function() {

		var option = $(this).find('option');
		var optionSelected = $(this).find('option:selected');
		var dropdown = '';
		var selectText = $(this).find('option:first').text();
		if (optionSelected.length) selectText = optionSelected.text();

		for (i = 0; i < option.length; i++) {
			var selected = '';
			var disabled = ' class="disabled"';
			if ( option.eq(i).is(':selected') ) selected = ' class="selected sel"';
			if ( option.eq(i).is(':disabled') ) selected = disabled;
			dropdown += '<li' + selected + '>'+ option.eq(i).text() +'</li>';
		}

		$(this).before(
			'<span class="selectbox" style="display: inline-block; position: relative">'+
				'<span class="select" style="float: left; position: relative; z-index: 0"><span class="text">' + selectText + '</span>'+
					'<b class="trigger"></b>'+
				'</span>'+
				'<ul class="dropdown" style="position: absolute; z-index: 1; overflow: auto; overflow-x: hidden; list-style: none">' + dropdown + '</ul>'+
			'</span>'
		).css({position: 'absolute', left: -9999});

		var ul = $(this).prev().find('ul');
		var selectHeight = $(this).prev().outerHeight();
		if ( ul.css('left') == 'auto' ) ul.css({left: 0});
		if ( ul.css('top') == 'auto' ) ul.css({top: selectHeight});
		var liHeight = ul.find('li').outerHeight();
		var position = ul.css('top');
		ul.hide();

		$(this).prev().find('span.select').click(function() {

			var topOffset = $(this).parent().offset().top;
			var bottomOffset = $(window).height() - selectHeight - (topOffset - $(window).scrollTop());
			if (bottomOffset < 0 || bottomOffset < liHeight * 6)	{
				ul.height('auto').css({top: 'auto', bottom: position});
				if (ul.outerHeight() > topOffset - $(window).scrollTop() - 20 ) {
					ul.height(Math.floor((topOffset - $(window).scrollTop() - 20) / liHeight) * liHeight);
				}
			} else if (bottomOffset > liHeight * 6) {
				ul.height('auto').css({bottom: 'auto', top: position});
				if (ul.outerHeight() > bottomOffset - 20 ) {
					ul.height(Math.floor((bottomOffset - 20) / liHeight) * liHeight);
				}
			}

			$('span.selectbox').css({zIndex: 1}).removeClass('focused');
			if ( $(this).next('ul').is(':hidden') ) {
				$('ul.dropdown:visible').hide();
				$(this).next('ul').show();
			} else {
				$(this).next('ul').hide();
			}
			$(this).parent().css({zIndex: 2});
			return false;
		});

		$(this).prev().find('li:not(.disabled)').hover(function() {
			$(this).siblings().removeClass('selected');
		})
		.click(function() {
			$(this).siblings().removeClass('selected sel').end()
				.addClass('selected sel').parent().hide()
				.prev('span.select').find('span.text').text($(this).text())
			;
			option.removeAttr('selected').eq($(this).index()).attr({selected: 'selected'});
			$(this).parents('span.selectbox').next().change();
		});

		$(this).focus(function() {
			$('span.selectbox').removeClass('focused');
			$(this).prev().addClass('focused');
		})
		.keyup(function() {
			$(this).prev().find('span.text').text($(this).find('option:selected').text()).end()
				.find('li').removeClass('selected sel').eq($(this).find('option:selected').index()).addClass('selected sel')
			;
		});

	});

})
})(jQuery)