//ceebox
/*
 * Ceebox 1.3.3 (minimized using the YUI Online Compressor http://yui.2clics.net/)
 * Requires jQuery 1.3.2 and swfobject.jquery.js plugin to work
 * Code hosted on GitHub (http://github.com/catcubed/CeeBox) Please visit there for version history information
 * By Colin Fahrion (http://www.catcubed.com)
 * Adapted from Thickbox (http://jquery.com/demo/thickbox/) Copyright (c) 2007 Cody Lindley (http://www.codylindley.com)
 * Video pop-up code inspired by Videobox (http://videobox-lb.sourceforge.net/)
 * Copyright (c) 2009 Colin Fahrion
 * Licensed under the MIT License: http://www.opensource.org/licenses/mit-license.php
*/

// BASE SETTINGS - Edit to your liking
// path to loading animationChange base settings below.
var pathToLoadingAnim = "../images/loadinganimation.gif";

// Base Width and Height for html boxes 
// if set to false, size is set automatically by size of browser window. Can be set to a static size (ie, var vidBaseW = 480; var vidBaseH = 359;).
var htmlBaseW = false;
var htmlBaseH = false;
// Base Width and Height for video boxes
// if set to false, size is set automatically by size of browser window. Can be set to a static size (ie, var vidBaseW = 480; var vidBaseH = 359;).
var vidBaseW = false;
var vidBaseH = false;

