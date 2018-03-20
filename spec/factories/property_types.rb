require 'faker'

FactoryBot.define do
  factory :property_type do
    title   { Faker::Lorem.sentence }
    parent  { Faker::Number.number(4) }
  end
end
