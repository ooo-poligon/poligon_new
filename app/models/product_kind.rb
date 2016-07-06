class ProductKind < ActiveRecord::Base
  has_many :products
  has_many :functions
end
