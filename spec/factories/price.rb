require 'faker'

FactoryGirl.define do
  factory :price do
    supplier_price              { Faker::Number.positive }
    base_price       { Faker::Number.positive }
    rrp	{ Faker::Number.positive }
    special_price			{ Faker::Number.positive }
    10_price	{ Faker::Number.positive }
    opt_price		{ Faker::Number.positive }
    dealer_price	{ Faker::Number.positive }
    rs_price_1	{ Faker::Number.positive }
    rs_price_2	{ Faker::Number.positive }
    rs_price_3	{ Faker::Number.positive }
    rs_price_4	{ Faker::Number.positive }
    rs_price_5	{ Faker::Number.positive }
    rub_retail	{ Faker::Number.positive }
    product




  end
end
