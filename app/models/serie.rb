class Serie < ActiveRecord::Base
  belongs_to :vendor
  has_many   :products, class_name: 'Product', primary_key: 'id', foreign_key: 'serie'

  validates :title, uniqueness: true
end
