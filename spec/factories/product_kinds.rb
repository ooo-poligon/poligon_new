require 'faker'

FactoryGirl.define do
  factory :product_kind do
    title { Faker::Lorem.word }
  end
end
