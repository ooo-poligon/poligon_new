require 'faker'

FactoryBot.define do
  factory :group do
    title       { Faker::Lorem.sentence }
    description { Faker::Lorem.paragraph }
    created_at  { Faker::Date.between(12.days.ago, Date.today) }
    updated_at  { Faker::Date.between(12.days.ago, Date.today) }
  end
end
