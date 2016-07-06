require 'faker'

FactoryGirl.define do
  factory :analogs_variant do |f|
    f.title     { Faker::Lorem.sentence }
    f.analog_id { Faker::Number.number(5) }
  end
end
