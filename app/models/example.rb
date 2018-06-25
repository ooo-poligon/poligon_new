class Example < ActiveRecord::Base
  belongs_to :scope
  belongs_to :product
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :product_groups

  mount_uploaders :example_images, ExampleImageUploader
  serialize :example_images, JSON

end
