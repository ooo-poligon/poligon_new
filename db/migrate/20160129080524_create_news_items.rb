class CreateNewsItems < ActiveRecord::Migration
  def change
    create_table :news_items do |t|

      t.timestamps null: false
    end
  end
end
