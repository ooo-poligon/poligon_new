class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :title
      t.string :address
      t.string :phone
      t.string :email
      t.string :site
      t.boolean :dealer

      t.timestamps null: false
    end
  end
end
