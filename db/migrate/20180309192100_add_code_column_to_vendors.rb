class AddCodeColumnToVendors < ActiveRecord::Migration
  def change
    add_column :vendors, :code, :integer
  end
end
