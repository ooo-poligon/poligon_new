class AddOverflowToLineItems < ActiveRecord::Migration
  def change
    add_column :line_items, :overflow, :integer
  end
end
