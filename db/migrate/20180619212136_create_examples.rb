class CreateExamples < ActiveRecord::Migration
  def change
    create_table :examples do |t|
      t.references :scope, index: true
      t.references :product, index: true
      t.string :title
      t.text :issue
      t.text :solution
      t.text :advantages

      t.timestamps null: false
    end
  end
end
