class AddPhoneToOrders < ActiveRecord::Migration
  def change
    add_column :orders, :phone, :string
  end
end
