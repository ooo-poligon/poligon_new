require 'faker'

FactoryBot.define do
  factory :product do
    title              { Faker::Lorem.sentence }
    description        { Faker::Lorem.paragraph }
    anons              { Faker::Lorem.paragraph }
    article            { Faker::Lorem.sentence }
    available          { Faker::Boolean.boolean }
    outdated           { Faker::Boolean.boolean }
    ean                { Faker::Code.ean }
    delivery_time      { Faker::Lorem.sentence }
    plugin_owner_id    { Faker::Number.number(4) }
    accessory_owner_id { Faker::Number.number(4) }
    number_card_1c     { Faker::Number.number(4) }
    price              { Faker::Number.positive }
    special            { Faker::Number.positive }
    rate               { Faker::Number.positive }
    discount1          { Faker::Number.positive }
    discount2          { Faker::Number.positive }
    discount3          { Faker::Number.positive }
    rub_retail         { Faker::Number.positive }
    category
    product_kind
    currency
    series_item
    vendor
  end
end
