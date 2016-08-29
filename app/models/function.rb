class Function < ActiveRecord::Base
  has_and_belongs_to_many :product_kinds
  belongs_to :vendor
end
