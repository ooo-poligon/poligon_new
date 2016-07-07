require 'faker'

FactoryGirl.define do
  factory :offer do |f|
    f.title            { Faker::Lorem.sentence }
    f.description      { Faker::Lorem.paragraph }
    f.image_path       { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    f.available        { Faker::Boolean.boolean }
    f.begin_date       { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
    f.expiration_date  { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
    f.landing_page_url { Faker::Internet.url }
    f.created_at       { Faker::Date.between(12.days.ago, Date.today) }
    f.updated_at       { Faker::Date.between(12.days.ago, Date.today) }
  end
end
