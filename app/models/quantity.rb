class Quantity < ActiveRecord::Base
  belongs_to :product
  self.table_name = "quantities"
end
