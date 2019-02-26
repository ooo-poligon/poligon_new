class NewsItem < ActiveRecord::Base
  validates :title, :preview, :content, presence: true
  mount_uploader :image, BookletImageUploader

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  def slug_candidates
    [
      :title,
      [:title, :id],
    ]
  end

  searchable do
    text :title, :as => :code_textp
    text :content, :as => :code_textp
  end
end
