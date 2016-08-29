require 'faker'

FactoryGirl.define do
  factory :currency do
    title { Faker::Lorem.word }
  end
end
