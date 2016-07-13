require 'faker'

FactoryGirl.define do
  factory :analog do
    title        { Faker::Lorem.sentence }
    vendor       { Faker::Lorem.sentence }
    prototype    { Faker::Lorem.characters(50) }
    description  { Faker::Lorem.paragraph }
    addition     { Faker::Lorem.paragraph }
    prototype_id { Faker::Number.number(5) }
  end
end
