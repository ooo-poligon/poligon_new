class SliderItem < ActiveRecord::Base
  mount_uploader :image, SliderImageUploader
end
