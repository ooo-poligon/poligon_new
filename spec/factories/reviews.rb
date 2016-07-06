require 'faker'

FactoryGirl.define do
  factory :review do |f|
    f.title      { Faker::Lorem.sentence }
    f.content    { Faker::Lorem.paragraph }
    f.image_path { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    f.created_at { Faker::Date.between(12.days.ago, Date.today) }
    f.updated_at { Faker::Date.between(12.days.ago, Date.today) }
  end
end
