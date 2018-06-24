class AddExampleImagesToExample < ActiveRecord::Migration
  def change
    add_column :examples, :example_images, :string
  end
end
