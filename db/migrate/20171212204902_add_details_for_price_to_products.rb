class AddDetailsForPriceToProducts < ActiveRecord::Migration
  def change
     add_column :products, :base_price, :float
     add_column :products, :supplier_price, :float
     add_column :products, :rrp, :float
     add_column :products, :special_price, :float
     add_column :products, :opt_price, :float
     add_column :products, :price_10, :float
     add_column :products, :dealer_price, :float
     add_column :products, :rs_price_1, :float
     add_column :products, :rs_price_2, :float
     add_column :products, :rs_price_3, :float
     add_column :products, :rs_price_4, :float
     add_column :products, :rs_price_5, :float
     add_column :products, :rub_base_price, :float
  end
end
