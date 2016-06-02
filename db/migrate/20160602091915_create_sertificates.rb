class CreateSertificates < ActiveRecord::Migration
  def change
    create_table :sertificates do |t|
      t.belongs_to :vendor, index: true
      t.string :title
      t.text :description
      t.string :image_path
      t.string :pdf_path
      t.string :doc_type
      t.date   :creation_date
      t.date   :expiration_date

      t.timestamps null: false
    end
  end
end
