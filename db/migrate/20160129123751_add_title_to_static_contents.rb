class AddTitleToStaticContents < ActiveRecord::Migration
  def change
    add_column :static_contents, :title, :string
  end
end
