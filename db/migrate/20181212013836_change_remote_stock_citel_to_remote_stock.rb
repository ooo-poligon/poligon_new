class ChangeRemoteStockCitelToRemoteStock < ActiveRecord::Migration
  def up
    rename_column :products, :remote_stock_citel, :remote_stock
  end
  def down
    rename_column :products, :remote_stock, :remote_stock_citel
  end
end