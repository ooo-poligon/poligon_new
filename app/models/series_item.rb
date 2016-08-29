class SeriesItem < ActiveRecord::Base

  belongs_to :vendor
  has_many   :products, class_name: 'Product', primary_key: 'id', foreign_key: 'series_id'

  validates :title, uniqueness: true
end
