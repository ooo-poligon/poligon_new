require 'faker'

FactoryGirl.define do
  factory :analogs_variant do
    title     { Faker::Lorem.sentence }
    analog_id { Faker::Number.number(5) }
  end
end
