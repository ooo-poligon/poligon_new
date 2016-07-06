require 'faker'

FactoryGirl.define do
  factory :certificate do |f|
    f.title           { Faker::Lorem.sentence }
    f.description     { Faker::Lorem.paragraph }
    f.image_path      { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    f.pdf_path        { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'pdf', '\\') }
    f.doc_type         { Faker::Lorem.characters(50) }
    f.creation_date   { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
    f.expiration_date { Faker::Date.between_except(1.year.ago, 1.year.from_now, Date.today) }
    f.created_at      { Faker::Date.between(12.days.ago, Date.today) }
    f.updated_at      { Faker::Date.between(12.days.ago, Date.today) }
    association :vendor_id, factory: :vendor
  end
end
