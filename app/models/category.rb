class Category < ActiveRecord::Base

  scope :available, -> { where(published: 1) }

end
