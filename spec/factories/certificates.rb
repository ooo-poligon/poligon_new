require 'faker'

FactoryBot.define do
  factory :certificate do
    title           { Faker::Lorem.sentence }
    description     { Faker::Lorem.paragraph }
    image_path      { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    pdf_path        { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'pdf', '\\') }
    doc_type         { Faker::Lorem.characters(50) }
    creation_date   { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
    expiration_date { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
    created_at      { Faker::Date.between(12.days.ago, Date.today) }
    updated_at      { Faker::Date.between(12.days.ago, Date.today) }
    association :vendor_id, factory: :vendor
  end
end
