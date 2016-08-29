require 'faker'

FactoryGirl.define do
  factory :offer do
    title            { Faker::Lorem.sentence }
    description      { Faker::Lorem.paragraph }
    image_path       { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    available        { Faker::Boolean.boolean }
    begin_date       { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
    expiration_date  { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
    landing_page_url { Faker::Internet.url }
    created_at       { Faker::Date.between(12.days.ago, Date.today) }
    updated_at       { Faker::Date.between(12.days.ago, Date.today) }
  end
end
