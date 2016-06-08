class CreateOffers < ActiveRecord::Migration
  def change
    create_table :offers do |t|
      t.string :title
      t.text :descripiton
      t.string :image_path
      t.boolean :available
      t.date :begin_date
      t.date :expiration_date
      t.string :landing_page_url

      t.timestamps null: false
    end
  end
end
