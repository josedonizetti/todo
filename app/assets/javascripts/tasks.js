var Events = {};

Events.keypress = function(key){
	// 13 == enter
	if(key.which == 13){
		$("#edit_form").submit();	
		return false;
	}
	// esc == ???
	return true;
};

var Template = function(template,data){
	this.getAsJQueryElement = function(){
		return $(Mustache.to_html(template.html(),data));
	};
};


//URLs
var URLs = {};
URLs.START = '/tasks/start';
URLs.FINISH = '/tasks/finish';
URLs.CLEAR = '/tasks/clear';

//Task
var Task = function(url){
	this.start = function(){
		get(url,function(json){
			$.post(URLs.START,json,function(){
				generateANewLi('meio',json,Link.finish);	
			});
		});
	};

	this.clear = function(){
		get(url,function(json){
			$.post(URLs.CLEAR,json);
		});

	};

	this.finish = function(){
		get(url,function(json){
			$.post(URLs.FINISH,json,function(){
				generateANewLi('final',json,Link.clear);	
			});
		});
	};

	this.remove = function(){
		get(url, function(json) { 
			json._method = 'DELETE';
			$.post('/tasks',json);
		});

	};

	var get = function(url,success){
		$.getJSON(url).success(success);
	};

	var generateANewLi = function(div,data,action){
		var newLi = new Template($('#li'),data).getAsJQueryElement();
		$('#' + div).append(newLi);
		$('#' + div + ' li').last().children().click(action);
	};

};

//events of the links
var Link = {};

Link.start = function(){
	var li = $(this).parent();	

	var lis  = $("#meio").children();
	if(lis.size() <= 4){
		var task = new Task(li.data('json-url'));
		task.start();
		li.fadeOut();
	} else {
		alert("vc tem tarefas de mais em fazendo, termine elas antes");
	}
};

Link.edit = function(){
	var li = $(this);
	// if an input already exist doubleclick should do the act as default
	if(li.has('input').length == 1){
		return true;
	}

	data = {};
	data.id = li.attr('id');
	data.description = li.text();

	var input = new Template($('#task_input'),data).getAsJQueryElement();
	li.html(input);
	
};

Link.remove = function(){
//  var task = new TaskB(li.data('json-url'));
//	var delete_link = $("<a id='delete' href='#'></a>");
//	delete_link.click(task.remove);
//	li.append(delete_link);
};

Link.clear = function(){
	var li = $(this).parent();
	var task = new Task(li.data('json-url'));
	task.clear();
	li.fadeOut();
};

Link.finish = function(){
	var li = $(this).parent();
	var task = new Task(li.data('json-url'));
	task.finish();
	li.fadeOut();
};

$(document).ready(function() {
	$("#inicio li").dblclick(Link.edit);
	$(".start_link").click(Link.start);
	$(".finish_link").click(Link.finish);
	$(".clear_link").click(Link.clear);
});
