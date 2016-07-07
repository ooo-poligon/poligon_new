require 'faker'

FactoryGirl.define do
  factory :user do |f|
    f.name                { Faker::Name.name_with_middle }
    f.phone               { Faker::Lorem.characters(255) }
    f.email               { Faker::Internet.email }
    f.password            { Faker::Internet.password }
    f.fax                 { Faker::Lorem.characters(255) }
    f.position            { Faker::Lorem.sentence }
    f.remember_created_at { Faker::Date.between(12.days.ago, Date.today) }
    f.sign_in_count       { Faker::Number.number(4) }
    f.current_sign_in_at  { Faker::Date.between(12.days.ago, Date.today) }
    f.last_sign_in_at     { Faker::Date.between(12.days.ago, Date.today) }
    f.current_sign_in_ip  { Faker::Internet.ip_v4_address }
    f.last_sign_in_ip     { Faker::Internet.ip_v4_address }
    f.created_at          { Faker::Date.between(12.days.ago, Date.today) }
    f.updated_at          { Faker::Date.between(12.days.ago, Date.today) }
    company
    group
  end
end
