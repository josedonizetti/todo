$(document).ready(function() {
	$("#inicio li").dblclick(function(){
	    var li = $(this);
		var json = $.getJSON($(this).data("json-url"), function(json) { 
			$(li).html(Mustache.to_html($("#task_input").html(),json));
		});
	});
});
