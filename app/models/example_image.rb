class ExampleImage < ActiveRecord::Base
  belongs_to :example
  mount_uploader :image, ExampleImageUploader
end
