require 'rails_helper'

RSpec.describe Video, type: :model do
  it "has a valid factory" do
    expect(FactoryBot.create(:video)).to be_valid
  end

  it "is invalid without a title" do
    expect(FactoryBot.build(:video, title: nil)).not_to be_valid
  end

  it "is invalid without a content" do
    expect(FactoryBot.build(:video, content: nil)).not_to be_valid
  end

  it "is invalid without a image_path" do
    expect(FactoryBot.build(:video, image_path: nil)).not_to be_valid
  end
end
