require 'faker'

FactoryGirl.define do
  factory :measure do
    number_code    { Faker::Lorem.characters(3) }
    title          { Faker::Lorem.characters(50) }
    symbol_ru      { Faker::Lorem.characters(50) }
    symbol_en      { Faker::Lorem.characters(50) }
    letter_code_ru { Faker::Lorem.characters(50) }
    letter_code_en { Faker::Lorem.characters(50) }
    description    { Faker::Lorem.characters(255) }
  end
end
