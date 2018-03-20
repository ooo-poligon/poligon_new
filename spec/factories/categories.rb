require 'faker'

FactoryBot.define do
  factory :category do
    id          { Faker::Number.number(4) }
    parent      { Faker::Number.number(4) }
    title       { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    image_path  { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    more_info   'shared/utils/tele_rp'
    published   1
  end
end
