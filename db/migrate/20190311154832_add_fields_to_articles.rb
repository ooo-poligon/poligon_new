class AddFieldsToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :image, :string
    add_column :articles, :image_alt, :string, default: ""
    add_column :articles, :slug, :string, default: nil
    add_column :articles, :position, :integer
    add_column :articles, :main_page, :integer
    add_column :articles, :publication_type, :integer
  end
end
