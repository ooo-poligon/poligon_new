# -*- encoding : utf-8 -*-
class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.string :title
      t.text :short_description
      t.string :image_url
      t.decimal :retail_price

      t.timestamps
    end
  end
end
