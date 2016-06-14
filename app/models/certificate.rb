class Certificate < ActiveRecord::Base
  belongs_to :vendor

  searchable do
    text :title, :as => :code_textp
    text :description, :as => :code_textp
  end
end
