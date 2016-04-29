class AddPreviewToNewsItems < ActiveRecord::Migration
  def change
    add_column :news_items, :preview, :text
  end
end
