class Analog < ActiveRecord::Base

  searchable do
    text :prototype
  end

end
