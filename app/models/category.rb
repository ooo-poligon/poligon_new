class Category < ActiveRecord::Base
  has_many :products
  validates :title, uniqueness: true


  searchable do
    text :title, :as => :code_textp
    text :summary, :as => :code_textp
    text :description, :as => :code_textp
  end

  scope :available, -> { where(published: 1) }

    def to_param
    "#{id}-#{slug}"
    end
end
