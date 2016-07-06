require 'faker'

FactoryGirl.define do
  factory :company do |f|
    f.title      { Faker::Lorem.sentence }
    f.address    { Faker::Lorem.sentence }
    f.phone      { Faker::PhoneNumber.phone_number }
    f.fax        { Faker::PhoneNumber.phone_number }
    f.email      { Faker::Internet.email }
    f.site       { Faker::Internet.domain_name }
    f.dealer     { Faker::Boolean.boolean }
    f.created_at { Faker::Date.between(12.days.ago, Date.today) }
    f.updated_at { Faker::Date.between(12.days.ago, Date.today) }
  end
end
