$(function(){
	var hTag = $('h1.survey_h').text();
	var split = hTag.split(" - ");

	if($('body').attr('id') == 'full_body_ioml' || $('body').attr('id') == 'full_body_de'){
		$('h1.survey_h').text(split[0]).append('<span class="flavor-title">' + split[1] + '</span>');
		
		$('.survey_h').addClass('wrapper');
		
		$('.survey_container > .box').wrap('<div class="wrapper"></div>');
		$('.survey_container > form > div, .survey_container > form > fieldset').wrapAll('<div class="wrapper"></div>');
		$('#logo, #contact').wrapAll('<div class="navbar-collapse"><div class="wrapper"></div></div>');
		$('.navbar-collapse').before('<div class="navbar-header"><div class="wrapper"><a href="' + joinUrl + '" class="join_link">' + joinText + '</a></div></div>');
		$('.navbar-header, .navbar-collapse').wrapAll('<div class="navbar-wrapper"></div>');
		$('.survey_container').append('<footer><div class="wrapper"></div></footer>');
		$('#stage_footer .float_left').detach().appendTo('.survey_container footer .wrapper');
		$('#google_translate_element').detach().appendTo('.survey_container footer .wrapper');
		$('#footer_spacer').remove();
	}
});