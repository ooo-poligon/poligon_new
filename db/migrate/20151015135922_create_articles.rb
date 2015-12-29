class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title
      t.string :content
      t.datetime :date_created
      t.datetime :date_updated

      t.timestamps
    end
  end
end
