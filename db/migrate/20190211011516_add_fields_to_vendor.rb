class AddFieldsToVendor < ActiveRecord::Migration
  def change
    add_column :vendors, :status_text, :string, default: ""
    add_column :vendors, :status_link, :string, default: ""
  end
end
