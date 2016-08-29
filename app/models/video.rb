class Video < ActiveRecord::Base
  validates :title, :content, :image_path, presence: true

  searchable do
    text :title, :as => :code_textp
    text :content, :as => :code_textp
  end
end
