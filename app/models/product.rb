class Product < ActiveRecord::Base
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
