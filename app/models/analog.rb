class Analog < ActiveRecord::Base

  searchable do
    text :title, :as => :code_textp
    text :prototype, :as => :code_textp
  end

end
