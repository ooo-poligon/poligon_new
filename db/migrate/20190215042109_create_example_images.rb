class CreateExampleImages < ActiveRecord::Migration
  def change
    create_table :example_images do |t|
      t.integer :position, default: 0
      t.string :image
      t.string :alt, default: ""
      t.belongs_to :example
      t.timestamps null: false
    end
  end
end
