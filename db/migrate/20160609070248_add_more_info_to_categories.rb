class AddMoreInfoToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :more_info, :string
  end
end
