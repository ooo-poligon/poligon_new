class Product < ActiveRecord::Base
  belongs_to :category
  belongs_to :vendor, class_name: 'Vendor', foreign_key: 'vendor'
  belongs_to :serie, class_name: 'Serie', foreign_key: 'serie'
  belongs_to :product_kind
  belongs_to :currency
  has_many :data_files
  has_many :functions
  has_and_belongs_to_many :offers

  scope :available, -> { where(available: 1) }
  scope :instock,   -> { where(id: (Quantity.where("stock > 0").product_id)) }

  searchable do
    text    :title, :as => :code_textp
    text    :description, :as => :code_textp
    text    :article, :as => :code_textp
    integer :id
  end
end
