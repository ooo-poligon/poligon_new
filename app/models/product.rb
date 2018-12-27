class Product < ActiveRecord::Base
  belongs_to :category
  belongs_to :vendor
  belongs_to :series_item
  belongs_to :product_kind
  belongs_to :currency
  belongs_to :advantage
  
  has_many   :data_files
  has_many   :properties
  has_many   :property_values
  has_many   :line_items, dependent: :destroy
  has_many   :examples
  has_one    :prices
  has_and_belongs_to_many :offers

  before_destroy :ensure_not_referenced_by_any_line_item

  scope :available, -> { where(available: 1) }
  scope :instock,   -> { where(id: (Quantity.where("stock > 0").product_id)) }

  searchable do
    text    :title, :as => :code_textp
    text    :description, :as => :code_textp
    text    :article, :as => :code_textp
    integer :id
  end

  private

  def ensure_not_referenced_by_any_line_item
    if :line_items.empty?
      return true
    else
      errors.add(:base, 'существуют товарные позиции')
      return false
    end
  end
end
