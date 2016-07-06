require 'faker'

FactoryGirl.define do
  factory :serie do |f|
    f.title       { Faker::Lorem.word }
    f.description { Faker::Lorem.paragraph }
    vendor
  end
end
