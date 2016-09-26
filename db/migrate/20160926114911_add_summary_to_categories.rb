class AddSummaryToCategories < ActiveRecord::Migration
  def change
    add_column :categories, :summary, :text
  end
end
