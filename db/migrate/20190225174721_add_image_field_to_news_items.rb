class AddImageFieldToNewsItems < ActiveRecord::Migration
  def change
    add_column :news_items, :image, :string
    add_column :news_items, :image_alt, :string, default: ""
    add_column :news_items, :slug, :string, default: nil
  end
end
