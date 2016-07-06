class Currency < ActiveRecord::Base
  has_many :products
end
