# -*- encoding : utf-8 -*-
class Product < ActiveRecord::Base
  validates :image_url, :short_description, :title, presence: true
  validates :retail_price, numericality: {greater_than_or_equal_to: 0.01}
  validates :title, uniqueness: true
  validates :image_url, allow_blank: true, format: {
      with: %r{\.(gif|jpg|png)$}i,
      message: 'URL должен указывать на изображение формата GIF, JPG или PNG.'
  }
end
