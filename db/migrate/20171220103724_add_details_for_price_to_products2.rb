class AddDetailsForPriceToProducts2 < ActiveRecord::Migration
   def change
     add_column :products, :new_supplier_price, :float
     add_column :products, :comments_price, :string
     end
end
