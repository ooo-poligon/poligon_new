class CreateElecRubricator < ActiveRecord::Migration
  def change
    create_table :elec_rubricator do |t|
      t.string :title
      t.integer :elec_id
    end
  end
end
