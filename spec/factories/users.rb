require 'faker'

FactoryGirl.define do
  factory :user do
    name                { Faker::Name.name_with_middle }
    phone               { Faker::Lorem.characters(255) }
    email               { Faker::Internet.email }
    password            { Faker::Internet.password }
    fax                 { Faker::Lorem.characters(255) }
    position            { Faker::Lorem.sentence }
    remember_created_at { Faker::Date.between(12.days.ago, Date.today) }
    sign_in_count       { Faker::Number.number(4) }
    current_sign_in_at  { Faker::Date.between(12.days.ago, Date.today) }
    last_sign_in_at     { Faker::Date.between(12.days.ago, Date.today) }
    current_sign_in_ip  { Faker::Internet.ip_v4_address }
    last_sign_in_ip     { Faker::Internet.ip_v4_address }
    created_at          { Faker::Date.between(12.days.ago, Date.today) }
    updated_at          { Faker::Date.between(12.days.ago, Date.today) }
    company
    group
  end
end
