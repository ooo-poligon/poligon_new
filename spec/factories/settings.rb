require 'faker'

FactoryGirl.define do
  factory :setting do
    title      { Faker::Lorem.characters(50) }
    kind       { Faker::Lorem.characters(50) }
    text_value { Faker::Lorem.characters(50) }
    int_value  { Faker::Number.number(4) }
  end
end
