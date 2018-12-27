class RemoveFieldsFromProducts < ActiveRecord::Migration
  def change
    remove_column :products, :rub_supplier_price
    remove_column :products, :rub_base_price
  end
end
