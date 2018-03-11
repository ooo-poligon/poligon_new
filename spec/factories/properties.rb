require 'faker'

FactoryBot.define do
  factory :property do
    title      { Faker::Lorem.sentence }
    #value      { Faker::Lorem.sentence }
    #product
    property_type
    #association :value_id, factory: :property_value
  end
end
