# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160129080524) do

  create_table "analogs", force: :cascade do |t|
    t.text    "description",  limit: 4294967295
    t.string  "title",        limit: 255
    t.integer "prototype_id", limit: 4
    t.string  "vendor",       limit: 255
  end

  add_index "analogs", ["prototype_id"], name: "FK_4iehqvyabv3avly8x9yqeljno", using: :btree
  add_index "analogs", ["vendor"], name: "FK_bmks6804vphucofa9j6x5kmcx", using: :btree

  create_table "articles", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.text    "description", limit: 4294967295
    t.integer "parent",      limit: 4
    t.string  "title",       limit: 255,        null: false
  end

  create_table "currencies", force: :cascade do |t|
    t.string "title", limit: 255, null: false
  end

  create_table "file_types", force: :cascade do |t|
    t.string "type", limit: 255, null: false
  end

  create_table "files", force: :cascade do |t|
    t.string  "description",  limit: 255
    t.string  "name",         limit: 255
    t.string  "path",         limit: 255
    t.integer "file_type_id", limit: 4
    t.integer "owner_id",     limit: 4
  end

  add_index "files", ["file_type_id"], name: "FK_63xcug2xhs8fhmde2qrls55rn", using: :btree
  add_index "files", ["owner_id"], name: "FK_5ok1awgnfwcf01537ylbycyq1", using: :btree

  create_table "functions", force: :cascade do |t|
    t.text    "description",     limit: 4294967295
    t.string  "picture_name",    limit: 255
    t.string  "picture_path",    limit: 255
    t.string  "symbol",          limit: 255
    t.string  "title",           limit: 255,        null: false
    t.integer "product_kind_id", limit: 4
  end

  add_index "functions", ["product_kind_id"], name: "FK_ddj46cl3uvc0b1t7x355xsp2f", using: :btree

  create_table "import_fields", force: :cascade do |t|
    t.string "field",     limit: 255, null: false
    t.string "tableName", limit: 255, null: false
    t.string "title",     limit: 255, null: false
  end

  create_table "kinds_types", force: :cascade do |t|
    t.integer "product_kind_id",  limit: 4, null: false
    t.integer "property_type_id", limit: 4, null: false
  end

  add_index "kinds_types", ["product_kind_id"], name: "FK_ljqwt99hy4sw0iay2krdx0ju5", using: :btree
  add_index "kinds_types", ["property_type_id"], name: "FK_kcnb5et5freqtj3a4s30ksdh3", using: :btree

  create_table "news_items", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "product_kinds", force: :cascade do |t|
    t.string "title", limit: 255, null: false
  end

  create_table "products", force: :cascade do |t|
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
  end

  add_index "products", ["category_id"], name: "FK_of5oeawsy50x878ic9tyapdnv", using: :btree
  add_index "products", ["product_kind_id"], name: "FK_ga42cu8ch92tuig4t8oo06hn8", using: :btree
  add_index "products", ["serie"], name: "FK_ni7gdwd360jaafq7b7m1gug4v", using: :btree
  add_index "products", ["vendor"], name: "FK_h9ix3xgma67xlseqy1hap6rfa", using: :btree

  create_table "products_functions", force: :cascade do |t|
    t.integer "function_id", limit: 4, null: false
    t.integer "product_id",  limit: 4, null: false
  end

  add_index "products_functions", ["function_id"], name: "FK_ji9wg7e6urg44oobunhssp4sg", using: :btree
  add_index "products_functions", ["product_id"], name: "FK_9v5pxo1cd2nvrni8ihc3390x5", using: :btree

  create_table "properties", force: :cascade do |t|
    t.string  "title",            limit: 255
    t.integer "product_id",       limit: 4
    t.integer "property_type_id", limit: 4,   null: false
    t.integer "value_id",         limit: 4
  end

  add_index "properties", ["product_id"], name: "FK_9igpep0fc0ccn6ufp49qb0d3l", using: :btree
  add_index "properties", ["property_type_id"], name: "FK_96042v65bcon50fh4tjf3alxk", using: :btree

  create_table "property_types", force: :cascade do |t|
    t.integer "parent", limit: 4
    t.string  "title",  limit: 255, null: false
  end

  create_table "quantity", force: :cascade do |t|
    t.integer "minimum",         limit: 4, null: false
    t.integer "ordered",         limit: 4, null: false
    t.integer "pieces_per_pack", limit: 4, null: false
    t.integer "reserved",        limit: 4, null: false
    t.integer "stock",           limit: 4, null: false
    t.integer "product_id",      limit: 4
  end

  add_index "quantity", ["product_id"], name: "FK_fmxkkqbgn373sbv3ghbdinqkx", using: :btree

  create_table "series", force: :cascade do |t|
    t.text    "description", limit: 4294967295
    t.string  "title",       limit: 255
    t.integer "vendor_id",   limit: 4,          null: false
  end

  add_index "series", ["title"], name: "UK_hsvdwda43ces5322tlgcgl4sk", unique: true, using: :btree
  add_index "series", ["vendor_id"], name: "FK_ed8kdle1myybdci4nfqw6wftk", using: :btree

  create_table "settings", force: :cascade do |t|
    t.integer "int_value",  limit: 4
    t.string  "kind",       limit: 255, null: false
    t.string  "text_value", limit: 255
    t.string  "title",      limit: 255, null: false
  end

  create_table "vendors", force: :cascade do |t|
    t.text    "address",     limit: 4294967295
    t.text    "description", limit: 4294967295
    t.float   "rate",        limit: 53
    t.string  "title",       limit: 255,        null: false
    t.integer "currency_id", limit: 4
  end

  add_index "vendors", ["currency_id"], name: "FK_nsbv37hiaemev6th5cuqgs6aa", using: :btree
  add_index "vendors", ["title"], name: "UK_33oxww6kw5ov79h6q8pd0wm5b", unique: true, using: :btree

  add_foreign_key "analogs", "products", column: "prototype_id", name: "FK_4iehqvyabv3avly8x9yqeljno"
  add_foreign_key "analogs", "vendors", column: "vendor", primary_key: "title", name: "FK_bmks6804vphucofa9j6x5kmcx"
  add_foreign_key "files", "file_types", name: "FK_63xcug2xhs8fhmde2qrls55rn"
  add_foreign_key "files", "products", column: "owner_id", name: "FK_5ok1awgnfwcf01537ylbycyq1"
  add_foreign_key "functions", "product_kinds", name: "FK_ddj46cl3uvc0b1t7x355xsp2f"
  add_foreign_key "kinds_types", "product_kinds", name: "FK_ljqwt99hy4sw0iay2krdx0ju5"
  add_foreign_key "kinds_types", "property_types", name: "FK_kcnb5et5freqtj3a4s30ksdh3"
  add_foreign_key "products", "categories", name: "FK_of5oeawsy50x878ic9tyapdnv"
  add_foreign_key "products", "product_kinds", name: "FK_ga42cu8ch92tuig4t8oo06hn8"
  add_foreign_key "products", "series", column: "serie", primary_key: "title", name: "FK_ni7gdwd360jaafq7b7m1gug4v"
  add_foreign_key "products", "vendors", column: "vendor", primary_key: "title", name: "FK_h9ix3xgma67xlseqy1hap6rfa"
  add_foreign_key "products_functions", "functions", name: "FK_ji9wg7e6urg44oobunhssp4sg"
  add_foreign_key "products_functions", "products", name: "FK_9v5pxo1cd2nvrni8ihc3390x5"
  add_foreign_key "properties", "products", name: "FK_9igpep0fc0ccn6ufp49qb0d3l"
  add_foreign_key "properties", "property_types", name: "FK_96042v65bcon50fh4tjf3alxk"
  add_foreign_key "quantity", "products", name: "FK_fmxkkqbgn373sbv3ghbdinqkx"
  add_foreign_key "series", "vendors", name: "FK_ed8kdle1myybdci4nfqw6wftk"
  add_foreign_key "vendors", "currencies", name: "FK_nsbv37hiaemev6th5cuqgs6aa"
end
