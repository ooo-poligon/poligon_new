require 'faker'

FactoryGirl.define do
  factory :file_type do |f|
    f.type { Faker::Lorem.sentence }
  end
end
