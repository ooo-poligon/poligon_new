class AddDealerPriceColumnToProducts < ActiveRecord::Migration
  def change
    add_column :products, :dealer_price2, :float
  end
end
