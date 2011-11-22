class AddVisibleToTasks < ActiveRecord::Migration
  def change
    add_column :tasks, :visible, :boolean, :default => true
  end
end
