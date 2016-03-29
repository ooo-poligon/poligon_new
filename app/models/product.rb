class Product < ActiveRecord::Base

  scope :available, -> { where(available: 1) }

  searchable do
    text :title, :description
  end
end
