var getTask = function(url,success,failure){
$.getJSON(url)
	.success(success)
	.error(failure);
}

var ajaxRequest = function(url,verb,data,successFunction){
		return function(){
			$.ajax({
				url:url,
				type:verb,
				data:data,
				success:successFunction
			});
		}
}

var edit_task = function(){

	var li = $(this);
	// if an input already exist doubleclick should do the act as default
	if(li.has('input').length == 1){
		return true;
	}

	var json = getTask($(this).data("json-url"), function(json) { 

		var input = $(Mustache.to_html($("#task_input").html(),json));
		$(li).html(input);
		var delete_link = $("<a id='delete' href='#'></a>");
		delete_link.click(ajaxRequest("/tasks","POST",{"id":json.id,"_method":"DELETE"},function(){$(li).fadeOut();}));

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

}

var clear_link = function(){
	var li = $(this).parent();
	var json = $.getJSON($(li).data("json-url"),function(json){
			ajaxRequest('/tasks/clear','POST',{"id":json.id},function(){$(li).fadeOut();})();
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

var start_link = function(){
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
	} else {
		alert("vc tem tarefas de mais em fazendo, termine elas antes");
	}
}


$(document).ready(function() {
	$("#inicio li").dblclick(edit_task);
	$(".start_link").click(start_link);
	$(".finish_link").click(finish_link);
	$(".clear_link").click(clear_link);
});
