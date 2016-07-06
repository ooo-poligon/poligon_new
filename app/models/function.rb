class Function < ActiveRecord::Base
  belongs_to :product_kind
  belongs_to :product
end
