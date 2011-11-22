class TasksController < ApplicationController
    
    before_filter :authenticate_user! 

	def index
		@task = Task.new
		@not_started_tasks = Task.where ["started = ? AND visible = ? AND user_id = ?",false,true,current_user.id]
		@started_tasks = Task.where ["started = ? AND visible = ? AND user_id = ? AND finished_date is null",true,true,current_user.id]
		@finished_tasks = Task.where ["started = ? AND visible = ? AND user_id = ? AND finished_date is not null", true,true,current_user.id]
	end

	def create
		@task = Task.new params[:task]
        @task.user = current_user
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
      task.update_attributes :finished_date => DateTime.now
      render :nothing => true
    end

    def clear
      task = Task.find params[:id]
      task.update_attributes :visible => false
      render :nothing => true
    end
end
