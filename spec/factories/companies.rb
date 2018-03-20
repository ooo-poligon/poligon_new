require 'faker'

FactoryBot.define do
  factory :company do
    title      { Faker::Lorem.sentence }
    address    { Faker::Lorem.sentence }
    phone      { Faker::PhoneNumber.phone_number }
    fax        { Faker::PhoneNumber.phone_number }
    email      { Faker::Internet.email }
    site       { Faker::Internet.domain_name }
    dealer     { Faker::Boolean.boolean }
    created_at { Faker::Date.between(12.days.ago, Date.today) }
    updated_at { Faker::Date.between(12.days.ago, Date.today) }
  end
end
