require 'faker'

FactoryGirl.define do
  factory :function do |f|
    f.title        { Faker::Lorem.sentence }
    f.symbol       { Faker::Lorem.characters(10) }
    f.description  { Faker::Lorem.paragraph }
    f.picture_name { Faker::Lorem.word }
    f.picture_path { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    product_kind
    product
  end
end
