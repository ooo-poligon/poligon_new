class CreateContactAttachments < ActiveRecord::Migration
  def change
    create_table :contact_attachments do |t|
      t.string :file

      t.belongs_to :contact
      t.timestamps null: false
    end
  end
end
