require 'faker'

FactoryGirl.define do
  factory :measure do |f|
    f.number_code    { Faker::Lorem.characters(3) }
    f.title          { Faker::Lorem.characters(50) }
    f.symbol_ru      { Faker::Lorem.characters(50) }
    f.symbol_en      { Faker::Lorem.characters(50) }
    f.letter_code_ru { Faker::Lorem.characters(50) }
    f.letter_code_en { Faker::Lorem.characters(50) }
    f.description    { Faker::Lorem.characters(255) }
  end
end
