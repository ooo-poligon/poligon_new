class AddPostTypeToPost < ActiveRecord::Migration
  def change
    add_reference :posts, :post_type, index: true, foreign_key: true
  end
end
