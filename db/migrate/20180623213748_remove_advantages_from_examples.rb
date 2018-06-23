class RemoveAdvantagesFromExamples < ActiveRecord::Migration
  def change
    remove_column :examples, :advantages, :text
  end
end
