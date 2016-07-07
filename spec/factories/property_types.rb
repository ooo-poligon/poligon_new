require 'faker'

FactoryGirl.define do
  factory :property_type do |f|
    f.title   { Faker::Lorem.sentence }
    f.parent  { Faker::Number.number(4) }
  end
end
