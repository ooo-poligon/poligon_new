class AddLogoColumnToVendors < ActiveRecord::Migration
  def change
    add_column :vendors, :logo, :string
  end
end
