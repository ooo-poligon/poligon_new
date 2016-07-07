class ProductKind < ActiveRecord::Base
  has_many :products
  has_many :functions
  has_and_belongs_to_many :property_types
end
