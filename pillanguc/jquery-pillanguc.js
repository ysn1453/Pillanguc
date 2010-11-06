function Pillanguc(id)
{
	this.id = id;
	if(id == null || id == "")
		this.id = "pillanguc-" + Math.floor(Math.random()*9999999).toString();
	this.content = "";
	this.closeButton = pillangucSettings["closeButton"];
	this.title = "";
	this.show = function()
	{
		var winID = this.id;
		html = pillangucTheme();
		html = html.replace('{{pillanguc:id}}',this.id);
		html = html.replace('{{pillanguc:content}}',this.content);
		
		if (this.closeButton)
			html = html.replace('{{pillanguc:close}}', '<a href="#win-close" id="' + this.id + '-close" class="pillanguc-close">Close</a>');
		else
			html = html.replace('{{pillanguc:close}}', '');
			
		if (pillangucSettings["multiTasking"]) 
			$("#pillanguc-windows").append(html);
		else 
			$("#pillanguc-windows").html(html);
		
		if (this.closeButton) {	
			
			$('#' + winID + '-close').click(function(){
				$("#" + winID).replaceWith("");
			});
		}

	}
	this.close = function()
	{
		
	}
	this.dispose = function()
	{
		
	}
}

$(document).ready(function(){
	$("body").append('<div id="pillanguc-windows"></div>');
		$("[hozmur='pillanguc']").live("click",function(){
			var element = $(this);
			/* Creating window */
			var win = new Pillanguc();
			var ajaxCache = pillangucSettings["cache"];
			// Ajax cache setting
			if (element.attr("cache") != undefined && element.attr("cache") == "true") {
				ajaxCache = true;
			}
			// Close button display setting
			if (element.attr("close") != undefined && element.attr("close") == "false") {
				win.closeButton = false;
			}			
			// Window title
			if(element.attr("title") != undefined){
				win.title = element.attr("title");
			}else{
				win.title = "Window";
			}
			// Window content
			if(element.attr("href").substr(0,1) == "#"){
				win.content = $(element.attr("href")).html();
				win.show();
			}else{
				$.ajax({
					url : element.attr("href"),
					cache : ajaxCache,
					success : function(html){
						win.content = html;
						win.show();
					}
				});
			}
			return false;
		});
});

// Default settings
var pillangucSettings = new Array();
pillangucSettings["multiTasking"] = false;
pillangucSettings["cache"] = false;
pillangucSettings["closeButton"] = true;