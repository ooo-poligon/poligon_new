class AddColumnsToTickets < ActiveRecord::Migration
  def change
    add_column :tickets, :title, :string
    add_reference :tickets, :user, index: true, foreign_key: true
  end
end