/*!!!!!!!!!!!!!!!! edit below this line at your own risk !!!!!!!!!!!!!!!!!!!!!!!*/
$(document).ready(function(){cee_init("a.ceebox, area.ceebox, input.ceebox");var a=new Image();a.src=pathToLoadingAnim;if($.browser.opera){$("body").append("<span style='line-height:0px;color:rgba(0,0,0,0)'>lame opera hack</span>")}});function cee_init(a){$(a).click(function(){var c=this.title||this.name||null;var b=this.href||this.alt;var d=this.rel||false;cee_show(c,b,d);this.blur();return false})}function cee_show(n,b,o){try{if(typeof document.body.style.maxHeight==="undefined"){$("html").css("overflow","hidden");if(document.getElementById("cee_HideSelect")===null){$("body").append("<iframe id='cee_HideSelect'></iframe><div id='cee_overlay'></div><div id='cee_window'></div>");$("#cee_overlay").click(cee_remove)}}else{if(document.getElementById("cee_overlay")===null){$("body").append("<div id='cee_overlay'></div><div id='cee_window'></div>");$("#cee_overlay").click(cee_remove)}}(cee_detectMacXFF())?$("#cee_overlay").addClass("cee_overlayMacFFBGHack"):$("#cee_overlay").addClass("cee_overlayBG");if(n===null){n=""}$("body").append("<div id='cee_load'><img src='"+imgLoader.src+"' /></div>");$("#cee_load").show();var c=(b.indexOf("?")!==-1)?b.substr(0,b.indexOf("?")):b;var g=/\.jpg$|\.jpeg$|\.png$|\.gif$|\.bmp$|\.swf$|\.htm$|\.html$|\.asp$|\.aspx$/;var p=c.toLowerCase().match(g);var m=cee_getSize(o,vidBaseW,vidBaseH);var j=cee_getSize(o,htmlBaseW,htmlBaseH);var l=[[(!b.match(/^http:+/)&&(o&&!o.match("iframe")))||(o&&o.match("ajax"))||false,"ajax"],[p==".jpg"||p==".jpeg"||p==".png"||p==".gif"||p==".bmp"||false,"image"],[b.match(/youtube\.com\/watch/i)||false,"youtube"],[b.match(/metacafe\.com\/watch/i)||false,"metacafe"],[b.match(/google\.com\/videoplay/i)||false,"google"],[b.match(/ifilm\.com\/video/i)||false,"ifilm"],[b.match(/vimeo\.com/i)||false,"vimeo"],[b.match(/dailymotion\.com/i)||false,"dailymotion"],[b.match(/facebook\.com\/video/i)||false,"facebook"]];var h=l.length;var d;do{if(l[h-1][0]){var d=l[h-1][1];break}}while(--h);switch(d){case"image":cee_imagegal(b,n,o,g);break;case"facebook":var a="http://www.facebook.com/v/"+b.split("v=")[1].split("&")[0];var f={wmode:"transparent",movie:a,allowFullScreen:"true",allowScriptAccess:"always",flashvars:{autoplay:true}};cee_vidWindow(a,m,n,f);break;case"youtube":var a="http://www.youtube.com/v/"+b.split("v=")[1].split("&")[0]+"&hl=en&fs=1&autoplay=1";var f={wmode:"transparent",allowFullScreen:"true",allowScriptAccess:"always"};cee_vidWindow(a,m,n,f);break;case"metacafe":var a="http://www.metacafe.com/fplayer/"+b.split("id=")[1].split("&")[0]+"/.swf";var f={wmode:"transparent"};cee_vidWindow(a,m,n,f);break;case"google":a="http://video.google.com/googleplayer.swf?docId="+b.split("id=")[1].split("&")[0]+"&hl=en";f={wmode:"transparent",allowFullScreen:"true",allowScriptAccess:"always",flashvars:{autoplay:true,playerMode:"normal",fs:true}};cee_vidWindow(a,m,n,f);break;case"ifilm":a="http://www.ifilm.com/efp";f={wmode:"transparent",flashvars:{flvbaseclip:vidId+"&"}};cee_vidWindow(a,m,n,f);break;case"vimeo":a="http://www.vimeo.com/moogaloop.swf?clip_id="+b.split("/")[3]+"&server=vimeo.com&show_title=1&show_byline=1&show_portrait=0&color=&fullscreen=1";f={wmode:"transparent",allowFullScreen:"true",allowScriptAccess:"always"};cee_vidWindow(a,m,n,f);break;case"dailymotion":a="http://www.dailymotion.com/swf/"+b.split("/")[4]+"&related=0&autoplay=1";f={allowFullScreen:"true",allowScriptAccess:"always"};cee_vidWindow(a,m,n,f);case"ajax":cee_ajaxWindow(b,j,n,o);break;default:cee_iframeWindow(b,j,n,o)}}catch(k){}}function cee_imagegal(a,h,j,d){var f={pCap:"",pUrl:"",pHtml:"",nCap:"",nUrl:"",nHtml:"",count:"",fUrl:false};if(j){var k=$("a[rel="+j+"]").get();var b=k.length;for(var e=0;((e<b)&&(f.nHtml===""));e++){var c=k[e].href.toLowerCase().match(d);if(!(k[e].href==a)){if(f.fUrl){f.nCap=k[e].title;f.nUrl=k[e].href;f.nHtml="<span id='cee_next'>&nbsp;&nbsp;<a href='#'>Next &gt;</a></span>"}else{f.pCap=k[e].title;f.pUrl=k[e].href;f.pHtml="<span id='cee_prev'>&nbsp;&nbsp;<a href='#'>&lt; Prev</a></span>"}}else{f.fUrl=true;f.count="Image "+(e+1)+" of "+(k.length)}}}var g=new Image();g.onload=function(){g.onload=null;var l=cee_getPageSize();var i=l[0]-150;var q=l[1]-150;var m=g.width;var p=g.height;if(m>i){m=i;p=p*(i/m)}if(p>q){m=m*(q/p);p=q}$("#cee_window").append("<a href='' id='cee_ImageOff' title='Close'><img id='cee_Image' src='"+a+"' width='"+m+"' height='"+p+"' alt='"+h+"'/></a><div id='cee_caption'>"+h+"<div id='cee_secondLine'>"+f.count+f.pHtml+f.nHtml+"</div></div><div id='cee_closeWindow'><a href='#' id='cee_closeWindowButton' title='Close'>close</a> or Esc Key</div>");$("#cee_closeWindowButton").click(cee_remove);if(f.pHtml!=""){function o(){document.onkeydown=null;if($(document).unbind("click",o)){$(document).unbind("click",o)}$("#cee_window").remove();$("body").append("<div id='cee_window'></div>");cee_show(f.pCap,f.pUrl,j);return false}$("#cee_prev").click(o)}if(f.nHtml!=""){function n(){document.onkeydown=null;$("#cee_window").remove();$("body").append("<div id='cee_window'></div>");cee_show(f.nCap,f.nUrl,j);return false}$("#cee_next").click(n)}document.onkeydown=function(s){s=s||window.event;var r=s.keyCode||s.which;if(r==27){cee_remove()}else{if(r==190||r==39&&f.nHtml!=""){n()}else{if(r==188||r==37&&f.pHtml!=""){o()}}}};cee_position(m+30,p+60);$("#cee_load").remove();$("#cee_ImageOff").click(cee_remove);$("#cee_window").css({display:"block"})};g.src=a}function cee_ajaxWindow(c,d,b,a){var e=[d[0],d[1]-5];if($("#cee_window").css("display")!="block"){if(a&&a.match("modal")){$("#cee_overlay").unbind();$("#cee_window").append("<div id='cee_ajaxContent' class='cee_modal' style='width:"+e[0]+"px;height:"+e[1]+"px;'></div>")}else{$("#cee_window").append("<div id='cee_title'><div id='cee_ajaxWindowTitle'>"+b+"</div><div id='cee_closeAjaxWindow'><a href='#' id='cee_closeWindowButton'>close</a> or Esc Key</div></div><div id='cee_ajaxContent' style='width:"+e[0]+"px;height:"+e[1]+"px'></div>")}}else{$("#cee_ajaxContent")[0].style.width=e[0]+"px";$("#cee_ajaxContent")[0].style.height=e[1]+"px";$("#cee_ajaxContent")[0].scrollTop=0;$("#cee_ajaxWindowTitle").html(b)}$("#cee_closeWindowButton").click(cee_remove);if(a&&a.match(/#[a-z_A-Z1-9]+/)){targetId=a.match(/#[a-z_A-Z1-9]+/);$("#cee_ajaxContent").load(c+" "+targetId)}else{$("#cee_ajaxContent").load(c)}cee_position(d[0]+30,d[1]+40);$("#cee_load").remove();cee_init("#cee_ajaxContent a.ceebox");$("#cee_window").css({display:"block"});document.onkeyup=function(f){f=f||window.event;(f.keyCode==27||f.which==27)?cee_remove():false}}function cee_iframeWindow(c,d,b,a){var e=[d[0]+29,d[1]+12];$("#cee_iframeContent").remove();if(a&&a.match("modal")){$("#cee_overlay").unbind();$("#cee_window").append("<iframe frameborder='0' hspace='0' src='"+c+"' id='cee_iframeContent' name='cee_iframeContent"+Math.round(Math.random()*1000)+"' onload='cee_showIframe()' style='width:"+e[0]+"px;height:"+e[1]+"px;'> </iframe>")}else{$("#cee_window").append("<div id='cee_title'><div id='cee_ajaxWindowTitle'>"+b+"</div><div id='cee_closeAjaxWindow'><a href='#' id='cee_closeWindowButton' title='Close'>close</a> or Esc Key</div></div><iframe frameborder='0' hspace='0' src='"+c+"' id='cee_iframeContent' name='cee_iframeContent"+Math.round(Math.random()*1000)+"' onload='cee_showIframe()' style='width:"+e[0]+"px;height:"+e[1]+"px;' > </iframe>")}$("#cee_closeWindowButton").click(cee_remove);cee_position(d[0]+30,d[1]+40);if($.browser.safari){$("#cee_load").remove();$("#cee_window").css({display:"block"})}document.onkeyup=function(f){f=f||window.event;(f.keyCode==27||f.which==27)?cee_remove():false}}function cee_showIframe(){$("#cee_load").remove();$("#cee_window").css({display:"block"})}function cee_remove(){$("#cee_imageOff").unbind("click");$("#cee_closeWindowButton").unbind("click");$("#cee_window").fadeOut("fast",function(){$("#cee_window,#cee_overlay,#cee_HideSelect").unbind().trigger("unload").remove()});$("#cee_load").remove();if(typeof document.body.style.maxHeight=="undefined"){$("body","html").css({height:"auto",width:"auto"});$("html").css("overflow","")}document.onkeydown=null;document.onkeyup=null;return false}function cee_position(a,b){$("#cee_window").css({marginLeft:"-"+parseInt((a/2),10)+"px",width:a+"px"});if(!(jQuery.browser.msie&&jQuery.browser.version<7)){$("#cee_window").css({marginTop:"-"+parseInt((b/2),10)+"px"})}}function cee_getSize(a,d,e){var b=cee_getPageSize();(d)?d=d*1:d=b[0]-150;(e)?e=e*1:e=b[1]-150;var c=new Array();if(a&&a.match(/[0-9]+/g)){c=a.match(/[0-9]+/g);c[0]=(c[0])?c[0]*1:d;c[1]=(c[1])?c[1]*1:e}else{c=[d,e]}return c}function cee_vidWindow(a,b,e,d){$("#cee_window").append("<div id='cee_video'></div><div id='cee_caption'>"+e+"</div><div id='cee_closeWindow'><a href='#' id='cee_closeWindowButton' title='Close'>close</a> or Esc Key</div>");$("#cee_closeWindowButton").click(cee_remove);cee_position(b[0]+30,b[1]+60);document.onkeyup=function(c){c=c||window.event;(c.keyCode==27||c.which==27)?cee_remove():false};$("#cee_video").flash({swf:a,width:b[0],height:b[1],params:d});$("#cee_load").remove();$("#cee_window").css({display:"block"})}function cee_getPageSize(){var c=document.documentElement;var a=window.innerWidth||self.innerWidth||(c&&c.clientWidth)||document.body.clientWidth;var b=window.innerHeight||self.innerHeight||(c&&c.clientHeight)||document.body.clientHeight;arrayPageSize=[a,b];return arrayPageSize}function cee_detectMacXFF(){var a=navigator.userAgent.toLowerCase();if(a.indexOf("mac")!=-1&&a.indexOf("firefox")!=-1){return true}};