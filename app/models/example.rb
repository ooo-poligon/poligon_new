class Example < ActiveRecord::Base
  belongs_to :scope
  belongs_to :product
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :product_groups
  has_many :example_images

  accepts_nested_attributes_for :example_images, allow_destroy: true,
                                reject_if: ->(attrs) { attrs['image'].blank? && attrs['_destroy'] == true }

  #mount_uploaders :example_images, ExampleImageUploader
  #serialize :example_images, JSON

  extend FriendlyId
  friendly_id :slug_candidates, use: :slugged

  def slug_candidates
    [
      :title,
      [:title, :id],
    ]
  end

  def remake_slug
    self.update_attribute(:slug, nil)
    self.save!
  end

  def normalize_friendly_id(input)
    input.to_s.to_slug.normalize(transliterations: :russian).to_s
  end
end
