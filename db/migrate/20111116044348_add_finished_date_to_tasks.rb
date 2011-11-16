class AddFinishedDateToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :finished_date, :date
  end
end
