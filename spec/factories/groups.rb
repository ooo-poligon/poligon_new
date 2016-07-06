require 'faker'

FactoryGirl.define do
  factory :group do |f|
    f.title       { Faker::Lorem.sentence }
    f.description { Faker::Lorem.paragraph }
    f.created_at  { Faker::Date.between(12.days.ago, Date.today) }
    f.updated_at  { Faker::Date.between(12.days.ago, Date.today) }
  end
end
