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

ActiveRecord::Schema.define(version: 20160926114911) do

  create_table "additions", force: :cascade do |t|
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
    t.string   "title",      limit: 255
    t.text     "content",    limit: 4294967295
    t.string   "image_path", limit: 255
  end

  create_table "analogs", force: :cascade do |t|
    t.text    "title",        limit: 16777215
    t.string  "vendor",       limit: 255
    t.text    "description",  limit: 16777215
    t.text    "addition",     limit: 16777215
    t.integer "prototype_id", limit: 4
    t.string  "prototype",    limit: 50
  end

  add_index "analogs", ["prototype_id"], name: "FK_4iehqvyabv3avly8x9yqeljno", using: :btree
  add_index "analogs", ["vendor"], name: "FK_bmks6804vphucofa9j6x5kmcx", using: :btree

  create_table "analogs_variants", force: :cascade do |t|
    t.text    "title",     limit: 65535, null: false
    t.integer "analog_id", limit: 4,     null: false
  end

  create_table "articles", force: :cascade do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "title",      limit: 255
    t.text     "content",    limit: 65535
    t.string   "image_path", limit: 255
  end

  create_table "categories", force: :cascade do |t|
    t.integer "parent",      limit: 4
    t.string  "title",       limit: 255,   default: "", null: false
    t.text    "description", limit: 65535
    t.integer "published",   limit: 4,     default: 1
    t.string  "image_path",  limit: 255
    t.text    "more_info",   limit: 65535
    t.text    "summary",     limit: 65535
  end

  add_index "categories", ["title"], name: "title", unique: true, using: :btree

  create_table "certificates", force: :cascade do |t|
    t.integer  "vendor_id",       limit: 4
    t.string   "title",           limit: 255
    t.text     "description",     limit: 65535
    t.string   "image_path",      limit: 255
    t.string   "pdf_path",        limit: 255
    t.string   "doc_type",        limit: 255
    t.date     "creation_date"
    t.date     "expiration_date"
    t.datetime "created_at",                    null: false
    t.datetime "updated_at",                    null: false
  end

  add_index "certificates", ["vendor_id"], name: "index_certificates_on_vendor_id", using: :btree

  create_table "companies", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.string   "address",    limit: 255
    t.string   "phone",      limit: 255
    t.string   "email",      limit: 255
    t.string   "site",       limit: 255
    t.boolean  "dealer"
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "fax",        limit: 255
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
    t.string  "title",           limit: 200,   null: false
    t.string  "symbol",          limit: 10
    t.text    "description",     limit: 65535
    t.string  "picture_name",    limit: 50
    t.string  "picture_path",    limit: 200
    t.integer "vendor_id",       limit: 4
    t.integer "product_kind_id", limit: 4
  end

  add_index "functions", ["product_kind_id"], name: "FK_ddj46cl3uvc0b1t7x355xsp2f", using: :btree
  add_index "functions", ["vendor_id"], name: "FK_paqylsqoi8kvkqxanutgqpg9a", using: :btree

  create_table "functions_product_kinds", id: false, force: :cascade do |t|
    t.integer "function_id",     limit: 4, null: false
    t.integer "product_kind_id", limit: 4, null: false
  end

  create_table "groups", force: :cascade do |t|
    t.string   "title",       limit: 255
    t.string   "description", limit: 255
    t.datetime "created_at",              null: false
    t.datetime "updated_at",              null: false
  end

  create_table "import_fields", force: :cascade do |t|
    t.string "title",     limit: 50,  null: false
    t.string "field",     limit: 255, null: false
    t.string "tableName", limit: 255, null: false
  end

  create_table "kinds_types", force: :cascade do |t|
    t.integer "product_kind_id",  limit: 4, default: 0, null: false
    t.integer "property_type_id", limit: 4, default: 0, null: false
  end

  add_index "kinds_types", ["product_kind_id"], name: "FK__product_kinds", using: :btree
  add_index "kinds_types", ["property_type_id"], name: "FK__property_types", using: :btree

  create_table "measures", force: :cascade do |t|
    t.string "number_code",    limit: 3
    t.string "title",          limit: 50,  null: false
    t.string "symbol_ru",      limit: 50
    t.string "symbol_en",      limit: 50
    t.string "letter_code_ru", limit: 50
    t.string "letter_code_en", limit: 50
    t.string "description",    limit: 255
  end

  create_table "news_items", force: :cascade do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "title",      limit: 255
    t.text     "preview",    limit: 65535
    t.text     "content",    limit: 65535
    t.string   "image_path", limit: 255
  end

  create_table "offers", force: :cascade do |t|
    t.string   "title",            limit: 255
    t.text     "description",      limit: 65535
    t.string   "image_path",       limit: 255
    t.boolean  "available"
    t.date     "begin_date"
    t.date     "expiration_date"
    t.string   "landing_page_url", limit: 255
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
  end

  create_table "offers_products", id: false, force: :cascade do |t|
    t.integer "offer_id",   limit: 4, null: false
    t.integer "product_id", limit: 4, null: false
  end

  add_index "offers_products", ["offer_id"], name: "index_offers_products_on_offer_id", using: :btree
  add_index "offers_products", ["product_id"], name: "index_offers_products_on_product_id", using: :btree

  create_table "post_types", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title",        limit: 255
    t.text     "content",      limit: 65535
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.integer  "post_type_id", limit: 4
    t.integer  "user_id",      limit: 4
    t.integer  "ticket_id",    limit: 4
  end

  add_index "posts", ["post_type_id"], name: "index_posts_on_post_type_id", using: :btree
  add_index "posts", ["ticket_id"], name: "index_posts_on_ticket_id", using: :btree
  add_index "posts", ["user_id"], name: "index_posts_on_user_id", using: :btree

  create_table "product_kinds", force: :cascade do |t|
    t.string "title", limit: 255
  end

  create_table "product_kinds_properties", id: false, force: :cascade do |t|
    t.integer "product_kind_id", limit: 4, null: false
    t.integer "property_id",     limit: 4, null: false
  end

  create_table "product_kinds_property_types", force: :cascade do |t|
    t.integer "product_kind_id",  limit: 4, default: 0, null: false
    t.integer "property_type_id", limit: 4, default: 0, null: false
  end

  add_index "product_kinds_property_types", ["product_kind_id"], name: "FK__product_kinds", using: :btree
  add_index "product_kinds_property_types", ["property_type_id"], name: "FK__property_types", using: :btree

  create_table "products", force: :cascade do |t|
    t.integer "category_id",        limit: 4
    t.string  "title",              limit: 255,        default: "",  null: false
    t.text    "description",        limit: 4294967295
    t.text    "anons",              limit: 4294967295
    t.string  "article",            limit: 255
    t.integer "available",          limit: 4
    t.text    "delivery_time",      limit: 4294967295
    t.string  "ean",                limit: 255
    t.integer "outdated",           limit: 4
    t.float   "price",              limit: 53,                       null: false
    t.integer "series_item_id",     limit: 4
    t.integer "product_kind_id",    limit: 4,          default: 1
    t.integer "vendor_id",          limit: 4
    t.float   "special",            limit: 53,         default: 1.0, null: false
    t.float   "rate",               limit: 53,         default: 1.0, null: false
    t.float   "discount1",          limit: 53,         default: 1.0, null: false
    t.float   "discount2",          limit: 53,         default: 1.0, null: false
    t.float   "discount3",          limit: 53,         default: 1.0, null: false
    t.float   "rub_retail",         limit: 53,         default: 0.0, null: false
    t.integer "plugin_owner_id",    limit: 4,          default: 1,   null: false
    t.integer "currency_id",        limit: 4,          default: 1,   null: false
    t.integer "accessory_owner_id", limit: 4,          default: 0,   null: false
    t.string  "serie",              limit: 255
    t.string  "vendor",             limit: 255
  end

  add_index "products", ["category_id"], name: "FK_of5oeawsy50x878ic9tyapdnv", using: :btree
  add_index "products", ["currency_id"], name: "FK_products_currencies", using: :btree
  add_index "products", ["product_kind_id"], name: "FK_products_product_kinds", using: :btree
  add_index "products", ["serie"], name: "FK_ni7gdwd360jaafq7b7m1gug4v", using: :btree
  add_index "products", ["series_item_id"], name: "index_products_on_serie_id", using: :btree
  add_index "products", ["vendor"], name: "FK_h9ix3xgma67xlseqy1hap6rfa", using: :btree
  add_index "products", ["vendor_id"], name: "index_products_on_vendor_id", using: :btree

  create_table "products_accessories", force: :cascade do |t|
    t.integer "product_id",   limit: 4, default: 0, null: false
    t.integer "accessory_id", limit: 4, default: 0, null: false
  end

  create_table "products_analogs", force: :cascade do |t|
    t.integer "product_id", limit: 4, default: 0, null: false
    t.integer "analog_id",  limit: 4, default: 0, null: false
  end

  create_table "products_functions", force: :cascade do |t|
    t.integer "product_id",  limit: 4, default: 0, null: false
    t.integer "function_id", limit: 4, default: 0, null: false
  end

  add_index "products_functions", ["function_id"], name: "FK_products_functions_functions", using: :btree
  add_index "products_functions", ["product_id"], name: "FK_products_functions_products", using: :btree

  create_table "properties", force: :cascade do |t|
    t.integer "order_number",     limit: 4
    t.string  "title",            limit: 255
    t.string  "optional",         limit: 255
    t.string  "symbol",           limit: 255
    t.integer "property_type_id", limit: 4
    t.integer "product_id",       limit: 4
    t.integer "value_id",         limit: 4
    t.integer "product_kind_id",  limit: 4
  end

  add_index "properties", ["product_id"], name: "FK_9igpep0fc0ccn6ufp49qb0d3l", using: :btree
  add_index "properties", ["product_kind_id"], name: "index_properties_on_product_kind_id", using: :btree
  add_index "properties", ["property_type_id"], name: "FK_96042v65bcon50fh4tjf3alxk", using: :btree
  add_index "properties", ["value_id"], name: "FK_56su5md0fur71f893eef2u1e5", using: :btree

  create_table "property_kinds", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "property_types", force: :cascade do |t|
    t.integer "parent",           limit: 4,   null: false
    t.string  "title",            limit: 255, null: false
    t.integer "property_kind_id", limit: 4
  end

  add_index "property_types", ["property_kind_id"], name: "index_property_types_on_category_id", using: :btree

  create_table "property_values", force: :cascade do |t|
    t.string  "cond",        limit: 255
    t.string  "value",       limit: 255
    t.integer "measure_id",  limit: 4
    t.integer "property_id", limit: 4
    t.integer "product_id",  limit: 4
  end

  add_index "property_values", ["measure_id"], name: "FK_property_values_measures", using: :btree
  add_index "property_values", ["product_id"], name: "FK__products", using: :btree
  add_index "property_values", ["property_id"], name: "FK_property_values_properties", using: :btree

  create_table "quantity", force: :cascade do |t|
    t.integer "minimum",         limit: 4, null: false
    t.integer "ordered",         limit: 4, null: false
    t.integer "pieces_per_pack", limit: 4, null: false
    t.integer "reserved",        limit: 4, null: false
    t.integer "stock",           limit: 4, null: false
    t.integer "product_id",      limit: 4
  end

  add_index "quantity", ["product_id"], name: "FK_fmxkkqbgn373sbv3ghbdinqkx", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "title",      limit: 255
    t.text     "content",    limit: 65535
    t.string   "image_path", limit: 255
  end

  create_table "series", force: :cascade do |t|
    t.text    "description", limit: 4294967295
    t.string  "title",       limit: 255
    t.integer "vendor_id",   limit: 4,          null: false
  end

  add_index "series", ["title"], name: "UK_hsvdwda43ces5322tlgcgl4sk", unique: true, using: :btree
  add_index "series", ["vendor_id"], name: "FK_ed8kdle1myybdci4nfqw6wftk", using: :btree

  create_table "series_items", force: :cascade do |t|
    t.text    "description", limit: 4294967295
    t.string  "title",       limit: 255,                    null: false
    t.integer "vendor_id",   limit: 4,          default: 1
  end

  add_index "series_items", ["title"], name: "UK_hsvdwda43ces5322tlgcgl4sk", unique: true, using: :btree
  add_index "series_items", ["vendor_id"], name: "FK_ed8kdle1myybdci4nfqw6wftk", using: :btree

  create_table "settings", force: :cascade do |t|
    t.string  "title",      limit: 50,             null: false
    t.string  "kind",       limit: 50,             null: false
    t.integer "int_value",  limit: 4,  default: 0
    t.string  "text_value", limit: 50
  end

  create_table "static_contents", force: :cascade do |t|
    t.string   "directory",  limit: 255
    t.string   "page",       limit: 255
    t.text     "content",    limit: 65535
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "title",      limit: 255
  end

  create_table "tickets", force: :cascade do |t|
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
    t.string   "title",      limit: 255
    t.integer  "user_id",    limit: 4
  end

  add_index "tickets", ["user_id"], name: "index_tickets_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "name",                limit: 255, default: ""
    t.string   "phone",               limit: 255, default: ""
    t.string   "email",               limit: 255, default: "", null: false
    t.string   "encrypted_password",  limit: 255, default: "", null: false
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",       limit: 4,   default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",  limit: 255
    t.string   "last_sign_in_ip",     limit: 255
    t.datetime "created_at",                                   null: false
    t.datetime "updated_at",                                   null: false
    t.string   "fax",                 limit: 255
    t.string   "position",            limit: 255
    t.integer  "company_id",          limit: 4
    t.integer  "group_id",            limit: 4
  end

  add_index "users", ["company_id"], name: "index_users_on_company_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["group_id"], name: "index_users_on_group_id", using: :btree

  create_table "vendors", force: :cascade do |t|
    t.string  "title",       limit: 255,        null: false
    t.text    "address",     limit: 4294967295
    t.text    "description", limit: 4294967295
    t.float   "rate",        limit: 53
    t.integer "currency_id", limit: 4
  end

  add_index "vendors", ["currency_id"], name: "FK_nsbv37hiaemev6th5cuqgs6aa", using: :btree
  add_index "vendors", ["title"], name: "UK_33oxww6kw5ov79h6q8pd0wm5b", unique: true, using: :btree

  create_table "videos", force: :cascade do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "title",      limit: 255
    t.text     "content",    limit: 65535
    t.string   "image_path", limit: 255
  end

  add_foreign_key "certificates", "vendors", name: "FK_sertificates_vendors"
  add_foreign_key "files", "file_types", name: "FK_63xcug2xhs8fhmde2qrls55rn"
  add_foreign_key "files", "products", column: "owner_id", name: "FK_5ok1awgnfwcf01537ylbycyq1"
  add_foreign_key "functions", "product_kinds", name: "FK_ddj46cl3uvc0b1t7x355xsp2f"
  add_foreign_key "functions", "vendors", name: "FK_paqylsqoi8kvkqxanutgqpg9a"
  add_foreign_key "kinds_types", "product_kinds", name: "FK__product_kinds", on_update: :cascade, on_delete: :cascade
  add_foreign_key "kinds_types", "property_types", name: "FK__property_types", on_update: :cascade, on_delete: :cascade
  add_foreign_key "posts", "post_types"
  add_foreign_key "posts", "tickets"
  add_foreign_key "posts", "users"
  add_foreign_key "product_kinds_property_types", "product_kinds", name: "product_kinds_property_types_ibfk_1", on_update: :cascade, on_delete: :cascade
  add_foreign_key "product_kinds_property_types", "property_types", name: "product_kinds_property_types_ibfk_2", on_update: :cascade, on_delete: :cascade
  add_foreign_key "products", "categories", name: "FK_products_categories"
  add_foreign_key "products", "currencies", name: "FK_products_currencies"
  add_foreign_key "products", "product_kinds", name: "FK_ga42cu8ch92tuig4t8oo06hn8"
  add_foreign_key "products", "series", column: "serie", primary_key: "title", name: "FK_ni7gdwd360jaafq7b7m1gug4v"
  add_foreign_key "products", "series_items", name: "FK_products_series_2"
  add_foreign_key "products", "vendors", column: "vendor", primary_key: "title", name: "FK_h9ix3xgma67xlseqy1hap6rfa"
  add_foreign_key "products", "vendors", name: "FK_products_vendors"
  add_foreign_key "products_functions", "functions", name: "FK_products_functions_functions", on_update: :cascade, on_delete: :cascade
  add_foreign_key "products_functions", "products", name: "FK_products_functions_products", on_update: :cascade, on_delete: :cascade
  add_foreign_key "properties", "product_kinds"
  add_foreign_key "properties", "products", name: "FK_9igpep0fc0ccn6ufp49qb0d3l"
  add_foreign_key "properties", "property_types", name: "FK_96042v65bcon50fh4tjf3alxk"
  add_foreign_key "properties", "property_values", column: "value_id", name: "FK_56su5md0fur71f893eef2u1e5"
  add_foreign_key "property_types", "property_kinds"
  add_foreign_key "property_values", "measures", name: "FK_property_values_measures"
  add_foreign_key "property_values", "products", name: "FK__products"
  add_foreign_key "property_values", "properties", name: "FK_property_values_properties"
  add_foreign_key "quantity", "products", name: "FK_fmxkkqbgn373sbv3ghbdinqkx"
  add_foreign_key "series", "vendors", name: "FK_ed8kdle1myybdci4nfqw6wftk"
  add_foreign_key "series_items", "vendors", name: "series_items_ibfk_1"
  add_foreign_key "tickets", "users"
  add_foreign_key "users", "companies"
  add_foreign_key "users", "groups"
  add_foreign_key "vendors", "currencies", name: "FK_nsbv37hiaemev6th5cuqgs6aa"
end
