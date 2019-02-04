class ChangeSettingsTextValueType < ActiveRecord::Migration
  def change
    change_column :settings, :text_value, :string, :limit => 255
  end
end
