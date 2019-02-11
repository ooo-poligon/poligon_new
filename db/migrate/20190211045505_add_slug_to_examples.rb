class AddSlugToExamples < ActiveRecord::Migration
  def change
    add_column :examples, :slug, :string
    add_index :examples, :slug, unique: true
  end
end
