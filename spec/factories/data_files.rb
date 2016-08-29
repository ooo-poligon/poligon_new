FactoryGirl.define do
  factory :data_file do
    name        { Faker::Lorem.word }
    description { Faker::Lorem.sentence }
    path        { Faker::File.file_name('c:/poligon_images/content/articles', 'baz', 'jpg', '\\') }
    file_type
    association :owner_id, factory: :product
  end
end
