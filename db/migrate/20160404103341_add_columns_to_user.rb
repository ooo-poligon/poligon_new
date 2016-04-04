class AddColumnsToUser < ActiveRecord::Migration
  def change
    add_column :users, :fax, :string
    add_column :users, :position, :string
    add_reference :users, :company, index: true, foreign_key: true
    add_reference :users, :group, index: true, foreign_key: true
  end
end
