/*
   Orca Social
   Author: Egarias
   Version: 2.0
   Author URI: http://www.social-hands.com
*/
var server = '/';
var server2 = 'http://server.social-hands.com/';
var serverFrame = 'http://server.social-hands.com/',
	serverData = 'http://eganode.eu01.aws.af.cm';
var scrolled = false;
var commentDetail = '.social-hands-clixd';	
(function($){
	$(document).ready(function () {
		var script = '<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.8.1/mustache.min.js"></script>';
		$('head').append(script);
		var cuenta = 0;
    	$('.social-hands-clixc').each(function () {
    		cuenta++;
	      	var nid = $(this).children().attr('id');
	      	var user = $(this).attr('id');
			var newid = 'orca-socialxc-'+cuenta;
			$(this).attr("id", newid);      	
    		var jqxhr = $.getJSON(server+'orca/reactions/count/'+nid+'/'+user+'/'+cuenta, 
				{format: "json"},
		  		function(data, newid){ $('#orca-socialxc-'+data.id).html(data.html); })	 			
		});

	});
$.fn.inView = function(){
    //Window Object
    var win = $(window);
    //Object to Check
    obj = $(this);
    //the top Scroll Position in the page
    var scrollPosition = win.scrollTop();
    //the end of the visible area in the page, starting from the scroll position
    var visibleArea = win.scrollTop() + win.height();
    //the end of the object to check
    var objEndPos = (obj.offset().top + obj.outerHeight());
    return(visibleArea >= objEndPos && scrollPosition <= objEndPos ? true : false)
};

var cuenta = 0;
var user = url = nid = '';
var scrolled = false;
var framed = false;
$(window).scroll(function(){
	$('.social-hands-clixd').each(function () {
		if (!scrolled) {
			if (!framed) {
				cuenta++;				
				user = $(this).attr('id');
				url = sh_clean_url();
				nid = $(this).children().attr('id'); 
				framed = true;	
				var html = '<div class="comentar"><iframe src="'+serverFrame+'orca/publish/'+user+'/'+nid+'/'+cuenta+'/comment'+'?u='+url+'" width="100%" height="80px" frameborder=0 scrolling="no" id="socialframe"></iframe></div>';
				html += '<div id="orca-socialxd-'+cuenta+'"></div>';
				$(this).html(html);
			}			
			if ($(this).inView()){
				scrolled = true;	
				display_reactions(nid, user, 'FALSE', 0, 20, url, cuenta);
			}		
		}
	});
});

var display_reactions = function(nid, user, force, start, end, url, count){
	var dest = serverData+'/orca/reactions/detail/'+nid+'/'+user+'/'+force+'/'+start+'/'+end+'/'+count+'?u='+url;
	var themedHtml = {counts:"", detail: ""};

	$.ajax({
            url: dest,
            crossDomain: true,
            dataType: "json",
            success: function (response) {
				var mode = "detail";
				themedHtml = buildHtmlCounts(response, mode);
				$('.orca_comments_pager').html('');
				$('#orca-socialxd-1').append(themedHtml);
            },
            error: function (xhr, status) {
				$('.orca_comments_pager').html('');
				$('#orca-socialxd-1').append(themedHtml);
            }
            
        });	      	
}

function buildHtmlCounts(data, mode){
	
	var template = "{{#count}}<div class='shands-count-"+mode+" comment-header'><div class='totalcount'>\
		{{#comments}}<span class='count fbcomment'><span class='shcomment'>{{comments}} comments</span></span>{{/comments}}\
		{{#likes}}<span class='count fblikes'><span class='shlikes'>{{likes}} Likes</span></span>{{/likes}}\
		{{#shares}}<span class='count fbshares'><span class='shshares'>{{shares}} Shares</span></span>{{/shares}}\
		{{#tweets}}<span class='count fbtweets'><span class='shtweets'>{{tweets}} Tweets</span></span>{{/tweets}}\
		</div></div>{{/count}}\
		<ul class='uiList'>{{#detail}}<li class='{{_id}} Li{{type}}'><div id='miid'>\
		<div class='image_link'><img width='50px' height='50px' src='{{data.from.profimage}}' title='{{data.from.name}}' alt='{{data.from.name}}' /></div>\
		<div class='commentbody'>\
		<a class='profileName' href='URLAUT{{type}}{{data.fromid}}'>{{data.from.name}}</a>\
		<span class='commentBody'>{{data.message}}</span><div class='commentDate CLASE{{type}}'>AGO{{created}}</div></div>\
		</div></li>{{/detail}}</ul>";

	var output = Mustache.to_html(template, data);
	output = output.replace(/AGO([0-9]{10})/gm,function(str, p1, offset, s){
		return timeSince(p1);
	});
	output = output.replace(/CLASE([0-9])/gm,function(str, p1, offset, s){
		var clases = ['nulo', 'facebook', 'twitter'];
		return clases[p1];
	});
	output = output.replace(/URLAUT([0-9])([0-9]+)/gm,function(str, p1, p2, offset, s){
		var clases = ['nulo', 'http://www.facebook.com/', 'twitter'];
		return clases[p1] + p2;
	});		
	return output;	
}

  function timeSince(epoch) {
    var secs = ((new Date()).getTime() / 1000) - epoch;
    Math.floor(secs);
    var minutes = secs / 60;
    secs = Math.floor(secs % 60);
    if (minutes < 1) {
        return secs + (secs > 1 ? ' seconds ago' : ' second ago');
    }
    var hours = minutes / 60;
    minutes = Math.floor(minutes % 60);
    if (hours < 1) {
        return minutes + (minutes > 1 ? ' minutes ago' : ' minute ago');
    }
    var days = hours / 24;
    hours = Math.floor(hours % 24);
    if (days < 1) {
        return hours + (hours > 1 ? ' hours ago' : ' hour ago');
    }
    var weeks = days / 7;
    days = Math.floor(days % 7);
    if (weeks < 1) {
        return days + (days > 1 ? ' days ago' : ' day ago');
    }
    var months = weeks / 4.35;
    weeks = Math.floor(weeks % 4.35);
    if (months < 1) {
        return weeks + (weeks > 1 ? ' weeks ago' : ' week ago');
    }
    var years = months / 12;
    months = Math.floor(months % 12);
    if (years < 1) {
        return months + (months > 1 ? ' months ago' : ' month ago');
    }
    years = Math.floor(years);
    return years + (years > 1 ? ' years ago' : ' years ago');
  }
	
function getUrlVars(){
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)    {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

})(jQuery);


window.addEventListener('message', receiveMessage, false);

function receiveMessage(evt)
{
  if (evt.origin === serverFrame)
  {
  	var url = sh_clean_url();
  	var data = evt.data;
  	var n = data.split(',');
    display_reactions(n[1], n[2], 'TRUE', 0, 20, url, n[3]);
  }
}
function sh_clean_url(){
	var url = window.location.href;
	url = url.replace(/#[^\/]*$/g, '');
	url = url.replace(/\?[a-zA-z0-9]*=(.)*$/g, '');
	url = url.replace(/https?:\/\//, '');
	return url;
}
