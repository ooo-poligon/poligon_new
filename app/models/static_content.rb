class StaticContent < ActiveRecord::Base
  searchable do
    text :title, :as => :code_textp
    text :content, :as => :code_textp
  end
end
