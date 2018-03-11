require 'faker'

FactoryBot.define do
  factory :static_content do
    title      { Faker::Lorem.sentence }
    directory  { Faker::Lorem.word }
    page       { Faker::Lorem.word }
    content    { Faker::Lorem.paragraph }
    created_at { Faker::Date.between(12.days.ago, Date.today) }
    updated_at { Faker::Date.between(12.days.ago, Date.today) }
  end
end
