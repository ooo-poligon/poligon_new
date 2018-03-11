require 'faker'

FactoryBot.define do
  factory :quantity do
    minimum         { Faker::Number.number(4) }
    ordered         { Faker::Number.number(4) }
    pieces_per_pack { Faker::Number.number(4) }
    reserved        { Faker::Number.number(4) }
    stock           { Faker::Number.number(4) }
    product
  end
end
