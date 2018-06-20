class CreateJoinTableExampleTag < ActiveRecord::Migration
  def change
    create_join_table :examples, :tags do |t|
      t.index [:example_id, :tag_id]
      t.index [:tag_id, :example_id]
    end
  end
end
