require 'faker'

FactoryGirl.define do
  factory :vendor do |f|
    f.title       { Faker::Company.name }
    f.address     { Faker::Lorem.paragraph }
    f.description { Faker::Lorem.paragraph }
    f.rate        { Faker::Number.decimal(2) }
    association :currency_id, factory: :currency
  end
end
