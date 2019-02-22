class AddDeliveryProgramToVendor < ActiveRecord::Migration
  def change
    add_column :vendors, :delivery_program, :integer, default: 0
  end
end
