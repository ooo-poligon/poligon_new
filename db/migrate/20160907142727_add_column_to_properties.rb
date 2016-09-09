class AddColumnToProperties < ActiveRecord::Migration
  def change
    add_column :properties, :order, :integer
  end
end
