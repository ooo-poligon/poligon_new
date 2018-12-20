class AddAdvantageToProducts < ActiveRecord::Migration
  def change
    add_reference :products, :advantage, index: true
  end
end
