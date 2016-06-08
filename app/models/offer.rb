class Offer < ActiveRecord::Base
  has_and_belongs_to_many :products

  searchable do
    text :title, :as => :code_textp
    text :description, :as => :code_textp
  end

end
