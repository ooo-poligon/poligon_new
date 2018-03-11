require 'faker'

FactoryBot.define do
  factory :product_kind do
    title { Faker::Lorem.word }
  end
end
