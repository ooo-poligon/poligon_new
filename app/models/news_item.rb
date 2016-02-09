class NewsItem < ActiveRecord::Base
  searchable do
    text :title, :content
  end
end
