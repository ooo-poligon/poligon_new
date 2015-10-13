# -*- encoding : utf-8 -*-
class Product < ActiveRecord::Base
  attr_accessible :image_url, :retail_price, :short_description, :title
end
