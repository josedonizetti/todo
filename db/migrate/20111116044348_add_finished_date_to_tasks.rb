class AddFinishedDateToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :finished_date, :datetime
  end
end
