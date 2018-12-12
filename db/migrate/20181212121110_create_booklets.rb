class CreateBooklets < ActiveRecord::Migration
  def change
    create_table :booklets do |t|
      t.string :title
      t.text :description

      t.string :image
      t.string :file

      t.boolean :print_version
      t.boolean :vendor_show

      t.integer :block_size
      
      t.string :block_color
      t.string :border_color

      t.integer :position

      t.belongs_to :vendor
      t.timestamps null: false
    end
  end
end