class Category < ActiveRecord::Base

  searchable do
    text :title, :as => :code_textp
    text :description, :as => :code_textp
  end

  scope :available, -> { where(published: 1) }

end
