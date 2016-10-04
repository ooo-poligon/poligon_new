class PropertyType < ActiveRecord::Base
  has_and_belongs_to_many :product_kinds
  has_many :properties
  #belongs_to :property_kind
end
