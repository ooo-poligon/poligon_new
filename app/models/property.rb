class Property < ActiveRecord::Base
  belongs_to              :property_type
  has_many                :property_values
  has_and_belongs_to_many :product_kinds
end
