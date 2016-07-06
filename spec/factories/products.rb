require 'faker'

FactoryGirl.define do
  factory :product do |f|
    f.title              { Faker::Lorem.sentence }
    f.description        { Faker::Lorem.paragraph }
    f.anons              { Faker::Lorem.paragraph }
    f.article            { Faker::Lorem.sentence }
    f.available          { Faker::Boolean.boolean }
    f.outdated           { Faker::Boolean.boolean }
    f.ean                { Faker::Code.ean }
    f.delivery_time      { Faker::Lorem.sentence }
    f.plugin_owner_id    { Faker::Number.number(4) }
    f.accessory_owner_id { Faker::Number.number(4) }
    f.price              { Faker::Number.positive }
    f.special            { Faker::Number.positive }
    f.rate               { Faker::Number.positive }
    f.discount1          { Faker::Number.positive }
    f.discount2          { Faker::Number.positive }
    f.discount3          { Faker::Number.positive }
    f.rub_retail         { Faker::Number.positive }
    category
    product_kind
    currency
    serie
    vendor
  end
end
