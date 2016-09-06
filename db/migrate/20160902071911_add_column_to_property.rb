class AddColumnToProperty < ActiveRecord::Migration
  def change
    add_reference :properties, :product_kind, index: true, foreign_key: true
  end
end
