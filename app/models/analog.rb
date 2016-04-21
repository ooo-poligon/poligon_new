class Analog < ActiveRecord::Base

  searchable do
    text :title
    text :prototype
  end

end
