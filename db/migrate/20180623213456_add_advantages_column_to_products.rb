class AddAdvantagesColumnToProducts < ActiveRecord::Migration
  def change
    add_column :products, :advantages, :text
  end
end
