class CreateStaticContents < ActiveRecord::Migration
  def change
    create_table :static_contents do |t|
      t.string :directory
      t.string :page
      t.string :content

      t.timestamps null: false
    end
  end
end
