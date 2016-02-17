// Set global variables
var token = 'Gyco1IL5qBesS8IJ7FcnqV7sugQQyiFiaPA0RLapiN0dxKrJQkjcRw..';
var apiLoc = 'http://api.brightcove.com/services/library';

// Check for Flash
var flashinstalled = 0;

if (navigator.plugins && navigator.plugins.length){
  x = navigator.plugins["Shockwave Flash"];
  if (x){
	 flashinstalled = 1;
  }
  if (navigator.plugins["Shockwave Flash 2.0"]){
	 flashinstalled = 1;
  }
}
else if (navigator.mimeTypes && navigator.mimeTypes.length){
  x = navigator.mimeTypes['application/x-shockwave-flash'];
  if (x && x.enabledPlugin)
	 flashinstalled = 1;
}

// Make a Brightcove API call
function getData(url){
	// Create a script tag
	var script = document.createElement('script');
	script.setAttribute('src', url);
	script.setAttribute('type', 'text/javascript');
	
	// Remove script after use
	script.onload = function() {
		document.getElementsByTagName('head')[0].removeChild(script);
	};
	
	// Insert script
	document.getElementsByTagName('head')[0].appendChild(script);
}

function viewVideos(videoList) {
	// Load all videos
	var command = '?command=find_videos_by_ids&video_ids=' + videoList + '&video_fields=id,thumbnailURL,name,length,shortDescription&callback=buildVideos&media_delivery=http&token=' + token;
	
	getData(apiLoc + command);
}

function buildVideos(pData) {
	// Store as local variable
	var videos = pData.items;
	
	// Set playlist title
	//document.getElementById('content_videos').innerHTML = '<div class="playlistTitle">' + json.items[pId].name + '</div>';
	
	// Create each video item
	for(var i = 0; i < videos.length; i++) {
		document.getElementById('content_videos').innerHTML += '<div class="item" onclick="loadVideo(\'' + videos[i].id + '\')"><div class="container"><img src="' + videos[i].thumbnailURL + '" /></div><div class="right"><div>' + videos[i].name + '</div></div><br class="clear" />';
	}
	$('#player_wrapper').hide();
}

// Play a video
function loadVideo(vId) {
	//loadVideoID(vId);
	document.getElementById('bc_object').innerHTML = '<object id="myExperience" class="BrightcoveExperience"><param name="bgcolor" value="#FFFFFF" /><param name="width" value="'+bc_width+'" /><param name="height" value="'+bc_height+'" /><param name="wmode" value="transparent" /><param name="playerID" value="'+playerId+'" /><param name="playerKey" value="'+playerKey+'" /><param name="isVid" value="true" /><param name="isUI" value="true" /><param name="dynamicStreaming" value="true" /><param name="@videoPlayer" value="'+vId+'" /></object>';
	brightcove.createExperiences();
	//window.scrollTo(0,1); <-- This shouldn't scroll to the top of the page by default. -- Git issue #1166
	track(vId);
}

// Change the layout on orientation change
function updateOrientation(){
	var container = document.getElementById('container');
	
	switch(window.orientation) {
		// Portrait mode
		case 0:
		case 180:
			container.style.minHeight = '313px';
			break;
		// Landscape mode
		case -90:
		case 90:
			container.style.minHeight = '194px';
			break;
	}
}
