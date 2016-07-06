require 'faker'

FactoryGirl.define do
  factory :analog do |f|
    f.title        { Faker::Lorem.sentence }
    f.vendor       { Faker::Lorem.sentence }
    f.prototype    { Faker::Lorem.characters(50) }
    f.description  { Faker::Lorem.paragraph }
    f.addition     { Faker::Lorem.paragraph }
    f.prototype_id { Faker::Number.number(5) }
  end
end
