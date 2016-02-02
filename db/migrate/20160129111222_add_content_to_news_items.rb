class AddContentToNewsItems < ActiveRecord::Migration
  def change
    add_column :news_items, :content, :string
  end
end
