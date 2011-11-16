class Task < ActiveRecord::Base

  validate :validate_4_tasks_at_most

  private
  def validate_4_tasks_at_most
    tasks = Task.find_all_by_started true
    errors.add("4_tasks", "you should not be working on more than 4 tasks") if tasks.size == 4
  end

end
