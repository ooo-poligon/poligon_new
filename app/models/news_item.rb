class NewsItem < ActiveRecord::Base
  validates :title, :preview, :content, :image_path, presence: true

  searchable do
    text :title, :as => :code_textp
    text :content, :as => :code_textp
  end
end
