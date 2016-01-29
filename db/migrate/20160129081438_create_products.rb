class CreateProducts < ActiveRecord::Migration
  def change
    create_table :products do |t|
      t.integer "accessory_owner_id", limit: 4,          null: false
      t.text    "anons",              limit: 4294967295
      t.string  "article",            limit: 255
      t.integer "available",          limit: 4
      t.text    "delivery_time",      limit: 4294967295
      t.text    "description",        limit: 4294967295
      t.float   "discount1",          limit: 53
      t.float   "discount2",          limit: 53
      t.float   "discount3",          limit: 53
      t.string  "ean",                limit: 255
      t.integer "outdated",           limit: 4
      t.integer "plugin_owner_id",    limit: 4,          null: false
      t.float   "price",              limit: 53,         null: false
      t.float   "rate",               limit: 53
      t.string  "title",              limit: 255,        null: false
      t.integer "category_id",        limit: 4
      t.integer "product_kind_id",    limit: 4,          null: false
      t.string  "serie",              limit: 255
      t.string  "vendor",             limit: 255      
      t.timestamps null: false
    end
  end
end
