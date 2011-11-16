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
				if(key.which == 13){
					alert("aqui");
					$("#edit_form").submit();	
					return false;
				}
				return true;
			}); 	
		});

	});

});
