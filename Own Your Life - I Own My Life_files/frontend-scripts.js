$(document).ready(function(){

	var donotEmail = window.location.pathname.split("/")[1];
    if (donotEmail === "do_not_email") {
      $("body").addClass("unsubscribe-email");
    }
    
	var route = location.pathname.replace(/\//g, '_').substring(1);
	var market = '';

	/*Helps with page specific styling*/
	$('html').addClass(route);

	/*Helps with market specific styling - DO NOT REMOVE*/
	if( $('#MarketId > option[selected="selected"]').length ){
		market = 'market_' + $('#MarketId > option[selected="selected"]').text().split("/> ")[1].toLowerCase().replace(' ', '_');
		$('html').addClass(market);
	}

	var windoWidth = $(window).width();
	if (windoWidth <= 1024) {
		$('.hide_badge').bind('click', badgeToggle);
		$(document).bind('click', badgeNavHide);
		$('.navbar-toggle').bind('click', badgeHide);
	}
	$(window).bind('resize', function(event) {
		var windoWidthChange = $(window).width();
		if (windoWidthChange <= 1024) {
			$('.hide_badge').bind('click', badgeToggle);
			$('.navbar-toggle').bind('click', badgeHide);
		}
	});
	
});

var badgeToggle = function(event){
	$('.navbar-collapse.in').collapse('hide');
	$('.badge_section').slideToggle('fast');
	event.preventDefault();
	event.stopImmediatePropagation();
};

var badgeHide = function(event){
	event.preventDefault();
	$('.badge_section').slideUp('fast');
};

var badgeNavHide = function(event){
	$('.navbar-collapse.in').collapse('hide');
	$('.badge_section').slideUp('fast');
};
$(window).load(function(){
	function disableNav() {
		if ($(".view_presentation .owl-item").length === 0) {
			$(".customNavigation").css("display", "none");
		}
	};
	disableNav();
});