class CreateSliderItems < ActiveRecord::Migration
  def change
    create_table :slider_items do |t|
      t.string :image
      t.string :url
      t.timestamps null: false
    end
  end
end
