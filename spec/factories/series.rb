require 'faker'

FactoryGirl.define do
  factory :serie do
    title       { Faker::Lorem.word }
    description { Faker::Lorem.paragraph }
    vendor
  end
end
