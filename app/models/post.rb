class Post < ActiveRecord::Base

  belongs_to :user
  belongs_to :ticket
  belongs_to :post_type

end
