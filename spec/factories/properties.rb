require 'faker'

FactoryGirl.define do
  factory :property do |f|
    f.title      { Faker::Lorem.sentence }
    #f.value      { Faker::Lorem.sentence }
    #f.product
    f.property_type
    #association :value_id, factory: :property_value
  end
end
