class Example < ActiveRecord::Base
  belongs_to :scope
  belongs_to :product
  has_and_belongs_to_many :tags
end
