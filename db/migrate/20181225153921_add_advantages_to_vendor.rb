class AddAdvantagesToVendor < ActiveRecord::Migration
  def change
   add_column :vendors, :advantages, :string, default: ""
  end
end
