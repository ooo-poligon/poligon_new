require 'faker'

FactoryBot.define do
  factory :property_kind do
    title   { Faker::Lorem.sentence }
    created_at { Faker::Date.between(5.days.ago, 2.days.ago) }
    updated_at { Faker::Date.between(1.days.ago, Date.today) }
  end
end
