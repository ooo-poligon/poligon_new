class RemoveColumnsFromUser < ActiveRecord::Migration
  def change
    remove_column :users, :address, :string
    remove_column :users, :site, :string
    remove_column :users, :role, :string
  end
end
