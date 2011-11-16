class Task < ActiveRecord::Base
  
  belongs_to :user
  validates_associated :user
  validates_presence_of :user_id 

  private
  def validate_4_tasks_at_most
    tasks = Task.where ["started = ? and finished_date is null",true]
    errors.add("4_tasks", "you should not be working on more than 4 tasks") if tasks.size == 4
  end

end
