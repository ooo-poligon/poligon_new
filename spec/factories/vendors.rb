require 'faker'

FactoryGirl.define do
  factory :vendor do
    title       { Faker::Company.name }
    address     { Faker::Lorem.paragraph }
    description { Faker::Lorem.paragraph }
    rate        { Faker::Number.decimal(2) }
    association :currency_id, factory: :currency
  end
end
