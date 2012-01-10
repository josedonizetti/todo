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
				generateANewLi('meio',json);	
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
				generateANewLi('final',json);	
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

	var generateANewLi = function(div,data){
		var newLi = new Template($('#li'),data).getAsJQueryElement();
		$('#' + div).append(newLi);
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
	li.append($('#delete_link').html());
	
};

Link.remove = function(){
	var li = $(this).parent();
	var task = new Task(li.data('json-url'));
	task.remove();
	li.fadeOut();
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
	$(".start_link").live('click',Link.start);
	$(".finish_link").live('click',Link.finish);
	$(".clear_link").live('click',Link.clear);
	$(".delete_link").live('click',Link.remove);

	$(document).keypress(function(event){
		// n = 110
		if(event.which == 110){
			$("#description").focus();
		}
	});
	
	$("#description").keypress(function(event){
		if(event.which == 0){
			// should lose focus when on the description's input
		}
	});

	$("#edit_form input").keypress(function(event){
		if(event.which == 110){
			// should lose focus when on the description's input
		}
	});

});
