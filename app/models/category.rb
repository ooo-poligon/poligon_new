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
  default_scope { order(sorting: :desc) }

  def get_products
    cat = self
    categories_ids = self.subcategories.pluck(:id)
    categories_ids << cat.id
    products = Product.where(category_id: categories_ids)
    products
  end

end
