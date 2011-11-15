class TasksController < ApplicationController

	def index
		@task = Task.new
		@tasks = Task.all
	end

	def create
		@task = Task.new params[:task]
		if @task.save
			redirect_to :action => "index"
		else
			render :action => "index"	
		end
	end

	def update
		puts params[:description]
		redirect_to :action => :index
	end

	def show
		@task = Task.find params[:id]
		respond_to do |format|
			format.json {  render :json => @task}
		end
	end
end
