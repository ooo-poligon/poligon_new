require 'faker'

FactoryGirl.define do
  factory :setting do |f|
    f.title      { Faker::Lorem.characters(50) }
    f.kind       { Faker::Lorem.characters(50) }
    f.text_value { Faker::Lorem.characters(50) }
    f.int_value  { Faker::Number.number(4) }
  end
end
