require 'faker'

FactoryGirl.define do
  factory :quantity do |f|
    f.minimum         { Faker::Number.number(4) }
    f.ordered         { Faker::Number.number(4) }
    f.pieces_per_pack { Faker::Number.number(4) }
    f.reserved        { Faker::Number.number(4) }
    f.stock           { Faker::Number.number(4) }
    product
  end
end
