class CreateSearchKeywords < ActiveRecord::Migration
  def change
    create_table :search_keywords do |t|
      t.string :title
      t.timestamps null: false
    end
  end
end
