var getTask = function(url,success,failure){
	$.getJSON(url)
		.success(success)
		.error(failure);
}

var startTask = function(id,success,failure){

}

$(document).ready(function() {
	$("#inicio li").dblclick(function(){

	    var li = $(this);

		var json = getTask($(this).data("json-url"), function(json) { 

			var input = $(Mustache.to_html($("#task_input").html(),json));
			$(li).html(input);
			var delete_link = $("<a id='delete' href='#'></a>").click(function() {
				$.ajax({
					url: "/tasks",
					type: "POST",
					data: {
						"id": json.id,
						"_method":"DELETE"
					},
					success: function(){
						 $(li).fadeOut();
					}
				});
			});

			$(li).append(delete_link);

		    $(input).keypress(function(key){
				// 13 == enter
				if(key.which == 13){
					$("#edit_form").submit();	
					return false;
				}

				// esc == ???
				return true;
			}); 	
		},function(){});

	});

	var clear_link = function(){
		var li = $(this).parent();
		var json = $.getJSON($(li).data("json-url"),function(json){
				$.ajax({
					url: "/tasks/clear",
					type: "POST",
					data: {"id":json.id},
					success: function(){
						$(li).fadeOut();
					}
				});	

			});
	}

	var finish_link = function(){
		var li = $(this).parent();	
			var json = $.getJSON($(li).data("json-url"),function(json){
				$.ajax({
					url: "/tasks/finish",
					type: "POST",
					data: {"id":json.id},
					success: function(){
						$(li).fadeOut();
						$("#final").append(Mustache.to_html($("#li").html(),json));
						$($("#final li").last().children()).click(clear_link);
					}
				});	
			});
	}

	$(".start_link").click(function(){
		var li = $(this).parent();	
		var lis  = $("#meio").children();
		if(lis.size() < 4){
			var json = $.getJSON($(li).data("json-url"),function(json){
				$.ajax({
					url: "/tasks/start",
					type: "POST",
					data: {"id":json.id},
					success: function(){
						$(li).fadeOut();
						json.class = "finish_class";
						$("#meio").append(Mustache.to_html($("#li").html(),json));
						$($("#meio li").last().children()).click(finish_link);
					}
				});	
			});
		}
	});
    
	$(".finish_link").click(finish_link);
	$(".clear_link").click(clear_link);
});
