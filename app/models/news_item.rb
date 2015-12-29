class NewsItem < ActiveRecord::Base
  attr_accessible :content, :date_created, :date_updated, :title
end
