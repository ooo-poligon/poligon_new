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

  def remake_slug
    self.update_attribute(:slug, nil)
    self.save!
  end

  def normalize_friendly_id(input)
    input.to_s.to_slug.normalize(transliterations: :russian).to_s
  end

  searchable do
    text :title, :as => :code_textp
    text :content, :as => :code_textp
  end
end
