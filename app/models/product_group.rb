class ProductGroup < ActiveRecord::Base
  has_and_belongs_to_many :examples
end
