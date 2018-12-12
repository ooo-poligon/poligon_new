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

ActiveRecord::Schema.define(version: 20181212121110) do

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

  create_table "booklets", force: :cascade do |t|
    t.string   "title",         limit: 255
    t.text     "description",   limit: 65535
    t.string   "image",         limit: 255
    t.string   "file",          limit: 255
    t.boolean  "print_version"
    t.boolean  "vendor_show"
    t.integer  "block_size",    limit: 4
    t.string   "block_color",   limit: 255
    t.string   "border_color",  limit: 255
    t.integer  "position",      limit: 4
    t.integer  "vendor_id",     limit: 4
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
  end

  create_table "carts", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.integer "parent",                limit: 4
    t.string  "title",                 limit: 255,   default: "", null: false
    t.text    "description",           limit: 65535
    t.integer "published",             limit: 4,     default: 0,  null: false
    t.integer "sorting",               limit: 4,     default: 0,  null: false
    t.integer "contained_in_the_file", limit: 4,     default: 0,  null: false
    t.string  "image_path",            limit: 255
    t.text    "more_info",             limit: 65535
    t.text    "summary",               limit: 65535
    t.string  "slug",                  limit: 255
  end

  add_index "categories", ["slug"], name: "index_categories_on_slug", unique: true, using: :btree
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

  create_table "examples", force: :cascade do |t|
    t.integer  "scope_id",       limit: 4
    t.integer  "product_id",     limit: 4
    t.string   "title",          limit: 255
    t.text     "issue",          limit: 65535
    t.text     "solution",       limit: 65535
    t.datetime "created_at",                   null: false
    t.datetime "updated_at",                   null: false
    t.string   "example_images", limit: 255
  end

  add_index "examples", ["product_id"], name: "index_examples_on_product_id", using: :btree
  add_index "examples", ["scope_id"], name: "index_examples_on_scope_id", using: :btree

  create_table "examples_product_groups", id: false, force: :cascade do |t|
    t.integer "example_id",       limit: 4
    t.integer "product_group_id", limit: 4
  end

  create_table "examples_tags", id: false, force: :cascade do |t|
    t.integer "example_id", limit: 4, null: false
    t.integer "tag_id",     limit: 4, null: false
  end

  add_index "examples_tags", ["example_id", "tag_id"], name: "index_examples_tags_on_example_id_and_tag_id", using: :btree
  add_index "examples_tags", ["tag_id", "example_id"], name: "index_examples_tags_on_tag_id_and_example_id", using: :btree

  create_table "farnell_keys", force: :cascade do |t|
    t.string   "api_key",    limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

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

  create_table "line_items", force: :cascade do |t|
    t.integer  "product_id", limit: 4
    t.integer  "cart_id",    limit: 4
    t.datetime "created_at",                                               null: false
    t.datetime "updated_at",                                               null: false
    t.integer  "quantity",   limit: 4,                         default: 1
    t.integer  "order_id",   limit: 4
    t.decimal  "price",                precision: 8, scale: 2
    t.integer  "overflow",   limit: 4
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

  create_table "orders", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.text     "address",    limit: 65535
    t.string   "email",      limit: 255
    t.string   "pay_type",   limit: 255
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "phone",      limit: 255
  end

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

  create_table "product_groups", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "product_kinds", force: :cascade do |t|
    t.string "title", limit: 255
  end

  create_table "product_kinds_copy1", force: :cascade do |t|
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
    t.integer "number_card_1c",     limit: 4
    t.string  "title",              limit: 255,   default: "",  null: false
    t.string  "article",            limit: 255
    t.text    "description",        limit: 65535
    t.text    "anons",              limit: 65535
    t.integer "category_id",        limit: 4
    t.text    "full_description",   limit: 65535
    t.integer "available",          limit: 4
    t.text    "delivery_time",      limit: 65535
    t.string  "ean",                limit: 255
    t.integer "outdated",           limit: 4
    t.integer "series_item_id",     limit: 4
    t.integer "product_kind_id",    limit: 4,     default: 1
    t.integer "plugin_owner_id",    limit: 4,     default: 1,   null: false
    t.integer "currency_id",        limit: 4,     default: 1,   null: false
    t.integer "accessory_owner_id", limit: 4,     default: 0,   null: false
    t.string  "serie",              limit: 255
    t.integer "sorting",            limit: 4,     default: 0,   null: false
    t.integer "minimum_stock",      limit: 4,     default: 0,   null: false
    t.integer "ordered_on_stock",   limit: 4,     default: 0,   null: false
    t.integer "pieces_per_pack",    limit: 4,     default: 0,   null: false
    t.integer "reserved",           limit: 4,     default: 0,   null: false
    t.integer "stock",              limit: 4,     default: 0,   null: false
    t.integer "remote_stock",       limit: 4,     default: 0,   null: false
    t.integer "rs_stock_1",         limit: 4,     default: 0,   null: false
    t.integer "rs_stock_2",         limit: 4,     default: 0,   null: false
    t.integer "rs_stock_3",         limit: 4,     default: 0,   null: false
    t.integer "rs_stock_4",         limit: 4,     default: 0,   null: false
    t.integer "rs_stock_5",         limit: 4,     default: 0,   null: false
    t.float   "supplier_price",     limit: 24,    default: 0.0, null: false
    t.float   "dealer_price",       limit: 24,    default: 0.0, null: false
    t.float   "price_10",           limit: 24,    default: 0.0, null: false
    t.float   "opt_price",          limit: 24,    default: 0.0, null: false
    t.float   "special_price",      limit: 24,    default: 0.0, null: false
    t.float   "base_price",         limit: 24,    default: 0.0, null: false
    t.float   "rub_supplier_price", limit: 24,    default: 0.0, null: false
    t.float   "rub_base_price",     limit: 24,    default: 0.0, null: false
    t.float   "rs_price_1",         limit: 24,    default: 0.0, null: false
    t.float   "rs_price_2",         limit: 24,    default: 0.0, null: false
    t.float   "rs_price_3",         limit: 24,    default: 0.0, null: false
    t.float   "rs_price_4",         limit: 24,    default: 0.0, null: false
    t.float   "rs_price_5",         limit: 24,    default: 0.0, null: false
    t.string  "image_name_1",       limit: 70
    t.string  "image_name_2",       limit: 70
    t.string  "image_name_3",       limit: 70
    t.string  "image_name_4",       limit: 70
    t.string  "image_name_5",       limit: 70
    t.string  "pdf_name",           limit: 70
    t.string  "plug_image_1",       limit: 70
    t.string  "plug_image_2",       limit: 70
    t.string  "plug_image_3",       limit: 70
    t.string  "plug_image_4",       limit: 70
    t.string  "plug_image_5",       limit: 70
    t.string  "dimension_image_1",  limit: 70
    t.string  "dimension_image_2",  limit: 70
    t.integer "vendor_id",          limit: 4
    t.string  "another_title",      limit: 75
    t.string  "vendor",             limit: 255
    t.integer "special_offer",      limit: 4,     default: 0
    t.integer "analog_1",           limit: 4,     default: 0
    t.integer "analog_2",           limit: 4,     default: 0
    t.integer "analog_3",           limit: 4,     default: 0
    t.integer "analog_4",           limit: 4,     default: 0
    t.integer "analog_5",           limit: 4,     default: 0
    t.integer "acсessories_1",      limit: 4,     default: 0
    t.integer "acсessories_2",      limit: 4,     default: 0
    t.integer "acсessories_3",      limit: 4,     default: 0
    t.integer "acсessories_4",      limit: 4,     default: 0
    t.integer "acсessories_5",      limit: 4,     default: 0
    t.text    "comment",            limit: 65535
    t.string  "price_date",         limit: 50
    t.string  "slug",               limit: 255
    t.text    "advantages",         limit: 65535
    t.integer "quantity",           limit: 4,     default: 0
  end

  add_index "products", ["category_id"], name: "FK_of5oeawsy50x878ic9tyapdnv", using: :btree
  add_index "products", ["currency_id"], name: "FK_products_currencies", using: :btree
  add_index "products", ["product_kind_id"], name: "FK_products_product_kinds", using: :btree
  add_index "products", ["serie"], name: "FK_ni7gdwd360jaafq7b7m1gug4v", using: :btree
  add_index "products", ["slug"], name: "index_products_on_slug", unique: true, using: :btree
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

  create_table "products_copy", force: :cascade do |t|
    t.integer "number_card_1c",     limit: 4
    t.string  "title",              limit: 255,   default: "",  null: false
    t.string  "article",            limit: 255
    t.text    "description",        limit: 65535
    t.text    "anons",              limit: 65535
    t.integer "category_id",        limit: 4
    t.text    "full_description",   limit: 65535
    t.integer "available",          limit: 4
    t.text    "delivery_time",      limit: 65535
    t.string  "ean",                limit: 255
    t.integer "outdated",           limit: 4
    t.integer "series_item_id",     limit: 4
    t.integer "product_kind_id",    limit: 4,     default: 1
    t.integer "plugin_owner_id",    limit: 4,     default: 1,   null: false
    t.integer "currency_id",        limit: 4,     default: 1,   null: false
    t.integer "accessory_owner_id", limit: 4,     default: 0,   null: false
    t.string  "serie",              limit: 255
    t.integer "sorting",            limit: 4,     default: 0,   null: false
    t.integer "minimum_stock",      limit: 4,     default: 0,   null: false
    t.integer "ordered_on_stock",   limit: 4,     default: 0,   null: false
    t.integer "pieces_per_pack",    limit: 4,     default: 0,   null: false
    t.integer "reserved",           limit: 4,     default: 0,   null: false
    t.integer "stock",              limit: 4,     default: 0,   null: false
    t.integer "remote_stock_citel", limit: 4,     default: 0,   null: false
    t.integer "rs_stock_1",         limit: 4,     default: 0,   null: false
    t.integer "rs_stock_2",         limit: 4,     default: 0,   null: false
    t.integer "rs_stock_3",         limit: 4,     default: 0,   null: false
    t.integer "rs_stock_4",         limit: 4,     default: 0,   null: false
    t.integer "rs_stock_5",         limit: 4,     default: 0,   null: false
    t.float   "supplier_price",     limit: 24,    default: 0.0, null: false
    t.float   "dealer_price",       limit: 24,    default: 0.0, null: false
    t.float   "price_10",           limit: 24,    default: 0.0, null: false
    t.float   "opt_price",          limit: 24,    default: 0.0, null: false
    t.float   "special_price",      limit: 24,    default: 0.0, null: false
    t.float   "base_price",         limit: 24,    default: 0.0, null: false
    t.float   "rub_supplier_price", limit: 24,    default: 0.0, null: false
    t.float   "rub_base_price",     limit: 24,    default: 0.0, null: false
    t.float   "rs_price_1",         limit: 24,    default: 0.0, null: false
    t.float   "rs_price_2",         limit: 24,    default: 0.0, null: false
    t.float   "rs_price_3",         limit: 24,    default: 0.0, null: false
    t.float   "rs_price_4",         limit: 24,    default: 0.0, null: false
    t.float   "rs_price_5",         limit: 24,    default: 0.0, null: false
    t.string  "image_name_1",       limit: 70
    t.string  "image_name_2",       limit: 70
    t.string  "image_name_3",       limit: 70
    t.string  "image_name_4",       limit: 70
    t.string  "image_name_5",       limit: 70
    t.string  "pdf_name",           limit: 70
    t.string  "plug_image_1",       limit: 70
    t.string  "plug_image_2",       limit: 70
    t.string  "plug_image_3",       limit: 70
    t.string  "plug_image_4",       limit: 70
    t.string  "plug_image_5",       limit: 70
    t.string  "dimension_image_1",  limit: 70
    t.string  "dimension_image_2",  limit: 70
    t.integer "vendor_id",          limit: 4
    t.string  "another_title",      limit: 75
    t.string  "vendor",             limit: 255
    t.integer "special_offer",      limit: 4,     default: 0
    t.integer "analog_1",           limit: 4,     default: 0
    t.integer "analog_2",           limit: 4,     default: 0
    t.integer "analog_3",           limit: 4,     default: 0
    t.integer "analog_4",           limit: 4,     default: 0
    t.integer "analog_5",           limit: 4,     default: 0
    t.integer "acсessories_1",      limit: 4,     default: 0
    t.integer "acсessories_2",      limit: 4,     default: 0
    t.integer "acсessories_3",      limit: 4,     default: 0
    t.integer "acсessories_4",      limit: 4,     default: 0
    t.integer "acсessories_5",      limit: 4,     default: 0
    t.text    "comment",            limit: 65535
    t.string  "price_date",         limit: 50
    t.string  "slug",               limit: 255
  end

  add_index "products_copy", ["category_id"], name: "FK_of5oeawsy50x878ic9tyapdnv", using: :btree
  add_index "products_copy", ["currency_id"], name: "FK_products_currencies", using: :btree
  add_index "products_copy", ["product_kind_id"], name: "FK_products_product_kinds", using: :btree
  add_index "products_copy", ["serie"], name: "FK_ni7gdwd360jaafq7b7m1gug4v", using: :btree
  add_index "products_copy", ["slug"], name: "index_products_on_slug", unique: true, using: :btree
  add_index "products_copy", ["vendor"], name: "FK_h9ix3xgma67xlseqy1hap6rfa", using: :btree
  add_index "products_copy", ["vendor_id"], name: "index_products_on_vendor_id", using: :btree

  create_table "products_functions", force: :cascade do |t|
    t.integer "product_id",  limit: 4, default: 0, null: false
    t.integer "function_id", limit: 4, default: 0, null: false
  end

  add_index "products_functions", ["function_id"], name: "FK_products_functions_functions", using: :btree
  add_index "products_functions", ["product_id"], name: "FK_products_functions_products", using: :btree

  create_table "properties", force: :cascade do |t|
    t.integer "order_number",    limit: 4,   default: 0, null: false
    t.string  "title",           limit: 255
    t.string  "optional",        limit: 255
    t.string  "symbol",          limit: 255
    t.integer "product_kind_id", limit: 4
  end

  add_index "properties", ["product_kind_id"], name: "index_properties_on_product_kind_id", using: :btree

  create_table "properties_copy", force: :cascade do |t|
    t.integer "order_number",    limit: 4
    t.string  "title",           limit: 255
    t.string  "optional",        limit: 255
    t.string  "symbol",          limit: 255
    t.integer "product_kind_id", limit: 4
  end

  add_index "properties_copy", ["product_kind_id"], name: "index_properties_on_product_kind_id", using: :btree

  create_table "property_kinds", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "property_types", force: :cascade do |t|
    t.string   "title",      limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "property_values", force: :cascade do |t|
    t.string  "value",       limit: 255
    t.integer "property_id", limit: 4
    t.integer "product_id",  limit: 4
  end

  add_index "property_values", ["product_id"], name: "Индекс 4", using: :btree
  add_index "property_values", ["property_id"], name: "Индекс 3", using: :btree

  create_table "property_values_copy", force: :cascade do |t|
    t.string  "value",       limit: 255
    t.integer "property_id", limit: 4
    t.integer "product_id",  limit: 4
  end

  add_index "property_values_copy", ["product_id"], name: "Индекс 4", using: :btree
  add_index "property_values_copy", ["property_id"], name: "Индекс 3", using: :btree

  create_table "reviews", force: :cascade do |t|
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.string   "title",      limit: 255
    t.text     "content",    limit: 65535
    t.string   "image_path", limit: 255
  end

  create_table "scopes", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
  end

  create_table "sertificates", force: :cascade do |t|
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

  add_index "sertificates", ["vendor_id"], name: "index_sertificates_on_vendor_id", using: :btree

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

  create_table "tags", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at",             null: false
    t.datetime "updated_at",             null: false
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
    t.integer  "role",                limit: 4,   default: 0
  end

  add_index "users", ["company_id"], name: "index_users_on_company_id", using: :btree
  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["group_id"], name: "index_users_on_group_id", using: :btree

  create_table "vendors", force: :cascade do |t|
    t.string  "title",       limit: 255,                     null: false
    t.text    "address",     limit: 4294967295
    t.text    "description", limit: 4294967295
    t.text    "status",      limit: 4294967295,              null: false
    t.text    "statuslink",  limit: 4294967295,              null: false
    t.text    "folder_name", limit: 4294967295
    t.float   "rate",        limit: 53
    t.integer "currency_id", limit: 4
    t.integer "code",        limit: 4
    t.string  "logo",        limit: 255,        default: "", null: false
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

end
