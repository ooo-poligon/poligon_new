class AddExampleImagesToExample < ActiveRecord::Migration
  def change
    add_column :examples, :example_images, :json
  end
end
