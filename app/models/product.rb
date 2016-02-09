class Product < ActiveRecord::Base
  searchable do
    text :title, :description
  end
end