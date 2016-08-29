class Property < ActiveRecord::Base
  belongs_to :property_type
  has_many   :property_values
  #belongs_to :product
end
