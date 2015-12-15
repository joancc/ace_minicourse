function revertMiniCourse(){loadMiniCourse(refreshPreview)}function publishPrompt(){$("#publishModal").foundation("reveal","open")}function publish(){console.log("PARENT PUBLISH"),generatedHTML=null,MinicoursePublisher.generateHTML({baseURL:"./mini/",baseLevel:maxLevel,js:editor_js.getValue(),formInfo:'<span id="first_name">'+$("#first_name").val().charAt(0).toUpperCase()+$("#first_name").val().slice(1)+'</span> from <span id="city">'+$("#city").val()+'</span><span id="grade" style="display: none;">'+$("#grade").val()+'</span><span id="school" style="display: none;">'+$("#00NU0000005PN7e").val()+'</span><span id="state" style="display: none;">'+$("#state").val()+'</span><span id="country" style="display: none;">'+$("#country").val()+"</span>"},function(e,n){if(e)return void alert("Error generating published HTML: "+e.message);if(generatedHTML=n,console.log("GENERATED HTML"),console.log(generatedHTML),!generatedHTML)return void alert("There was an error publishing your game. Please try again later!");$("#published").hide(),$("#publishing").fadeIn();var o=window.location.hostname.indexOf("code.globaloria.com")>-1?"http://globaloria.com:8000/":"https://hackpub.herokuapp.com/buckets/globaloria/";$.ajax({type:"POST",url:o+"publish",data:{html:generatedHTML},crossDomain:!0,dataType:"json",error:function(){alert("Error publishing HTML!"),console.log(arguments)},success:function(e){$("#published").fadeIn().find("a").attr("href",e["published-url"]).text(e["published-url"]),$("#publish-form input#retUrl").val(e["published-url"]),$("#00NU0000005PN7t").val(e["published-url"]);var n=[];$("#isStudent").prop("checked")&&n.push($("#isStudent").val()),$("#isTeacher").prop("checked")&&n.push($("#isTeacher").val()),$("#isParent").prop("checked")&&n.push($("#isParent").val()),$("#isAdministrator").prop("checked")&&n.push($("#isAdministrator").val()),$("#00NU0000005Ph2K").val(n.join(",")),$("#publish-form").unbind().submit()},complete:function(){$("#publishing").hide()}})})}function loadMiniCourse(cb){cb=cb||function(){},console.log("Loading mini course template");var zeroPaddedLevel=currentLevel<10?"0"+currentLevel:currentLevel;"true"==window.sessionStorage.skipToSandbox&&(zeroPaddedLevel=maxLevel),$.get("mini/levels/"+zeroPaddedLevel+".js",function(data){var markHints=[],readOnlyTokens=[],readOnlyRanges=[],foldedRanges=[],currLineNumber=0,currIndentation=0,editorTooltips=[],editorCommands={markHint:function(){markHints.push(arguments)},readOnlyToken:function(){readOnlyTokens.push(arguments)},beginReadOnly:function(){readOnlyRanges.push([currLineNumber])},endReadOnly:function(){var e=readOnlyRanges[readOnlyRanges.length-1];e.push(currLineNumber)},beginCodeFold:function(e){foldedRanges.push({begin:currLineNumber,indentation:currIndentation,linkText:e||"More…"})},endCodeFold:function(){var e=foldedRanges[foldedRanges.length-1];e.end=currLineNumber},insertTooltip:function(){editorTooltips.push(arguments)}};console.log("Course retrieved: "),console.log(data),data=data.replace(/\r\n/g,"\n"),data=data.replace(/}\n*$/,"\n\n\n\n\n\n\n\n\n\n}\n"),data=data.split("\n").filter(function(line){var match=line.match(/(\s*)\/\/\s*EDITOR:(.*)/);if(!match)return currLineNumber++,!0;with(currIndentation=match[1],editorCommands)console.log("Executing editor command: "+match[2]),eval(match[2]);return!1}).join("\n"),originalEditorContent=data,editor_js.setValue(data),readOnlyRanges.push([0,1]),readOnlyRanges.push([editor_js.lineCount()-2,editor_js.lineCount()]),readOnlyRanges.forEach(function(e){editor_js.markText({line:e[0],ch:0},{line:e[1],ch:0},{className:"js-read-only",readOnly:!0})}),readOnlyTokens.forEach(function(e){readOnlyToken.apply(this,e)}),markHints.forEach(function(e){markHint.apply(this,e)}),$("#js_editor").removeClass("show-js-hints"),markHints.length?$("#showHints").show():$("#showHints").hide(),foldedRanges.forEach(function(e){var n={line:e.begin,ch:0},o=$('<span class="cm-comment">'+e.indentation+"// </span>");$('<span class="js-code-fold-link"></span>').text(e.linkText).appendTo(o),editor_js.foldCode(n,{widget:o[0],rangeFinder:function(o,t){return{from:n,to:{line:e.end-1,ch:editor_js.getLine(e.end-1).length}}}})}),editorTooltips.forEach(function(e){insertEditoTooltip.apply(this,e)}),cb()}),storage.set("currentLevel",currentLevel),document.getElementById("preview").contentWindow.location.reload()}function showHints(){$("#js_editor").addClass("show-js-hints"),$("#showHints").fadeOut()}function nextLevel(){currentLevel==maxLevel?maxLevel:currentLevel++,loadMiniCourse()}function prevLevel(){1==currentLevel?1:currentLevel--,loadMiniCourse()}var maxLevel=gameConstants.MAX_LEVEL;$(document).ready(function(){storage.set("skipToSandbox",!1),$("main").css("height",window.innerHeight-36),$("#welcomeModal").foundation("reveal","open"),$(document).on("close.fndtn.reveal","#welcomeModal",function(){$(document).foundation("joyride","start",{pre_ride_callback:function(){$("#showHints").css("display","block"),$("#previous").css("display","block"),$("#next").css("display","block")},pre_step_callback:function(){console.log(this.$target.first().attr("id")),"preview"==this.$target.first().attr("id")?$("iframe").contents().find("canvas").addClass("joyride-highlight"):this.$target.first().addClass("joyride-highlight")},post_step_callback:function(){"preview"==this.$target.first().attr("id")?$("iframe").contents().find("canvas").removeClass("joyride-highlight"):this.$target.first().removeClass("joyride-highlight")},post_ride_callback:function(){console.log("JOYRIDE CLOSED"),$("#showHints").css("display","none"),$("#previous").css("display","none"),$("#next").css("display","none")},abort_on_close:!1})}),$(document).on("click",".joyride-close-tip",function(){console.log(this)});var e=0,n=window.location.search.match(/debugLevel=(\d+)/);n&&(e=parseInt(n[1])),window.sessionStorage.currentLevel=e,currentLevel=e,$instructions=$("#instructions"),$(document).on("click","#loginButton",function(e){e.preventDefault(),console.log("login"),console.log(this);var n=document.getElementById("sign_in_email").value,o=document.getElementById("sign_in_password").value;authWithPassword({email:n,password:o},authHandler),$("#signupModal").foundation("reveal","close")}),$(document).on("click","span.tooltip",function(){Foundation.libs.tooltip.hide($("#editor-tooltip")),$(this).remove(),$("#editor-tooltip").remove()}),$(document).on("click","#signupButton",function(e){e.preventDefault(),console.log("signup"),console.log(this);var n=document.getElementById("sign_up_email").value,o=document.getElementById("sign_up_password").value;createUserAndLogin({email:n,password:o}),$("#signupModal").foundation("reveal","close")}),$(document).on("click","#logout",function(e){e.preventDefault(),console.log("logout"),console.log(this),logout()}),loadMiniCourse(),$("iframe#preview").attr("src","mini/index.html").focus(),$("form #00NU0000005PN7j").on("change",function(){console.log($(this).prop("checked")),$(this).prop("checked")?($("#first_name").prop("disabled",!1),$("#email").prop("disabled",!1),$("#phone").prop("disabled",!1)):($("#first_name").val(""),$("#email").val(""),$("#phone").val(""),$("#first_name").prop("disabled",!0),$("#email").prop("disabled",!0),$("#phone").prop("disabled",!0))}),$("#publish-form").submit(function(e){return console.log("VALIDATING"),""==$("#00NU0000005PN7e").val()||""==$("#city").val()||""==$("#country").val()||""==$("#state").val()?(console.log("VALIDATION FAILED"),!1):(console.log("PUBLISHING"),publish(),e.preventDefault(),!1)})});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpzL21haW4uanMiXSwibmFtZXMiOlsicmV2ZXJ0TWluaUNvdXJzZSIsImxvYWRNaW5pQ291cnNlIiwicmVmcmVzaFByZXZpZXciLCJwdWJsaXNoUHJvbXB0IiwiJCIsImZvdW5kYXRpb24iLCJwdWJsaXNoIiwiY29uc29sZSIsImxvZyIsImdlbmVyYXRlZEhUTUwiLCJNaW5pY291cnNlUHVibGlzaGVyIiwiZ2VuZXJhdGVIVE1MIiwiYmFzZVVSTCIsImJhc2VMZXZlbCIsIm1heExldmVsIiwianMiLCJlZGl0b3JfanMiLCJnZXRWYWx1ZSIsImZvcm1JbmZvIiwidmFsIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsImVyciIsImh0bWwiLCJhbGVydCIsIm1lc3NhZ2UiLCJoaWRlIiwiZmFkZUluIiwid2luZG93IiwibG9jYXRpb24iLCJob3N0bmFtZSIsImluZGV4T2YiLCJhamF4IiwidHlwZSIsInVybCIsImRhdGEiLCJjcm9zc0RvbWFpbiIsImRhdGFUeXBlIiwiZXJyb3IiLCJhcmd1bWVudHMiLCJzdWNjZXNzIiwiZmluZCIsImF0dHIiLCJ0ZXh0Iiwicm9sZSIsInByb3AiLCJwdXNoIiwiam9pbiIsInVuYmluZCIsInN1Ym1pdCIsImNvbXBsZXRlIiwiY2IiLCJ6ZXJvUGFkZGVkTGV2ZWwiLCJjdXJyZW50TGV2ZWwiLCJzZXNzaW9uU3RvcmFnZSIsImdldCIsIm1hcmtIaW50cyIsInJlYWRPbmx5VG9rZW5zIiwicmVhZE9ubHlSYW5nZXMiLCJmb2xkZWRSYW5nZXMiLCJjdXJyTGluZU51bWJlciIsImN1cnJJbmRlbnRhdGlvbiIsImVkaXRvclRvb2x0aXBzIiwiZWRpdG9yQ29tbWFuZHMiLCJtYXJrSGludCIsInJlYWRPbmx5VG9rZW4iLCJiZWdpblJlYWRPbmx5IiwiZW5kUmVhZE9ubHkiLCJjdXJyUmFuZ2UiLCJsZW5ndGgiLCJiZWdpbkNvZGVGb2xkIiwibGlua1RleHQiLCJiZWdpbiIsImluZGVudGF0aW9uIiwiZW5kQ29kZUZvbGQiLCJlbmQiLCJpbnNlcnRUb29sdGlwIiwicmVwbGFjZSIsInNwbGl0IiwiZmlsdGVyIiwibGluZSIsIm1hdGNoIiwiZXZhbCIsIm9yaWdpbmFsRWRpdG9yQ29udGVudCIsInNldFZhbHVlIiwibGluZUNvdW50IiwiZm9yRWFjaCIsInJhbmdlIiwibWFya1RleHQiLCJjaCIsImNsYXNzTmFtZSIsInJlYWRPbmx5IiwiYXBwbHkiLCJ0aGlzIiwicmVtb3ZlQ2xhc3MiLCJzaG93Iiwic3RhcnQiLCJzcGFuIiwiYXBwZW5kVG8iLCJmb2xkQ29kZSIsIndpZGdldCIsInJhbmdlRmluZGVyIiwiY20iLCJwb3MiLCJmcm9tIiwidG8iLCJnZXRMaW5lIiwiaW5zZXJ0RWRpdG9Ub29sdGlwIiwic3RvcmFnZSIsInNldCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJjb250ZW50V2luZG93IiwicmVsb2FkIiwic2hvd0hpbnRzIiwiYWRkQ2xhc3MiLCJmYWRlT3V0IiwibmV4dExldmVsIiwicHJldkxldmVsIiwiZ2FtZUNvbnN0YW50cyIsIk1BWF9MRVZFTCIsInJlYWR5IiwiY3NzIiwiaW5uZXJIZWlnaHQiLCJvbiIsInByZV9yaWRlX2NhbGxiYWNrIiwicHJlX3N0ZXBfY2FsbGJhY2siLCIkdGFyZ2V0IiwiZmlyc3QiLCJjb250ZW50cyIsInBvc3Rfc3RlcF9jYWxsYmFjayIsInBvc3RfcmlkZV9jYWxsYmFjayIsImFib3J0X29uX2Nsb3NlIiwic3RhcnRMZXZlbCIsImRlYnVnTGV2ZWwiLCJzZWFyY2giLCJwYXJzZUludCIsIiRpbnN0cnVjdGlvbnMiLCJlIiwicHJldmVudERlZmF1bHQiLCJlbWFpbCIsInZhbHVlIiwicGFzc3dvcmQiLCJhdXRoV2l0aFBhc3N3b3JkIiwiYXV0aEhhbmRsZXIiLCJGb3VuZGF0aW9uIiwibGlicyIsInRvb2x0aXAiLCJyZW1vdmUiLCJjcmVhdGVVc2VyQW5kTG9naW4iLCJsb2dvdXQiLCJmb2N1cyIsImV2ZW50Il0sIm1hcHBpbmdzIjoiQUFzS0EsUUFBU0Esb0JBQ0xD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cy9tYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsidmFyIG1heExldmVsID0gZ2FtZUNvbnN0YW50cy5NQVhfTEVWRUw7XG5cbiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgIC8vIERvbid0IHN0YXJ0IGluIHNhbmRib3ggaWYgdGhlIHBhZ2UgaXMgcmVmcmVzaGVkXG4gICAgc3RvcmFnZS5zZXQoJ3NraXBUb1NhbmRib3gnLCBmYWxzZSk7XG5cbiAgICAvL1Jlc2l6ZSB0byB2aWV3cG9ydFxuICAgICQoXCJtYWluXCIpLmNzcyhcImhlaWdodFwiLCB3aW5kb3cuaW5uZXJIZWlnaHQtMzYpO1xuXG4gICAgLy9PcGVuIHdlbGNvbWUgbW9kYWwgb24gZmlyc3QgbG9hZFxuICAgICQoJyN3ZWxjb21lTW9kYWwnKS5mb3VuZGF0aW9uKCdyZXZlYWwnLCAnb3BlbicpO1xuXG4gICAgLy8gSW5pdCBqb3lyaWRlIGFmdGVyIFdlbGNvbWUgTW9kYWxcbiAgICAkKGRvY3VtZW50KS5vbignY2xvc2UuZm5kdG4ucmV2ZWFsJywgJyN3ZWxjb21lTW9kYWwnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBcbiAgICAgICQoZG9jdW1lbnQpLmZvdW5kYXRpb24oJ2pveXJpZGUnLCAnc3RhcnQnLCB7XG4gICAgICAgIFxuICAgICAgICBwcmVfcmlkZV9jYWxsYmFjayAgICAgIDogZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy9EaXNwbGF5IGFsbCBidXR0b25zIGZvciBqb3lyaWRlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNzaG93SGludHNcIikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwcmV2aW91c1wiKS5jc3MoJ2Rpc3BsYXknLCAnYmxvY2snKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKFwiI25leHRcIikuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIHByZV9zdGVwX2NhbGxiYWNrICAgICAgOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyh0aGlzLiR0YXJnZXQuZmlyc3QoKS5hdHRyKCdpZCcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLiR0YXJnZXQuZmlyc3QoKS5hdHRyKCdpZCcpID09IFwicHJldmlld1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpZnJhbWVcIikuY29udGVudHMoKS5maW5kKFwiY2FudmFzXCIpLmFkZENsYXNzKFwiam95cmlkZS1oaWdobGlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0YXJnZXQuZmlyc3QoKS5hZGRDbGFzcygnam95cmlkZS1oaWdobGlnaHQnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIHBvc3Rfc3RlcF9jYWxsYmFjayAgICAgOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZih0aGlzLiR0YXJnZXQuZmlyc3QoKS5hdHRyKCdpZCcpID09IFwicHJldmlld1wiKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCJpZnJhbWVcIikuY29udGVudHMoKS5maW5kKFwiY2FudmFzXCIpLnJlbW92ZUNsYXNzKFwiam95cmlkZS1oaWdobGlnaHRcIik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLiR0YXJnZXQuZmlyc3QoKS5yZW1vdmVDbGFzcygnam95cmlkZS1oaWdobGlnaHQnKTsgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgIHBvc3RfcmlkZV9jYWxsYmFjayAgICAgOiBmdW5jdGlvbiAoKXtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJKT1lSSURFIENMT1NFRFwiKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vRGlzcGxheSBhbGwgYnV0dG9ucyBmb3Igam95cmlkZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjc2hvd0hpbnRzXCIpLmNzcygnZGlzcGxheScsICdub25lJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJChcIiNwcmV2aW91c1wiKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICQoXCIjbmV4dFwiKS5jc3MoJ2Rpc3BsYXknLCAnbm9uZScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICBhYm9ydF9vbl9jbG9zZSAgICAgICAgICAgOiBmYWxzZVxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5qb3lyaWRlLWNsb3NlLXRpcCcsIGZ1bmN0aW9uKCl7XG4gICAgICBjb25zb2xlLmxvZyh0aGlzKTtcbiAgICB9KTtcblxuXG5cbiAgICB2YXIgc3RhcnRMZXZlbCA9IDA7XG4gICAgdmFyIGRlYnVnTGV2ZWwgPSB3aW5kb3cubG9jYXRpb24uc2VhcmNoLm1hdGNoKC9kZWJ1Z0xldmVsPShcXGQrKS8pO1xuXG4gICAgaWYgKGRlYnVnTGV2ZWwpIHtcbiAgICAgICAgc3RhcnRMZXZlbCA9IHBhcnNlSW50KGRlYnVnTGV2ZWxbMV0pO1xuICAgIH1cblxuXG4gICAgLy9SZXNldCBzZXNzaW9uU3RvcmFnZSB0byBrZWVwIGVkaXRvciBhbmQgaWZyYW1lIGluIHN5bmNcbiAgICB3aW5kb3cuc2Vzc2lvblN0b3JhZ2VbJ2N1cnJlbnRMZXZlbCddID0gc3RhcnRMZXZlbDtcblxuICAgIGN1cnJlbnRMZXZlbCA9IHN0YXJ0TGV2ZWw7XG5cbiAgICAkaW5zdHJ1Y3Rpb25zID0gJChcIiNpbnN0cnVjdGlvbnNcIik7XG5cbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnI2xvZ2luQnV0dG9uJywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9naW5cIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuXG4gICAgICAgIHZhciBlbWFpbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduX2luX2VtYWlsJykudmFsdWU7XG4gICAgICAgIHZhciBwYXNzd29yZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzaWduX2luX3Bhc3N3b3JkJykudmFsdWU7XG4gICAgICAgIGF1dGhXaXRoUGFzc3dvcmQoe1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0sIGF1dGhIYW5kbGVyKTtcblxuXG5cbiAgICAgICAgJCgnI3NpZ251cE1vZGFsJykuZm91bmRhdGlvbigncmV2ZWFsJywgJ2Nsb3NlJyk7XG4gICAgfSk7XG5cbiAgICAvL1JlbW92ZSB0b29sdGlwcyBmcm9tIGNvZGUgZWRpdG9yXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJ3NwYW4udG9vbHRpcCcsIGZ1bmN0aW9uKCl7XG4gICAgICAgIEZvdW5kYXRpb24ubGlicy50b29sdGlwLmhpZGUoICQoJyNlZGl0b3ItdG9vbHRpcCcpICk7XG4gICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICQoJyNlZGl0b3ItdG9vbHRpcCcpLnJlbW92ZSgpO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJyNzaWdudXBCdXR0b24nLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY29uc29sZS5sb2coXCJzaWdudXBcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKHRoaXMpO1xuICAgICAgICBcbiAgICAgICAgdmFyIGVtYWlsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25fdXBfZW1haWwnKS52YWx1ZTtcbiAgICAgICAgdmFyIHBhc3N3b3JkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NpZ25fdXBfcGFzc3dvcmQnKS52YWx1ZTtcblxuICAgICAgICBjcmVhdGVVc2VyQW5kTG9naW4oe1xuICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IHBhc3N3b3JkXG4gICAgICAgIH0pO1xuICAgICAgICBcblxuICAgICAgICAkKCcjc2lnbnVwTW9kYWwnKS5mb3VuZGF0aW9uKCdyZXZlYWwnLCAnY2xvc2UnKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsICcjbG9nb3V0JywgZnVuY3Rpb24oZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNvbnNvbGUubG9nKFwibG9nb3V0XCIpO1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzKTtcblxuICAgICAgICBsb2dvdXQoKTtcbiAgICB9KTtcblxuICAgIGxvYWRNaW5pQ291cnNlKCk7XG4gICAgLy9TZXQgaWZyYW1lIHRvIHJpZ2h0IGxldmVsXG4gICAgJCgnaWZyYW1lI3ByZXZpZXcnKS5hdHRyKCdzcmMnLCAnbWluaS9pbmRleC5odG1sJykuZm9jdXMoKTtcblxuICAgIC8vIFB1Ymxpc2hpbmcgZm9ybSBzdWJtaXNzaW9uXG4gICAgLy9pcy1hZHVsdFxuICAgICQoJ2Zvcm0gIzAwTlUwMDAwMDA1UE43aicpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpe1xuICAgICAgICBjb25zb2xlLmxvZyggJCh0aGlzKS5wcm9wKCdjaGVja2VkJykgKTtcbiAgICAgICAgaWYoICQodGhpcykucHJvcCgnY2hlY2tlZCcpICl7XG4gICAgICAgICAgICAkKCcjZmlyc3RfbmFtZScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgLy8gJCgnI2xhc3RfbmFtZScpLnByb3AoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgJCgnI2VtYWlsJykucHJvcCgnZGlzYWJsZWQnLCBmYWxzZSk7XG4gICAgICAgICAgICAkKCcjcGhvbmUnKS5wcm9wKCdkaXNhYmxlZCcsIGZhbHNlKTtcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAkKCcjZmlyc3RfbmFtZScpLnZhbCgnJyk7XG4gICAgICAgICAgICAvLyAkKCcjbGFzdF9uYW1lJykudmFsKCcnKTtcbiAgICAgICAgICAgICQoJyNlbWFpbCcpLnZhbCgnJyk7XG4gICAgICAgICAgICAkKCcjcGhvbmUnKS52YWwoJycpO1xuXG4gICAgICAgICAgICAkKCcjZmlyc3RfbmFtZScpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAvLyAkKCcjbGFzdF9uYW1lJykucHJvcCgnZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgICQoJyNlbWFpbCcpLnByb3AoJ2Rpc2FibGVkJywgdHJ1ZSk7XG4gICAgICAgICAgICAkKCcjcGhvbmUnKS5wcm9wKCdkaXNhYmxlZCcsIHRydWUpO1xuICAgICAgICB9XG4gICAgfSk7XG4gICAgXG4gICAgJCgnI3B1Ymxpc2gtZm9ybScpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlZBTElEQVRJTkdcIik7XG4gICAgICAgIC8vIEZvcm0gdmFsaWRhdGlvblxuICAgICAgICBpZiggJCgnIzAwTlUwMDAwMDA1UE43ZScpLnZhbCgpID09IFwiXCJcbiAgICAgICAgICAgIHx8ICQoJyNjaXR5JykudmFsKCkgPT0gXCJcIlxuICAgICAgICAgICAgfHwgJCgnI2NvdW50cnknKS52YWwoKSA9PSBcIlwiXG4gICAgICAgICAgICB8fCAkKCcjc3RhdGUnKS52YWwoKSA9PSBcIlwiXG4gICAgICAgICAgICApe1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJWQUxJREFUSU9OIEZBSUxFRFwiKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFByZXZlbnQgZm9ybSBzdWJtaXNzaW9uXG4gICAgICAgIC8vIFB1Ymxpc2ggZ2FtZSBhbmQgc2V0IHVybCBhcyB0aGUgcmV0dXJuIHBhcmFtZXRlciBmb3IgdGhlIGZvcm0uXG4gICAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybSBmcm9tIHB1Ymxpc2hcbiAgICAgICAgY29uc29sZS5sb2coXCJQVUJMSVNISU5HXCIpO1xuICAgICAgICBwdWJsaXNoKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcbn0pO1xuXG5mdW5jdGlvbiByZXZlcnRNaW5pQ291cnNlKCkge1xuICAgIGxvYWRNaW5pQ291cnNlKHJlZnJlc2hQcmV2aWV3KTtcbn1cblxuZnVuY3Rpb24gcHVibGlzaFByb21wdCgpe1xuICAkKCcjcHVibGlzaE1vZGFsJykuZm91bmRhdGlvbigncmV2ZWFsJywgJ29wZW4nKTtcbn1cblxuZnVuY3Rpb24gcHVibGlzaCgpe1xuICBjb25zb2xlLmxvZyhcIlBBUkVOVCBQVUJMSVNIXCIpO1xuICBcbiAgZ2VuZXJhdGVkSFRNTCA9IG51bGw7XG4gIE1pbmljb3Vyc2VQdWJsaXNoZXIuZ2VuZXJhdGVIVE1MKHtcbiAgICBiYXNlVVJMOiAnLi9taW5pLycsXG4gICAgYmFzZUxldmVsOiBtYXhMZXZlbCxcbiAgICBqczogZWRpdG9yX2pzLmdldFZhbHVlKCksXG4gICAgZm9ybUluZm86ICc8c3BhbiBpZD1cImZpcnN0X25hbWVcIj4nKyAkKCcjZmlyc3RfbmFtZScpLnZhbCgpLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgJCgnI2ZpcnN0X25hbWUnKS52YWwoKS5zbGljZSgxKSArJzwvc3Bhbj4gZnJvbSA8c3BhbiBpZD1cImNpdHlcIj4nKyQoJyNjaXR5JykudmFsKCkrJzwvc3Bhbj4nXG4gICAgICAgICAgICAgICsnPHNwYW4gaWQ9XCJncmFkZVwiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIj4nKyQoJyNncmFkZScpLnZhbCgpKyc8L3NwYW4+J1xuICAgICAgICAgICAgICArJzxzcGFuIGlkPVwic2Nob29sXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiPicrJCgnIzAwTlUwMDAwMDA1UE43ZScpLnZhbCgpKyc8L3NwYW4+J1xuICAgICAgICAgICAgICArJzxzcGFuIGlkPVwic3RhdGVcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+JyskKCcjc3RhdGUnKS52YWwoKSsnPC9zcGFuPidcbiAgICAgICAgICAgICAgKyc8c3BhbiBpZD1cImNvdW50cnlcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCI+JyskKCcjY291bnRyeScpLnZhbCgpKyc8L3NwYW4+J1xuICB9LCBmdW5jdGlvbihlcnIsIGh0bWwpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICBhbGVydChcIkVycm9yIGdlbmVyYXRpbmcgcHVibGlzaGVkIEhUTUw6IFwiICsgZXJyLm1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBcbiAgICBnZW5lcmF0ZWRIVE1MID0gaHRtbDtcbiAgICBjb25zb2xlLmxvZyhcIkdFTkVSQVRFRCBIVE1MXCIpO1xuICAgIGNvbnNvbGUubG9nKGdlbmVyYXRlZEhUTUwpO1xuXG4gICAgaWYgKCFnZW5lcmF0ZWRIVE1MKSB7XG4gICAgICBhbGVydChcIlRoZXJlIHdhcyBhbiBlcnJvciBwdWJsaXNoaW5nIHlvdXIgZ2FtZS4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlciFcIik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIFxuICAgIC8vIEJlZ2luIHB1Ymxpc2hpbmdcbiAgICAkKFwiI3B1Ymxpc2hlZFwiKS5oaWRlKCk7XG4gICAgJChcIiNwdWJsaXNoaW5nXCIpLmZhZGVJbigpO1xuXG4gICAgdmFyIGJhc2VVUkwgPSB3aW5kb3cubG9jYXRpb24uaG9zdG5hbWUuaW5kZXhPZignY29kZS5nbG9iYWxvcmlhLmNvbScpID4gLTFcbiAgICAgICAgICAgICAgICAgID8gJ2h0dHA6Ly9nbG9iYWxvcmlhLmNvbTo4MDAwLydcbiAgICAgICAgICAgICAgICAgIDogJ2h0dHBzOi8vaGFja3B1Yi5oZXJva3VhcHAuY29tL2J1Y2tldHMvZ2xvYmFsb3JpYS8nO1xuXG4gICAgJC5hamF4KHtcbiAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgIHVybDogYmFzZVVSTCArICdwdWJsaXNoJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgJ2h0bWwnOiBnZW5lcmF0ZWRIVE1MXG4gICAgICB9LFxuICAgICAgY3Jvc3NEb21haW46IHRydWUsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgICBhbGVydChcIkVycm9yIHB1Ymxpc2hpbmcgSFRNTCFcIik7XG4gICAgICAgIGNvbnNvbGUubG9nKGFyZ3VtZW50cyk7XG4gICAgICB9LFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAkKFwiI3B1Ymxpc2hlZFwiKS5mYWRlSW4oKVxuICAgICAgICAgIC5maW5kKCdhJylcbiAgICAgICAgICAuYXR0cignaHJlZicsIGRhdGFbJ3B1Ymxpc2hlZC11cmwnXSlcbiAgICAgICAgICAudGV4dChkYXRhWydwdWJsaXNoZWQtdXJsJ10pO1xuXG4gICAgICAgIFxuICAgICAgICAvLyBSZXBsYWNlIHRoZSBmb3JtJ3MgcmV0dXJuIFVSTCBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICQoJyNwdWJsaXNoLWZvcm0gaW5wdXQjcmV0VXJsJykudmFsKCBkYXRhWydwdWJsaXNoZWQtdXJsJ10gKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFBvcHVsYXRlIGdhbWUgbGluayBmb3Igc2FsZXNmb3JjZSBjYXB0dXJlXG4gICAgICAgICQoJyMwME5VMDAwMDAwNVBON3QnKS52YWwoZGF0YVsncHVibGlzaGVkLXVybCddKTtcblxuICAgICAgICAvLyBQb3B1bGF0ZSB0aGUgcm9sZSBmaWVsZCBmb3Igc2FsZXNmb3JjZVxuICAgICAgICB2YXIgcm9sZSA9IFtdO1xuICAgICAgICBpZiggJCgnI2lzU3R1ZGVudCcpLnByb3AoJ2NoZWNrZWQnKSApIHJvbGUucHVzaCggJCgnI2lzU3R1ZGVudCcpLnZhbCgpICk7XG4gICAgICAgIGlmKCAkKCcjaXNUZWFjaGVyJykucHJvcCgnY2hlY2tlZCcpICkgcm9sZS5wdXNoKCAkKCcjaXNUZWFjaGVyJykudmFsKCkgKTtcbiAgICAgICAgaWYoICQoJyNpc1BhcmVudCcpLnByb3AoJ2NoZWNrZWQnKSApIHJvbGUucHVzaCggJCgnI2lzUGFyZW50JykudmFsKCkgKTtcbiAgICAgICAgaWYoICQoJyNpc0FkbWluaXN0cmF0b3InKS5wcm9wKCdjaGVja2VkJykgKSByb2xlLnB1c2goICQoJyNpc0FkbWluaXN0cmF0b3InKS52YWwoKSApO1xuICAgICAgICAgICAgICAgICAgICBcbiAgICAgICAgJCgnIzAwTlUwMDAwMDA1UGgySycpLnZhbCggcm9sZS5qb2luKCcsJykgKTtcblxuICAgICAgICAvL1VuYmluZCBmb3JtIHRvIHByZXZlbnQgc3VibWl0IGxvb3BcbiAgICAgICAgJCgnI3B1Ymxpc2gtZm9ybScpLnVuYmluZCgpLnN1Ym1pdCgpO1xuXG4gICAgICB9LFxuICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAkKFwiI3B1Ymxpc2hpbmdcIikuaGlkZSgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZE1pbmlDb3Vyc2UoY2Ipe1xuICAgIGNiID0gY2IgfHwgZnVuY3Rpb24oKSB7fVxuICAgIGNvbnNvbGUubG9nKFwiTG9hZGluZyBtaW5pIGNvdXJzZSB0ZW1wbGF0ZVwiKTtcbiAgICB2YXIgemVyb1BhZGRlZExldmVsID0gKGN1cnJlbnRMZXZlbCA8IDEwKSA/ICcwJyArIGN1cnJlbnRMZXZlbCA6IGN1cnJlbnRMZXZlbDtcblxuICAgIC8vIFNraXAgdG8gc2FuZGJveFxuICAgIGlmKCB3aW5kb3cuc2Vzc2lvblN0b3JhZ2VbJ3NraXBUb1NhbmRib3gnXSA9PSBcInRydWVcIiApe1xuICAgICAgICB6ZXJvUGFkZGVkTGV2ZWwgPSBtYXhMZXZlbDtcbiAgICB9XG5cbiAgICAkLmdldCgnbWluaS9sZXZlbHMvJyArIHplcm9QYWRkZWRMZXZlbCArICcuanMnLCBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHZhciBtYXJrSGludHMgPSBbXTtcbiAgICAgICAgdmFyIHJlYWRPbmx5VG9rZW5zID0gW107XG4gICAgICAgIHZhciByZWFkT25seVJhbmdlcyA9IFtdO1xuICAgICAgICB2YXIgZm9sZGVkUmFuZ2VzID0gW107XG4gICAgICAgIHZhciBjdXJyTGluZU51bWJlciA9IDA7XG4gICAgICAgIHZhciBjdXJySW5kZW50YXRpb24gPSAwO1xuICAgICAgICB2YXIgZWRpdG9yVG9vbHRpcHMgPSBbXTtcbiAgICAgICAgdmFyIGVkaXRvckNvbW1hbmRzID0ge1xuICAgICAgICAgICAgbWFya0hpbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIG1hcmtIaW50cy5wdXNoKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVhZE9ubHlUb2tlbjogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZWFkT25seVRva2Vucy5wdXNoKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYmVnaW5SZWFkT25seTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcmVhZE9ubHlSYW5nZXMucHVzaChbY3VyckxpbmVOdW1iZXJdKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbmRSZWFkT25seTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgdmFyIGN1cnJSYW5nZSA9IHJlYWRPbmx5UmFuZ2VzW3JlYWRPbmx5UmFuZ2VzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgICAgIGN1cnJSYW5nZS5wdXNoKGN1cnJMaW5lTnVtYmVyKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBiZWdpbkNvZGVGb2xkOiBmdW5jdGlvbihsaW5rVGV4dCkge1xuICAgICAgICAgICAgICAgIGZvbGRlZFJhbmdlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgYmVnaW46IGN1cnJMaW5lTnVtYmVyLFxuICAgICAgICAgICAgICAgICAgICBpbmRlbnRhdGlvbjogY3VyckluZGVudGF0aW9uLFxuICAgICAgICAgICAgICAgICAgICBsaW5rVGV4dDogbGlua1RleHQgfHwgJ01vcmVcXHUyMDI2J1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVuZENvZGVGb2xkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICB2YXIgY3VyclJhbmdlID0gZm9sZGVkUmFuZ2VzW2ZvbGRlZFJhbmdlcy5sZW5ndGggLSAxXTtcbiAgICAgICAgICAgICAgICBjdXJyUmFuZ2UuZW5kID0gY3VyckxpbmVOdW1iZXI7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBpbnNlcnRUb29sdGlwOiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIGVkaXRvclRvb2x0aXBzLnB1c2goYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBjb25zb2xlLmxvZyhcIkNvdXJzZSByZXRyaWV2ZWQ6IFwiKTtcbiAgICAgICAgY29uc29sZS5sb2coZGF0YSk7XG5cbiAgICAgICAgLy8gTm9ybWFsaXplIHdoaXRlc3BhY2UgaWYgd2UncmUgb24gd2luZG93cy5cbiAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvXFxyXFxuL2csICdcXG4nKTtcblxuICAgICAgICAvLyBXZSB3YW50IHRvIG1ha2UgaXQgbGVzcyBsaWtlbHkgdGhhdCB0aGUgdXNlciBhY2NpZGVudGFsbHlcbiAgICAgICAgLy8gZGVsZXRlcyB0aGUgY2xvc2luZyBicmFjZSBvZiBhIGZ1bmN0aW9uIGRlZmluaXRpb24gb3IgYWRkc1xuICAgICAgICAvLyBjb2RlIGFmdGVyIGl0LCBzbyB3ZSdsbCBtb3ZlIGl0IHdheSBkb3duIHRvIHRoZSBib3R0b20gb2ZcbiAgICAgICAgLy8gdGhlIGZpbGUgd2l0aCBwbGVudHkgb2Ygd2hpdGUtc3BhY2UgaW4gYmV0d2Vlbi5cbiAgICAgICAgZGF0YSA9IGRhdGEucmVwbGFjZSgvfVxcbiokLywgJ1xcblxcblxcblxcblxcblxcblxcblxcblxcblxcbn1cXG4nKTtcblxuICAgICAgICBkYXRhID0gZGF0YS5zcGxpdCgnXFxuJykuZmlsdGVyKGZ1bmN0aW9uKGxpbmUpIHtcbiAgICAgICAgICAgIHZhciBtYXRjaCA9IGxpbmUubWF0Y2goLyhcXHMqKVxcL1xcL1xccypFRElUT1I6KC4qKS8pO1xuICAgICAgICAgICAgaWYgKCFtYXRjaCkge1xuICAgICAgICAgICAgICAgIGN1cnJMaW5lTnVtYmVyKys7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJJbmRlbnRhdGlvbiA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgd2l0aCAoZWRpdG9yQ29tbWFuZHMpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkV4ZWN1dGluZyBlZGl0b3IgY29tbWFuZDogXCIgKyBtYXRjaFsyXSk7XG4gICAgICAgICAgICAgICAgZXZhbChtYXRjaFsyXSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSkuam9pbignXFxuJyk7XG5cbiAgICAgICAgb3JpZ2luYWxFZGl0b3JDb250ZW50ID0gZGF0YTtcbiAgICAgICAgZWRpdG9yX2pzLnNldFZhbHVlKGRhdGEpO1xuXG4gICAgICAgIC8vIE1ha2UgdGhlIGZpcnN0IGxpbmUgcmVhZC1vbmx5LlxuICAgICAgICByZWFkT25seVJhbmdlcy5wdXNoKFswLCAxXSk7XG5cbiAgICAgICAgLy8gTWFrZSB0aGUgbGFzdCB0d28gbGluZXMgcmVhZC1vbmx5LlxuICAgICAgICByZWFkT25seVJhbmdlcy5wdXNoKFtlZGl0b3JfanMubGluZUNvdW50KCkgLSAyLCBcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWRpdG9yX2pzLmxpbmVDb3VudCgpXSk7XG5cbiAgICAgICAgcmVhZE9ubHlSYW5nZXMuZm9yRWFjaChmdW5jdGlvbihyYW5nZSkge1xuICAgICAgICAgICAgZWRpdG9yX2pzLm1hcmtUZXh0KHtsaW5lOiByYW5nZVswXSwgY2g6IDB9LCB7XG4gICAgICAgICAgICAgIGxpbmU6IHJhbmdlWzFdLFxuICAgICAgICAgICAgICBjaDogMFxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICBjbGFzc05hbWU6ICdqcy1yZWFkLW9ubHknLFxuICAgICAgICAgICAgICByZWFkT25seTogdHJ1ZVxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZWFkT25seVRva2Vucy5mb3JFYWNoKGZ1bmN0aW9uKGFyZ3VtZW50cykge1xuICAgICAgICAgICAgcmVhZE9ubHlUb2tlbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBtYXJrSGludHMuZm9yRWFjaChmdW5jdGlvbihhcmd1bWVudHMpIHtcbiAgICAgICAgICAgIG1hcmtIaW50LmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoXCIjanNfZWRpdG9yXCIpLnJlbW92ZUNsYXNzKCdzaG93LWpzLWhpbnRzJyk7XG5cbiAgICAgICAgaWYgKG1hcmtIaW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICQoXCIjc2hvd0hpbnRzXCIpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoXCIjc2hvd0hpbnRzXCIpLmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvbGRlZFJhbmdlcy5mb3JFYWNoKGZ1bmN0aW9uKHJhbmdlKSB7XG4gICAgICAgICAgICB2YXIgc3RhcnQgPSB7bGluZTogcmFuZ2UuYmVnaW4sIGNoOiAwfTtcbiAgICAgICAgICAgIHZhciBzcGFuID0gJCgnPHNwYW4gY2xhc3M9XCJjbS1jb21tZW50XCI+JyArIHJhbmdlLmluZGVudGF0aW9uICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnLy8gPC9zcGFuPicpO1xuICAgICAgICAgICAgJCgnPHNwYW4gY2xhc3M9XCJqcy1jb2RlLWZvbGQtbGlua1wiPjwvc3Bhbj4nKVxuICAgICAgICAgICAgICAudGV4dChyYW5nZS5saW5rVGV4dClcbiAgICAgICAgICAgICAgLmFwcGVuZFRvKHNwYW4pO1xuICAgICAgICAgICAgZWRpdG9yX2pzLmZvbGRDb2RlKHN0YXJ0LCB7XG4gICAgICAgICAgICAgICAgd2lkZ2V0OiBzcGFuWzBdLFxuICAgICAgICAgICAgICAgIHJhbmdlRmluZGVyOiBmdW5jdGlvbihjbSwgcG9zKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmcm9tOiBzdGFydCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHRvOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogcmFuZ2UuZW5kIC0gMSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjaDogZWRpdG9yX2pzLmdldExpbmUocmFuZ2UuZW5kIC0gMSkubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGVkaXRvclRvb2x0aXBzLmZvckVhY2goZnVuY3Rpb24oYXJndW1lbnRzKXtcbiAgICAgICAgICAgIGluc2VydEVkaXRvVG9vbHRpcC5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9KTtcblxuICAgICAgICBjYigpO1xuICAgIH0pO1xuICAgIFxuICAgIC8vIFNldCBzZXNzaW9uIHN0b3JhZ2UgYW5kIHJlbG9hZCB0aGUgaWZyYW1lIHRvIGJlIHN5bmNoZWRcbiAgICBzdG9yYWdlLnNldCgnY3VycmVudExldmVsJywgY3VycmVudExldmVsKTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJldmlldycpLmNvbnRlbnRXaW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG59XG5cbmZ1bmN0aW9uIHNob3dIaW50cygpIHtcbiAgICAkKFwiI2pzX2VkaXRvclwiKS5hZGRDbGFzcygnc2hvdy1qcy1oaW50cycpO1xuICAgICQoXCIjc2hvd0hpbnRzXCIpLmZhZGVPdXQoKTtcbn1cblxuZnVuY3Rpb24gbmV4dExldmVsKCl7XG4gICAgY3VycmVudExldmVsID09IG1heExldmVsID8gbWF4TGV2ZWwgOiBjdXJyZW50TGV2ZWwrKztcbiAgICBcbiAgICAvL1VwZGF0ZSBpZnJhbWUgc291cmNlXG4gICAgLy8gJCgnaWZyYW1lI3ByZXZpZXcnKS5hdHRyKCdzcmMnLCAncHJvamVjdF90ZW1wbGF0ZS9pbmRleCcrY3VycmVudExldmVsKycuaHRtbCcpO1xuICAgIC8vICRpbnN0cnVjdGlvbnMuZmluZChcImgzXCIpLnRleHQoaW5zdHJ1Y3Rpb25zW1wibGV2ZWxcIitjdXJyZW50TGV2ZWxdLnRpdGxlKTtcbiAgICAvLyAkaW5zdHJ1Y3Rpb25zLmZpbmQoXCJwXCIpLnRleHQoaW5zdHJ1Y3Rpb25zW1wibGV2ZWxcIitjdXJyZW50TGV2ZWxdLmNvbnRlbnQpO1xuICAgIGxvYWRNaW5pQ291cnNlKCk7XG59XG5cbmZ1bmN0aW9uIHByZXZMZXZlbCgpe1xuICAgIGN1cnJlbnRMZXZlbCA9PSAxID8gMSA6IGN1cnJlbnRMZXZlbC0tO1xuICAgIFxuICAgIC8vVXBkYXRlIGlmcmFtZSBzb3VyY2VcbiAgICAvLyAkKCdpZnJhbWUjcHJldmlldycpLmF0dHIoJ3NyYycsICdwcm9qZWN0X3RlbXBsYXRlL2luZGV4JytjdXJyZW50TGV2ZWwrJy5odG1sJyk7XG4gICAgLy8gJGluc3RydWN0aW9ucy5maW5kKFwiaDNcIikudGV4dChpbnN0cnVjdGlvbnNbXCJsZXZlbFwiK2N1cnJlbnRMZXZlbF0udGl0bGUpO1xuICAgIC8vICRpbnN0cnVjdGlvbnMuZmluZChcInBcIikudGV4dChpbnN0cnVjdGlvbnNbXCJsZXZlbFwiK2N1cnJlbnRMZXZlbF0uY29udGVudCk7XG4gICAgbG9hZE1pbmlDb3Vyc2UoKTtcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
