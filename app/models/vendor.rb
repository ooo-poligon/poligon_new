class Vendor < ActiveRecord::Base
  has_many :certificates
  has_many :series_items
  has_many :products, class_name: 'Product', primary_key: 'id', foreign_key: 'vendor_id'
  has_many :booklets

  validates :title, uniqueness: true
end
