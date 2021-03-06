class Vendor < ActiveRecord::Base
  has_many :certificates
  has_many :series_items
  has_many :products, class_name: 'Product', primary_key: 'id'

  validates :title, uniqueness: true

searchable do
    text    :title, :as => :code_textp
    end
end
