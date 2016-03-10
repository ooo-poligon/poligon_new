class CreateAdditions < ActiveRecord::Migration
  def change
    create_table :additions do |t|
      t.string :title
      t.text :content

      t.timestamps null: false
    end
  end
end
