class AddNewFields < ActiveRecord::Migration
  def change
    add_column :properties, :parent_id, :integer
    add_column :properties, :composite, :integer
    add_column :properties, :multiple, :integer
    rename_column :properties, :order_number, :sorting
    add_column :property_values, :composite_to_id, :integer
  end
end
