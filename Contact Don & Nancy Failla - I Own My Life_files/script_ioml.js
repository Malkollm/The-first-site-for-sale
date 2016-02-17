var path = location.pathname;
var page = path.substring(1);

/* -- NAV -- */

$(function(){


	//Adding class to current nav item
	var thisPage = $('a[href="' + path + '"]');
	if(path !== '/'){
		$(thisPage).addClass('current-page');
	}

	//Reorganizing elements as needed
	$('.navbar-header > *').wrapAll('<div class="wrapper"></div>');
	$('.navbar-collapse > *').wrapAll('<div class="wrapper"></div>');
	$('.navbar-brand.logo').detach().prependTo('.navbar-collapse .wrapper');
	$('.hide_badge, .badge_section').detach().appendTo('.navbar-collapse .wrapper');
	$('.join_link').detach().prependTo('.navbar-header .wrapper');
	$('#MarketSelector').detach().appendTo('.navbar-header .wrapper');

	//Getting rid of dropdowns
	$('#tabs_section .dropdown').each(function(){
		if( $(this).find('.dropdown-menu li').length == 1 ){
			$(this).children('a').attr('href', $(this).find('.dropdown-menu li a').attr('href')).removeAttr('class aria-expanded data-toggle').find('.caret').remove();
			$(this).removeClass('dropdown');
			$(this).find('.dropdown-menu').remove();
		}
	});

});

$(window).load(function(){

	function disableCustomNav() {
		if ($(".owl-item").length > 0) {
			$(".customNavigation").css("display", "block");
		}
	};
	disableCustomNav();
	
	$('#MarketId-button').click(function(){
		if( !$(this).hasClass('menu-open') ){
			$(this).addClass('menu-open');
			$('.ui-selectmenu-menu').hide();
			var pos = $('#MarketSelector').offset();
			var btnWidth = $('#MarketId-button').width();
			var menuWidth = $('.ui-selectmenu-menu').width();
			$('.ui-selectmenu-menu').css({
				'top' : pos.top + $('#MarketId-button').height() + 15,
				'left' : pos.left - menuWidth + btnWidth,
				'z-index' : '9999999'
			});
			$('.ui-selectmenu-menu').fadeIn(200);
		}else{
			$(this).removeClass('menu-open');
			$('.ui-selectmenu-menu').removeClass('.ui-selectmenu-open').fadeOut(200);
		}
	});

	//Unbinding badge & navbar toggle
	$('.hide_badge').off('click', badgeToggle);
	$(document).off('click', badgeNavHide);

	$('.hide_badge').on('click', modBadgeToggle);
	$(document).on('click', modNavToggle);

});

/* -- END NAV -- */


/* -- HOME PAGE -- */

if( page === '' ){

	$(function(){

		//Reorganizing elements as needed
		$('.page_home #video_player').detach().prependTo('.wrapper.carousel');
		$('<a class="mute-btn" href="javascript:;"><i class="fa fa-volume-up fa-lg"></i></a>').insertAfter('.navbar-toggle');

		//Stellar Parallax 
		$(window).stellar({
			horizontalScrolling: false,
			responsive: true,
			verticalOffset: 1000
		});

		//Muting background video when video button is clicked
		$('.video-overlay-trigger').click(function(){
			// muteVideo();
			muteOverlay();
			$('.navbar-wrapper').fadeOut(500);
			$('.video-overlay').css('top', 0);
			$('.video-overlay').addClass('active');
		});
		$('.video-overlay .overlay-bg').click(function(){
			// muteVideo();
			$('.navbar-wrapper').fadeIn(500);
			$('.video-overlay').css('top', '-100%');
			$('.video-overlay').removeClass('active');
		});
		
		$('.mute-btn').click(function(){
			muteVideo();
		});

	});

	$(window).load(function(){

		//Setting carousel items to be the same height
		var itemHeight = 0;
		$('.carousel .item').each(function(){
			if( $(this).height() > itemHeight ){
				itemHeight = $(this).height();
			}
		});
		$('.carousel .item').height(itemHeight);

		//Turning down initial volume on background video
		$('.bg-video').prop('volume', '0.3');
	});

}

/* -- END HOME PAGE -- */


/* -- OWN YOUR LIFE -- */

