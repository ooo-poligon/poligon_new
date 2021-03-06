require 'faker'

FactoryGirl.define do
  factory :series_item do
    title       { Faker::Lorem.word }
    description { Faker::Lorem.paragraph }
    vendor
  end
end
