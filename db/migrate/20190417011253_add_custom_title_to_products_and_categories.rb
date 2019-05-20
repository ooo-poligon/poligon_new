class AddCustomTitleToProductsAndCategories < ActiveRecord::Migration
  def change
    add_column :products, :custom_title, :string
    add_column :categories, :custom_title, :string
  end
end
