class AddStartedToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :started, :boolean
  end
end
