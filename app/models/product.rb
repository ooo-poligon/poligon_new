class Product < ActiveRecord::Base
  belongs_to :category
  belongs_to :vendor
  belongs_to :series_item
  belongs_to :product_kind
  belongs_to :currency
  has_many   :data_files
  has_many   :properties
  has_many   :property_values
  has_one    :quantity
  has_one    :price
  has_one    :files_copy
  has_one    :datasheet
  has_and_belongs_to_many :offers

  scope :available, -> { where(available: 1) }
  scope :instock,   -> { where(id: (Quantity.where("stock > 0").product_id)) }

  searchable do
    text    :title, :as => :code_textp
    text    :description, :as => :code_textp
    text    :article, :as => :code_textp
    text    :vendor, :as => :code_textp do
    vendor.title { |vendor| vendor.id }
  end
    integer :id
     end
end
