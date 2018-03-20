require 'faker'

FactoryBot.define do
  factory :function do
    title        { Faker::Lorem.sentence }
    symbol       { Faker::Lorem.characters(10) }
    description  { Faker::Lorem.paragraph }
    picture_name { Faker::Lorem.word }
    picture_path { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    vendor
  end
end
