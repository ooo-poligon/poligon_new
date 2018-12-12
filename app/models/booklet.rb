class Booklet < ActiveRecord::Base
  belongs_to :vendor
  mount_uploader :file, BookletUploader
  mount_uploader :image, BookletImageUploader
end
