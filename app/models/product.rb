class Product < ActiveRecord::Base

  scope :available, -> { where(available: 1) }

  searchable do
    text :title, :as => :code_textp
    text :description, :as => :code_textp
    text :article, :as => :code_textp
  end
end
