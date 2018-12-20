class CreateContacts < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :name, default: ""
      t.string :phone, default: ""
      t.string :email, default: ""
      t.string :message, default: ""

      t.timestamps null: false
    end
  end
end
