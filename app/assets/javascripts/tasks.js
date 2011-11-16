$(document).ready(function() {
	$("#inicio li").dblclick(function(){
	    var li = $(this);
		var json = $.getJSON($(this).data("json-url"), function(json) { 
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
		});

	});
	
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
						json.class = "finish_link";
						$("#meio").append(Mustache.to_html($("#li").html(),json));
					}
				});	
			});
		}
	});

	function finish_link (){
		var li = $(this).parent();	
			var json = $.getJSON($(li).data("json-url"),function(json){
				$.ajax({
					url: "/tasks/finish",
					type: "POST",
					data: {"id":json.id},
					success: function(){
						$(li).fadeOut();
						json.class = "clear_link";
						$("#final").append(Mustache.to_html($("#li").html(),json));
					}
				});	
			});
	});

	$(".finish_link").click(finish_link);

});
