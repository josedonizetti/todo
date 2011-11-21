describe("Task", function(){
	var request, success, failure;

	beforeEach(function(){
		jasmine.Ajax.useMock();

		success = jasmine.createSpy("success");
		failure = jasmine.createSpy("error");
	});

	describe("should get a task", function(){
		beforeEach(function(){
			getTask("/task/1.json",success,failure);
			request = mostRecentAjaxRequest();
		});

		it("sucess",function(){
			request.response(TaskResponse.get.success);
			expect(success).toHaveBeenCalled();
			var result = success.mostRecentCall.args[0];
			expect(result.id).toBe(99);
			expect(result.user_id).toBe(1);
			expect(result.description).toEqual("for now, remove the history button");

		});

		it("failure",function(){});

	});

});
