class TasksController < ApplicationController

	def index
		@task = Task.new
		@not_started_tasks = Task.find_all_by_started false
		@started_tasks = Task.where ["started = ? AND finished_date is null", true]
		@finished_tasks = Task.where ["started = ? AND finished_date is not null", true]
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
		tasks = params[:tasks]
        tasks.each do |key,value|
          task = Task.find key
          task.description = value
          task.save
        end
		redirect_to :action => :index
	end

	def show
		@task = Task.find params[:id]
		respond_to do |format|
			format.json {  render :json => @task}
		end
	end

    def destroy
      Task.delete params[:id]
      render :nothing => true
    end

    def start
      task = Task.find params[:id] 
      task.update_attributes :started => true
      render :nothing => true
    end

    def finish
      task = Task.find params[:id]
      task.update_attributes :finished_date => Date.new
      puts "oi malandro"
      puts task.finished_date
      render :nothing => true
    end
end
