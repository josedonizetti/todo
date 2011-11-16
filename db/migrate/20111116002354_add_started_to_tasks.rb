class AddStartedToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :started, :boolean, :default => 0
  end
end
