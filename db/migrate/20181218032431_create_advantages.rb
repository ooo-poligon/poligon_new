class CreateAdvantages < ActiveRecord::Migration
  def change
    create_table :advantages do |t|
      t.text :content
      t.timestamps null: false
    end
  end
end
