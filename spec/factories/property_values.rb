require 'faker'

FactoryGirl.define do
  factory :property_value do
    value  { Faker::Lorem.sentence }
    cond   { Faker::Lorem.sentence }

    association :measure_id, factory: :measure
    association :property_id, factory: :property
    association :product_id, factory: :product
  end
end
