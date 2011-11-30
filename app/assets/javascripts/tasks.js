var Events = {}

Events.keypress = function(key){
	// 13 == enter
	if(key.which == 13){
		$("#edit_form").submit();	
		return false;
	}
	// esc == ???
	return true;
};

var Template = function(template,json){
	this.getAsJQueryElement = function(){
		return $(Mustache.to_html(template.html(),json));
	};
}

var Request = function(url, data, successFunction){
	this.verb = 'POST';
	this.ajax = function(){
			$.ajax({
				url:url,
				type:'POST',
				data:data,
				success:successFunction
			});
	}
}

var Task = {}

Task.get = function(url,success,failure){
	$.getJSON(url).success(success).error(failure);
};

Task.edit = function(){

	var li = $(this);
	// if an input already exist doubleclick should do the act as default
	if(li.has('input').length == 1){
		return true;
	}

	Task.get(li.data("json-url"), function(json) { 
		var input = new Template($('#task_input'),json).getAsJQueryElement();
		li.html(input);
		input.keypress(Events.keypress); 	

		var request = new Request('/tasks',{'id':json.id, '_method':'DELETE'}, function(){
			li.fadeOut();
		});
		var delete_link = $("<a id='delete' href='#'></a>");
		delete_link.click(request.ajax);
		li.append(delete_link);

	});

};

Task.clear  = function(){
	var li = $(this).parent();
	Task.get(li.data('json-url'),function(json){
			var request = new Request('/tasks/clear',{'id':json.id},function(){ 
				li.fadeOut();
			});
			request.ajax();
	});
};

Task.finish = function(){
	var li = $(this).parent();	
		Task.get(li.data("json-url"),function(json){
			var request = new Request('/tasks/finish',{'id':json.id},function(){
				li.fadeOut();
				var newLi = new Template($('#li'),json).getAsJQueryElement();
				$('#final').append(newLi);
				$('#final li').last().children().click(Task.clear);
			
			});
			request.ajax();
		});
}

Task.start = function(){
	var li = $(this).parent();	
	var lis  = $("#meio").children();
	if(lis.size() <= 4){
		Task.get(li.data("json-url"),function(json){
			var request = new Request('/tasks/start',{'id':json.id},function(){
					li.fadeOut();
					var newLi = new Template($('#li'),json).getAsJQueryElement();
					$('#meio').append(newLi);
					$('#meio li').last().children().click(Task.finish);
				});
			request.ajax();
		});
	} else {
		alert("vc tem tarefas de mais em fazendo, termine elas antes");
	}
}


$(document).ready(function() {
	$("#inicio li").dblclick(Task.edit);
	$(".start_link").click(Task.start);
	$(".finish_link").click(Task.finish);
	$(".clear_link").click(Task.clear);
});
