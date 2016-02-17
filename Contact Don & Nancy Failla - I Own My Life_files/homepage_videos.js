function loadVideoID(id, complete) {
	$('#video_info').html(stripslashes(videoTitles[id]) + "<br><br><div class='video_description'>" + stripslashes(videoDescriptions[id])+"</div>");
	$('.current_video_thumb').addClass('video_thumb').removeClass('current_video_thumb');
	$('.video_thumb_'+id).addClass('current_video_thumb').removeClass('video_thumb');
	$(this).addClass('current_video');
	loadVideo(id);
}

function carouselSetup(visibleCount, startIndex, nextId, prevId, isVertical) {
	jQuery("#carousel").jCarouselLite({
		visible: visibleCount,
		scroll: visibleCount - 1,
		speed: 500,
		start: startIndex,
		vertical: isVertical,
		btnNext: '.nextBtn',
		btnPrev: '.prevBtn',
		circular: false,
		afterEnd: function(visible) {
			if (visible[visibleCount -1].id == nextId) {
				$(".nextBtn").css("visibility", "hidden");
			} else {
				$(".nextBtn").css("visibility", "");
			}
			if (visible[0].id == prevId) {
				$(".prevBtn").css("visibility", "hidden");
			} else {
				$(".prevBtn").css("visibility", "");
			}
		}
	});
}

function stripslashes( str ) {
	return (str+'').replace(/\0/g, '0').replace(/\\([\\'"])/g, '$1');
}

function onTemplateLoaded(pPlayer) {
	player = bcPlayer.getPlayer(pPlayer);

	video = player.getModule(APIModules.VIDEO_PLAYER);

	video.addEventListener("mediaPlay", mediaPlay);
	video.addEventListener("mediaStop", mediaStop);
	video.addEventListener("mediaComplete", playNext);
}



function track(){
	// don't try to track if the video player isn't yet initialized
	if (typeof video != 'object') {
		return false;
	}
	var position = video.getVideoPosition();
	var duration = video.getVideoDuration();
	var percent = Math.round(((position/duration)*100), 2);
	
	var currentVideo = video.getCurrentVideo();
	
	if (typeof currentVideo != 'undefined' && percent > 0) {

		if (typeof presentationSlug === 'undefined') {
			presentationSlug = '';
		}

		var videoId = videoIds[currentVideo.id];
		var url = track_url + "/" + videoId + "/" + videoId + "/" + percent + "/" + presentationSlug;

		jQuery.get(url);
	}
}

function mediaPlay(e) {
	track();
	intervalId = setInterval ( "track()", 10000 ); //Update tracking every 10 seconds while video plays.
}

function mediaStop(e) {
	track();
	clearInterval(intervalId);
}

function playNext(e) {
	var currentVideo = video.getCurrentVideo();
	var nextVideoId = nextVideoIds[currentVideo.id];
	if (typeof nextVideoId != 'undefined') {
		loadVideoID(nextVideoId);
	}
}

