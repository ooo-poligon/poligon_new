class CreateFarnellKeys < ActiveRecord::Migration
  def change
    create_table :farnell_keys do |t|
      t.string :api_key

      t.timestamps null: false
    end
  end
end
