class AddNewFieldsToProducts < ActiveRecord::Migration
  def change
    add_column :products, :energoportal, :integer, default: 0
    add_column :products, :elec_ru, :integer, default: 0
    add_column :products, :efind, :integer, default: 0
    add_column :products, :portal1, :integer, default: 0
    add_column :products, :portal2, :integer, default: 0
    add_column :products, :portal3, :integer, default: 0
    add_column :products, :portal4, :integer, default: 0
    add_column :products, :portal5, :integer, default: 0
    add_column :products, :portal_price, :integer, default: 0
    add_column :products, :portal_category, :string
    add_column :products, :portal_description, :string
    add_column :products, :dealer_selection_1, :integer, default: 0
    add_column :products, :dealer_selection_2, :integer, default: 0
  end
end
