class AddColumnToPropertyType < ActiveRecord::Migration
  def change
    add_reference :property_types, :property_kind, index: true, foreign_key: true
  end
end
