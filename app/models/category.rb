class Category < ActiveRecord::Base
  has_many :subcategories, class_name: 'Category', foreign_key: 'parent'
  belongs_to :parent_category, class_name: 'Category'



  has_many :products

  validates :title, uniqueness: true

  searchable do
    text :title, :as => :code_textp
    text :summary, :as => :code_textp
    text :description, :as => :code_textp
  end

  scope :available, -> { where(published: 1) }
  default_scope { order('CASE WHEN sorting = 0 THEN 2 ELSE 1 END, sorting ASC') }

  def get_products
    cat = self
    categories_ids = self.subcategories.pluck(:id)
    categories_ids << cat.id
    products = Product.where(category_id: categories_ids)
    products
  end

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

end
