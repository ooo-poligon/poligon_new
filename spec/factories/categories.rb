require 'faker'

FactoryGirl.define do
  factory :category do |f|
    f.id          { Faker::Number.number(4) }
    f.parent      { Faker::Number.number(4) }
    f.title       { Faker::Lorem.sentence }
    f.description { Faker::Lorem.paragraph }
    f.image_path  { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    f.more_info   'shared/utils/tele_rp'
    f.published   1
  end
end
