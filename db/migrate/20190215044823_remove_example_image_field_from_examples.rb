class RemoveExampleImageFieldFromExamples < ActiveRecord::Migration
  def change
    remove_column :examples, :example_images
  end
end
