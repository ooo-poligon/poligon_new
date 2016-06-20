class CreateCategories < ActiveRecord::Migration
  def change
    create_table :categories do |t|
      t.integer "parent"
      t.string  "title"
      t.text    "description"
      t.integer "published"
      t.string  "image_path"
      t.string  "more_info"
    end

    add_index "categories", ["title"], name: "title", unique: true, using: :btree
  end
end
