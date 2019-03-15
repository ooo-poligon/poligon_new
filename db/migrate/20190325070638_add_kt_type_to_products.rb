class AddKtTypeToProducts < ActiveRecord::Migration
  def change
    add_column :products, :kt_type, :integer, default: 0
    add_column :products, :analog_1_comment, :string, default: ""
    add_column :products, :analog_2_comment, :string, default: ""
    add_column :products, :analog_3_comment, :string, default: ""
    add_column :products, :analog_4_comment, :string, default: ""
    add_column :products, :analog_5_comment, :string, default: ""
  end
end
