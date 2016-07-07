class PropertyValue < ActiveRecord::Base
  belongs_to :properties
  belongs_to :products
  belongs_to :measures
end