if( page == 'own-your-life' ){

	$(function(){

		//Equal height logic for "What Can You Look Forward To" section
		$('.equal-height-wrapper').each(function(){
			var height = 0;
			$(this).find('.equal-height').each(function(){
				if( $(this).height() > height ){
					height = $(this).height();
				}
			});
			$(this).find('.equal-height').height(height);
		});

		//Hover animations in the "What Can You Look Forward To" section
		$('.looking-forward .are .column .panel').hover(
			function(){
				$(this).addClass('active');
				$(this).find('p.good').addClass('visible');
				$(this).find('p.bad').addClass('hidden');
			},
			function(){
				$(this).removeClass('active');
				$(this).find('p.good').removeClass('visible');
				$(this).find('p.bad').removeClass('hidden');
			}
		);

		//"9 Reasons" slider
		var reasonsSlider = $('.nine-reasons .slider .slides');
		if(reasonsSlider.length){
			$(reasonsSlider).owlCarousel({
				singleItem: true
			});
			var instance = $(reasonsSlider).data('owlCarousel');
			$('.nine-reasons .custom-nav .prev').click(function(){
				instance.prev();
			});
			$('.nine-reasons .custom-nav .next').click(function(){
				instance.next();
			});
		}

		//Interest calculator 
		$('.interest-rate .btn').click(function(){
		$('.interest-rate .btn').removeClass('active');
		$(this).addClass('active');
			var interest = $(this).data('interest');
			calcIntIncome(interest);
		});

	});

}

/* -- END OWN YOUR LIFE -- */


/* -- MY STORY -- */
	
if( page == 'contact' ){

	$(function(){

		//Reorganizing elements as needed
		$('#contact-page').prepend('<div class="contact-info grid"><div class="column one-third"></div><div class="column two-thirds"></div></div>');
		$('#profilepic').detach().appendTo('.contact-info .one-third');
		$('.contact_qr_code').detach().appendTo('.contact-info .one-third');
		$('.contact_box.top_section .contact_name_box').detach().appendTo('.contact-info .two-thirds');
		$('.contact_box.top_section .contact_bio_box').detach().appendTo('.contact-info .two-thirds');
		$('.contact_box.bottom_section #box a').detach().appendTo('.contact-info .two-thirds');
	
	});

}

/* -- END MY STORY -- */


/* -- LEARN MORE -- */

if( page == 'survey' ){

	$(function(){

		//This is a temporary fix until the survey page has the responsive template applied.
		$('.navbar-collapse').append('<ul id="tabs_section"><li><a href="/">Home</a></li><li><a href="/own-your-life">Own Your Life</a></li><li><a href="/contact">My Story</a></li><li><a href="/survey">Learn More</a></li></ul>');
	
	});

}

/* -- END LEARN MORE -- */

/* -- HELPER FUNCTIONS -- */

Number.prototype.format = function(n, x) {
	var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\.' : '$') + ')';
	return this.toFixed(Math.max(0, ~~n)).replace(new RegExp(re, 'g'), '$&,');
};

function calcIntIncome(interest){
	var monthly = $('.monthly-payout').find('.row');
	var inBank = $('.in-bank').find('.row');
	for(var i = 0; i<monthly.length; i++){
		var inBankValue = monthly.eq(i).data('monthly') / interest * 12;
		inBank.eq(i).text('$' + inBankValue.format(0,3));
	}
}

function formatCurrency(n){
	n = n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
	return n;
}

function bcMute() {
	console.log('bcMute()');
	if( $('.bg-video').prop('muted') === false ){
		$('.bg-video').prop('muted', true);
	}else if( $('.bg-video').prop('muted') === true ){
		$('.bg-video').prop('muted', false);
	}
}

var modBadgeToggle = function(event){
	$('.navbar-collapse #tabs_section').slideToggle('fast');
	$('.badge_section').slideToggle('fast');
	event.preventDefault();
	event.stopImmediatePropagation();
};

var modNavToggle = function(event){
	if( $('.navbar-collapse').hasClass('in') ){
		$('.navbar-collapse').collapse('hide');
		$('.navbar-collapse #tabs_section, .badge_section').slideUp('fast');
	}else{
		$('.navbar-collapse #tabs_section').slideDown('fast');
	}
};
var muteVideo = function(event){
	var muted = $('.mute-btn').find('i').hasClass('fa-volume-off');
	if(!muted){
		$('.mute-btn i').removeClass('fa-volume-up').addClass('fa-volume-off');
		$('.bg-video').prop('muted', true);
	}
	else{
		$('.mute-btn i').removeClass('fa-volume-off').addClass('fa-volume-up');
		$('.bg-video').prop('muted', false);
	}
};
var muteOverlay = function(event) {
	var muted = $('.mute-btn').find('i').hasClass('fa-volume-off');
	if(!muted){
		$('.mute-btn i').removeClass('fa-volume-up').addClass('fa-volume-off');
		$('.bg-video').prop('muted', true);
	}
}

/* -- END HELPER FUNCTIONS --*/
