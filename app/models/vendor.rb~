class Vendor < ActiveRecord::Base
  has_many :certificates
  has_many :series_items
  has_many :products, class_name: 'Product', primary_key: 'id', foreign_key: 'vendor'

  validates :title, uniqueness: true
end
