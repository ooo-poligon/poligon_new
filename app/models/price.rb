class Price < ActiveRecord::Base
  belongs_to :product
  self.table_name = "prices"

end
