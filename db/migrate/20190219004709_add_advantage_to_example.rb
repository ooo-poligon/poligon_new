class AddAdvantageToExample < ActiveRecord::Migration
  def change
    add_column :examples, :advantages, :string, default: ""
  end
end
