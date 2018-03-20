require 'rails_helper'

RSpec.describe Review, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.create(:review)).to be_valid
  end

  it "is invalid without a title" do
    expect(FactoryBot.build(:review, title: nil)).not_to be_valid
  end

  it "is invalid without a content" do
    expect(FactoryBot.build(:review, content: nil)).not_to be_valid
  end

  it "is invalid without a image_path" do
    expect(FactoryBot.build(:review, image_path: nil)).not_to be_valid
  end
end
