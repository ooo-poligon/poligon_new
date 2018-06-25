class ExamplesProductGroups < ActiveRecord::Migration
  def change
    create_table :examples_product_groups, :id => false do |t|
      t.integer :example_id
      t.integer :product_group_id
    end
  end
end
