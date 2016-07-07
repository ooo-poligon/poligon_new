require 'faker'

FactoryGirl.define do
  factory :static_content do |f|
    f.title      { Faker::Lorem.sentence }
    f.directory  { Faker::Lorem.word }
    f.page       { Faker::Lorem.word }
    f.content    { Faker::Lorem.paragraph }
    f.created_at { Faker::Date.between(12.days.ago, Date.today) }
    f.updated_at { Faker::Date.between(12.days.ago, Date.today) }
  end
end
