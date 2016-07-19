class CreatePropertyKinds < ActiveRecord::Migration
  def change
    create_table :property_kinds do |t|
      t.string :title

      t.timestamps null: false
    end
  end
end
