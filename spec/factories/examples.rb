require 'faker'

FactoryBot.define do
  factory :example do
    title          { Faker::Lorem.sentence }
    issue          { Faker::Lorem.paragraph }
    solution       { Faker::Lorem.paragraph }
    example_images ["824e274ff58a91c4a87c3aa0a61ba0e2.jpeg","66912feafd0f86f4f11e2b29033b7167.jpeg","d8411150ffa8f3bfb836af80a2fe3a8f.jpeg"]
    scope
    product
  end
end
