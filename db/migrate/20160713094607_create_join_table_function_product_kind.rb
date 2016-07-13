class CreateJoinTableFunctionProductKind < ActiveRecord::Migration
  def change
    create_join_table :functions, :product_kinds do |t|
      # t.index [:function_id, :product_kind_id]
      # t.index [:product_kind_id, :function_id]
    end
  end
end
