require 'faker'

FactoryGirl.define do
  factory :news_item do
    title      { Faker::Lorem.sentence }
    preview    { Faker::Lorem.paragraph }
    content    { Faker::Lorem.paragraph }
    image_path { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    created_at { Faker::Date.between(12.days.ago, Date.today) }
    updated_at { Faker::Date.between(12.days.ago, Date.today) }
  end
end
