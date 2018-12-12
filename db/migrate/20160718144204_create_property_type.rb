class CreatePropertyType < ActiveRecord::Migration
  def change
    create_table :property_types do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
