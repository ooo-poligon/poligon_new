require 'rails_helper'

RSpec.describe Addition, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.create(:addition)).to be_valid
  end

  it "is invalid without a title" do
    expect(FactoryBot.build(:addition, title: nil)).not_to be_valid
  end

  it "is invalid without a content" do
    expect(FactoryBot.build(:addition, content: nil)).not_to be_valid
  end

  it "is invalid without a image_path" do
    expect(FactoryBot.build(:addition, image_path: nil)).not_to be_valid
  end
end
