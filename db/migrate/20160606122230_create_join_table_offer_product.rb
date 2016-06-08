class CreateJoinTableOfferProduct < ActiveRecord::Migration
  def change
    create_join_table :offers, :products do |t|
      t.index :offer_id
      t.index :product_id
    end
  end
end
